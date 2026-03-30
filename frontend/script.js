const API = "http://localhost:5000/api";

// 🔹 Get logged-in user
function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

// 🔹 Show welcome message
window.onload = function () {
    const user = getUser();
    if (document.getElementById("welcome") && user) {
        document.getElementById("welcome").innerText =
            `Welcome, ${user.name} 👋`;
    }
};

// 🔹 Signup
function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("⚠️ Fill all fields");
        return;
    }

    fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ " + data.message);
        window.location.href = "login.html";
    })
    .catch(() => alert("❌ Signup failed"));
}

// 🔹 Login
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("⚠️ Fill all fields");
        return;
    }

    fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("✅ Login successful");
            window.location.href = "index.html";
        } else {
            alert("❌ Invalid credentials");
        }
    })
    .catch(() => alert("❌ Login error"));
}

// 🔹 Load Courses
function loadCourses() {
    fetch(`${API}/courses`)
    .then(res => res.json())
    .then(data => {
        let html = "";

        data.forEach(course => {
            html += `
                <div class="card">
                    <h3>${course.title}</h3>
                    <p><strong>Instructor:</strong> ${course.instructor}</p>
                    <p><strong>Credits:</strong> ${course.credits}</p>
                    <button onclick="enroll('${course._id}')">Enroll</button>
                </div>
            `;
        });

        document.getElementById("courses").innerHTML = html;
    })
    .catch(() => {
        document.getElementById("courses").innerHTML =
            "<p style='color:red'>❌ Failed to load courses</p>";
    });
}

// 🔹 Enroll (FIXED)
function enroll(courseId) {
    const user = getUser();

    if (!user) {
        alert("⚠️ Please login first");
        window.location.href = "login.html";
        return;
    }

    fetch(`${API}/enroll/enroll`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentId: user._id,
            courseId: courseId
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Enroll response:", data);
        alert("✅ Enrolled successfully!");
    })
    .catch(err => {
        console.error(err);
        alert("❌ Enrollment failed");
    });
}

// 🔹 Logout
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}