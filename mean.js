const slider = document.getElementById("yearSlider")
const yearText = document.getElementById("year")
const forestPercent = document.getElementById("forestPercent")
const temperature = document.getElementById("temperature")
const biodiversity = document.getElementById("biodiversity")
const co2 = document.getElementById("co2")
const forest = document.getElementById("forest")
const pollution = document.getElementById("pollution")
const animals = document.getElementById("animals")
const message = document.getElementById("message")
const playBtn = document.getElementById("playBtn")
const restoreBtn = document.getElementById("restoreBtn")
const sun = document.getElementById("sun")

for(let i = 0; i < 45; i++){

  const tree = document.createElement("div")
  tree.classList.add("tree")
  tree.innerHTML = "🌳"
  forest.appendChild(tree)

}

const trees = document.querySelectorAll(".tree")

const ctx = document.getElementById("chart")

const chart = new Chart(ctx, {
  type:"line",
  data:{
    labels:[2020],
    datasets:[{
      label:"Área Florestal",
      data:[100],
      borderWidth:4,
      tension:0.4,
      fill:true
    }]
  },
  options:{
    responsive:true,
    plugins:{
      legend:{
        labels:{
          color:"black",
          font:{ size:16 }
        }
      }
    },
    scales:{
      y:{
        min:0,
        max:100
      }
    }
  }
})

function updateWorld(year){
  cha