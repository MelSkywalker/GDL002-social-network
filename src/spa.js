//clik in register
document.querySelector('#linkRegister').addEventListener('click', () => {
  document.querySelector('#modal-sign-up').style.display = 'block';
  document.querySelector('#modal-login').style.display = 'none';
});

//clik in login
document.querySelector('#linkLogin').addEventListener('click', () => {
  document.querySelector('#modal-sign-up').style.display = 'none';
  document.querySelector('#modal-login').style.display = 'block';
});

//if user signed in
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in', user.uid);
    document.querySelector('#modal-sign-up').style.display = 'none';
    document.querySelector('#modal-login').style.display = 'none';
    document.querySelector('#modal-navbar').style.display = 'block';
    document.querySelector('#modal-wallpost').style.display = 'block';
  } else {
    console.log('user logged out');
    document.querySelector('#modal-login').style.display = 'block';
    document.querySelector('#modal-wallpost').style.display = 'none';
    document.querySelector('#modal-navbar').style.display = 'none';
    document.querySelector('#modal-profile').style.display = 'none';
    document.querySelector('#modal-account').style.display = 'none';
  }
})

//functions for navbars
document.querySelector('#linkNewsFeed').addEventListener('click', () => {
  document.querySelector('#modal-wallpost').style.display = 'block';
  document.querySelector('#modal-account').style.display = 'none';
  document.querySelector('#modal-profile').style.display = 'none';
});
document.querySelector('#linkProfile').addEventListener('click', () => {
  document.querySelector('#modal-wallpost').style.display = 'none';
  document.querySelector('#modal-account').style.display = 'none';
  document.querySelector('#modal-profile').style.display = 'block';
});
document.querySelector('#linkAccount').addEventListener('click', () => {
  document.querySelector('#modal-wallpost').style.display = 'none';
  document.querySelector('#modal-account').style.display = 'block';
  document.querySelector('#modal-profile').style.display = 'none';
});

// const app = {
//   pages: [],
//   show: new Event('show'),
//   init: function(){
//       app.pages = document.querySelectorAll('.page');
//       app.pages.forEach((pg)=>{
//           pg.addEventListener('show', app.pageShown);
//       })
      
//       document.querySelectorAll('.nav-link').forEach((link)=>{
//           link.addEventListener('click', app.nav);
//       })
//       history.replaceState({}, 'Home', '#modal-wallpost');
//       window.addEventListener('hashchange', app.poppin);
//   },
//   nav: function(ev){
//       ev.preventDefault();
//       let currentPage = ev.target.getAttribute('data-target');
//       document.querySelector('.active').classList.remove('active');
//       document.getElementById(currentPage).classList.add('active');
//       console.log(currentPage)
//       history.pushState({}, currentPage, `#${currentPage}`);
//       document.getElementById(currentPage).dispatchEvent(app.show);
//   },
//   pageShown: function(ev){
//       console.log('Page', ev.target.id, 'just shown');
//       // let h1 = ev.target.querySelector('h1');
//       // h1.classList.add('big')
//       // setTimeout((h)=>{
//       //     h.classList.remove('big');
//       // }, 1200, h1);
//   },
//   poppin: function(ev){
//       console.log(location.hash, 'popstate event');
//       let hash = location.hash.replace('#' ,'');
//       document.querySelector('.active').classList.remove('active');
//       document.getElementById(hash).classList.add('active');
//       console.log(hash)
//       //history.pushState({}, currentPage, `#${currentPage}`);
//       document.getElementById(hash).dispatchEvent(app.show);
//   }
// }

// document.addEventListener('DOMContentLoaded', app.init);