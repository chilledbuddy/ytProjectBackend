const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const commentRoutes = require('./routes/comments');

dotenv.config();
const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',  // Allow requests from any origin
  methods: ['GET', 'POST'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type'],  // Allowed request headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
app.use('/comments', commentRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
