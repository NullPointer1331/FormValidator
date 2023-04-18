function $(element) {
    return document.getElementById(element);
}
window.onload = function () {
    var formbtn = $("form > button");
    formbtn.onclick = main;
};
function main() {
    isTextPresent("first_name", "First name is required");
    isTextPresent("last_name", "Last name is required");
}
function isTextPresent(id, errMsg) {
    var txtBox = $(id);
    var txtBoxValue = txtBox.value;
    if (txtBoxValue == "") {
        var errSpan = txtBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}
function isEmailValid() {
    var emailBox = $("email");
    var email = emailBox.value;
    if (email == "") {
        var errSpan = emailBox.nextElementSibling;
        errSpan.innerText = "Email is required";
        return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        var errSpan = emailBox.nextElementSibling;
        errSpan.innerText = "Invalid email";
        return false;
    }
    return true;
}
