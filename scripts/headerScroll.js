window.onscroll = function() {
    if (window.scrollY > 50) {
        document.getElementsByTagName("header")[0].classList.add('scrolledDown');
    }
    else{
        document.getElementsByTagName("header")[0].classList.remove('scrolledDown');
    }
};

const navT = document.getElementById("menuToggle");
navT.addEventListener('click', function() {
  if(navT.classList.contains('open')){
  	document.getElementsByTagName("header")[0].getElementsByClassName("menu")[0].classList.remove('expand');
  	navT.classList.remove('open');
  }
  else{
  	document.getElementsByTagName("header")[0].getElementsByClassName("menu")[0].classList.add('expand');
  	navT.classList.add('open');
  }
});