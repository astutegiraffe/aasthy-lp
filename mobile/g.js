var flag = false;
var startX = null;
var startY = null;
var endX = null;
var endY = null;

function startTouch(e) {
    startX = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
    // console.log('StartX:', startX);
    // console.log('StartY:', startY);
}

function drag(e) {
    flag = true;
}

function endTouch(e) {
    if (flag) {
        // console.log('true');
        // console.log(e);
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        // console.log('endX:', endX);
        // console.log('endY:', endY);
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
window.urls=[];
