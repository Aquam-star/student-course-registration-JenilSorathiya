const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// 🔹 Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
});

// 🔹 Add single course
router.post('/add', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.json({ message: 'Course added ✅', course });
    } catch (error) {
        res.status(500).json({ message: 'Error adding course', error });
    }
});

// 🔹 Add multiple dummy courses
router.get('/seed', async (req, res) => {
    try {
        await Course.deleteMany(); // clear old data

        const courses = [
            { title: "Web Development", instructor: "John Doe", credits: 3 },
            { title: "Data Structures", instructor: "Jane Smith", credits: 4 },
            { title: "Machine Learning", instructor: "Andrew Ng", credits: 3 },
            { title: "Database Systems", instructor: "Michael Scott", credits: 3 }
        ];

        await Course.insertMany(courses);

        res.json({ message: "Dummy courses added ✅", courses });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding courses', error });
    }
});

module.exports = router;