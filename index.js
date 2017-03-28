var express = require('express');
var moment = require('moment');

var app = express();

app.use(express.static('public'));

var day = 24 * 3600 * 1000;
var fiveMin = 300 * 1000;

app.get('/data', function (req, res) {
  var dayAgo = new Date(Date.now() - day);
  var dates = Array.apply(null, Array(day / fiveMin)).map((i, period) => {
    return new Date(dayAgo.getTime() + period * fiveMin);
  });
  var data = dates.map(date => {
    return {
      date: moment(date).format('YYYY-MM-DD HH:mm'),
      Raw: 100 * Math.random()
    };
  });
  res.send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
