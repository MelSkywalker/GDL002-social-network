const postList = document.querySelector('#posts-list');
const form = document.querySelector('#add-post');

//create element and render them
const renderPost = (doc) => {
    let li = document.createElement('li');
    let post = document.createElement('span');
    let deletePost = document.createElement('button');
    let updatePost = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    post.textContent = doc.data().post;
    deletePost.textContent = 'Eliminar';
    updatePost.textContent = 'Editar';

    li.appendChild(post);
    li.appendChild(updatePost);
    li.appendChild(deletePost);
    postList.appendChild(li);

    //deleting post
    deletePost.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('posts').doc(id).delete();
    })

    //updating post
    // updatePost.add('click', (e) => {
    //     e.preventDefault();
    //     const oldElement = post;
    //     const newElement = document.createElement('input');
    //     newElement.type= 'text';
    //     const updateButton = document.createElement('input');
    //     updateButton.type = 'button';
    //     oldElement.replaceWith(newElement);

    // let id = e.target.parentElement.getAttribute('data-id');
    // db.collection('posts').doc(id).update({
    //     post: editPost
    updatePost.addEventListener('click', (e) => {
        const oldElement = post;
        const oldText = oldElement.textContent;
        const newElement = document.createElement('input');
        newElement.type = 'text';
        oldElement.replaceWith(newElement);
        newElement.value = oldText;
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        li.appendChild(updateButton);

        updateButton.addEventListener('click', (e) => {
            post.textContent = newElement.value;
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('post').doc(id).update({
                post: newElement.value
            })
        })

    })
}

//update posts
const updateTest = () => {
    const oldElement = document.querySelector('#spanTest');
    const oldText = oldElement.textContent;
    const newElement = document.createElement('input');
    newElement.type = 'text';
    oldElement.replaceWith(newElement);
    newElement.value = oldText;
}
const formButton = document.getElementById('buttonTest');
formButton.addEventListener('click', updateTest);



//getting posts
// db.collection('posts').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderPost(doc);
//         // console.log(doc.data());
//     })
// })

//saving posts
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('posts').add({
        post: form.post.value
    })
    form.post.value = '';
})


//real-time listener
db.collection('posts').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === 'added') {
            renderPost(change.doc)
        } else if (change.type === 'removed') {
            let li = postList.querySelector('[data-id=' + change.doc.id + ']');
            postList.removeChild(li);
        }
    })
})


// 'use strict'
// //Despues de que termino de cargar eñ html entonces entro al load del window

// window.addEventListener("load", () => {

//   function observer() {
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         console.log('Existe usuario activo');
//         show();
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         var providerData = user.providerData;
//         // ...
//       } else {
//         // User is signed out.
//         console.log('No existe usuario activo');
//         // ...
//       }
//     });
//   };
//   observer();

//   function show(){
//     document.getElementById('content').style.display ='block';
//   }

//   document.getElementById('send').addEventListener('click', ()=> {
//     // console.log('diste un click');

//     let correo = document.getElementById('email').value;
//     let contraseña = document.getElementById('password').value;

//     firebase.auth().createUserWithEmailAndPassword(correo, contraseña)
//        .then(function() {
//       //   let usuario = createUserWithEmailAndPassword(correo, contraseña) + nombre + nick;
//         // let nombre = document.getElementById('name').value;
//         // let nick = document.getElementById('nickname').value;
//         // let datas = {
//         //   'email': correo,
//         //   'name': nombre,
//         //   'nick': nick,
//         //   'photo': 'url'
//         // }
//         // firebase.getCollectioName('users')(){
//         //   firebase.savePost(datas)
//         // }
//          console.log('usuario agregado correctamente');
//        })
//       .catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//       });
//   });

//   document.getElementById('logIn').addEventListener('click', ()=> {
//     console.log('diste un click');
//     let correoLog = document.getElementById('emailLog').value;
//     let passwordLog = document.getElementById('passwordLog').value;

//     firebase.auth().signInWithEmailAndPassword(correoLog, passwordLog).catch(function (error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log(errorCode);
//       console.log(errorMessage);
//     });
//   });

//     document.getElementById("close1").addEventListener('click', ()=>{
//       firebase.auth().signOut()
//       .then(function () {
//         // Sign-out successful.
//         console.log('Saliendo...')
//         document.getElementById('content').style.display ='none';
//       })
//       .catch(function (error) {
//         // An error happened.
//       });
//     });


// });//Fin del load del window

// const posts = document.querySelector('posts');
// //setup posts
// const setupPosts = (data) => {
//     let html = '';
//     data.forEach(doc => {
//         const post = doc.data();
//         const li = `
//         <li>
//             <div class = 'collabsible post'>${post.content}</div>
//         </li>
//         `;
//         html += li
//     });
//     posts.innerHTML = html;
// }
// let database = firebase.database();
// let posts = database.ref('posts');

// let data = {
//   text: "first post"
// }
// posts.push(data);
