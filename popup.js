(function() {
  let boton1 = document.querySelector('[rel="uno"]');
  let boton2 = document.querySelector('[rel="dos"]');
  let boton3 = document.querySelector('[rel="tres"]');
  boton1.addEventListener('click', function(event) {
    let notifDetails = {
      type: 'basic',
      title: 'Learing notification',
      message: 'Notification has been created',
      iconUrl: 'icon.png'
    };
    chrome.notifications.create('notif', notifDetails, function(notifName) {});
  });

  boton2.addEventListener('click', function(event) {
    chrome.notifications.clear('notif', function() {});
  });
})();
