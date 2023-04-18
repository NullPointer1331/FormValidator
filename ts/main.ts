function $(element:string):any{
    return document.getElementById(element); 
}
window.onload = function() {
    let formbtn = $("form > button");
    formbtn.onclick = main;
}

function main():void {
    isTextPresent("first_name", "First name is required");
    isTextPresent("last_name", "Last name is required");
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
    let emailBox:HTMLInputElement = $("email");
    let email:string = emailBox.value;
    if (email == "") {
        let errSpan:HTMLElement = <HTMLElement>emailBox.nextElementSibling;
        errSpan.innerText = "Email is required";
        return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        let errSpan:HTMLElement = <HTMLElement>emailBox.nextElementSibling;
        errSpan.innerText = "Invalid email";
        return false;
    }
    return true;
}
