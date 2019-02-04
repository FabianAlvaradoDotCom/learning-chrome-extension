//Initial value for the alarms to be set
//alert('Aqui se abre la config de alertas');

let frequency;

chrome.storage.sync.get('questionFrequencyTime', freqGotten => {
  //
  // The following line updates the badge text to the updated frequency question time
  chrome.browserAction.setBadgeText({
    text: freqGotten.questionFrequencyTime + ' m' || '30 m'
  });
  frequency = Number(freqGotten.questionFrequencyTime) || 30;
  chrome.alarms.create('questionIntervals', {
    delayInMinutes: frequency,
    periodInMinutes: frequency
  });
});

// If the options page change, the new interval will replace the initial

chrome.storage.onChanged.addListener(function(changes, namespace) {
  //console.log('Time updated');

  chrome.storage.sync.get('questionFrequencyTime', newFreqGotten => {
    // The following line updates the badge text to the updated frequency question time
    chrome.browserAction.setBadgeText({
      text: newFreqGotten.questionFrequencyTime + ' m' || '30 m'
    });
    frequency = Number(newFreqGotten.questionFrequencyTime) || 30;
    chrome.alarms.create('questionIntervals', {
      delayInMinutes: frequency,
      periodInMinutes: frequency
    });
    console.log(
      `This is the new time set: `,
      newFreqGotten.questionFrequencyTime,
      `...[comments from alarma-time-config.js]`
    );
  });
});
