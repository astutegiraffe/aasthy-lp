function scrollToElm(container, duration, left) {
    let change = getRelativePos(container, left);
    scrollTo(container, change, duration);  // duration in seconds
}

function getRelativePos(container, left) {
    let width = parseInt(window.getComputedStyle(document.querySelector('.asset-investment-card')).width);
    let index = parseInt(container.scrollLeft / width);
    let cardInView = left === 1 ? 0.99 : 0.01;
    let focusEl = container.scrollLeft % width > cardInView * width ? index + 1 : index;
    let change;
    if (focusEl + left >= 0) {
        if (focusEl + left <= 2) {
            change = focusEl + left;
        } else {
            change = 2;
        }
    } else {
        change = 0;
    }
    return change * width;
}

function scrollTo(element, change, duration, left) {
    let start = element.scrollLeft;
    let startTime = performance.now();
    let val, now, elapsed, t;

    function animateScroll() {
        now = performance.now();
        elapsed = (now - startTime) / 1000;
        t = (elapsed / duration);
        element.scrollLeft = start + ((change - start) * easeInOutQuad(t));
        if (t < 1)
            window.requestAnimationFrame(animateScroll);
    };
    animateScroll();
}

function easeInOutQuad(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };

function loadingEvent() {
    console.log(document.body.scrollHeight);
    let curEl = document.getElementById(`shared-investments-assets`);
    document.getElementById('shared-investments-next-btn').addEventListener('click', () => {
        scrollToElm(curEl, 0.4, 1);
    });

    document.getElementById('shared-investments-prev-btn').addEventListener('click', () => {
        scrollToElm(curEl, 0.4, -1);
    });
}
window.onload=function(){
    loadingEvent()
}
window.urls=[]