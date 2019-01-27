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
        response.selected.questionPart1;
    })
    .catch(err => {
      console.log(err);
    });
});
