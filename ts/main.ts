function $(element:string):any{
    return document.getElementById(element); 
}
window.onload = function() {
    let validatebtn:HTMLElement = $("validate");
    validatebtn.onclick = main;
    let resetbtn:HTMLElement = $("reset");
    resetbtn.onclick = clearAllErrors;
}

function main():void {
    let validForm:boolean = true; 
    if(!isTextPresent("first_name", "First name is required")) {
        validForm = false;
    }
    if(!isTextPresent("last_name", "Last name is required")) {
        validForm = false;
    }
    if(!isEmailValid()) {
        validForm = false;
    }
    if(!isPasswordValid()) {
        validForm = false;
    }
    if(!isPhoneNumberValid()) {
        validForm = false;
    }
    if (validForm) {
        $("submit").disabled = false;
    }
    else {
        $("submit").disabled = true;
    }
}

/**
 * Returns true if the textbox with the given id has a value, false otherwise.
 * @param id The id of the textbox to validate
 * @param errMsg The message to display in the span element next to the textbox
 */
function isTextPresent(id:string, errMsg:string):boolean {
    let txtBox:HTMLInputElement = $(id);
    let txtBoxValue:string = txtBox.value;
    let errSpan:HTMLElement = <HTMLElement>txtBox.nextElementSibling;
    if (txtBoxValue == "") {
        errSpan.innerText = errMsg;
        return false;
    }
    errSpan.innerText = "*";
    return true;
}

function isEmailValid():boolean {
    if (!isTextPresent("email", "Email is required")) {
        return false;
    }
    let emailBox:HTMLInputElement = $("email");
    let email:string = emailBox.value;
    let errSpan:HTMLElement = <HTMLElement>emailBox.nextElementSibling;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errSpan.innerText = "Invalid email";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}

function isPasswordValid():boolean {
    if(!isTextPresent("password", "Password is required")) {
        return false;
    }
    let passwordBox:HTMLInputElement = $("password");
    let password:string = passwordBox.value;
    let errSpan:HTMLElement = <HTMLElement>passwordBox.nextElementSibling;
    if (password.length < 6) {
        errSpan.innerText = "Password must be at least 6 characters";
        return false;
    }
    let passwordBox2:HTMLInputElement = $("verify");
    let password2:string = passwordBox2.value;
    if (password != password2) {
        errSpan.innerText = "Passwords don't match";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}

function isPhoneNumberValid():boolean {
    if (!isTextPresent("phone", "Phone number is required")) {
        return false;
    }
    let phoneBox:HTMLInputElement = $("phone");
    let phone:string = phoneBox.value;
    let errSpan:HTMLElement = <HTMLElement>phoneBox.nextElementSibling;
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        errSpan.innerText = "Invalid phone number";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}

function clearAllErrors():void {
    let allSpans = document.querySelectorAll("span");
    for (let i = 0; i < allSpans.length; i++) {
        let currSpan = allSpans[i];
        currSpan.innerText = "*";
    }
}