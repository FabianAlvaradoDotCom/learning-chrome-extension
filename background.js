chrome.alarms.onAlarm.addListener(function(alarma) {
  chrome.windows.create({ url: 'index.html', type: 'popup' });
});
