'use strict'
//Despues de que termino de cargar eñ html entonces entro al load del window

window.addEventListener("load", () => {

  function observer() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if(user.emailVerified) {
          document.getElementById('content').style.display ='block';
        }; 
        console.log('Existe usuario activo');
        
        // show(user);
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        console.log(user);
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
  };
  observer();

  // function show(user){
  //   let user = (user);
  //   if(user.emailVerified) {
  //     document.getElementById('content').style.display ='block';
  //   }; 
  // };

  document.getElementById('send').addEventListener('click', ()=> {
    saveUserData();
    let correo = document.getElementById('email').value;
    let contraseña = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
       .then(function() {
        console.log('usuario agregado correctamente');
         verify();
      
        // let nombre = document.getElementById('name').value;
        // let nick = document.getElementById('nickname').value;
        // let datas = {
        //   'email': correo,
        //   'name': nombre, 
        //   'nick': nick,
        //   'photo': 'url'
        // }
        // firebase.getCollectioName('users')(){
        //   firebase.savePost(datas)
        // }
       })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      }); 
  });

  document.getElementById('logIn').addEventListener('click', ()=> {
    console.log('diste un click');
    let correoLog = document.getElementById('emailLog').value;
    let passwordLog = document.getElementById('passwordLog').value;
  
    firebase.auth().signInWithEmailAndPassword(correoLog, passwordLog).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  });

  
    document.getElementById("close1").addEventListener('click', ()=>{
      firebase.auth().signOut()
      .then(function () {
        // Sign-out successful.
        console.log('Saliendo...')
        document.getElementById('content').style.display ='none';
      })
      .catch(function (error) {
        // An error happened.
      });
    });

    function verify () {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification()
      .then(function() {
     // Email sent.
     console.log('Enviando correo...');
     
     })
     .catch(function(error) {
     // An error happened.
      });
     };

    //  guardando informacion del usuario al momento de darle click al boton registrar
     function saveUserData () {
       let correo = document.getElementById('email').value;
       let name = document.getElementById('name').value;
       let nick = document.getElementById('nickname').value;
       let date = document.getElementById('date').value;

     // Initialize Cloud Firestore through Firebase
     var db = firebase.firestore();
     db.collection("users").add({
     email: correo,
     name: name,
     nickname: nick,
     birthdate: date
     })
     .then(function(docRef) {
       console.log("Document written with ID: ", docRef.id);
     })
     .catch(function(error) {
       console.error("Error adding document: ", error);
     });
};


});//Fin del load del window

const posts = document.querySelector('posts');
//setup posts
const setupPosts = (data) => {
    let html = '';
    data.forEach(doc => {
        const post = doc.data();
        const li = `
        <li>
            <div class = 'collabsible post'>${post.content}</div>
        </li>
        `;
        html += li
    })
}
