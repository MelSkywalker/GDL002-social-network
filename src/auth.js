// firebase.auth().createUser({
//     email: "blah123@mel.com",
//     emailVerified: false,
//     password: "blach123",
//     displayName: "Equis Nombre",
//     photoUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
// })
// .then(function(userRecord){
//     console.log("nuevo usario creado:", userRecord.uid);
// })
// .catch(function(error){
//     console.log("error creando usuario");
// })

// //get data
// db.collection('posts').get().then(snapshot => {
//     setupPosts(snapshot.docs)
// })

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in', user);
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
        auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                signupForm.reset();
            })

    } else {
        alert("Por favor revisa tus datos y vuelve a intentarlo.")
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