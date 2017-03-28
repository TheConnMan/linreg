var express = require('express');
var moment = require('moment');
var regression = require('regression');
var stats = require('stats-lite')

var app = express();

app.use(express.static('public'));

var day = 24 * 3600 * 1000;
var fiveMin = 300 * 1000;

var trainingPeriod = 10;
var stdevs = 3;

app.get('/data', function (req, res) {
  var dayAgo = new Date(Date.now() - day);
  var dates = Array.apply(null, Array(day / fiveMin)).map((i, period) => {
    return new Date(dayAgo.getTime() + period * fiveMin);
  });
  var rawData = dates.map(date => {
    return {
      date: moment(date).format('YYYY-MM-DD HH:mm'),
      Raw: 100 * Math.random()
    };
  });
  var data = rawData.map((datum, i) => {
    if (i >= trainingPeriod) {
      var rawVals = rawData.slice(i - trainingPeriod, i + 1).map(val => {
        return val.Raw;
      });
      var training = rawVals.map((val, j) => {
        return [j, val];
      });
      var result = regression('linear', training);
      datum.Expected = result.points[trainingPeriod][1];

      var stdev = stats.stdev(rawVals);
      datum.Upper = datum.Expected + stdevs * stdev;
      datum.Lower = datum.Expected - stdevs * stdev;
    }
    return datum;
  });
  res.send(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
