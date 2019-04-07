'use strict'

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in', user.uid);
    } else {
        console.log('user logged out');
    }
})

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['signup-email'].value;
    const verifiedEmail = signupForm['verified-email'].value;
    const password = signupForm['signup-password'].value;
    const verifiedPassword = signupForm['verified-password'].value;

    if (email === verifiedEmail && password === verifiedPassword) {
        auth.createUserWithEmailAndPassword(email, password).then(auth => {
            db.collection('users').doc(auth.user.uid).set({
                name: signupForm['signup-name'].value,
                nickname: signupForm['signup-nickname'].value,
                bd: signupForm['signup-bd'].value
            }).then(function () {
                console.log('usuario creado');
                signupForm.reset();
                
            }).catch(function (error) {
                console.log(error.code);
                console.log(error.message);
            })
        })
    } else {
        alert('Por favor revisa tus datos y vuelve a intentarlo.')
    }
})

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
})

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // //signup
    // const signupForm = document.querySelector('#signup-form');
    // signupForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     //get user info
    //     const email = signupForm['signup-email'].value;
    //     const password = signupForm['signup-password'].value;

    //     //signup user
    //     auth.createUserWithEmailAndPassword(email, password).then(cred => {
    //         signupForm.reset();
    //     })
    // })

    // //logout
    // const logout = document.querySelector('#logout');
    // logout.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     auth.signOut()
    // })

    user.updateProfile({
        displayName: nickname
    }).then(cred => {
        updateForm.reset();
    })
        .then(console.log(user))
})


