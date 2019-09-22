// 'use strict';
// chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab){
//   console.log("Updated tab: " + tab.url);
// });

// chrome.storage.sync.get(url, function(result){
//   if(result[url]===undefined){
//     //word not found in storage, so store it.
//     var storeURL = {};
//     storeURL[url] = 1;
//     chrome.storage.sync.set(storeURL, function(){
//       console.log("Stored: "+url);
//     });
//   }else{
//     //word has been found in storage, so do nothing.
//   }
// });

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "sampleContextMenu",
      "title": "Sample Context Menu",
      "contexts": ["selection"]
    });
  });
