chrome.alarms.onAlarm.addListener(function(questionIntervalsAlarm) {
  chrome.windows.create({
    url: 'question-page.html',
    type: 'popup',
    width: 870,
    height: 700
    // ,
    // left: 300,
    // top: 350
  });
});

///////////////////From example
//
