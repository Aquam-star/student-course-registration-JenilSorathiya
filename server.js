const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Import Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');

// 🔹 Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollmentRoutes);

// 🔹 Test Route
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

// 🔹 MongoDB Connection (UPDATED + DEBUG)
mongoose.connect('mongodb://localhost:27017/studentDB')
.then(() => {
    console.log('MongoDB Connected ✅');
})
.catch((err) => {
    console.error('MongoDB Error ❌:', err.message);
});

// 🔹 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found ❌' });
});

// 🔹 Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🔥`);
});