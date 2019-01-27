document.addEventListener('DOMContentLoaded', function(event) {
  var myHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  let subject = {
    subject: 'Node'
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

  fetch(myRequest)
    .then(function(response) {
      return response.json();
    })
    .then(response => {
      console.log(response);
      document.querySelector('[rel="questionContainer"]').textContent =
        response.selected.questionPart1 +
        (response.selected.questionPart2
          ? response.selected.questionPart2
          : '') +
        (response.selected.questionPart3
          ? response.selected.questionPart3
          : '') +
        (response.selected.questionPart4
          ? response.selected.questionPart4
          : '') +
        (response.selected.questionPart5
          ? response.selected.questionPart5
          : '') +
        (response.selected.questionPart6
          ? response.selected.questionPart6
          : '') +
        (response.selected.questionPart7
          ? response.selected.questionPart7
          : '') +
        (response.selected.questionPart8
          ? response.selected.questionPart8
          : '') +
        (response.selected.questionPart9
          ? response.selected.questionPart9
          : '') +
        (response.selected.questionPart10
          ? response.selected.questionPart10
          : '') +
        (response.selected.questionPart11
          ? response.selected.questionPart11
          : '') +
        (response.selected.questionPart12
          ? response.selected.questionPart12
          : '') +
        (response.selected.questionPart13
          ? response.selected.questionPart13
          : '') +
        (response.selected.questionPart14
          ? response.selected.questionPart14
          : '') +
        (response.selected.questionPart15
          ? response.selected.questionPart15
          : '') +
        (response.selected.questionPart16
          ? response.selected.questionPart16
          : '') +
        (response.selected.questionPart17
          ? response.selected.questionPart17
          : '') +
        (response.selected.questionPart18
          ? response.selected.questionPart18
          : '') +
        (response.selected.questionPart19
          ? response.selected.questionPart19
          : '') +
        (response.selected.questionPart20
          ? response.selected.questionPart20
          : '');
    })
    .catch(err => {
      console.log(err);
    });
});
