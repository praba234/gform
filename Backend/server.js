const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const FormResponse = require('./models/FormResponse');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://gform:Gform1234@cluster0.l2gzcnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST /submit
app.post('/submit', upload.single('resume'), async (req, res) => {
  try {
    const { name, gender, dob, summary } = req.body;
    const mernRating = parseInt(req.body.mernRating, 10);
    const resumeFileName = req.file?.filename;

    if (!name || !gender || !dob || !summary || !mernRating || !resumeFileName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newResponse = new FormResponse({
      name,
      gender,
      dob,
      summary,
      mernRating,
      resumeFileName,
    });

    await newResponse.save();
    console.log('✅ Form data saved:', newResponse);
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error('❌ Error during submission:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
