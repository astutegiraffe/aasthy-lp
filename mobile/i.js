let xValues = [];
let chart = {};
let yValues = [];

let getChartConfig = (xValues, yValues) => {
    let yAxisMin = Math.floor((Math.min(...yValues) / 500) - 1) * 500;
    let yAxisMax = Math.ceil((Math.max(...yValues) / 500 + 1)) * 500;
    let stepSize = Math.ceil((yAxisMax - yAxisMin) / 4); return {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                borderColor: "#4E0668",
                borderJoinStyle: 'miter',
                pointStyle: 'none',
                tension: 0.5,
                borderWidth: 1,
                data: yValues,
                label: "Price Per Square Foot"
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            },
            title: {
                display: false,
            },
            elements: {
                point: {
                    radius: 0
                },
            },
            scales: {
                x: {
                    type: 'time',
                    display: true,
                    time: {
                        tooltipFormat: 'dd MMM, yyyy',
                        unit: 'month'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 4,
                        maxRotation: 0,
                        minRotation: 0,
                        padding: 5
                    },
                    grid: {
                        drawBorders: false,
                        drawOnChartArea: false,
                        borderWidth: 2,
                        tickLength: 0,
                        borderColor: '#535B62',
                        color: '#535B62'
                    },
                },
                y: {
                    type: 'linear',
                    display: true,
                    min: yAxisMin,
                    max: yAxisMax,
                    ticks: {
                        callback: function (value, index, values) {
                            return '₹' + (value > "9999999" ? (Number(value) / 10000000).toFixed(1) + 'Cr' : (value > "99999" ? (Number(value) / 100000).toFixed(1) + 'L' : (Number(value) / 1000).toFixed(1) + 'K'));
                        },
                        padding: 5,
                        stepSize: stepSize
                    },
                    grid: {
                        drawBorders: false,
                        drawOnChartArea: false,
                        borderWidth: 2,
                        borderColor: '#535B62',
                        color: '#535B62'
                    },
                }
            },
        }
    }
}

let getPercentage = (currentValue, startValue) => {
    let percentage = (100 * (currentValue - startValue) / startValue).toFixed(2);
    return ((percentage >= 0) ? ` (<span style = "color: green;">${percentage} %</span>)`
        : ` (<span style = "color:red;">${percentage} %</span>)`)
}

let populatePricePercentage = (xValues, yValues) => {
    let startValue = yValues[0];
    let currentValue = yValues[yValues.length - 1];
    document.getElementById("rei-price-cagr-value").innerHTML = "<b>₹ " + currentValue.toFixed(0) + "</b>" + getPercentage(currentValue, startValue);
}

let timeRangeFilter = (xValues, yValues, timeRange) => {
    let months;
    let filteredxValues = [];
    let filteredyValues = [];
    switch (timeRange) {
        case '3M':
            months = 3;
            break;
        case '6M':
            months = 6;
            break;
        case '1Y':
            months = 12;
            break;
        default:
            return { filteredxValues: xValues, filteredyValues: yValues };
    }
    let lastDate = new Date(xValues[xValues.length - 1]);
    let startDate = new Date(lastDate.setMonth(lastDate.getMonth() - months));
    for (let i in xValues) {
        if (xValues[i] > startDate) {
            filteredxValues.push(xValues[i]);
            filteredyValues.push(yValues[i]);
        }
    }
    return { filteredxValues, filteredyValues };
}

let highlightTimeRange = (timeRange) => {
    let timeRangeElements = document.querySelectorAll(".rei-time-range-value");
    for (let timeRangeElement of timeRangeElements) {
        timeRangeElement.style.fontWeight = (timeRangeElement.textContent === timeRange) ? "bold" : "normal";
        timeRangeElement.style.color = (timeRangeElement.textContent === timeRange) ? "#4E0668" : "#EBA1D7";
    }
}

let populateGraph = (xValues, yValues, timeRange) => {
    let chartContainer = document.getElementById("rei-chart-container");
    let canvas = document.createElement("canvas");
    chartContainer.removeChild(document.getElementById("rei-chart"));
    canvas.setAttribute("id", "rei-chart");
    chartContainer.appendChild(canvas);
    let ctx = document.getElementById("rei-chart");
    let filteredValues = timeRangeFilter(xValues, yValues, timeRange);
    let filteredxValues = filteredValues.filteredxValues;
    let filteredyValues = filteredValues.filteredyValues;
    highlightTimeRange(timeRange);
    populatePricePercentage(filteredxValues, filteredyValues);
    filteredyValues = filteredyValues.map(e => e.toFixed(0));
    chart = new Chart(ctx, getChartConfig(filteredxValues, filteredyValues));
}

let showLoadingScreen = () => {
    let loader = document.querySelector("#loader");
    loader.classList.add("display");
    document.querySelector("#rei-chart-container").style.opacity = 0.2;
}

let hideLoadingScreen = () => {
    let loader = document.querySelector("#loader");
    loader.classList.remove("display");
    document.querySelector("#rei-chart-container").style.opacity = 1;
}

let getToken = () => {
    const SECRET = 'noM13Reff@riGetutsAyhts@A';
    const epochTime = new Date().getTime();
    return window.btoa(unescape(encodeURIComponent(SECRET + epochTime)));
}

let hideTooltip = () => {
    if (chart && chart.tooltip) {
        chart.tooltip.setActiveElements([], { x: 0, y: 0 });
        chart.update();
    }
}

let populateREI = (reiIndexName, timeRange) => {
    showLoadingScreen();
    let token = getToken();
    fetch(`https://reimon.in/api2/getRealEstateIndices/?reiIndexName=${reiIndexName}`, {
        method: "GET",
        headers: { token: token },
    })
        .then(response => response.json())
        .then(result => {
            xValues = Object.keys(result);
            for (let i in xValues) {
                xValues[i] = new Date(new Date(xValues[i].replace(/-/g, "/")));
            }
            yValues = [];
            for (let j in result) {
                yValues.push(result[j].median);
            }
            hideLoadingScreen();
            populateGraph(xValues, yValues, timeRange);
        })
        .catch(error => {
            console.error("error", error);
            document.body.innerHTML = "";
        })
}
window.onload = function () {
    console.log('hey')
    let selectedREIIndexName = document.getElementById("rei-dropdown");
    let timeRangeElements = document.getElementsByClassName("rei-time-range-value");
    let selectedTimeRange = "6M";
    populateREI(selectedREIIndexName.value, selectedTimeRange);

    selectedREIIndexName.addEventListener("change", (event) => {
        populateREI(event.target.value, selectedTimeRange);
    });
    for (let element of timeRangeElements) {
        element.addEventListener("click", (event) => {
            selectedTimeRange = element.innerHTML;
            populateGraph(xValues, yValues, selectedTimeRange);
        })
    }
    document.addEventListener('click', (event) => {
        if (event.target === 'rei-chart') {
            hideTooltip();
        }
    });
}

window.urls = ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.js",
    "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.js",
    "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"];
