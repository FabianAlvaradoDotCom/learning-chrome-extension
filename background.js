chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ ['questionFrequencyTime']: 30 }, () => {
    chrome.storage.sync.get('questionFrequencyTime', newFreqGotten => {
      console.log(
        `Frequency was created chrome.runtime.onInstalled from scratch and set to: `,
        newFreqGotten
      );
      chrome.browserAction.setBadgeText({
        text: newFreqGotten.questionFrequencyTime + ' m' || '30 m'
      });
    });
  });
});

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

chrome.runtime.onStartup.addListener(function() {
  // alert('On startup');
  chrome.storage.sync.get('questionFrequencyTime', newFreqGotten => {
    chrome.browserAction.setBadgeText({
      text: newFreqGotten.questionFrequencyTime + ' m' || '30 m'
    });
  });
});
