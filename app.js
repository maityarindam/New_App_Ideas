/* ==========================
   PASSWORD TOGGLE
========================== */

function togglePassword() {

    const password =
        document.getElementById("password");

    if (!password) return;

    password.type =
        password.type === "password"
            ? "text"
            : "password";
}


/* ==========================
   LOGIN PAGE (FIXED + SMOOTH REDIRECT)
========================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.getElementById("loginForm");

        const loginBtn =
            document.getElementById("loginBtn");

        const loader =
            document.getElementById("loader");

        if (!loginForm) return;

        loginForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const username =
                    document.getElementById("username");

                const password =
                    document.getElementById("password");

                const usernameError =
                    document.getElementById("usernameError");

                const passwordError =
                    document.getElementById("passwordError");

                usernameError.textContent = "";
                passwordError.textContent = "";

                let valid = true;

                /* VALIDATION */

                if (username.value.trim() === "") {
                    usernameError.textContent =
                        "Please enter username";
                    valid = false;
                }

                if (password.value.trim() === "") {
                    passwordError.textContent =
                        "Please enter password";
                    valid = false;
                } else if (password.value.length < 8) {
                    passwordError.textContent =
                        "Password must be at least 8 characters";
                    valid = false;
                }

                if (!valid) return;

                /* BUTTON LOADING STATE */

                loginBtn.disabled = true;

                loginBtn.innerHTML =
                    `<span class="spinner"></span> Signing In...`;

                /* SHOW LOADER (IF EXISTS) */
                if (loader) {
                    loader.classList.remove("hidden");
                }

                /* SMOOTH REDIRECT */
                setTimeout(function () {

                    sessionStorage.setItem(
                        "paynest_user",
                        username.value
                    );

                    window.location.href =
                        "dashboard.html";

                }, 1200);
            }
        );
    }
);


/* ==========================
   FORGOT PASSWORD
========================== */

function sendResetLink() {

    const username =
        document.getElementById("forgotUsername");

    const email =
        document.getElementById("forgotEmail");

    if (!username || !email) return;

    if (username.value.trim() === "") {
        alert("Please enter username.");
        return;
    }

    if (email.value.trim() === "") {
        alert("Please enter registered email.");
        return;
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Password reset link sent successfully.");

    username.value = "";
    email.value = "";
}


/* ==========================
   LOGOUT
========================== */

function logout() {
    sessionStorage.clear();
    window.location.replace("index.html");
}


/* ==========================
   CHARTS
========================== */

if (document.getElementById("chart1")) {

    new Chart(document.getElementById("chart1"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                data: [10, 20, 15, 30, 40],
                borderColor: "#7c3aed"
            }]
        }
    });

    new Chart(document.getElementById("chart2"), {
        type: "pie",
        data: {
            labels: ["M", "F"],
            datasets: [{
                data: [60, 40],
                backgroundColor: ["#7c3aed", "#ec4899"]
            }]
        }
    });

    new Chart(document.getElementById("chart3"), {
        type: "bar",
        data: {
            labels: ["20", "30", "40"],
            datasets: [{
                data: [30, 50, 20],
                backgroundColor: "#7c3aed"
            }]
        }
    });

    new Chart(document.getElementById("chart4"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                data: [100, 120, 140, 130, 150],
                borderColor: "#ec4899"
            }]
        }
    });

    new Chart(document.getElementById("chart5"), {
        type: "bar",
        data: {
            labels: ["A", "B", "C"],
            datasets: [{
                data: [50, 70, 30],
                backgroundColor: "#7c3aed"
            }]
        }
    });
}
