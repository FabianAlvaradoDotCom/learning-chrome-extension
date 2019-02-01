document.addEventListener('DOMContentLoaded', event => {
  let clearButton = document.querySelector('[rel="clear"]');
  let cBoxArray = document.querySelectorAll('input[type="checkbox"]');

  chrome.storage.sync.get('subject', subjectsInMemory => {
    //console.log('Objects in memory: ', subjectsInMemory);

    if (Object.keys(subjectsInMemory).length == 0) {
      subjectsInMemory = { subject: [] };
      //console.log('Subjects in memory reformated: ', subjectsInMemory);

      for (let cBoxPos = 0; cBoxPos < cBoxArray.length; cBoxPos += 1) {
        subjectsInMemory.subject.push('');
        //console.log(subjectsInMemory);
      }
      chrome.storage.sync.set(subjectsInMemory, () => {
        chrome.storage.sync.get('subject', newMemory => {
          //console.log(`This is the new memory`, newMemory);
        });
      });
    }

    for (let cBoxPos = 0; cBoxPos < cBoxArray.length; cBoxPos += 1) {
      // console.log(
      //   cBoxArray[cBoxPos].value,
      //   ' + ',
      //   subjectsInMemory.subject[cBoxPos]
      //     ? subjectsInMemory.subject[cBoxPos]
      //     : 'Empty'
      // );

      if (cBoxArray[cBoxPos].value == subjectsInMemory.subject[cBoxPos]) {
        cBoxArray[cBoxPos].checked = true;
      } else {
        cBoxArray[cBoxPos].checked = false;
      }

      cBoxArray[cBoxPos].addEventListener('click', event => {
        toggle(event, cBoxPos, subjectsInMemory);
      });
    }
  });

  function toggle(event, cBoxPos, subjectsInMemory) {
    //console.log(event.target.value, event.target.checked, subjectsInMemory);

    if (event.target.checked) {
      subjectsInMemory.subject[cBoxPos] = event.target.value;
      chrome.storage.sync.set(subjectsInMemory, () => {
        // console.log(
        //   'Saved the following to memory: ',
        //   subjectsInMemory.subject[cBoxPos]
        // );
        chrome.storage.sync.get('subject', newMemory => {
          //console.log(`This is the new memory`, newMemory);
        });
      });
    } else {
      subjectsInMemory.subject[cBoxPos] = '';
      chrome.storage.sync.set(subjectsInMemory, () => {
        // console.log(
        //   'Saved the following to memory: ',
        //   subjectsInMemory.subject[cBoxPos]
        // );

        chrome.storage.sync.get('subject', newMemory => {
          // console.log(`This is the new memory`, newMemory);
        });
      });
    }
  }

  clearButton.addEventListener('click', () => {
    chrome.storage.sync.clear(() => {
      alert('Chrome Sync cleared');

      for (let cBoxPos = 0; cBoxPos < cBoxArray.length; cBoxPos += 1) {
        cBoxArray[cBoxPos].checked = false;
      }
    });
  });
});
