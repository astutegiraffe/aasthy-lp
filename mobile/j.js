
var assets = []
var yieldRelatedFlag = false;
var residentialRelatedFlag = false;
getAssetTitle = (assetData) => {
	PropertyTypeTextFormat = {
		'residentialplot': 'Residential Plot',
		'apartment': 'Apartment',
		'apartment.penthouse': 'Apartment Penthouse',
		'apartment.multistorey': 'Apartment Multistorey',
		'apartment.studio': 'Apartment Studio',
		'apartment.service': 'Apartment Service',
		'independentfloor': 'Independent Floor',
		'independenthouse': 'Independent House',
		'villa': 'Villa',
		'farmhouse': 'Farmhouse',
		'agriculturalplot': 'Agricultural Plot',
		'commercialplot': 'Commercial Plot',
		'commercial.office': 'Commercial Office',
		'commercial.shop': 'Commercial Shop',
		'commercial.showroom': 'Commercial Showroom',
		'commercial.warehouse': 'Commercial Warehouse',
		'industrialplot': 'Industrial Plot',
		'industrial.building': 'Industrial Building',
		'industrial.depot': 'Industrial Depot',
		'warehouse': 'Warehouse',
		'generic_unknown': ''
	};
	let assetTitle = null;
	if (assetData.propertyArea && assetData.bhkInfo && assetData.bhkInfo !== "" && !assetData.bhkInfo.includes("0") && !assetData.bhkInfo.includes("N/A") && assetData.propertyType && assetData.projectName && assetData.projectName !== "") {
		assetTitle = assetData.bhkInfo + " " + PropertyTypeTextFormat[assetData.propertyType] + " of area " + assetData.propertyArea.toLocaleString('en') + " sq. ft. in " + assetData.projectName;
	} else if (assetData.propertyArea && assetData.propertyType && assetData.projectName && assetData.projectName !== "") {
		assetTitle = assetData.propertyArea.toLocaleString('en') + " sq. ft. " + PropertyTypeTextFormat[assetData.propertyType] + " in " + assetData.projectName;
	} else if (assetData.propertyType && assetData.propertyArea && assetData.projectBuilder && assetData.projectBuilder !== "") {
		assetTitle = assetData.propertyArea.toLocaleString('en') + " sq. ft. " + PropertyTypeTextFormat[assetData.propertyType] + " by " + assetData.projectBuilder;
	} else {
		assetTitle = assetData.propertyArea.toLocaleString('en') + " sq. ft. " + PropertyTypeTextFormat[assetData.propertyType] + " in " + assetData.areaLocation;
	}
	return assetTitle;
}

getReturnYieldAppreciation = (yieldValue, appreciation) => {
	let returnValue = null;
	const appreciationText = appreciation ? appreciation.toFixed(2) + '%' : '-';
	const yieldText = yieldValue ? yieldValue.toFixed(2) + '%' : '-';
	if (yieldValue && appreciation) {
		returnValue = parseInt(yieldValue.toFixed(2)) + parseInt(appreciation.toFixed(2)) + '%';
	}
	else if (yieldValue) {
		returnValue = yieldValue.toFixed(2) + '%';
	}
	else if (appreciation) {
		returnValue = appreciation.toFixed(2) + '%';
	}
	else {
		returnValue = '-';
	}
	const yieldAppreciationText = "ROI is calculated by Appreciation and Yield. Appreciation: " + appreciationText + "  Yield: " + yieldText;
	let returnYieldAppreciationText = {};
	returnYieldAppreciationText['returnValue'] = returnValue;
	returnYieldAppreciationText['yieldAppreciationText'] = yieldAppreciationText;
	return returnYieldAppreciationText;
}
getPriceAsText = (priceValue) => {
	let symbol = (priceValue < 0 ? '-' : '')
	priceValue = Math.abs(priceValue);
	if ((priceValue / 10000000) >= 1) {
		return symbol + ((priceValue / 10000000).toFixed(2) + " Cr");
	} else if ((priceValue / 100000) >= 1 && (priceValue / 100000) < 100) {
		return symbol + ((priceValue / 100000).toFixed(2) + " L");
	} else if ((priceValue / 1000) >= 1 && (priceValue / 1000) < 100) {
		return symbol + ((priceValue / 1000).toFixed(2) + " K");
	} else {
		return symbol + priceValue.toFixed(2);
	}
}
clickAssetCard = (id) => {
	window.postMessage('event_AssetCard_CustomLandingPage')
	window.location.href = 'https://reimon.in/asset/?id=' + id
}
addAssetCards = (asset, index) => {
	let html = `
<div class="condensed-asset-card-j-component" id=asset-${index} onclick=clickAssetCard(${asset.id})>
<div class="condensed-asset-card-j-left-component">
    <div class="condensed-asset-card-j-image">
        <img class="condensed-asset-card-j-property-image" src="lp/mobile/images/property.jpg" alt='text'>
    </div>
    <div class="condensed-asset-card-j-image-source-icon">
        <p id="condensed-asset-card-j-source-text">${asset.source}</p>
    </div>
</div>
<div class="condensed-asset-card-j-details">
    <div id="condensed-asset-card-j-title">${getAssetTitle(asset)}</div>
    <div class="condensed-asset-card-j-location-component">
        ${asset.areaLocation},${asset.city}
    </div>
    <div class="condensed-asset-card-j-price-component">
        &#8377; ${getPriceAsText(asset.price)}
    </div>
    <div class="condensed-asset-card-j-details-container">
        <div class="condensed-asset-card-j-details-title">
            Area(sq.ft)
        </div>
        <div class="condensed-asset-card-j-details-content">
            ${asset.propertyArea.toLocaleString('en')}
        </div>
    </div>
    <div class="condensed-asset-card-j-details-container">
        <div class="condensed-asset-card-j-details-title">
            Price/sq.ft
        </div>
        <div class="condensed-asset-card-j-details-content">
        &#8377;${parseInt(asset.price / asset.propertyArea).toLocaleString('en')}
        </div>
    </div>
    <div class="condensed-asset-card-j-details-container">
        <div class="condensed-asset-card-j-details-title">
            Return
            <i class="condensed-asset-card-j-tooltip-builder fa fa-exclamation-circle"
            style="margin-left: '5.56px';">
            <span class='condensed-asset-card-j-tooltip-builder-text'>${getReturnYieldAppreciation(asset.yield, asset.appreciation)['yieldAppreciationText']}</span>
         </i>
        </div>
        <div class="condensed-asset-card-j-details-content">
            ${getReturnYieldAppreciation(asset.yield, asset.appreciation)['returnValue']}
        </div>
    </div>
</div>
</div>`;
	document.getElementById('condensed-asset-card-j-container').insertAdjacentHTML('beforeend', html);
}

scrollToElm = (container, duration, left) => {
	let change = getRelativePos(container, left);
	scrollTo(container, change, duration);  // duration in seconds
}

getRelativePos = (container, left) => {
	let width = parseInt(window.getComputedStyle(document.querySelector('.condensed-asset-card-j-component')).width) + 10;
	let index = parseInt(container.scrollLeft / width);
	let cardInView = left === 1 ? 0.99 : 0.01;
	let focusEl = container.scrollLeft % width > cardInView * width ? index + 1 : index;
	let change;
	if (focusEl + left >= 0) {
		if (focusEl + left <= 9) {
			change = focusEl + left;
		} else {
			change = 9;
		}
	} else {
		change = 0;
	}
	return change * width;
}

scrollTo = (element, change, duration, left) => {
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

easeInOutQuad = (t) => { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t };
discoverLoadingEvent = async () => {
	var opt = document.createElement("option");
	opt.value = "ResidentialPlot";
	opt.text = "Residential Plot";
	var select = document.getElementById("propertyType");
	select.add(opt)
	let url = '/api/getAssetsFromConfig?';
	let city = 'Bangalore';
	let propertyType = 'Apartment';
	let returnOnInvestment = 'Appreciation';
	url += '&city=' + city + '&propertyType=' + propertyType + '&returnOnInvestment=' + returnOnInvestment;
	await fetch(url).then((savedDataResponse) => {
		switch (savedDataResponse.status) {
			case (200):
			case (304):
				savedDataResponse.json().then((savedData) => {
					// console.log(savedData)
					assets = savedData.assets
					document.getElementById('condensed-asset-card-j-container').innerHTML = null;
					assets.forEach((asset, index, assets) => { addAssetCards(asset, index) });
				}).catch((err) => {
					console.error("ERROR: ", err);
				});
				break;
			default:
				break;
		}
	}).catch((err) => {
		console.error("ERROR: ", err);
	});
	let el = document.getElementById('condensed-asset-card-j-container')
	document.getElementById('next-btn').addEventListener('click', () => {
		window.postMessage('event_DiscoverAssets_RightCursor')
		scrollToElm(el, 0.4, 1);
	});

	document.getElementById('prev-btn').addEventListener('click', () => {
		window.postMessage('event_DiscoverAssets_LeftCursor')
		scrollToElm(el, 0.4, -1);
	});
}

getAssets = async () => {
	let url = '/api/getAssetsFromConfig?';
	let city = document.getElementById('city').value
	let propertyType = document.getElementById('propertyType').value
	let returnOnInvestment = document.getElementById('roi').value
	assetData = []
	url += '&city=' + city + '&propertyType=' + propertyType + '&returnOnInvestment=' + returnOnInvestment;
	await fetch(url).then((savedDataResponse) => {
		switch (savedDataResponse.status) {
			case (200):
			case (304):
				savedDataResponse.json().then((savedData) => {
					// console.log(savedData)
					assets = savedData.assets
					document.getElementById('condensed-asset-card-j-container').innerHTML = null;
					assets.forEach((asset, index, assets) => { addAssetCards(asset, index) });
				}).catch((err) => {
					console.error("ERROR: ", err);
				});
				break;
			default:
				break;
		}
	}).catch((err) => {
		console.error("ERROR: ", err);
	});
}


let city = null;
let propertyType = null;
let roi = null;
changeCity = () => {
	city = document.getElementById('city').value
	window.postMessage("event_DiscoverAssets_City")
	if (yieldRelatedFlag) {
		let opt = document.createElement("option");
		opt.value = "ResidentialPlot";
		opt.text = "Residential Plot";
		let select = document.getElementById("propertyType");
		select.add(opt)
		yieldRelatedFlag = false
	}
	if (residentialRelatedFlag) {
		let opt = document.createElement("option");
		opt.value = "Yield";
		opt.text = "Yield>7%";
		let select = document.getElementById("roi");
		select.add(opt)
		residentialRelatedFlag = false
	}
	if (city && propertyType && roi) {
		getAssets()
	}
}
changePropertyType = () => {
	propertyType = document.getElementById('propertyType').value
	window.postMessage("event_DiscoverAssets_PropertyType")
	if (propertyType == 'ResidentialPlot') {
		var select = document.getElementById("roi");
		select.remove(3);
		residentialRelatedFlag = true;
	}
	if (propertyType == 'Apartment') {
		if (residentialRelatedFlag) {
			let opt = document.createElement("option");
			opt.value = "Yield";
			opt.text = "Yield>7%";
			let select = document.getElementById("roi");
			select.add(opt)
			residentialRelatedFlag = false
		}
	}
	if (city && propertyType && roi) {
		getAssets()
	}
}
changeROI = () => {
	roi = document.getElementById('roi').value
	if (roi == 'Yield') {
		var select = document.getElementById("propertyType");
		select.remove(2);
		yieldRelatedFlag = true;
	}
	window.postMessage("event_DiscoverAssets_ROI")
	if (city && propertyType && roi) {
		getAssets()
	}
}
discoverLoadingEvent()
window.urls = [];
