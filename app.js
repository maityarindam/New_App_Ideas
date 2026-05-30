function togglePassword(){

    const password =
        document.getElementById("password");

    if(password.type === "password"){
        password.type = "text";
    }
    else{
        password.type = "password";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const form =
            document.getElementById("loginForm");

        if(!form) return;

        form.addEventListener(
            "submit",
            function(e){

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

                if(username.value.trim()===""){
                    usernameError.textContent =
                        "Username is required";
                    valid = false;
                }

                if(password.value.trim()===""){
                    passwordError.textContent =
                        "Password is required";
                    valid = false;
                }

                if(valid){

                    const btn =
                        document.getElementById("loginBtn");

                    btn.innerHTML =
                        "Signing In...";

                    btn.disabled = true;

                    setTimeout(function(){

                        alert(
                            "Dashboard page coming next."
                        );

                        btn.innerHTML =
                            "Sign In";

                        btn.disabled = false;

                    },1500);
                }
            }
        );
    }
);
