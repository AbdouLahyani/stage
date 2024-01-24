function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

function signin() {
    let signupbtn = document.getElementById("signupbtn");
    let signinbtn = document.getElementById("signinbtn");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let repeatPassword = document.getElementById("repeatpassword");
    let title = document.getElementById("title");
    title.innerHTML = "Sign in";
    repeatPassword.style.maxHeight = "0";

}
function signup() {
    let signupbtn = document.getElementById("signupbtn");
    let signinbtn = document.getElementById("signinbtn");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let repeatPassword = document.getElementById("repeatpassword");
    let title = document.getElementById("title");
    title.innerHTML = "Sign up";
    repeatPassword.style.maxHeight = "65px";
}
function submit() {
    let title = document.getElementById("title").innerHTML;
}

console.log(document.getElementById("signupbtn"))
document.getElementById("form").addEventListener("submit", signup)
document.getElementById("form").addEventListener("submit", submit)
document.getElementById("swapbutton").addEventListener("click", function () {
    var signinbtn = document.getElementById("signinbtn");
    var signupbtn = document.getElementById("signupbtn");
    var repeatpassword = document.getElementById("repeatpassword");
    var title = document.getElementById("title");

    signinbtn.classList.toggle("hide");
    signupbtn.classList.toggle("show");
    repeatpassword.classList.toggle("hide");

    if (title.innerHTML === "Sign In") {
        title.innerHTML = "Sign Up";
        document.getElementById("swapbutton").value = "Sign In";
        document.getElementById("signupbtn").classList.toggle("hide");
        document.getElementById("signupbtn").innerHTML = "Sign in";
        document.getElementById("signinbtn").classList.toggle("show");
    } else {
        title.innerHTML = "Sign In";
        document.getElementById("swapbutton").value = "Sign Up";
        document.getElementById("signupbtn").innerHTML = "Sign up"
        document.getElementById("signupbtn").classList.toggle("hide");
        document.getElementById("signupbtn").classList.toggle("show");
    }

});
