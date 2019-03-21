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