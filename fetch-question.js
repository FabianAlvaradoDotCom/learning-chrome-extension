'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  let responseObject = {};

  var myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  //
  //

  let theSubject;
  chrome.storage.sync.get('subject', content => {
    if (content) {
      theSubject = content.subject;

      console.log(theSubject);

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
          console.log(response);

          responseObject = response.questionResponse;

          iterateQuestionParts(responseObject);
        })
        .catch(err => {
          console.log(err);
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
    let arrayQuestions = Object.keys(objectQuestions);
    console.log(arrayQuestions.length);
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
            console.log(
              arrayQuestions[noElement],
              ' ',
              objectQuestions['q' + countPass + 'type'] ? true : false
            );
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
    document.querySelector('[rel="answer"]').textContent =
      objectQuestions.answer;
  }
});
