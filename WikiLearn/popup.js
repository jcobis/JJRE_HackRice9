document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {
     window.open('landing.html');
  }, false);
  var defaultValue = 0;
  chrome.storage.sync.get({wordCount: defaultValue}, function(data) {
    document.getElementById('wordTotal').textContent = data.wordCount;
  });
  
}, false);

// chrome.browserAction.setBadgeText({text: 'ON'});
// chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
