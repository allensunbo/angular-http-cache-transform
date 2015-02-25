onmessage = function (e) {
  var workerResult = (e.data);
  // mimic long computation
  setTimeout(function () {
    postMessage(workerResult);
  }, 500);
}
