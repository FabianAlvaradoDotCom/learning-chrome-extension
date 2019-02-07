(function() {
  let boton1 = document.querySelector('[rel="uno"]');
  let boton2 = document.querySelector('[rel="dos"]');
  let boton3 = document.querySelector('[rel="tres"]');

  boton1.addEventListener('click', event => {
    chrome.windows.create({
      url: 'question-page.html',
      type: 'popup',
      width: 905,
      height: 700
      // ,
      // left: 300,
      // top: 350
    });
  });

  boton2.addEventListener('click', function(event) {
    let notifDetails = {
      type: 'basic',
      title: 'Learing notification',
      message: 'Notification has been created',
      iconUrl: 'icon.png'
    };
    chrome.notifications.create('notif', notifDetails, function(notifName) {});
  });

  boton3.addEventListener('click', function(event) {
    chrome.notifications.clear('notif', function() {});
  });
})();
