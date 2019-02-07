'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  let responseObject = {};
  let textAreas = document.querySelectorAll('textarea');
  let answerField = document.querySelector('[rel="answer-field"]');
  let refreshScreen = document.querySelector('[rel="refreshScreen"]');
  let externalReference = document.querySelectorAll(
    '[rel="externalReference"]'
  );

  // let timeSpan = (document.querySelector(
  //   '[rel="time"]'
  // ).textContent = new Date());

  var myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  //
  //

  let theSubject;
  chrome.storage.sync.get('subject', content => {
    if (content) {
      theSubject = content.subject;

      //console.log(theSubject);

      let subject = {
        subject: theSubject
        //subject: 'JavaScript' //https://chrome-extension-app.herokuapp.com/question/details/5a8d6ff62ae7940a640fff81
      };

      var myInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        mode: 'cors',
        body: JSON.stringify(subject)
      };

      var myRequest = new Request(
        'https://chrome-extension-app.herokuapp.com/question/random',
        myInit
      );

      let myFetch = fetch(myRequest)
        .then(function(response) {
          return response.json();
        })
        .then(response => {
          //console.log(response);

          responseObject = response.questionResponse;

          iterateQuestionParts(responseObject);
        })
        .catch(err => {
          //console.log(err);
        });
    } else {
      alert('There is no content');
    }
  });

  //
  //

  //5a8eaa6565692f2dc0ed7aea
  //5a8d6ff62ae7940a640fff81
  function iterateQuestionParts(objectQuestions) {
    function showLinkReferences() {
      for (let countUrls = 0; countUrls < 10; countUrls += 1) {
        if (countUrls === 0) {
          if (objectQuestions.referenceUrl) {
            externalReference[countUrls].href = objectQuestions.referenceUrl;
            externalReference[countUrls].querySelector(
              'span'
            ).textContent = !objectQuestions.referenceTime
              ? 'NO REFERENCE TIME GIVEN'
              : objectQuestions.referenceTime;

            externalReference[countUrls].style.display = document.querySelector(
              '[rel="showAnswer"]'
            ).checked
              ? externalReference[countUrls].classList.remove('hidden')
              : externalReference[countUrls].classList.add('hidden');
          }
        } else {
          //console.log(objectQuestions['referenceUrl' + (countUrls + 1)]);
          if (objectQuestions['referenceUrl' + (countUrls + 1)]) {
            externalReference[countUrls].href =
              objectQuestions['referenceUrl' + (countUrls + 1)];
            externalReference[countUrls].querySelector(
              'span'
            ).textContent = !objectQuestions['referenceTime' + (countUrls + 1)]
              ? 'NO REFERENCE TIME GIVEN'
              : objectQuestions['referenceTime' + (countUrls + 1)];

            externalReference[countUrls].style.display = document.querySelector(
              '[rel="showAnswer"]'
            ).checked
              ? externalReference[countUrls].classList.remove('hidden')
              : externalReference[countUrls].classList.add('hidden');
          }
        }
      }
    }

    let arrayQuestions = Object.keys(objectQuestions);
    //console.log(arrayQuestions.length);
    for (let countPass = 0; countPass < 40; countPass += 1) {
      for (
        let noElement = 0;
        noElement < arrayQuestions.length;
        noElement += 1
      ) {
        if (arrayQuestions[noElement].slice(0, 12) === 'questionPart') {
          if (
            arrayQuestions[noElement].slice(
              12,
              arrayQuestions[noElement].length
            ) == countPass
          ) {
            // console.log(
            //   arrayQuestions[noElement],
            //   ' ',
            //   objectQuestions['q' + countPass + 'type'] ? true : false
            // );
            document.querySelectorAll(
              objectQuestions['q' + countPass + 'type'] ? 'pre' : 'p'
            )[countPass].textContent =
              objectQuestions[arrayQuestions[noElement]];

            document
              .querySelectorAll(
                objectQuestions['q' + countPass + 'type'] ? 'pre' : 'p'
              )
              [countPass].classList.remove('hidden');

            document
              .querySelectorAll(
                objectQuestions['q' + countPass + 'type'] ? 'pre' : 'p'
              )
              [countPass].classList.add(
                objectQuestions['q' + countPass + 'type']
                  ? 'visible-pre'
                  : 'visible-p'
              );
          }
        }
      }
    }
    if (objectQuestions.contentType == 'code') {
      document.querySelector('pre[rel="answer"]').textContent =
        objectQuestions.answer;
      document
        .querySelector('[rel="showAnswer"]')
        .addEventListener('click', () => {
          document.querySelector(
            'pre[rel="answer"]'
          ).style.display = document.querySelector('[rel="showAnswer"]').checked
            ? 'block'
            : 'none';
          showLinkReferences();
        });
    } else {
      document.querySelector('p[rel="answer"]').textContent =
        objectQuestions.answer;
      document
        .querySelector('[rel="showAnswer"]')
        .addEventListener('click', () => {
          document.querySelector(
            'p[rel="answer"]'
          ).style.display = document.querySelector('[rel="showAnswer"]').checked
            ? 'block'
            : 'none';
          showLinkReferences();
        });
    }

    document.querySelector('[rel="topic"]').textContent =
      objectQuestions.questionTopic;
    document.querySelector('[rel="subject"]').textContent =
      objectQuestions.subject;
    for (let counter = 0; counter < textAreas.length; counter += 1) {
      if (objectQuestions.rows < 5) {
        textAreas[counter].rows = 5;
      } else {
        textAreas[counter].rows = objectQuestions.rows + 5;
      }

      if (textAreas[counter].attributes.rel.value == 'line-counter') {
        for (let newRow = 1; newRow <= textAreas[counter].rows; newRow += 1) {
          textAreas[counter].textContent += newRow + '\n';
        }
      } else if (textAreas[counter].attributes.rel.value == 'answer-field') {
        textAreas[counter].placeholder = objectQuestions.placeHolder
          ? objectQuestions.placeHolder
          : 'Enter your answer';
      }
    }

    refreshScreen.addEventListener('click', () => {
      window.location.reload();
    });
    answerField.addEventListener('keyup', () => {
      //
      //
      function cleanSpace(val) {
        val = val.replace(/\r?\n|\r/g, ' '); // Converts breaklines to spaces
        val = val.replace(/\t/g, ' '); // Converts tabs to spaces
        val = val.replace(/               /g, ' '); // Converts multi-spaces to single-spaces
        val = val.replace(/              /g, ' ');
        val = val.replace(/             /g, ' ');
        val = val.replace(/            /g, ' ');
        val = val.replace(/           /g, ' ');
        val = val.replace(/          /g, ' ');
        val = val.replace(/         /g, ' ');
        val = val.replace(/        /g, ' ');
        val = val.replace(/       /g, ' ');
        val = val.replace(/      /g, ' ');
        val = val.replace(/     /g, ' ');
        val = val.replace(/    /g, ' ');
        val = val.replace(/   /g, ' ');
        val = val.replace(/  /g, ' ');
        val = val.replace(/ \(/g, '('); // Removes the spaces before and after left and right parenthesis and curly braces
        val = val.replace(/ \)/g, ')');
        val = val.replace(/\( /g, '(');
        val = val.replace(/\) /g, ')');
        val = val.replace(/ \{/g, '{');
        val = val.replace(/ \}/g, '}');
        val = val.replace(/\{ /g, '{');
        val = val.replace(/\} /g, '}');

        val = val.replace(/\, /g, ',');
        val = val.replace(/ \,/g, ',');

        val = val.replace(/\: /g, ':');
        val = val.replace(/ \:/g, ':');

        val = val.replace(/\; /g, ';');
        val = val.replace(/ \;/g, ';');

        val = val.replace(/\+ /g, '+');
        val = val.replace(/ \+/g, '+');

        val = val.replace(/\* /g, '*');
        val = val.replace(/ \*/g, '*');

        val = val.replace(/\- /g, '-');
        val = val.replace(/ \-/g, '-');

        val = val.replace(/\% /g, '%');
        val = val.replace(/ \%/g, '%');

        val = val.replace(/\& /g, '&');
        val = val.replace(/ \&/g, '&');

        val = val.replace(/\| /g, '|');
        val = val.replace(/ \|/g, '|');

        val = val.replace(/\< /g, '<');
        val = val.replace(/ \</g, '<');

        val = val.replace(/\> /g, '>');
        val = val.replace(/ \>/g, '>');

        val = val.replace(/\= /g, '=');
        val = val.replace(/ \=/g, '=');

        val = val.replace(/\. /g, '.');
        val = val.replace(/ \./g, '.');

        return val;
      }

      function codeOrText(val, contType) {
        // If the answer is set to text type, it converts all to lowercase, not if it is code
        if (contType != 'code') {
          if (val === undefined) {
            return '';
          } else {
            val = val.toLowerCase();
            val = val.replace(/ and /g, ' '); // --------------------------------Replacing " and " by "" for better text validation
            val = val.replace(/\,/g, ''); // --------------------------------Deleting commas for better text validation
            val = val.replace(/\./g, ''); // --------------------------------Deleting periods for better text validation
            return val;
          }
        } else {
          if (val === undefined) {
            return '';
          } else {
            if (val.split("'").length % 2 == 1) {
              // Making that the validation of code accepts single of double quotes pairs, but not alone quoting
              val = val.replace(/\'/g, '"');
            }
            return val;
          }
        }
      }

      function compareWordByWord(answerInRepo, answerEntered) {
        var arrayInRepo = cleanSpace(answerInRepo).split(' ');
        var arrayEntered = cleanSpace(answerEntered).split(' ');

        for (let i = 0; i < arrayInRepo.length; i++) {
          if (arrayInRepo[i] != arrayEntered[i]) {
            return false;
          }
        }
        return true;
      }

      if (
        compareWordByWord(
          codeOrText(
            cleanSpace(objectQuestions.answer),
            objectQuestions.contentType
          ),
          codeOrText(cleanSpace(answerField.value), objectQuestions.contentType)
        )
      ) {
        document
          .querySelector('[rel="editor-container"]')
          .classList.add('success');
      } else {
        document
          .querySelector('[rel="editor-container"]')
          .classList.remove('success');
      }
    });
  }
});
