const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const modal = document.getElementById("successModal");
const modalData = document.getElementById("modalData");
const closeModal = document.getElementById("closeModal");

let isValidForm = {
    username: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
};

function checkFormValidity() {
    const allValid = Object.values(isValidForm).every(val => val === true);
    submitBtn.disabled = !allValid;
}

function setSuccess(input) {
    const formControl = input.parentElement.parentElement;
    formControl.className = "form-control success";
    isValidForm[input.id] = true;
    checkFormValidity();
}

function setError(input, message) {
    const formControl = input.parentElement.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector(".error-msg");
    small.textContent = message;
    isValidForm[input.id] = false;
    checkFormValidity();
}

username.addEventListener("input", e => {
    const val = e.target.value.trim();
    if (val.length < 2 || val.length > 50) {
        setError(username, "Tên phải từ 2 đến 50 ký tự");
    } else {
        setSuccess(username);
    }
});

email.addEventListener("input", e => {
    const val = e.target.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
        setError(email, "Email không hợp lệ (vd: user@domain.com)");
    } else {
        setSuccess(email);
    }
});

phone.addEventListener("input", e => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    
    let formatted = val;
    if (val.length > 4) {
        formatted = val.slice(0, 4) + "-" + val.slice(4);
    }
    if (val.length > 7) {
        formatted = val.slice(0, 4) + "-" + val.slice(4, 7) + "-" + val.slice(7);
    }
    
    e.target.value = formatted;

    if (val.length !== 10) {
        setError(phone, "Số điện thoại phải đủ 10 số");
    } else {
        setSuccess(phone);
    }
});

password.addEventListener("input", e => {
    const val = e.target.value;
    let strength = 0;
    
    if (val.length >= 8) strength += 1;
    if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) strength += 1;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)) strength += 1;

    strengthBar.style.width = "0%";
    strengthBar.style.backgroundColor = "transparent";
    strengthText.textContent = "";
    strengthText.style.color = "inherit";

    if (val.length === 0) {
        setError(password, "Mật khẩu không được để trống");
        checkConfirmPassword();
        return;
    }

    if (strength === 0 || val.length < 8) {
        strengthBar.style.width = "33%";
        strengthBar.style.backgroundColor = "#e74c3c";
        strengthText.textContent = "Yếu";
        strengthText.style.color = "#e74c3c";
        setError(password, "Mật khẩu quá ngắn (dưới 8 ký tự)");
    } else if (strength === 2) {
        strengthBar.style.width = "66%";
        strengthBar.style.backgroundColor = "#f1c40f";
        strengthText.textContent = "Trung bình";
        strengthText.style.color = "#f39c12";
        setSuccess(password);
    } else if (strength >= 3) {
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "#2ecc71";
        strengthText.textContent = "Mạnh";
        strengthText.style.color = "#2ecc71";
        setSuccess(password);
    }

    checkConfirmPassword();
});

confirmPassword.addEventListener("input", checkConfirmPassword);

function checkConfirmPassword() {
    const pwd = password.value;
    const cpwd = confirmPassword.value;
    
    if (cpwd === "") {
        setError(confirmPassword, "Vui lòng xác nhận mật khẩu");
    } else if (pwd !== cpwd) {
        setError(confirmPassword, "Mật khẩu không khớp");
    } else {
        setSuccess(confirmPassword);
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    if (!submitBtn.disabled) {
        modalData.innerHTML = `
            <strong>Name:</strong> ${username.value.trim()}<br>
            <strong>Email:</strong> ${email.value.trim()}<br>
            <strong>Phone:</strong> ${phone.value}
        `;
        modal.classList.add("active");
    }
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    form.reset();
    document.querySelectorAll(".form-control").forEach(ctrl => {
        ctrl.className = "form-control";
    });
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
    for(let key in isValidForm) isValidForm[key] = false;
    checkFormValidity();
});
