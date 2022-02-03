document.getElementById("invamt").innerHTML = document.getElementById("ticketsize").value;
document.getElementById("approxreturn").innerHTML = document.getElementById("ticketsize").value * 1.6053;
document.getElementById("paynow").innerHTML = document.getElementById("ticketsize").value * 0.01;
const ip = document.getElementById("ticketsize");
const op = document.getElementById("invamt");

const inputHandler = function (e) {
    op.innerHTML = e.target.value;
    document.getElementById("approxreturn").innerHTML = e.target.value * 1.6053;
    document.getElementById("paynow").innerHTML = e.target.value * 0.01;
};
ip.addEventListener("input", inputHandler);

var modal = document.getElementById("modal");
// var investHeader = document.getElementById("invest-header");
var investHero = document.getElementById("invest-hero");
var cancel = document.getElementById("cancel");
// investHeader.onclick = function () {
//   modal.style.display = "block";
// };
investHero.onclick = function () {
    // window.location.href = "https://aasthy.com?assetInvestment=303859769";
    window.postMessage('showLoginModal');
    // modal.style.display = "block";
};
cancel.onclick = function () {
    modal.style.display = "none";
};
window.urls = [];
