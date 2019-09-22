document.addEventListener('DOMContentLoaded', function() {

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {
     window.open('landing.html');
  }, false);
  
}, false);

chrome.browserAction.setBadgeText({text: 'ON'});
chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
