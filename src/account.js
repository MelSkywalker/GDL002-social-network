const updateForm = document.querySelector('#account-details');

updateForm.addEventListener('submit', (e) => {
    const newNickname = document.querySelector('#update-nickname').value;
    const newName = document.querySelector('#update-name').value;
    const user = db.collection('users').doc(firebase.auth().currentUser.uid);

    user.update({
        name: newNickname,
        nickname: newName
    }).then(cred => {
        updateForm.reset();
    })
})