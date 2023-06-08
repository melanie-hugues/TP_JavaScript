function addTemperatureEntry(date, temperature){
  let historique = JSON.parse(localStorage.getItem("historique"));
  historique.push({timeStamp:date, temp:temperature});
  localStorage.setItem("historique", JSON.stringify(historique));
}

class Capteur {
  constructor() {
    this.tableau = [];
    this.tableauIndex = 0;
    this.valueContainer = document.querySelector('#value-container');
    this.georges = document.querySelector('#georges');
    this.messageFroid = '<div id="message">Brrrrrrr, un peu froid ce matin, mets ta cagoule !</div>';
    this.messageChaud = '<div id="message">Caliente ! Vamos a la playa, ho hoho hoho !!</div>';

    for (let i = 0; i < 20; i++) {
      this.tableau.push(this.getRandomInt(-10, 40));
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  updateCurrentTemperature(temperature) {
    this.valueContainer.innerHTML = temperature + ' °C';
    this.valueContainer.classList.remove('bordure-bleu', 'bordure-verte', 'bordure-orange', 'bordure-rouge');

    if (temperature >= -10 && temperature < 0) {
      this.valueContainer.classList.add('bordure-bleu');
      this.georges.insertAdjacentHTML('afterbegin', this.messageFroid);
    } else if (temperature >= 0 && temperature < 20) {
      this.valueContainer.classList.add('bordure-verte');
    } else if (temperature >= 20 && temperature < 30) {
      this.valueContainer.classList.add('bordure-orange');
    } else if (temperature >= 30 && temperature <= 40) {
      this.valueContainer.classList.add('bordure-rouge');
      this.georges.insertAdjacentHTML('afterbegin', this.messageChaud);
    }
  }

  addToHistoricalData() {
    let historique = JSON.parse(localStorage.getItem("historique"));
    const historicalTable = document.querySelector('#historique-table');
    document.querySelector('#historique-table tbody').innerHTML = "";

    historique.forEach(element => {
      const row = historicalTable.insertRow(1);
      const dateCell = row.insertCell(0);
      const temperatureCell = row.insertCell(1);
      dateCell.textContent = element.timeStamp;
      temperatureCell.textContent = element.temp + ' °C';
    });
  }

  fetchSensorData() {
    fetch('https://hothothot.dog/api/capteurs/exterieur')
      .then(response => response.json()
        .then(data => {
          console.log(data);
          const temperature = data.capteurs[0].Valeur;
          const date = new Date().toLocaleString();

          this.updateCurrentTemperature(temperature);
          addTemperatureEntry(date, temperature);
          this.addToHistoricalData();
          this.tableau.unshift(temperature);

          if (this.tableau.length > 20) {
            this.tableau.pop();
          }
      }))
      .catch(error => {
        console.log('Error fetching sensor data:', error);
      });
  }

  startFetchingData() {
    this.fetchSensorData();
    setInterval(() => {
      this.fetchSensorData();
    }, 2000);
  }
}

const capteur = new Capteur();
capteur.startFetchingData();

openTab(null, "current-data");
if(localStorage.getItem("historique") == ""){
  localStorage.setItem("historique", JSON.stringify([]));
};
console.log(localStorage.getItem("historique"));


function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablink');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }

  document.getElementById(tabName).style.display = 'block';
  document.getElementById(tabName).classList.add('active');
}

document.getElementById('current-data').style.display = 'block';
document.getElementsByClassName('tablink')[0].classList.add('active');

function addToHistorique(date, temperature) {
  const historiqueTable = document.getElementById('historique-table');
  const tbody = historiqueTable.getElementsByTagName('tbody')[0];
  
  const newRow = document.createElement('tr');
  const dateCell = document.createElement('td');
  const temperatureCell = document.createElement('td');

  dateCell.textContent = date;
  temperatureCell.textContent = temperature;

  newRow.appendChild(dateCell);
  newRow.appendChild(temperatureCell);

  tbody.appendChild(newRow);
}