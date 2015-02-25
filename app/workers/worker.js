/**
 * Created by bsun on 2/25/15.
 */
onmessage = function (e) {
  var workerResult = 'Result: ' + (e.data);
  // mimic long computation
  setTimeout(function () {
    postMessage(workerResult.toUpperCase());
  }, 2000);
}
