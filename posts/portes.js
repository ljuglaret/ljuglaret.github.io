function sommeDes(nombreDeDes,nombreLancers){
    var i = 0;
    var res = [];
    for (let i = 0 ; i <= 15 ; i ++) {
        res[i] = 0 ;
    }
    while (i < nombreLancers) {
        var de =  [];
        for (var d = 0 ; d < nombreDeDes ; d ++ ) {
            de.push( Math.floor(Math.random() * 6) + 1);
        }
        for(let i = nombreDeDes ; i <= 6*nombreDeDes ; i ++){
            if (i == de.reduce((acc,val) => acc + val,0) ){
                res[i - nombreDeDes] +=  1;
            }
        }
        i++;
      }
    res = res.map((elt) => elt*100 / nombreLancers); 
    return res;
}

function simulationDesSomme3(){
    var dataArr = [  ['Somme des dés', '' ]];
    var tab = sommeDes(3,700);
    for(let i = 0 ; i <= 15 ; i ++) {
        dataArr.push([(i+3), tab[i]]);
    }
    return dataArr;
}

function randomIncl(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

  var materialOptions = {
    width: 700,
    chart: {
      title: 'Simulation d un lancer de 3 dés',
      subtitle: 'sur 1000 expériences'
    },
    series: {
      0: { axis: 'y' }, // Bind series 0 to an axis named 'distance'.
    },
    axes: {
      y: {
        y: {label: 'pourcentage'}, // Left y-axis.
      }
    },
    theme: 'material' ,
    hAxis: { ticks: [2,4,5,6,8,10] },
    vAxis: { ticks: [2,4,5,6,8,10] }

  };


  
google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(drawStuff1);
  

function drawStuff(choix) {

  var chartDiv = document.getElementById('chart_div');
  var chartDiv2 = document.getElementById('chart_div');
  chartDiv2.id = "chart_div2";
  var button = document.getElementById('relancerSim');

  function drawMaterial2(){
      var data = google.visualization.arrayToDataTable(alea(choix));
      var nouveauMateriel = new google.charts.Bar(chartDiv2);
      nouveauMateriel.draw(data, google.charts.Bar.convertOptions(materialOptions));
      var parent = chartDiv.parentNode; 
      parent.replaceChild(chartDiv2 ,chartDiv);
      button.onclick = drawMaterialChart;
  }

  function drawMaterialChart() {
      var data = google.visualization.arrayToDataTable(alea(choix));
      var materialChart = new google.charts.Bar(chartDiv);
      materialChart.draw(data, google.charts.Bar.convertOptions(materialOptions));
      button.onclick = drawMaterial2;
  }
  drawMaterialChart();
};

function drawStuff1(){
drawStuff(1);
}

function alea(choix) {
return  ( simulationDesSomme3());
}



