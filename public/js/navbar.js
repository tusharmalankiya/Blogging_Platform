const navbar_menu = document.querySelector('.navbar-side-menu');
const clicked = () =>{
    console.log("clicked");
    navbar_menu.style.width = '250px';
    document.body.style.overflow = 'hidden';
    document.querySelector(".navbar-layer").style.display = 'initial';
}

const close_navbar = () =>{
    navbar_menu.style.width = '0';
    document.body.style.overflow = 'auto';
    document.querySelector(".navbar-layer").style.display = 'none';
}