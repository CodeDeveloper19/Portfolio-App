const EYE = document.getElementById("eye");
const EYE1 = document.getElementById("eye4");
const EYE2 = document.getElementById("eye6");

const PASSWORD = document.getElementById("password");
const PASSWORD1 = document.getElementById("newpassword");
const PASSWORD2 = document.getElementById("confirmpassword");

const SIGNUP = document.getElementById("sign-up");
const SIGNIN = document.getElementById("sign-in");
const FORM1 = document.getElementById("form1");
const CREATEBUTTON = document.getElementById("create-btn");
const LOGIN = document.getElementById("login");

const emailAddress =  document.getElementById("emailaddress");
const firstName =  document.getElementById("firstname");
const lastName =  document.getElementById("lastname");
const userName =  document.getElementById("username");

/********Controls the Password Visibility************* */
const EYES = [EYE, EYE1, EYE2];
const PASSWORDS = [PASSWORD, PASSWORD1, PASSWORD2];

let value;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuSoD8mLN0DCSWxMtD22qMU1OTquJBaPs",
    authDomain: "myportfolio-app-da38a.firebaseapp.com",
    projectId: "myportfolio-app-da38a",
    storageBucket: "myportfolio-app-da38a.appspot.com",
    messagingSenderId: "401715412547",
    appId: "1:401715412547:web:70fa0a3cc875b207a71ef6",
    measurementId: "G-SFSYHQRY3T"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();



const passwordVisibility = () => {
    if (EYES[value].classList[1] == "fa-eye-slash"){
        EYES[value].classList.replace("fa-eye-slash", "fa-eye");
        PASSWORDS[value].type = "text";
    } else {
        EYES[value].classList.replace("fa-eye", "fa-eye-slash");
        PASSWORDS[value].type = "password";
    }
}

EYE.addEventListener("click", () => {
    value = 0;
    passwordVisibility();
})

EYE1.addEventListener("click", () => {
    value = 1;
    passwordVisibility();
})

EYE2.addEventListener("click", () => {
    value = 2;
    passwordVisibility();
})

/****************************************************** */


const clearForm = () => {
    document.getElementById("error5").textContent = "";
    document.getElementById("error4").textContent = "";
    document.getElementById("error3").textContent = "";
    document.getElementById("error2").textContent = "";
    document.getElementById("error1").textContent = "";
}

const clearInputFields = () => {
    PASSWORD.value = "";
    PASSWORD1.value = "";
    PASSWORD2.value = "";
    emailAddress.value = "";
    firstName.value = "";
    lastName.value = "";
    userName.value = "";
}


/* Event Listeners for Signup, Login, and create buttons */
CREATEBUTTON.addEventListener("click", (event) => {
    clearForm();

    let purifiedPASSWORD1 = DOMPurify.sanitize(PASSWORD1.value);
    let purifiedPASSWORD2 = DOMPurify.sanitize(PASSWORD2.value);
    let purifiedEmailAddress = DOMPurify.sanitize(emailAddress.value);
    let purifiedFirstName = DOMPurify.sanitize(firstName.value);
    let purifiedLastName = DOMPurify.sanitize(lastName.value);

    if (purifiedEmailAddress && purifiedFirstName && purifiedLastName && purifiedPASSWORD1 && purifiedPASSWORD2){
        if (purifiedPASSWORD1 == purifiedPASSWORD2 && purifiedPASSWORD1.length >= 8){
            let email = purifiedEmailAddress;
            let password = purifiedPASSWORD1;
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode} error, ${errorMessage}`)
            });
        } else if (purifiedPASSWORD1 != purifiedPASSWORD2 && purifiedPASSWORD1.length >= 8) {
            event.preventDefault();
            document.getElementById("error5").textContent = "*The two passwords do not match each other*";
        } else if (purifiedPASSWORD1.length < 8) {
            event.preventDefault();
            document.getElementById("error4").textContent = "Password is less than 8 digits*";
        }
    }
})

SIGNUP.addEventListener("click", () => {
    clearForm();
    clearInputFields();

    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "flex";
})

SIGNIN.addEventListener("click", () => {
    clearForm();
    clearInputFields();

    document.getElementById("form1").style.display = "flex";
    document.getElementById("form2").style.display = "none";
})

LOGIN.addEventListener("click", () => {
    let purifiedUserName = DOMPurify.sanitize(userName.value);
    let purifiedPASSWORD = DOMPurify.sanitize(PASSWORD.value);
})
/****************************************************************/

//   signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });