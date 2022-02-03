var flag = false;
var startX = null;
var startY = null;
var endX = null;
var endY = null;

function startTouch(e) {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
}

function drag(e) {
    flag = true;
}

function endTouch(e) {
    if (flag) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        xDiff = endX - startX;
        yDiff = endY - startY;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff < 0) { //leftswipe
                var selectedCard = document.querySelector('input[name="slider"]:checked').value
                if (selectedCard == 'card1') {
                    document.getElementById('card1').checked = false;
                    document.getElementById('card3').checked = false;
                    document.getElementById('card2').checked = true;
                }
                else if (selectedCard == 'card2') {
                    document.getElementById('card1').checked = false;
                    document.getElementById('card3').checked = true;
                    document.getElementById('card2').checked = false;
                }
                else {
                    document.getElementById('card1').checked = true;
                    document.getElementById('card3').checked = false;
                    document.getElementById('card2').checked = false;
                }
            }
            else {
                var selectedCard = document.querySelector('input[name="slider"]:checked').value
                if (selectedCard == 'card1') {
                    document.getElementById('card1').checked = false;
                    document.getElementById('card3').checked = true;
                    document.getElementById('card2').checked = false;
                }
                else if (selectedCard == 'card2') {
                    document.getElementById('card1').checked = true;
                    document.getElementById('card3').checked = false;
                    document.getElementById('card2').checked = false;
                }
                else {
                    document.getElementById('card1').checked = false;
                    document.getElementById('card3').checked = false;
                    document.getElementById('card2').checked = true;
                }
            }
        }
    }
    flag = false;
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

function clickLearnButton () {
    if (document.getElementById("i")) {
        smoothScroll(document.getElementById("i").offsetTop - 70);
        window.postMessage(`learnNowButton`);
    }
}

function clickDiscoverButton () {
    if (document.getElementById("j")) {
        smoothScroll(document.getElementById("j").offsetTop - 70);
        window.postMessage(`DiscoverButton`);
    }
}

function clickInvestButton () {
    if (document.getElementById("h")) {
        smoothScroll(document.getElementById("h").offsetTop - 70);
        window.postMessage(`InvestButton`);
    }
}

window.urls = [];
