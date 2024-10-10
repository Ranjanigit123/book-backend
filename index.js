//index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./book');
const bookRoutes = require('./bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://mellow-travesseiro-706987.netlify.app/'  // Replace with your actual Netlify URL
  }

));

const MONGO_URL = 
"mongodb+srv://ranjanirithu206:KS0pwc1jwcIxmZu0@cluster0.8mgcr.mongodb.net/MEAN?retryWrites=true&w=majority";

// MongoDB connection
mongoose.connect(MONGO_URL)
    //{ useNewUrlParser: true, useUnifiedTopology: true })
    //{
        //serverSelectionTimeoutMS: 30000,
    //})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Seed the database on server startup
const seedDatabase = async () => {
    try {
        await Book.deleteMany();
        const books = require('./data.json');
        await Book.insertMany(books);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();

// Routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
