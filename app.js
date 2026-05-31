/* ==========================
   PASSWORD TOGGLE
========================== */

function togglePassword() {
    const password = document.getElementById("password");
    if (!password) return;

    password.type =
        password.type === "password"
            ? "text"
            : "password";
}

/* ==========================
   LOGIN HANDLER (SMOOTH)
========================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const loader = document.getElementById("loader");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username");
        const password = document.getElementById("password");

        let valid = true;

        if (!username.value.trim()) valid = false;
        if (!password.value.trim()) valid = false;

        if (!valid) {
            alert("Enter valid credentials");
            return;
        }

        // SHOW LOADER
        loader.classList.remove("hidden");

        // simulate API login (realistic delay)
        setTimeout(() => {

            // store session
            sessionStorage.setItem("paynest_user", username.value);

            // instant redirect (no flicker)
            window.location.replace("dashboard.html");

        }, 1200);
    });
});


/* ==========================
   DASHBOARD CHARTS
========================== */

if (document.getElementById("chart1")) {

    new Chart(document.getElementById("chart1"), {
        type: "line",
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun"],
            datasets: [{
                data: [10,20,15,30,25,40],
                borderColor: "#7C3AED",
                tension: 0.4
            }]
        }
    });

    new Chart(document.getElementById("chart2"), {
        type: "pie",
        data: {
            labels: ["Male","Female"],
            datasets: [{
                data: [60,40],
                backgroundColor: ["#7C3AED","#EC4899"]
            }]
        }
    });

    new Chart(document.getElementById("chart3"), {
        type: "bar",
        data: {
            labels: ["20-30","30-40","40-50"],
            datasets: [{
                data: [30,50,20],
                backgroundColor: "#7C3AED"
            }]
        }
    });

    new Chart(document.getElementById("chart4"), {
        type: "line",
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun"],
            datasets: [{
                data: [100,120,140,130,150,170],
                borderColor: "#EC4899"
            }]
        }
    });
}


/* ==========================
   LOGOUT FUNCTION
========================== */

function logout() {

    sessionStorage.removeItem("paynest_user");

    window.location.replace("index.html");
}
