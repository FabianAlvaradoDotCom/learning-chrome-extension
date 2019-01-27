chrome.alarms.onAlarm.addListener(function(alarma) {
  chrome.windows.create({
    url: 'index.html',
    type: 'popup',
    width: 500,
    height: 400,
    left: 300,
    top: 350
  });
});
