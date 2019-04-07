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
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection('users').doc(cred.user.uid).set({
                name: signupForm['signup-name'].value,
                nickname: signupForm['signup-nickname'].value,
                bd: signupForm['signup-bd'].value
            }).then(function () {
                console.log('usuario creado');
            }).then(post => {
                db.collection('users').doc(cred.user.uid).collection('posts').add({
                    post: 'holi',
                    likes: 0,
                    date: new Date().toJSON()
                }).then(signupForm.reset())
                .catch(function (error1) {
                    console.log(error1);2
                })
            }).then(auth.signOut())
            .catch(function(error){
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);                
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

    auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            loginForm.reset();
        })
})

//update nickname
const updateForm = document.querySelector('#account-details');
updateForm.addEventListener('submit', (e) => {
    const nickname = document.querySelector('#update-nickname').value;
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: nickname
    }).then(cred => {
        updateForm.reset();
    })
        .then(console.log(user))
})