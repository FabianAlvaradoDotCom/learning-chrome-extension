'use strict';

(function() {
  //Execute only when page has been read
  document.addEventListener('DOMContentLoaded', () => {
    //Declare variables
    let frequencyField = document.querySelector('[rel="frequency"]');
    let saveFrequencyButton = document.querySelector('[rel="saveFrequency"]');
    let clearButton = document.querySelector('[rel="clear"]');
    let cBoxArray = document.querySelectorAll('input[type="checkbox"]');

    //Add event listeners
    saveFrequencyButton.addEventListener('click', saveFrequency);
    clearButton.addEventListener('click', clearAllStorage);

    // Reading memory on Chrome to update checkboxes and frequency of the UI to previous user selections
    // Or also after a clear chrome storage, it sets it all to default
    renderingCheckboxesUIStatus();
    renderingFrequencyUIStatus();

    // Function to READ and SYNC storage on Chrome to update checkboxes of the UI for previous user selections
    function renderingCheckboxesUIStatus() {
      //
      // Start by checking if any 'subject' at all of this extension has been stored in memory,
      // and from that we execute a callback function
      chrome.storage.sync.get('subject', subjectsInMemory => {
        // We check IF the retrieved 'subjectsInMemory' object has any content, if not, we create an empty array
        if (Object.keys(subjectsInMemory).length == 0) {
          console.log('no memory');
          subjectsInMemory = { subject: [] };
          console.log(subjectsInMemory);

          // We count the number of checkboxes 'subject' of the UI, and for each of them
          // we create an empty array element and add to the empty array of subjects
          // we got from chrome sync storage

          for (let cBoxPos = 0; cBoxPos < cBoxArray.length; cBoxPos += 1) {
            if (cBoxPos == 0) {
              subjectsInMemory.subject.push('Welcome');
            } else {
              subjectsInMemory.subject.push('');
            }
          }
          console.log(subjectsInMemory);

          // Once we have an array that corresponds with nunmber of UI subjects checkboxes, we
          // save that object to chrome storage
          chrome.storage.sync.set(subjectsInMemory, () => {
            chrome.storage.sync.get('subject', newMemory => {
              console.log(
                `Array of subjecs just created and retrieved from storage`,
                newMemory
              );
            });
          });
        }

        // Now that we have an array of subjects, no matter if is a just created array or one
        // obtained from chrome storage...

        console.log(subjectsInMemory);

        // We compare the value of all checkboxes in UI against the content of every
        // subjects array in the same position, we assign checked states and add listeners to checkboxes

        for (let cBoxPos = 0; cBoxPos < cBoxArray.length; cBoxPos += 1) {
          if (cBoxArray[cBoxPos].value == subjectsInMemory.subject[cBoxPos]) {
            //
            // If the value of checkbox and content of array element are the same
            // we set the checkbox checked state to TRUE
            cBoxArray[cBoxPos].checked = true;

            // If the value of checkbox and content of array element are NOT the same
            // we set the checkbox checked state to FALSE
          } else {
            cBoxArray[cBoxPos].checked = false;
          }

          // For each of the subject checkboxes, we add a listener that will call
          // a function for managing checkboxes in the UI and store data to chrome
          // It is important to add the listenr only if it does not have it so
          // it does not duplicate it, for that we add a data attribute only once
          if (cBoxArray[cBoxPos].dataset.hasEventListener) {
            console.log(cBoxArray[cBoxPos].value, ' tiene dataset');
          } else {
            console.log(cBoxArray[cBoxPos].value, ' NO tiene dataset');
            cBoxArray[cBoxPos].addEventListener('click', event => {
              updatingCheckboxesUIStatus(event, cBoxPos, subjectsInMemory);
            });
            cBoxArray[cBoxPos].dataset.hasEventListener = true;
          }
        }
      });
    }

    // Function for managing checkboxes in the UI and store data to chrome upon checked
    // subject checkboxes
    function updatingCheckboxesUIStatus(event, cBoxPos, subjectsInMemory) {
      console.log(event.target);
      //
      //Verify if the checkbox that triggered this event listener is checked
      if (event.target.checked) {
        //
        // Depending the position of the checkbox in the checkbox array, we will save its value
        // in the same position of the chrome storage subjects array
        subjectsInMemory.subject[cBoxPos] = event.target.value;
        chrome.storage.sync.set(subjectsInMemory, () => {
          chrome.storage.sync.get('subject', newMemory => {
            console.log(newMemory);
          });
        });
      } else {
        // Depending the position of the checkbox in the checkbox array, as it is not checked
        // we will save an empty string in the same position but of the chrome storage subjects array
        subjectsInMemory.subject[cBoxPos] = '';
        chrome.storage.sync.set(subjectsInMemory, () => {
          chrome.storage.sync.get('subject', newMemory => {
            console.log(newMemory);
          });
        });
      }
    }

    // Function for READing and SYNChing storage to chrome to update the frequency field on the UI for previous user selections
    function renderingFrequencyUIStatus() {
      //
      // First we check if any previous data exists in Chrome
      chrome.storage.sync.get('questionFrequencyTime', frequencyGotten => {
        console.log(
          `Frequency just retreieve before processing`,
          frequencyGotten
        );
        //
        // If not data existed previously, we will set the default 30 and save to chrome storage
        if (Object.keys(frequencyGotten).length == 0) {
          console.log('No time has been set');
          chrome.storage.sync.set({ ['questionFrequencyTime']: 30 }, () => {
            chrome.storage.sync.get('questionFrequencyTime', newFreqGotten => {
              frequencyField.value = newFreqGotten.questionFrequencyTime;
              console.log(
                `Frequency was created from scratch and set to: `,
                newFreqGotten
              );
            });
          });
        } else {
          //
          // If previous frequency data existed, we just update UI to reflect the number
          console.log(`Frequency already existed: `, frequencyGotten);
          frequencyField.value = frequencyGotten.questionFrequencyTime;
        }
      });
    }

    // Function to save on button CLICK on chrome storage the minutes entered by the user that will define
    // the frequency of repetitions of popup page
    function saveFrequency() {
      //
      // As soon as the save button is clicked, we save the value entered to the field to chrome storage
      chrome.storage.sync.set(
        { ['questionFrequencyTime']: frequencyField.value },

        // And as callback function we get the just saved data from chrome storage
        () => {
          console.log(
            `This is what was saved to chrome storage: `,
            frequencyField.value
          );
          chrome.storage.sync.get('questionFrequencyTime', newFreqGotten => {
            alert(
              'New intervals successfully updated, ' +
                newFreqGotten.questionFrequencyTime +
                ' launching question now...'
            );
            console.log(new Date());
            console.log(
              'New intervals successfully updated, ' +
                newFreqGotten.questionFrequencyTime +
                ' launching question now...'
            );

            // Then as a way to confirm the updates, we launch the question page right away.
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
        }
      );
    }

    // We create a function to clear all data in chrome storage
    function clearAllStorage() {
      chrome.storage.sync.clear(() => {
        alert('Chrome Sync cleared');
        renderingCheckboxesUIStatus();
        renderingFrequencyUIStatus();
      });
    }
  });

  // let justclear = document
  //   .querySelector('[rel="justclear"]')
  //   .addEventListener('click', () => {
  //     chrome.storage.sync.clear();
  //   });
})();
