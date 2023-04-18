function $(element:string):any{
    return document.getElementById(element); 
}
window.onload = function() {
    let formbtn = $("form > button");
    formbtn.onclick = main;
}

function main():void {
    let validForm:boolean = (isTextPresent("first_name", "First name is required") &&
    isTextPresent("last_name", "Last name is required") &&
    isEmailValid() &&
    isPasswordValid() &&
    isPhoneNumberValid());
    if (validForm) {
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
    if (txtBoxValue == "") {
        let errSpan:HTMLElement = <HTMLElement>txtBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}

function isEmailValid():boolean {
    if (!isTextPresent("email", "Email is required")) {
        return false;
    }
    let emailBox:HTMLInputElement = $("email");
    let email:string = emailBox.value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let errSpan:HTMLElement = <HTMLElement>emailBox.nextElementSibling;
        errSpan.innerText = "Invalid email";
        return false;
    }
    return true;
}

function isPasswordValid():boolean {
    if(!isTextPresent("password", "Password is required")) {
        return false;
    }
    let passwordBox:HTMLInputElement = $("password");
    let password:string = passwordBox.value;
    if (password.length < 6) {
        let errSpan:HTMLElement = <HTMLElement>passwordBox.nextElementSibling;
        errSpan.innerText = "Password must be at least 6 characters";
        return false;
    }
    let passwordBox2:HTMLInputElement = $("verify");
    let password2:string = passwordBox2.value;
    if (password != password2) {
        let errSpan:HTMLElement = <HTMLElement>passwordBox.nextElementSibling;
        errSpan.innerText = "Passwords don't match";
        return false;
    }
    return true;
}

function isPhoneNumberValid():boolean {
    if (!isTextPresent("phone", "Phone number is required")) {
        return false;
    }
    let phoneBox:HTMLInputElement = $("phone");
    let phone:string = phoneBox.value;
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        let errSpan:HTMLElement = <HTMLElement>phoneBox.nextElementSibling;
        errSpan.innerText = "Invalid phone number";
        return false;
    }
    return true;
}