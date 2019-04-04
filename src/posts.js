const postList = document.querySelector('#postList');
const form = document.querySelector('#addPost');
const db = firebase.firestore();
const user = firebase.auth().currentUser;

const renderPost = (doc) => {
    let li = document.createElement('li');
    let namePost = document.createElement('span');
    let datePost = document.createElement('span');
    let post = document.createElement('span');
    let deletePost = document.createElement('button');
    let updatePost = document.createElement('button');
    let nLikes = document.createElement('span');
    let likePost = document.createElement('button');
    li.setAttribute('data-id', doc.id);

    // console.log(db.collection('users').doc(firebase.auth().currentUser.uid).nick);

    const date = new Date (doc.data().date);
    const getDay = () => {
        let day = date.getDate();
        if(day < 10) {
            return '0' + day;
        } else {
            return day;
        }
    }
    const getMonthF = () => {
        let month = date.getMonth()+1;
        if(month < 10) {
            return '0' + month;
        } else {
            return month;
        }
    }
    const getMinutesF = () => {
        let minutes = date.getMinutes();
        if(minutes < 10) {
            return '0' + minutes;
        } else {
            return minutes;
        }
    }
    const year = date.getFullYear();
    const hour = date.getHours();
    const formattedDate = hour + ':' + getMinutesF() + 'hrs' + ' - ' + getDay() + '/' + getMonthF() + '/' + year + ' ';

    // const name = doc.data().name;
    // console.log(name);

    namePost.textContent = name;
    datePost.textContent = formattedDate;
    post.textContent = doc.data().post;
    deletePost.textContent = 'Eliminar';
    updatePost.textContent = 'Editar';
    likePost.textContent = 'Like';

    let getLikes = doc.data().likes;
    nLikes.textContent = getLikes;
    li.appendChild(namePost);
    li.appendChild(datePost);
    li.appendChild(post);
    li.appendChild(updatePost);
    li.appendChild(deletePost);
    li.appendChild(nLikes);
    li.appendChild(likePost);
    postList.appendChild(li);

    //delete post
    deletePost.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(firebase.auth().currentUser.uid).collection('posts').doc(id).delete();
    })

    updatePost.addEventListener('click', (e) => {
        const oldElement = post;
        const oldText = oldElement.textContent;
        const newElement = document.createElement('input');
        newElement.type = 'text';
        li.appendChild(newElement);

        oldElement.replaceWith(newElement);
        newElement.value = oldText;
        updatePost.textContent = 'Guardar';

        updatePost.addEventListener('click', (e) => {
            let id = e.target.parentElement.getAttribute('data-id');
            e.stopPropagation();
            db.collection('users').doc(firebase.auth().currentUser.uid).collection('posts').doc(id).update({
                post: newElement.value
            });
            updatePost.textContent = 'Editar';
        })
    })
    //Update likes
    likePost.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        let getPost = db.collection('users').doc(firebase.auth().currentUser.uid).collection('posts').doc(id);
        getPost.get().then(function (doc) {
            let currentLikes = doc.data().likes;
            currentLikes += 1;
            getPost.update({
                likes: currentLikes
            })
            nLikes.textContent = currentLikes;
        })
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('posts').add({
        post: form.post.value,
        likes: 0,
        date: new Date().toJSON(),
        // name : db.collection('users').doc(firebase.auth().currentUser.uid).nick
    })
    console.log(db.collection('users').doc(firebase.auth().currentUser.uid));

    form.post.value = '';
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //real-time listener
        db.collection('users').doc(firebase.auth().currentUser.uid).collection('posts').onSnapshot(snapshot => {
            //console.log(snapshot.docChanges);
            let changes = snapshot.docChanges;
            changes.forEach(change => {
                if (change.type === 'added') {
                    renderPost(change.doc)
                } else if (change.type === 'removed') {
                    let li = postList.querySelector('[data-id=' + change.doc.id + ']');
                    postList.removeChild(li);
                } else if (change.type === 'modified') {
                    let li = postList.querySelector('[data-id=' + change.doc.id + ']');
                    postList.removeChild(li);
                    renderPost(change.doc);
                }
            });
        })
    }
})