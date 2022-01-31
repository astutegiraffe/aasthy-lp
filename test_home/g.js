function Timer(fn, t) {
    var timerObj = setInterval(fn, t);
    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }
    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function (newT = t) {
        t = newT;
        return this.stop().start();
    }
}
// var timer = new Timer(function () {
// 	plusSlides(1)
// }, 8000);
var slideIndex=1;
function plusSlides(n) {
    slideIndex += n;
    showSlides();
    // timer.stop();
    // timer.start();
}
// Thumbnail image controls
function currentSlide(n) {
    slideIndex = n;
    console.log('Slide Index:',slideIndex)
    showSlides();
}

function showSlides() {
    var i;
    console.log('Show Slides');
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (slideIndex > slides.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    console.log('SlideIndex:',slideIndex)
    slides[slideIndex - 1].style.display = "block";
    console.log('Slides:',slides[slideIndex-1])
    dots[slideIndex - 1].className += " active";
    console.log('Dots:',dots)
    console.log('Dots slideIndex-1:',dots[slideIndex-1]);
}
window.onload=function(){
    currentSlide(1);
};
window.urls=[]
