function int(options){
    const tarText = options.target;
    const tar = document.getElementById(tarText);
    var slideContainer = tar.getElementsByClassName("slider")[0];
    var slideContent = slideContainer.children;


    var maxSlides = 1;
    var autoSlideSpeed = 5000;
    var slideAnimationSpeed = 300;
    var autoSlide = 'right';
    var pagination = false;
    var breakPoint = null;
    var hoverPause = false;
    
    if(options.maxSlides){maxSlides = options.maxSlides};
    if(options.autoSlideSpeed){autoSlideSpeed = options.autoSlideSpeed};
    if(options.slideAnimationSpeed){slideAnimationSpeed = options.slideAnimationSpeed};
    if(options.autoSlide){autoSlide = options.autoSlide};
    if(options.breakPoint){breakPoint = options.breakPoint};
    if(options.pagination){pagination = options.pagination};
    if(options.hoverPause){hoverPause = options.hoverPause};
    var slideCount = slideContent.length;



    var styles = '<style class="'+tarText+'sliderStyles" type="text/css">#'+tarText+' {--slidenum: '+slideCount+';--maxSimul: '+maxSlides+';--simul: var(--maxSimul);}@media (max-width: 900px) {#'+tarText+' {--simul: 3;}}#'+tarText+' {--slideWidth: calc(((var(--slidenum)*100%) + (100%*var(--maxSimul))) / var(--simul));--slideDist: calc(-100% / var(--simul));--slideMove: 0;position: relative;}#'+tarText+' .curSliding {transition: margin 300ms}#'+tarText+' .slider {width: var(--slideWidth);margin-left: calc(var(--slideDist) * var(--slideMove));}</style>';
    tar.insertAdjacentHTML('beforebegin', styles);

    for(let i = 0; i < maxSlides; i++){
        slideContainer.insertAdjacentHTML('beforeend', slideContent[i].outerHTML);
    }



    function slide(dir){
        if(!slideContainer.classList.contains('curSliding')){
            //get current slide position from css var
            var b = document.getElementById(tarText);
            var a = parseInt(getComputedStyle(b).getPropertyValue('--slideMove'));
            //add direction value based on if it's move left or right, or go to specific slide
            var slideMovit = 0;
            if(Number.isInteger(dir)){slideMovit = a + dir;}
            else{slideMovit = parseInt(dir);}
            //check if direction needs the slider to loop first
            if(slideMovit < 0 ){
                b.style.setProperty('--slideMove', slideCount);
                slideMovit = slideCount - 1;
            }
            else if(slideMovit > slideCount){
                b.style.setProperty('--slideMove', 0);
                slideMovit = 1;
            }
            //add class for transition animation, with 1ms delay so there is time for the loop
            setTimeout(function(){
                slideContainer.classList.add('curSliding');
                b.style.setProperty('--slideMove', slideMovit);
                for (var i = 0; i < slideContent.length; i++){
                    slideContent[i].classList.remove('current');
                }
                slideContent[slideMovit].classList.add('current');
            }, 1);
            //remove the transition class once its over
            setTimeout(function(){
                slideContainer.classList.remove('curSliding');
            }, slideAnimationSpeed + 10);
        }
        else{
            console.log('wait! still sliding!');
        }
    };
    
    if(autoSlide != 'disable'){
        if(autoSlide == 'left'){autoSlide = -1;}
        else{autoSlide = 1;}
        
        
        setInterval(function(){
          if(document.hidden != true && !tar.querySelector(':hover'))
            {
                slide(autoSlide);
            }
        }, autoSlideSpeed);
    }





    tar.getElementsByClassName("nav")[0].getElementsByClassName("right")[0].addEventListener('click', function() {
      slide(1);
    });
    tar.getElementsByClassName("nav")[0].getElementsByClassName("left")[0].addEventListener('click', function() {
      slide(-1);
    });
}