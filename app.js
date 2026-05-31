/* ==========================
   PASSWORD TOGGLE
========================== */

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

/* ==========================
   LOGIN PAGE
========================== */

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

                /* Username */

                if (
                    username.value.trim() === ""
                ) {

                    usernameError.textContent =
                        "Please enter username";

                    valid = false;
                }

                /* Password */

                if (
                    password.value.trim() === ""
                ) {

                    passwordError.textContent =
                        "Please enter password";

                    valid = false;

                } else if (
                    password.value.length < 8
                ) {

                    passwordError.textContent =
                        "Password must be at least 8 characters";

                    valid = false;
                }

                if (!valid) return;

                const btn =
                    document.getElementById("loginBtn");

                btn.disabled = true;

                btn.innerHTML =
                    `<span class="spinner"></span> Signing In...`;

                setTimeout(function () {

                    alert(
                        "Login successful. Dashboard will be available in Phase 2."
                    );

                    btn.disabled = false;

                    btn.innerHTML =
                        `
                        <span>Sign In</span>
                        <span class="arrow">→</span>
                        `;

                }, 1800);
            }
        );
    }
);

/* ==========================
   FORGOT PASSWORD
========================== */

function sendResetLink() {

    const username =
        document.getElementById(
            "forgotUsername"
        );

    const email =
        document.getElementById(
            "forgotEmail"
        );

    if (
        !username ||
        !email
    ) return;

    if (
        username.value.trim() === ""
    ) {

        alert(
            "Please enter username."
        );

        return;
    }

    if (
        email.value.trim() === ""
    ) {

        alert(
            "Please enter registered email."
        );

        return;
    }

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        !emailRegex.test(
            email.value.trim()
        )
    ) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }

    alert(
        "Password reset link sent successfully."
    );

    username.value = "";
    email.value = "";
}
