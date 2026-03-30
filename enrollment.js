const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// 🔹 Enroll in a course
router.post('/enroll', async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        // 🔍 Check if already enrolled
        const existing = await Enrollment.findOne({ studentId, courseId });

        if (existing) {
            return res.json({ message: 'Already enrolled ⚠️' });
        }

        // ✅ Create new enrollment
        const enrollment = new Enrollment({
            studentId,
            courseId
        });

        await enrollment.save();

        res.json({ message: 'Enrolled successfully ✅' });

    } catch (error) {
        console.error("Enrollment Error:", error);
        res.status(500).json({ message: 'Error enrolling ❌' });
    }
});

// 🔹 Get enrolled courses for a student
router.get('/:studentId', async (req, res) => {
    try {
        const data = await Enrollment.find({
            studentId: req.params.studentId
        });

        res.json(data);

    } catch (error) {
        console.error("Fetch Enrollment Error:", error);
        res.status(500).json({ message: 'Error fetching enrollments ❌' });
    }
});

module.exports = router;