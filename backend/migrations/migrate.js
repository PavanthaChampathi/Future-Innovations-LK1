const fs = require('fs');
const path = require('path');
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Read and execute the SQL migration file
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, '001_initial_schema.sql'),
      'utf8'
    );
    
    await pool.query(migrationSQL);
    console.log('✅ Database schema created successfully');
    
    // Create default admin user
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await pool.query(
      'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING',
      [adminUsername, hashedPassword, 'admin']
    );
    
    console.log('✅ Default admin user created');
    console.log(`   Username: ${adminUsername}`);
    console.log(`   Password: ${adminPassword}`);
    
    console.log('🎉 Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();