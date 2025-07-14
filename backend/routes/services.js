const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    
    let query = 'SELECT * FROM services';
    const params = [];
    
    if (active === 'true') {
      query += ' WHERE active = true';
    }
    
    query += ' ORDER BY category, name';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create service (admin only)
router.post('/', authenticateToken, [
  body('name').notEmpty().withMessage('Service name is required'),
  body('category').isIn(['3D Printing', 'Laser Cutting']).withMessage('Invalid category'),
  body('material').notEmpty().withMessage('Material is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, material, price, unit, description, active = true } = req.body;

    const result = await pool.query(
      `INSERT INTO services (name, category, material, price, unit, description, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, category, material, price, unit, description, active]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update service (admin only)
router.put('/:id', authenticateToken, [
  body('name').notEmpty().withMessage('Service name is required'),
  body('category').isIn(['3D Printing', 'Laser Cutting']).withMessage('Invalid category'),
  body('material').notEmpty().withMessage('Material is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('description').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, category, material, price, unit, description, active } = req.body;

    const result = await pool.query(
      `UPDATE services 
       SET name = $1, category = $2, material = $3, price = $4, unit = $5, description = $6, active = $7
       WHERE id = $8 RETURNING *`,
      [name, category, material, price, unit, description, active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Toggle service status (admin only)
router.patch('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'UPDATE services SET active = NOT active WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Toggle service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;