chrome.alarms.onAlarm.addListener(function(alarma) {
  chrome.windows.create({
    url: 'index.html',
    type: 'popup',
    width: 400,
    height: 200,
    left: 300,
    top: 350
  });
});
