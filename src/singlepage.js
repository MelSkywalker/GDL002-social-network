// document.getElementById('linkForLog').addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById('ifAcountLogIn').style.display = 'block';
//     document.getElementById('formRegister').style.display = 'none';
// })

// document.getElementById('linkForRegister').addEventListener('click', (e) => {
//     e.preventDefault();
//     document.getElementById('ifAcountLogIn').style.display = 'none';
//     document.getElementById('formRegister').style.display = 'block';
// })


// let app = {
//     pages: [],
//     show: new Event ('show'),
//     init: function () {
//         app.pages = document.querySelectorAll('.page');
//         app.pages.forEach((pg) => {
//             pg.addEventListener('show', app.pageShow);
//         })
//         document.querySelectorAll('class="nav-link').forEach((link) => {
//             link.addEventListener('click', app.nav)
//         })
//         history.replaceState('ifNewUserRegister', '#ifNewUserRegister');
//         window.addEventListener('popstate', app.poppIn);
//     },
//     nav: function (ev) {
//         ev.preventDefault();
//     },
//     pageShow: function (ev) {},
//     poppIn: function (ev) {
//         console.log(location.hash, 'popstate event');
        
//     }
// }