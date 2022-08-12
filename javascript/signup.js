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

const errorTitle = document.getElementById("error-title");
const errorMessage = document.getElementById("error-message");

/********Controls the Password Visibility************* */
const EYES = [EYE, EYE1, EYE2];
const PASSWORDS = [PASSWORD, PASSWORD1, PASSWORD2];

let value;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

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

const signInSuccess = () => {           
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Success!";
    errorMessage.textContent = "You have logged in successfully";
    document.getElementById("main-message").style.backgroundColor = "#98fb98";
    document.getElementById("message-icon").src = "./images/done.gif";
}

const signInError = (errorCode) => {           
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Error";
    switch(errorCode){
        case "auth/wrong-password": 
            errorMessage.textContent = "Password provided is wrong";
            break;
        
        case "auth/invalid-email":
            errorMessage.textContent = "Email Address is invalid";
            break;

        case "auth/user-not-found":
            errorMessage.textContent = "Email address/password is invalid";
            break;

        case "auth/too-many-requests":
            errorMessage.textContent = "Avoid logging in repeatedly!";
            break;   
            
        case "auth/internal-error":
            errorMessage.textContent = "Check your email and password inputs";
            break;
        
        default:
            errorMessage.textContent = "Contact customer service for help";
    }
    document.getElementById("main-message").style.backgroundColor = "#FBCEB1";
    document.getElementById("message-icon").src = "./images/error.gif";
}

const signUpSuccess = () => {           
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Success";
    errorMessage.textContent = "You have signed up successfully";
    document.getElementById("main-message").style.backgroundColor = "#98fb98";
    document.getElementById("message-icon").src = "./images/done.gif";
}

const ResetError = (errorCode) => {           
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Error";
    switch(errorCode){
        case "auth/invalid-email":
            errorMessage.textContent = "Email Address is invalid";
            break;

    case "auth/user-not-found":
        errorMessage.textContent = "Email address does not exist";
        break;
        
        default:
            errorMessage.textContent = "Contact customer service for help";
    }
    document.getElementById("main-message").style.backgroundColor = "#FBCEB1";
    document.getElementById("message-icon").src = "./images/error.gif";
}

const signUpError = (errorCode) => {           
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Error";
    switch(errorCode){
        case "auth/email-already-in-use": 
            errorMessage.textContent = "Email Address has already been taken";
            break;
        
        case "auth/invalid-email":
            errorMessage.textContent = "Email Address is invalid";
            break;

        case "auth/too-many-requests":
            errorMessage.textContent = "Avoid logging in repeatedly!";
            break;  
        
        default:
            errorMessage.textContent = "Contact customer service for help";
    }
    document.getElementById("main-message").style.backgroundColor = "#FBCEB1";
    document.getElementById("message-icon").src = "./images/error.gif";
}

const emailVerification = () => {           
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Update";
    errorMessage.textContent = "Please verify your email address";
    document.getElementById("main-message").style.backgroundColor = "#6082B6";
    document.getElementById("message-icon").src = "./images/approval.gif";
}


const signIn = () => {
    clearForm();
    clearInputFields();

    document.getElementById("form1").style.display = "flex";
    document.getElementById("form2").style.display = "none";
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
        event.preventDefault();
        if (purifiedPASSWORD1 == purifiedPASSWORD2 && purifiedPASSWORD1.length >= 8){
            let email = purifiedEmailAddress;
            let password = purifiedPASSWORD1;

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                signUpSuccess();
                
                sendEmailVerification(auth.currentUser)
                .then(() => {
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                signUpError(errorCode);
            });
        } else if (purifiedPASSWORD1 != purifiedPASSWORD2 && purifiedPASSWORD1.length >= 8) {
            document.getElementById("message").style.display = "flex";
            errorTitle.textContent = "Error";
            errorMessage.textContent = "The two passwords do not match each other";
            document.getElementById("main-message").style.backgroundColor = "#FBCEB1";
            document.getElementById("message-icon").src = "./images/error.gif";
        } else if (purifiedPASSWORD1.length < 8) {
            document.getElementById("message").style.display = "flex";
            errorTitle.textContent = "Error";
            errorMessage.textContent = "Password is less than 8 digits";
            document.getElementById("main-message").style.backgroundColor = "#FBCEB1";
            document.getElementById("message-icon").src = "./images/error.gif";
        }
    }
})

SIGNUP.addEventListener("click", () => {
    clearForm();
    clearInputFields();

    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "flex";
})

document.getElementById("create-account").addEventListener("click", () => {
    clearForm();
    clearInputFields();

    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "flex";
    document.getElementById("forgot-section").style.display = "none";
})

document.getElementById("forgot").addEventListener("click", () => {
    clearForm();
    clearInputFields();

    document.getElementById("forgot-section").style.display = "flex";
    document.getElementById("forgotten-email").value = "";
})

document.getElementById("go-back").addEventListener("click", () => {
    document.getElementById("forgot-section").style.display = "none";
})

document.getElementById("reset-password").addEventListener("click", () => {
    let purifiedEmailAddress = document.getElementById("forgotten-email").value;

    let email = purifiedEmailAddress;

    sendPasswordResetEmail(auth, email)
  .then(() => {
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Success";
    errorMessage.textContent = "We have sent an email for a password reset";
    document.getElementById("main-message").style.backgroundColor = "#98fb98";
    document.getElementById("message-icon").src = "./images/done.gif";
  })
  .catch((error) => {
    const errorCode = error.code;
    ResetError(errorCode);
  });
})

SIGNIN.addEventListener("click", () => {
    signIn();
})

LOGIN.addEventListener("click", () => {
    event.preventDefault();
    let purifiedUserName = DOMPurify.sanitize(userName.value);
    let purifiedPASSWORD = DOMPurify.sanitize(PASSWORD.value);

    let email = purifiedUserName;
    let password = purifiedPASSWORD;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        signInSuccess();
    })
    .catch((error) => {
        const errorCode = error.code;
        signInError(errorCode);
    });
})

document.getElementById("close-error").addEventListener("click", () => {
    document.getElementById("message").style.display = "none";

    if (errorTitle.innerHTML == "Success" && errorMessage.textContent == "You have signed up successfully"){
        signIn();
        setTimeout(emailVerification, 1000)
    }
    
    if (errorTitle.innerHTML == "Success" && errorMessage.textContent == "We have sent an email for a password reset"){
        document.getElementById("message").style.display = "none";
        document.getElementById("forgot-section").style.display = "none";
    }
})
/****************************************************************/