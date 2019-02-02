//Initial value for the alarms to be set
//alert('Aqui se abre la config de alertas');

let frequency;

chrome.storage.sync.get('questionFrequencyTime', freqGotten => {
  frequency = Number(freqGotten.questionFrequencyTime) || 30;
  chrome.alarms.create('questionIntervals', {
    delayInMinutes: 1,
    periodInMinutes: frequency
  });
});

// If the options page change, the new interval will replace the initial

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log('Time updated');
  chrome.storage.sync.get('questionFrequencyTime', newFreqGotten => {
    frequency = Number(newFreqGotten.questionFrequencyTime);
    chrome.alarms.create('questionIntervals', {
      delayInMinutes: 1,
      periodInMinutes: frequency
    });
    console.log(
      `This is the new time set: `,
      newFreqGotten.questionFrequencyTime,
      `...[comments from alarma-time-config.js]`
    );
  });
});

// chrome.alarms.create('questionIntervals', {
//   delayInMinutes: 1,
//   periodInMinutes: 30
// });
