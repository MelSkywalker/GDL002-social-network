document.getElementById('send').addEventListener('click', register);
function register () {
    // console.log('diste un click');
    let correo = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(correo, contraseña).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });

    // console.log(correo);
    // console.log(contraseña);  
}

document.getElementById('logIn').addEventListener('click', access);
function access () {
    console.log('diste un click');
    let correoLog = document.getElementById('emailLog').value;
    let passwordLog = document.getElementById('passwordLog').value;

    firebase.auth().signInWithEmailAndPassword(correoLog, passwordLog).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });  
}

function observer () {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('Existe usuario activo');
        //   show();
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('No existe usuario activo');
          
          // ...
        }
      });
}
observer();

function show () {
    let contenido = document.getElementById('content');
    contenido.innerHTML = 'Esto solo lo ven los usuarios registrados';
}