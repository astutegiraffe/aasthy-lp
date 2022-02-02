function scrollToElm(container, duration, left) {
    let change = getRelativePos(container, left);
    scrollTo(container, change, duration);  // duration in seconds
}

function getRelativePos(container, left) {
    let width = parseInt(window.getComputedStyle(document.querySelector('.condensed-asset-card-j-component')).width);
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
    // console.log(document.body.scrollHeight);
    assets.forEach((asset, index, assets) => { console.log('Index:', index); addAssetCards(asset, index) });
    let el=document.getElementById('condensed-asset-card-j-container')
    document.getElementById('next-btn').addEventListener('click', () => {
        scrollToElm(el, 0.4, 1);
    });

    document.getElementById('prev-btn').addEventListener('click', () => {
        scrollToElm( el, 0.4, -1);
    });
}
let assets = [
    {
        propertyName: 'Aasthy Asset - 1',
        location: 'Thanisandra',
        city: 'Bangalore',
        propertyArea: 1280.9,
        price: 6245.61,
        pricePerSqFt: 100
    },
    {
        propertyName: 'Aasthy Asset - 1',
        location: 'Thanisandra',
        city: 'Bangalore',
        propertyArea: 1280.9,
        price: 6245.61,
        pricePerSqFt: 100
    },
    {
        propertyName: 'Aasthy Asset - 1',
        location: 'Thanisandra',
        city: 'Bangalore',
        propertyArea: 1280.9,
        price: 6245.61,
        pricePerSqFt: 100
    },
    {
        propertyName: 'Aasthy Asset - 1',
        location: 'Thanisandra',
        city: 'Bangalore',
        propertyArea: 1280.9,
        price: 6245.61,
        pricePerSqFt: 100
    },
    {
        propertyName: 'Aasthy Asset - 1',
        location: 'Thanisandra',
        city: 'Bangalore',
        propertyArea: 1280.9,
        price: 6245.61,
        pricePerSqFt: 100
    }
]

function addAssetCards(asset, index) {
    console.log(index)
    let html = `
    <div class="condensed-asset-card-j-component" id=asset-${index}>
    <div class="condensed-asset-card-j-left-component">
        <div class="condensed-asset-card-j-image">
            <img class="condensed-asset-card-j-property-image" src="./images/property.jpg" alt='text'>
        </div>
        <div class="condensed-asset-card-j-image-source-icon">
            <p id="condensed-asset-card-j-source-text">Aasthy Exclusive</p>
        </div>
    </div>
    <div class="condensed-asset-card-j-details">
        <div id="condensed-asset-card-j-title">${asset.propertyName}</div>
        <div class="condensed-asset-card-j-location-component">
            ${asset.location},${asset.city}
        </div>
        <div class="condensed-asset-card-j-price-component">
        ₹${asset.price}
        </div>
        <div class="condensed-asset-card-j-details-container">
            <div class="condensed-asset-card-j-details-title">
                Area(sq.ft)
            </div>
            <div class="condensed-asset-card-j-details-content">
                ${asset.propertyArea}
            </div>
        </div>
        <div class="condensed-asset-card-j-details-container">
            <div class="condensed-asset-card-j-details-title">
                Price/sq.ft
            </div>
            <div class="condensed-asset-card-j-details-content">
                ${asset.pricePerSqFt}
            </div>
        </div>
        <div class="condensed-asset-card-j-details-container">
            <div class="condensed-asset-card-j-details-title">
                Return
                <a href><i class="fas fa-exclamation-circle" style='margin-left:5.56px' ></i></a>
            </div>
            <div class="condensed-asset-card-j-details-content">
                89%
            </div>
        </div>
    </div>
</div>`;
    document.getElementById('condensed-asset-card-j-container').insertAdjacentHTML('beforeend', html);
}

function onClick() {
    console.log('Click!');
}
let city = null;
let propertyType = null;
let roi = null;
function changeCity() {
    city = document.getElementById('city').value
    if (city && propertyType && roi) {
        console.log('success')
    }
}
function changePropertyType() {
    propertyType = document.getElementById('propertyType').value
    if (city && propertyType && roi) {
        console.log('success')
    }
}
function changeROI() {
    roi = document.getElementById('roi').value
    if (city && propertyType && roi) {
        console.log(city, propertyType, roi)
        document.getElementById('condensed-asset-card-j-container').innerHTML = null;
    }
}
window.onload=function(){
    loadingEvent()
}