const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    
    let query = `
      SELECT o.*, 
             array_agg(of.original_name) as files
      FROM orders o
      LEFT JOIN order_files of ON o.id = of.order_id
    `;
    
    const conditions = [];
    const params = [];
    
    if (status && status !== 'all') {
      conditions.push(`o.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (search) {
      conditions.push(`(o.customer_name ILIKE $${params.length + 1} OR o.order_id ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' GROUP BY o.id ORDER BY o.created_at DESC';
    
    // Add pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM orders o';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    
    const countResult = await pool.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);
    
    res.json({
      orders: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', of.id,
                 'filename', of.filename,
                 'original_name', of.original_name,
                 'file_size', of.file_size,
                 'mime_type', of.mime_type
               )
             ) as files
      FROM orders o
      LEFT JOIN order_files of ON o.id = of.order_id
      WHERE o.id = $1
      GROUP BY o.id
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update order status and progress
router.patch('/:id', authenticateToken, [
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed', 'Shipped', 'Cancelled']).withMessage('Invalid status'),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, progress, notes } = req.body;

    const updates = [];
    const params = [];
    let paramCount = 1;

    if (status) {
      updates.push(`status = $${paramCount}`);
      params.push(status);
      paramCount++;
    }

    if (progress !== undefined) {
      updates.push(`progress = $${paramCount}`);
      params.push(progress);
      paramCount++;
    }

    if (notes) {
      updates.push(`notes = $${paramCount}`);
      params.push(notes);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    params.push(id);
    const query = `UPDATE orders SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order statistics
router.get('/stats/dashboard', authenticateToken, async (req, res) => {
  try {
    const stats = await Promise.all([
      // Total orders
      pool.query('SELECT COUNT(*) as total FROM orders'),
      
      // Orders by status
      pool.query(`
        SELECT status, COUNT(*) as count 
        FROM orders 
        GROUP BY status
      `),
      
      // Revenue this month
      pool.query(`
        SELECT COALESCE(SUM(total_amount), 0) as revenue
        FROM orders 
        WHERE created_at >= date_trunc('month', CURRENT_DATE)
      `),
      
      // Recent orders
      pool.query(`
        SELECT order_id, customer_name, service_type, status, total_amount, created_at
        FROM orders 
        ORDER BY created_at DESC 
        LIMIT 5
      `)
    ]);

    const [totalResult, statusResult, revenueResult, recentResult] = stats;

    res.json({
      total: parseInt(totalResult.rows[0].total),
      byStatus: statusResult.rows,
      revenue: parseFloat(revenueResult.rows[0].revenue),
      recent: recentResult.rows
    });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;