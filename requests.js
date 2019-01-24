'use strict';

var myHeaders = new Headers();

var myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

var myRequest = new Request(
  'https://learning-system-fabian.herokuapp.com/question-details/5a6efc56ce10e66a971b5f08',
  myInit
);

fetch(myRequest)
  .then(function(response) {
    return response.json();
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
