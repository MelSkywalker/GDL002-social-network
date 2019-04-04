// //get data
// db.collection('posts').get().then(snapshot => {
//     setupPosts(snapshot.docs)
// })

// //listen for auth status changes
// auth.onAuthStateChanged(user => {
//     if(user){
//         console.log('user logged in', user);
//     } else {
//         console.log('user logged out');
//     }
// })

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

// //login
// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     //get user info
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;

//     auth.signInWithEmailAndPassword(email, password).then(cred => {
//         loginForm.reset();
//     })
// })