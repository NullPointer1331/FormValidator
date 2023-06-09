class Person {
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    password:string;
}

function $(element:string):any{
    return document.getElementById(element); 
}
window.onload = function() {
    let submitbtn:HTMLElement = $("submit");
    submitbtn.onclick = main;
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
        let newPerson:Person = getPerson();
        displayPerson(newPerson);
    }
}

/**
 * Displays the given Person object on the web page
 * @param person The Person object to display
*/
function displayPerson(person:Person):void {
    let displayDiv = $("display");
    let personHeading = document.createElement("h2");
    personHeading.innerText = person.firstName + " " + person.lastName;
    displayDiv.appendChild(personHeading);
    let personInfo = document.createElement("p");
    personInfo.innerHTML = "Email: " + person.email + "<br>Phone Number: " + person.phoneNumber + "<br>Password: " + person.password;
    displayDiv.appendChild(personInfo);
}

/**
 * @returns A Person object created from the values of the form
 */
function getPerson():Person {
    let newPerson:Person = new Person();
    newPerson.firstName = $("first_name").value;
    newPerson.lastName = $("last_name").value;
    newPerson.email = $("email").value;
    newPerson.phoneNumber = $("phone").value;
    newPerson.password = $("password").value;
    return newPerson;
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

/**
 * @returns True if the email is valid, false otherwise
 */
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

/**
 * @returns True if the password is valid, false otherwise
 */
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

/**
 * @returns True if the phone number is valid, false otherwise
 */
function isPhoneNumberValid():boolean {
    if (!isTextPresent("phone", "Phone number is required")) {
        return false;
    }
    let phoneBox:HTMLInputElement = $("phone");
    let phone:string = phoneBox.value;
    let errSpan:HTMLElement = <HTMLElement>phoneBox.nextElementSibling;
    if (!/^\d{3}-\d{3}-\d{4}$/.test(phone) && !/^\d{10}$/.test(phone)) {
        errSpan.innerText = "Invalid phone number";
        return false;
    }
    errSpan.innerText = "*";
    return true;
}

/**
 * Resets all spans back to the default text
 */
function clearAllErrors():void {
    let allSpans = document.querySelectorAll("span");
    for (let i = 0; i < allSpans.length; i++) {
        let currSpan = allSpans[i];
        currSpan.innerText = "*";
    }
}