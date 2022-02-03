function Timer(fn, t) {

    var timerObj = setInterval(fn, t);
    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    this.reset = function (newT = t) {
        t = newT;
        return this.stop().start();
    }
}
var timer = new Timer(function () {
    plusSlides(1)
}, 8000);

var slideIndex = 1;

function plusSlides(n) {
    slideIndex += n;
    showSlides();
    timer.stop();
    timer.start();
}
// Thumbnail image controls
function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

function showSlides() {
    var i;
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
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function smoothScroll(to) {
    var smoothScrollFeature = 'scrollBehavior' in document.documentElement.style;
    var i = parseInt(window.pageYOffset);
    if (i !== to) {
        if (!smoothScrollFeature) {
            to = parseInt(to);
            if (i < to) {
                var int = setInterval(() => {
                    if (i > (to - 20)) i += 1;
                    else if (i > (to - 40)) i += 3;
                    else if (i > (to - 80)) i += 8;
                    else if (i > (to - 160)) i += 18;
                    else if (i > (to - 200)) i += 24;
                    else if (i > (to - 300)) i += 40;
                    else i += 60;
                    window.scroll(0, i);
                    if (i >= to) clearInterval(int);
                }, 15);
            }
            else {
                var int = setInterval(() => {
                    if (i < (to + 20)) i -= 1;
                    else if (i < (to + 40)) i -= 3;
                    else if (i < (to + 80)) i -= 8;
                    else if (i < (to + 160)) i -= 18;
                    else if (i < (to + 200)) i -= 24;
                    else if (i < (to + 300)) i -= 40;
                    else i -= 60;
                    window.scroll(0, i);
                    if (i <= to) clearInterval(int);
                }, 15);
            }
        }
        else {
            window.scroll({
                top: to,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
};

function clickLearnButton() {
    if (document.getElementById("i")) {
        smoothScroll(document.getElementById("i").offsetTop - 70);
        window.postMessage(`learnNowButton`);
    }
}

function clickDiscoverButton() {
    if (document.getElementById("j")) {
        smoothScroll(document.getElementById("j").offsetTop - 70);
        window.postMessage(`DiscoverButton`);
    }
}

function clickInvestButton() {
    if (document.getElementById("h")) {
        smoothScroll(document.getElementById("h").offsetTop - 70);
        window.postMessage(`InvestButton`);
    }
}

currentSlide(1);

window.urls = [];
