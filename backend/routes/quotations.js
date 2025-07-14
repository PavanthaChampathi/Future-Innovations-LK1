const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Generate quote ID
function generateQuoteId() {
  return 'QT' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Create quotation with file upload
router.post('/', upload.array('files', 10), [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Valid email is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('material').notEmpty().withMessage('Material is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  const client = await pool.connect();
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one file is required' });
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      material,
      quantity
    } = req.body;

    await client.query('BEGIN');

    // Get service pricing
    const serviceResult = await client.query(
      'SELECT price, unit FROM services WHERE category = $1 AND material = $2 AND active = true',
      [serviceType, material]
    );

    if (serviceResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Service not available' });
    }

    const service = serviceResult.rows[0];
    
    // Calculate estimated price (simplified calculation)
    const basePrice = parseFloat(service.price);
    const estimatedPrice = Math.floor(basePrice * quantity * (Math.random() * 5 + 1));
    
    // Determine delivery time
    const deliveryTime = serviceType === '3D Printing' ? '2-3 days' : '1-2 days';

    // Generate quote ID
    const quoteId = generateQuoteId();

    // Insert quotation
    const quotationResult = await client.query(
      `INSERT INTO quotations (quote_id, customer_name, customer_email, customer_phone, 
       service_type, material, quantity, estimated_price, delivery_time, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [quoteId, customerName, customerEmail, customerPhone, serviceType, material, 
       quantity, estimatedPrice, deliveryTime, 'Pending Review']
    );

    const quotationId = quotationResult.rows[0].id;

    // Insert files
    for (const file of req.files) {
      await client.query(
        `INSERT INTO quote_files (quotation_id, filename, original_name, file_path, file_size, mime_type)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [quotationId, file.filename, file.originalname, file.path, file.size, file.mimetype]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      quoteId,
      estimatedPrice,
      deliveryTime,
      message: 'Quote generated successfully'
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Create quotation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Get all quotations (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    
    let query = `
      SELECT q.*, 
             array_agg(qf.original_name) as files
      FROM quotations q
      LEFT JOIN quote_files qf ON q.id = qf.quotation_id
    `;
    
    const conditions = [];
    const params = [];
    
    if (status && status !== 'all') {
      conditions.push(`q.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (search) {
      conditions.push(`(q.customer_name ILIKE $${params.length + 1} OR q.quote_id ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' GROUP BY q.id ORDER BY q.created_at DESC';
    
    // Add pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM quotations q';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    
    const countResult = await pool.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);
    
    res.json({
      quotations: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get quotations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get quotation by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT q.*, 
             json_agg(
               json_build_object(
                 'id', qf.id,
                 'filename', qf.filename,
                 'original_name', qf.original_name,
                 'file_size', qf.file_size,
                 'mime_type', qf.mime_type
               )
             ) as files
      FROM quotations q
      LEFT JOIN quote_files qf ON q.id = qf.quotation_id
      WHERE q.id = $1
      GROUP BY q.id
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quotation not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get quotation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update quotation status
router.patch('/:id/status', authenticateToken, [
  body('status').isIn(['Pending Review', 'Sent', 'Approved', 'Rejected']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, notes } = req.body;

    const result = await pool.query(
      'UPDATE quotations SET status = $1, notes = $2 WHERE id = $3 RETURNING *',
      [status, notes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update quotation status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Convert quotation to order
router.post('/:id/convert-to-order', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { deadline, notes } = req.body;

    await client.query('BEGIN');

    // Get quotation
    const quotationResult = await client.query('SELECT * FROM quotations WHERE id = $1', [id]);
    if (quotationResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Quotation not found' });
    }

    const quotation = quotationResult.rows[0];

    // Generate order ID
    const orderIdResult = await client.query('SELECT COUNT(*) FROM orders');
    const orderCount = parseInt(orderIdResult.rows[0].count) + 1;
    const orderId = 'FI' + orderCount.toString().padStart(3, '0');

    // Create order
    const orderResult = await client.query(`
      INSERT INTO orders (order_id, quotation_id, customer_name, customer_email, customer_phone,
                         service_type, material, quantity, total_amount, deadline, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id
    `, [
      orderId, quotation.id, quotation.customer_name, quotation.customer_email, quotation.customer_phone,
      quotation.service_type, quotation.material, quotation.quantity, quotation.estimated_price,
      deadline, notes
    ]);

    const newOrderId = orderResult.rows[0].id;

    // Copy files from quotation to order
    await client.query(`
      INSERT INTO order_files (order_id, filename, original_name, file_path, file_size, mime_type)
      SELECT $1, filename, original_name, file_path, file_size, mime_type
      FROM quote_files WHERE quotation_id = $2
    `, [newOrderId, quotation.id]);

    // Update quotation status
    await client.query('UPDATE quotations SET status = $1 WHERE id = $2', ['Approved', id]);

    await client.query('COMMIT');

    res.json({ orderId, message: 'Order created successfully' });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Convert to order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

module.exports = router;