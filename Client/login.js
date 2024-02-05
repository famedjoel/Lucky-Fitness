    const tabBtn = document.querySelectorAll(".loginTab h1");
    const tab = document.querySelectorAll(".tab");
    function tabs(panelIndex) {
        tab.forEach(function(node) {
            node.style.display = "none";
        });
        tab[panelIndex].style.display = "block";
    }
    tabs(0);



    const inputFile = document.querySelector("#file");
    const filename =  document.querySelector("#filename");

    function btnfile() {
        inputFile.click();
    }
    inputFile.addEventListener("change", () => {
        if (inputFile.value) {
            filename.innerHTML = 
            inputFile.value.match(/[\/\\]([\w\d\s.\-()]+)$/)[1];
        }
        else{
            inputFile.innerHTML = "No Files Chosen";
        }
    })



    function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    const toggleIcon = document.getElementById('toggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}




    // Add this function to handle storing login state
function rememberLogin() {
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const emailInput = document.querySelector('input[type="text"]');
    const passwordInput = document.getElementById('passwordInput');

    if (rememberMeCheckbox.checked) {
        // Store email and password in local storage
        localStorage.setItem('rememberedEmail', emailInput.value);
        localStorage.setItem('rememberedPassword', passwordInput.value);
    } else {
        // Clear stored email and password
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
    }
}

// Modify your login function to use stored credentials if available
function login() {
    // Your existing login logic here

    // Check if "Remember Me" is checked and store login state
    rememberLogin();
}




    const passwordInput = document.getElementById('passwordInput');
const passwordStrength = document.getElementById('passwordStrength');

passwordInput.addEventListener('input', updatePasswordStrength);

function updatePasswordStrength() {
    const password = passwordInput.value;
    const strength = calculatePasswordStrength(password);

    passwordStrength.textContent = getPasswordStrengthLabel(strength);
    passwordStrength.className = 'password-strength';
    passwordStrength.classList.add(getPasswordStrengthClass(strength));
}

function calculatePasswordStrength(password) {
    // Implement your own logic to calculate password strength
    // For simplicity, let's assume a basic length-based strength
    if (password.length < 6) {
        return 0; // Weak
    } else if (password.length < 10) {
        return 1; // Medium
    } else {
        return 2; // Strong
    }
}

function getPasswordStrengthLabel(strength) {
    const labels = ['Weak', 'Medium', 'Strong'];
    return labels[strength];
}

function getPasswordStrengthClass(strength) {
    const classes = ['weak', 'medium', 'strong'];
    return classes[strength];
}

