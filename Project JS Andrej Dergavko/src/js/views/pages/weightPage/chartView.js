import Chart from 'chart.js';

const chartView = {
  show: function(weightList) {
    const weightChart = document.getElementById("chart-wrapper");
    const wrapper = document.createElement("canvas");
    wrapper.className = "chart__weight-chart";
    wrapper.id = "weight-page-chart";
    weightChart.append(wrapper);

    const chartData = this.convertDataToChart(weightList);
    const minWeight = chartData[0].y;
    const maxWeight = chartData[chartData.length - 1].y;
    this.renderChart(chartData, minWeight, maxWeight);
  },

  convertDataToChart: function(weightList) {
    const chartData = [];

    let dates = Object.keys(weightList);

    dates = dates.sort((a, b) => {
      return +a - +b;
    });

    for (let date of dates) {
      const pointPosition = {};
      pointPosition.x = +date;
      pointPosition.y = +weightList[date];
      chartData.push(pointPosition);
    }
    return chartData;
  },

  renderChart: function(data, min, max) {
    Chart.defaults.global.defaultFontFamily = "Open Sans";
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = "rgb(95, 95, 95)";

    var ctx = document.getElementById("weight-page-chart");
    var weightPageChart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "КГ ",
            data: data,
            backgroundColor: ["rgba(93,117,207,0.5)"],
            borderColor: ["rgb(42,140,227)"],
            borderWidth: 2,
            lineTension: 0,
            pointHitRadius: 20,
            pointBackgroundColor: "rgb(42,140,227)",
            pointRadius: 5,
            pointHoverRadius: 10,
            pointBorderWidth: 0,
            pointBorderColor: "rgba(151,155,227,0.5)",
            pointStyle: "circle"
          }
        ]
      },
      options: {
        tooltips: {
          caretSize: 10,
          xPadding: 16,
          yPadding: 10,
          backgroundColor: "rgba(255, 255, 255, 0.952)",
          titleFontColor: "#555",
          bodyFontColor: "#555",
          titleFontStyle: "normal",
          titleFontFamily: "Open Sans",
          bodyFontFamily: "Open Sans",
          titleMarginBottom: 15,
          cornerRadius: 10,
          displayColors: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
                unitStepSize: 1,
                tooltipFormat: "MM.DD h:mm",
                displayFormats: {
                  day: "DD.MM"
                }
              },
              gridLines: {
                zeroLineColor: "rgba(0, 0, 0, 0.05)",
                color: "rgba(0, 0, 0, 0.3)",
                borderDash: [2, 8],
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                zeroLineColor: "#000",
                color: "rgba(0, 0, 0, 0.3)",
                borderDash: [2, 8]
              },
              ticks: {
                beginAtZero: false,
                stepSize: 1,
                suggestedMax: max + 1.5,
                suggestedMin: min - 1.5,
              }
            }
          ]
        },
        maintainAspectRatio: false
      }
    });
  }
};

export default chartView;
