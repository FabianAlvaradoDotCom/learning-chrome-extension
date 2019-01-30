document.addEventListener('DOMContentLoaded', event => {
  //
  //

  let saveButton = document.querySelector('[rel="saveButton"]');

  saveButton.addEventListener('click', event => {
    let subject;
    let subjectSelector = document.forms[0];

    for (let inputs = 0; inputs < subjectSelector.length; inputs += 1) {
      if (subjectSelector[inputs].checked) {
        subject = subjectSelector[inputs].value;
      }
    }

    //
    //
    //
    //

    chrome.storage.sync.set(
      {
        subject: ''
      },
      () => {
        chrome.storage.sync.set(
          {
            subject
          },
          () => {
            alert('Subject: ', subject);
            chrome.storage.sync.get('subject', () => {
              alert(subject);
            });
            alert('Set finished');
          }
        );
      }
    );

    //
    //
    //
    //
    //
  });
});
