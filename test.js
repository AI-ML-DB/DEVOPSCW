const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dbConfig = require('./config/db');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const password = 'TawR1tf3OdYBmWms';
const mongoDB = `mongodb+srv://khuloodalblooshi77:<password>@cluster0.stayrlp.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
.then(() => {
  console.log('MongoDB connected');
  // Start your Node.js server here
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define routes
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
