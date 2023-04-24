function $(element) {
    return document.getElementById(element);
}
window.onload = function () {
    var validatebtn = $("validate");
    validatebtn.onclick = main;
    var resetbtn = $("reset");
    resetbtn.onclick = clearAllErrors;
};
function main() {
    var validForm = true;
    if (!isTextPresent("first_name", "First name is required")) {
        validForm = false;
    }
    if (!isTextPresent("last_name", "Last name is required")) {
        validForm = false;
    }
    if (!isEmailValid()) {
        validForm = false;
    }
    if (!isPasswordValid()) {
        validForm = false;
    }
    if (!isPhoneNumberValid()) {
        validForm = false;
    }
    if (validForm) {
        $("submit").disabled = false;
    }
    else {
        $("submit").disabled = true;
    }
}
function isTextPresent(id, errMsg) {
    var txtBox = $(id);
    var txtBoxValue = txtBox.value;
    var errSpan = txtBox.nextElementSibling;
    if (txtBoxValue == "") {
        errSpan.innerText = errMsg;
        return false;
    }
    errSpan.innerText = "*";
    return true;
}
function isEmailValid() {
    if (!isTextPresent("email", "Email is required")) {
        return false;
    }
    var emailBox = $("email");
    var email = emailBox.value;
    var errSpan = emailBox.nextElementSibling;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errSpan.innerText = "Invalid email";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}
function isPasswordValid() {
    if (!isTextPresent("password", "Password is required")) {
        return false;
    }
    var passwordBox = $("password");
    var password = passwordBox.value;
    var errSpan = passwordBox.nextElementSibling;
    if (password.length < 6) {
        errSpan.innerText = "Password must be at least 6 characters";
        return false;
    }
    var passwordBox2 = $("verify");
    var password2 = passwordBox2.value;
    if (password != password2) {
        errSpan.innerText = "Passwords don't match";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}
function isPhoneNumberValid() {
    if (!isTextPresent("phone", "Phone number is required")) {
        return false;
    }
    var phoneBox = $("phone");
    var phone = phoneBox.value;
    var errSpan = phoneBox.nextElementSibling;
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        errSpan.innerText = "Invalid phone number";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}
function clearAllErrors() {
    var allSpans = document.querySelectorAll("span");
    for (var i = 0; i < allSpans.length; i++) {
        var currSpan = allSpans[i];
        currSpan.innerText = "*";
    }
}
