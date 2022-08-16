# Portfolio-App <a id="id-title"></a>

This is a full-detailed documentation of how myPortfolio login/sign-up page was built along with how it works.

## Table of Content <a id="id-tableofcontent"></a>

- [Title](#id-title)
- [Table of Content](#id-tableofcontent)
- [Project Description](#id-projectdescription)
- [Live Website Link](#id-livewebsitelink)
- [Languages, Tools, and Libraries used](#id-used)
- [Features and Implementation](#id-features)
  - [User Authentication](#id-userauth)
  - [Signing Up](#id-signup)
    - [Sign-up Errors and Success](#id-signuperror)
    - [Email Address Verification](#id-emailaddress)
  - [Signing In](#id-signin)
    - [Sign-in Errors and Success](#id-signinerror)
  - [Forgot Password](#id-forgotpassword)
  - [Security](#id-security)
- [Future Features](#id-futurefeatures)

## Project Description <a id="id-projectdescription"></a>

myPortfolio is a portfolio web application that allows registered users to store different digital items such as figma design files. Although, this project only contains the login/sign-up system of the entire web application

## Live Website Link <a id="id-livewebsitelink"></a>

[Live Site](https://myypportfolio.netlify.app/)

## Languages, Tools, and Libraries used <a id="id-used"></a>

- <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/html5.svg" width="48px" height="48px" alt="HTML5 icon">
- <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/css3.svg" width="48px" height="48px" alt="CSS3 icon">
- <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/javascript.svg" width="48px" height="48px" alt="Javascript icon">
- <img src="https://firebase.google.com/static/images/brand-guidelines/logo-built_black.png" width="fit-content" height="48px" alt="Javascript icon">
- DomPurify

## Features and Implementation <a id="id-features"></a>

This section explains the various libraries and code implementation carried out to create this web application.

#### User Authentication <a id="id-userauth"></a>

The myPortfolio website is a small-scale application with no back-end, therefore making use of Firebase to handle user authentication was the most viable option.

```js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "#####",
    authDomain: "myportfolio-app-da38a.firebaseapp.com",
    projectId: "myportfolio-app-da38a",
    storageBucket: "myportfolio",
    messagingSenderId: "401715412547",
    appId: "1:401715412547:web:70fa0a3cc875b207a71ef6",
    measurementId: "G-SFSYHQRY3T"
  };

const auth = getAuth();
```

##### Signing Up <a id="id-signup"></a>

On Sign-up, the user's details which includes his/her names, email-address, and password are collected and transferred to the Firebase authentication system. But before the communication between the site and the Firebase system commences, the web application checks if the **_password_** and **_confirm password_** values tally with each other. And if they do, the user's details are registered successfully on the Firebase system.

```js
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
}
```

Otherwise, the application will execute different blocks of code depending on the condition which failed.

```js
else if (purifiedPASSWORD1 != purifiedPASSWORD2 && purifiedPASSWORD1.length >= 8) {
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
```

###### Sign-up Errors and Success <a id="id-signuperror"></a>

After password tally verification, a function called **_createUserWithEmailAndPassword_** is executed to store the user's details on Firebase. If this function returns an error or fails, the function **_signUpError_** is called with the **_errorCode_** passed in as an argument. There are different error cases for the user depending on the value of the **_errorCode_** gotten.

```js
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
```

On successful sign-up, the **_signUpSuccess_** function is called to display a success message to the user.

```js
const signUpSuccess = () => {
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Success";
    errorMessage.textContent = "You have signed up successfully";
    document.getElementById("main-message").style.backgroundColor = "#98fb98";
    document.getElementById("message-icon").src = "./images/done.gif";
}
```

###### Email Address Verification <a id="id-emailaddress"></a>

And an email verification will be sent to the email address that was used to sign-up.

```js
        sendEmailVerification(auth.currentUser)
        .then(() => {
        });
```

##### Signing In <a id="id-signin"></a>

The provided sign-in details of the user, email and password, are sent to the authentication system with the use of a function called **_signInWithEmailAndPassword_**. It checks if a user with that email address exists along with the password.

```js
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
```

###### Sign-in Errors and Success <a id="id-signinerror"></a>

If no such user exists or an incorrect password was provided, the error code received is passed into a function called **_SignInError_**. And this function depending on the error code, outputs to the user.

```js
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
```

But if there was a success in signing in, the **_signInSuccess_** function is called.

```js
const signInSuccess = () => {
    document.getElementById("message").style.display = "flex";
    errorTitle.textContent = "Success!";
    errorMessage.textContent = "You have logged in successfully";
    document.getElementById("main-message").style.backgroundColor = "#98fb98";
    document.getElementById("message-icon").src = "./images/done.gif";
}

```

##### Forgot Password <a id="id-forgotpassword"></a>

When the user clicks the forgot password option and provides his or her email address, the page sends the email address to Firebase for a password reset through the use of a function called **_sendPasswordResetEmail_**.

```js
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
```

Any error gotten from Firebase calls the **_ResetError_** function with the **_errorCode_** value passed as an argument.

```js
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
```

#### Security <a id="id-security"></a>

The use of a sanitizer JavaScript library called DOMPurify helps to prevent XXS attacks on the site through user inputs. XXS attacks will be the most common type of attack the site might likely face.

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.3.8/purify.min.js" integrity="sha512-M72KfQy4kPuLYC6CeTrN0eA17U1lXEMrr5qEJC/40CLdZGC3HpwPS0esQLqBHnxty2FIcuNdP9EqwSOCLEVJXQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

It is called at all click events of the submit buttons to check user inputs before the input values are used or moved to firebase.

```js
    let purifiedPASSWORD1 = DOMPurify.sanitize(PASSWORD1.value);
    let purifiedPASSWORD2 = DOMPurify.sanitize(PASSWORD2.value);
    let purifiedEmailAddress = DOMPurify.sanitize(emailAddress.value);
    let purifiedFirstName = DOMPurify.sanitize(firstName.value);
    let purifiedLastName = DOMPurify.sanitize(lastName.value);
```

## Future Features <a id="id-futurefeatures"></a>

- Add a sign-in method through a Google Account.
- Add a sign-up method through a Google Account.
- Add a sign-in method through a GitHub Account.
- Add a sign-up method through a GitHub Account.
