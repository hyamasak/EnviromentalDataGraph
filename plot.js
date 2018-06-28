// データベースの参照を準備
var firebaseRef = new Firebase("https://firebase-project.firebaseio.com"); // ... 1
var messagesRef = firebaseRef.child('sensor').orderByChild('timestamp').limitToLast(6 * 24  * 7); // ... 2

var ctx_p = document.getElementById("pressure").getContext('2d');
var chart_p = new Chart(ctx_p, {
  type: 'line',
  data: {
    datasets: [{
      data: [],
      label: '気圧',
      fill: false,
      lineTension: 0.1,
      borderColor: "#FF0000",
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
    }]
  },
  options: {
    scales: {
      xAxes:[{type: 'time', distribution: 'series'}],
    },
  }
});
var ctx_t = document.getElementById("temparature").getContext('2d');
var chart_t = new Chart(ctx_t, {
  type: 'line',
  data: {
    datasets: [{
      data: [],
      label: '温度(気圧センサー)',
      fill: false,
      lineTension: 0.1,
      borderColor: "#FF0000",
      backgroundColor: 'rgba(255, 0, 0, 0.5)',
    }, {
      data: [],
      label: '温度(湿度センサー)',
      fill: false,
      lineTension: 0.1,
      borderColor: "#0000FF",
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    }]
  },
  options: {
    scales: {
      xAxes:[{type: 'time', distribution: 'series'}],
    },
  }
});
var ctx_h = document.getElementById("humidity").getContext('2d');
var chart_h = new Chart(ctx_h, {
  type: 'line',
  data: {
    datasets: [{
      data: [],
      label: '湿度',
      fill: false,
      lineTension: 0.1,
      borderColor: "#0000FF",
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
    }]
  },
  options: {
    scales: {
      xAxes:[{type: 'time', distribution: 'series'}],
    },
  }
});

messagesRef.on('value', function(snapshot) {
  chart_t.update();
  chart_p.update();
  chart_h.update();
});

messagesRef.on('child_added', function(snapshot) { // ... 3
  var msg = snapshot.val();
  var date = new moment(msg.timestamp, 'X');
  chart_p.data.datasets[0].data.push(msg.pressure);
  chart_p.data.labels.push(date);
  chart_h.data.datasets[0].data.push(msg.humidity);
  chart_h.data.labels.push(date);
  chart_t.data.datasets[0].data.push(msg.tempp);
  chart_t.data.datasets[1].data.push(msg.temph);
  chart_t.data.labels.push(date);
});