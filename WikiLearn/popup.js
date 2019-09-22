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


// const setDOMInfo = info => {
//   document.getElementById('total').textContent = info.total;
// };

// window.addEventListener('DOMContentLoaded', () => {
//   // ...query for the active tab...
//   chrome.tabs.query({
//     active: true,
//     currentWindow: true
//   }, tabs => {
//     // ...and send a request for the DOM info...
//     chrome.tabs.sendMessage(
//         tabs[0].id,
//         {from: 'popup', subject: 'DOMInfo'},
//         // ...also specifying a callback to be called 
//         //    from the receiving end (content script).
//         setDOMInfo);
//   });
// });

// chrome.browserAction.setBadgeText({text: 'ON'});
// chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
