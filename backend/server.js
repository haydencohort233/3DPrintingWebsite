const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
  host: 'database-valleyquotes.cbauaackqe0c.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'omgwtf1122',
  database: 'valley3dprints',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.post('/submit-quote', upload.single('file'), (req, res) => {
  const { name, email, phone, description, link, noSupports, material, priority } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Validate required fields (name, email, phone, description)
  if (!name || !email || !phone || !description) {
    return res.status(400).send('Name, email, phone number, and description are required');
  }

  // Convert 'true'/'false' strings to boolean
  const supportsNo = JSON.parse(noSupports || false);

  // Ensure priority matches one of the expected options
  const validPriorities = ['average', 'relaxed', 'urgent'];
  const isPriority = validPriorities.includes(priority) ? priority : '';

  // Prepare columns and values for the INSERT query
  const columns = ['name', 'email', 'phone', 'description', 'file_path', 'link', 'noSupports', 'material', 'priority'];
  const values = [name, email, phone, description, filePath, link || '', supportsNo, material || '', isPriority];

  // Construct the INSERT query dynamically
  const query = `INSERT INTO quotes (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err.sqlMessage);
      return res.status(500).send('Error inserting data');
    }
    console.log('Inserted:', result);
    res.send('Quote request submitted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
