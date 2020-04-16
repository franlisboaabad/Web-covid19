var nueva_url = "https://covid-ams.operanewsapp.com/vmact/activities/covid19/todaydata?country=pe&language=es";
var url_actual = "https://corona-api.com/countries/PE";


function Datos_generales(url) {

  let confirmados = document.getElementById('confirmed');
  let recuperados = document.getElementById('recovered');
  let muertos = document.getElementById('deaths');

  fetch(url)
    .then(response => response.json())
    .then(data => {

      //console.log(data['data']);

      for (const datos of data['data']) {

        //console.log(datos);
        confirmados.innerHTML = datos.confirm_total;
        recuperados.innerHTML = datos.cure_total;
        muertos.innerHTML = datos.died_total;
      }
    });
};

function Datos_piechart(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (const datos of data['data']) {

        //console.log(datos);
        var pdata = [
          {
            value: datos.confirm_total,
            color: "#FDB45C",
            highlight: "#FDB45C",
            label: "Confirmados"
          },
          {
            value: datos.cure_total,
            color: "#009688",
            highlight: "#009688",
            label: "Recuperados"
          },
          {
            value: datos.died_total,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Muertes"
          }
        ]

      }

      var ctxp = $("#pieChartDemo").get(0).getContext("2d");
      var pieChart = new Chart(ctxp).Pie(pdata);
    });
}

function Datos_linechart(url) {

  fetch(url)
    .then(response => response.json())
    .then(({ data }) => {

      const timeline = data.timeline;

      const dates = [];
      const confirmados = [];
      const recuperados = [];
      const muertes = [];

      timeline.forEach(element => {
        dates.push(element.date);
      });


      timeline.forEach(element => {
        confirmados.push(element.confirmed);
      });

      timeline.forEach(element => {
        recuperados.push(element.recovered);
      });

      timeline.forEach(element => {
        muertes.push(element.deaths);
      });

      var data = {
        labels: dates.sort(),
        datasets: [
          {
            label: "Casos confirmados",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(255, 209, 51)",
            pointColor: "rgba(255, 209, 51)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255, 209, 51)",
            data: confirmados.sort((a, b) => a - b)
          },
          {
            label: "Casos Recuperados",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(28, 206, 66 )",
            pointColor: "rgba(28, 206, 66 )",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(28, 206, 66 )",
            data: recuperados.sort((a, b) => a - b)
          },
          {
            label: "Fallecidos",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(255, 51, 88 )",
            pointColor: "rgba(255, 51, 88 )",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(255, 51, 88 )",
            data: muertes.sort((a, b) => a - b)
          }

        ],
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }

        }

      };
      var ctxl = $("#lineChartDemo").get(0).getContext("2d");
      var lineChart = new Chart(ctxl).Line(data);

    })
    .catch((error) => console.log(error))
}

function Summary(url) {
  let confirmados = document.getElementById('nuevos-confirmados');
  let recuperados = document.getElementById('nuevos-recuperados');
  let muertes = document.getElementById('nuevas-muertes');

  //indices

  let icritico = document.getElementById('icritico');
  let irecuperacion = document.getElementById('irecuperacion');
  let imuertes = document.getElementById('imuertes');

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let today = data['data']['timeline'][0];
      let indices = data['data']['latest_data'];

      if (today.new_confirmed === 0 && today.new_recovered === 0 && today.new_deaths === 0) {
        today = data['data']['timeline'][1];
        confirmados.innerHTML = today.new_confirmed;
        recuperados.innerHTML = today.new_recovered;
        muertes.innerHTML = today.new_deaths;
      }

      confirmados.innerHTML = today.new_confirmed;
      recuperados.innerHTML = today.new_recovered;
      muertes.innerHTML = today.new_deaths;

      indice_recuperado = indices['calculated'].recovery_rate;
      indice_muertes = indices['calculated'].death_rate;

      icritico.innerHTML = indices.critical;
      irecuperacion.innerHTML = indice_recuperado.toFixed(2) + ' %';
      imuertes.innerHTML = indice_muertes.toFixed(2) + ' %';


    });
}

Datos_generales(nueva_url);
Datos_piechart(nueva_url);
Datos_linechart(url_actual);
Summary(url_actual);








