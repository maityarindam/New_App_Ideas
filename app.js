/* ==========================
   PAYNEST APP.JS - FINAL CLEAN VERSION
========================== */


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
   LOGIN HANDLER
========================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const loader = document.getElementById("loader");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const username = document.getElementById("username");
            const password = document.getElementById("password");

            /* ALERT STYLE VALIDATION (RESTORED) */

            if (username.value.trim() === "") {
                alert("Enter username");
                return;
            }

            if (password.value.trim() === "") {
                alert("Enter password");
                return;
            }

            if (password.value.length < 8) {
                alert("Password must be at least 8 characters");
                return;
            }

            /* SHOW LOADER */
            if (loader) loader.classList.remove("hidden");

            setTimeout(() => {

                sessionStorage.setItem("paynest_user", username.value);

                window.location.replace("dashboard.html");

            }, 1200);
        });
    }


    /* ==========================
       FORGOT PASSWORD HANDLER (FIXED)
    ========================== */

    const resetBtn = document.getElementById("resetBtn");

    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            const username =
                document.getElementById("forgotUsername");

            const email =
                document.getElementById("forgotEmail");

            if (!username || !email) return;

            /* ALERT STYLE VALIDATION (RESTORED) */

            if (username.value.trim() === "") {
                alert("Enter username");
                return;
            }

            if (email.value.trim() === "") {
                alert("Enter email");
                return;
            }

            /* EMAIL FORMAT CHECK */
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email.value.trim())) {
                alert("Enter valid email");
                return;
            }

            alert("Reset link sent successfully.");
        });
    }
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

    sessionStorage.clear();

    window.location.replace("index.html");
}
