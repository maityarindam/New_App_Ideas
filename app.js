// ======================
// SHOW / HIDE PASSWORD
// ======================

function togglePassword() {

    const password =
        document.getElementById("password");

    if (!password) return;

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

// ======================
// LOGIN VALIDATION
// ======================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loginForm =
            document.getElementById("loginForm");

        if (!loginForm) return;

        loginForm.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                let valid = true;

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

                if (username.value.trim() === "") {

                    usernameError.textContent =
                        "Username is required";

                    valid = false;
                }

                if (password.value.trim() === "") {

                    passwordError.textContent =
                        "Password is required";

                    valid = false;
                }

                if (
                    password.value.trim() !== "" &&
                    password.value.length < 8
                ) {

                    passwordError.textContent =
                        "Password must be at least 8 characters";

                    valid = false;
                }

                if (valid) {

                    const btn =
                        document.getElementById("loginBtn");

                    btn.disabled = true;

                    btn.innerHTML =
                        "⏳ Signing In...";

                    setTimeout(function () {

                        alert(
                            "Login successful. Dashboard coming in Phase 2."
                        );

                        btn.disabled = false;

                        btn.innerHTML =
                            "Sign In";

                    }, 1500);
                }
            }
        );
    }
);

// ======================
// FORGOT PASSWORD
// ======================

function sendResetLink() {

    const username =
        document.getElementById("forgotUsername");

    const email =
        document.getElementById("forgotEmail");

    if (
        !username.value.trim() ||
        !email.value.trim()
    ) {

        alert(
            "Please enter username and registered email."
        );

        return;
    }

    alert(
        "Password reset link has been sent."
    );
}
