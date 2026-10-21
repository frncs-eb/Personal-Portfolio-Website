document.addEventListener('DOMContentLoaded', function() {
    // --- Login & Registration (index.js) ---
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const goToLogin = document.getElementById('goToLogin');
    const goToRegister = document.getElementById('goToRegister');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const loginContainer = document.getElementById('login');
    const registerContainer = document.getElementById('register');
    const loadingScreen = document.getElementById('loading-screen');

    function showLoginForm() {
        loginContainer.style.left = '4px';
        registerContainer.style.right = '-520px';
        loginBtn.classList.add('white-btn');
        registerBtn.classList.remove('white-btn');
        loginContainer.style.opacity = '1';
        registerContainer.style.opacity = '0';
    }

    function showRegisterForm() {
        loginContainer.style.left = '-510px';
        registerContainer.style.right = '5px';
        loginBtn.classList.remove('white-btn');
        registerBtn.classList.add('white-btn');
        loginContainer.style.opacity = '0';
        registerContainer.style.opacity = '1';
    }

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('responsive');
    });

    loginBtn.addEventListener('click', showLoginForm);
    registerBtn.addEventListener('click', showRegisterForm);
    goToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginForm();
    });
    goToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        showRegisterForm();
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[placeholder="Username or Email"]');
        const passwordInput = this.querySelector('input[placeholder="Password"]');

        if (emailInput && passwordInput) {
            const email = emailInput.value.toLowerCase(); // Convert to lowercase
            const password = passwordInput.value;
            try {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                console.log("Login Attempt:", { email, password });
                console.log("Stored Users (Login):", users);

                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    alert('Login successful!');
                    if (loadingScreen) {
                        loadingScreen.classList.add('active');
                        setTimeout(() => {
                            window.location.href = 'home.html';
                        }, 1000);
                    } else {
                        window.location.href = 'home.html';
                    }
                } else {
                    alert('Invalid credentials!');
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert('An error occurred during login. Please try again.');
            }
        } else {
            console.error('Email or password input not found in the login form.');
        }
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const firstnameInput = this.querySelector('input[placeholder="Firstname"]');
        const lastnameInput = this.querySelector('input[placeholder="Lastname"]');
        const emailInput = this.querySelector('input[placeholder="Email"]');
        const passwordInput = this.querySelector('input[placeholder="Password"]');

        if (firstnameInput && lastnameInput && emailInput && passwordInput) {
            const email = emailInput.value.toLowerCase(); // Convert to lowercase
            const password = passwordInput.value;
            const userData = {
                firstName: firstnameInput.value,
                lastName: lastnameInput.value,
                email: email, 
                password: password
            };

            if (Object.values(userData).some(v => !v)) {
                return alert('Please fill all fields');
            }
            if (userData.password.length < 6) {
                return alert('Password needs 6+ characters');
            }
            try{
                const users = JSON.parse(localStorage.getItem('users')) || [];
                console.log("Registering User:", userData);
                if (users.some(u => u.email === userData.email)) {
                    return alert('Email already exists');
                }
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful! Please login.');
                showLoginForm();
            } catch(error){
                console.error("Error during registration", error);
                alert('An error occurred during registration. Please try again.');
            }
        } else {
            console.error('One or more input fields not found in the registration form.');
        }
    });

    showLoginForm();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            const confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                window.location.href = '../HTML/index.html';
            } else {
                alert("Logout cancelled.");
            }
        });
    }
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[placeholder="Username or Email"]');
    const passwordInput = this.querySelector('input[placeholder="Password"]');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    if (emailInput && passwordInput) {
        const enteredEmail = emailInput.value.toLowerCase();
        const password = passwordInput.value;
        try {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            console.log("Login Attempt:", { email: enteredEmail, password: password });
            console.log("Stored Users (Login):", users);

            const user = users.find(u => u.email.toLowerCase() === enteredEmail && u.password === password);

            if (user) {
                console.log("Login successful for user:", user);
                alert('Login successful!');
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberedEmail', enteredEmail);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                if (loadingScreen) {
                    loadingScreen.classList.add('active');
                    setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 1000);
                } else {
                    window.location.href = 'home.html';
                }
            } else {
                console.log("Login failed for email:", enteredEmail);
                alert('Invalid credentials!');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert('An error occurred during login. Please try again.');
        }
    } else {
        console.error('Email or password input not found in the login form.');
    }
});
