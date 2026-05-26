const slider = document.getElementById("yearSlider");
const yearValue = document.getElementById("yearValue");

const co2 = document.getElementById("co2");
const temp = document.getElementById("temp");
const bio = document.getElementById("bio");

const trees = document.querySelectorAll(".tree");
const forest = document.getElementById("forest");

const ctx = document.getElementById("desmatamentoChart");

let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Área Florestal (%)",
      data: [],
      borderWidth: 3,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});

function updateSimulation(year) {

  yearValue.textContent = year;

  const progress = year - 2020;

  const forestPercent = Math.max(100 - progress * 1.2, 5);

  const deadTrees = Math.floor((100 - forestPercent) / 8);

  trees.forEach((tree, index) => {

    if(index < deadTrees){
      tree.classList.add("dead");
      tree.textContent = "🪵";
    } else {
      tree.classList.remove("dead");
      tree.textContent = "🌳";
    }

  });

  co2.textContent = `${350 + progress * 3} ppm`;

  temp.textContent = `${(1 + progress * 0.03).toFixed(1)}°C`;

  bio.textContent = `${Math.max(100 - progress * 1.1, 10).toFixed(0)}%`;

  forest.style.background =
    forestPercent < 50
      ? "linear-gradient(to top, #8b5a2b, #c68642)"
      : "linear-gradient(to top, #3b7d2b, #6dbb5d)";

  updateChart(year, forestPercent);

}

function updateChart(year, value) {

  if (!chart.data.labels.includes(year)) {

    chart.data.labels.push(year);

    chart.data.datasets[0].data.push(value);

    chart.update();

  }

}

slider.addEventListener("input", () => {

  chart.data.labels = [];
  chart.data.datasets[0].data = [];

  for(let y = 2020; y <= slider.value; y += 10){

    const progress = y - 2020;

    const forestPercent = Math.max(100 - progress * 1.2, 5);

    chart.data.labels.push(y);

    chart.data.datasets[0].data.push(forestPercent);

  }

  chart.update();

  updateSimulation(parseInt(slider.value));

});

updateSimulation(2020);