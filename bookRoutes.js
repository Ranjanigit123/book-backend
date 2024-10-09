//bookRoutes.js

const express = require('express');
const Book = require('./book');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500)
            .json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
