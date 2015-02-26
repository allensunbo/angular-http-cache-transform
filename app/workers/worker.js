onmessage = function (e) {

  // mimic long computation
  setTimeout(function () {
    var data = JSON.parse(e.data);
    // console.log(result);
    var weather = data.weather[0].description;
    var wind = data.wind;
    var workerResult = {
      name: data.name, weather: weather, wind: wind
    };

    postMessage(JSON.stringify(workerResult));

  }, 500);
}
