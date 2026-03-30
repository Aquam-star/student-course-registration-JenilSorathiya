const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// REGISTER
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const user = new Student({ name, email, password });
    await user.save();

    res.json({ message: 'User registered successfully' });
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Student.findOne({ email, password });

    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;