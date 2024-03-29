// chrome.runtime.onInstalled.addListener(function() {
//     // console.log("install");
//     // chrome.storage.sync.set({"wordCounter": 1}, function() {
//     //   console.log("counter initialized");
//     // });
//     chrome.contextMenus.create({
//       "id": "sampleContextMenu",
//       "title": "Sample Context Menu",
//       "contexts": ["selection"]
//     });
//   });

// chrome.runtime.onMessage.addListener((msg, sender) => {
//   // First, validate the message's structure.
//   if ((msg.from === 'content')) {
//     // Enable the page-action for the requesting tab.
//     alert(msg.newTab);
//   }
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.url){
      var newURL = request.url;
      chrome.tabs.create({ url: newURL });
    }
  });

// // The onClicked callback function.
// function onClickHandler(info, tab) {
//   if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
//     console.log("radio item " + info.menuItemId +
//                 " was clicked (previous checked state was "  +
//                 info.wasChecked + ")");
//   } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
//     console.log(JSON.stringify(info));
//     console.log("checkbox item " + info.menuItemId +
//                 " was clicked, state is now: " + info.checked +
//                 " (previous state was " + info.wasChecked + ")");

//   } else {
//     console.log("item " + info.menuItemId + " was clicked");
//     console.log("info: " + JSON.stringify(info));
//     console.log("tab: " + JSON.stringify(tab));
//   }
// };

// chrome.contextMenus.onClicked.addListener(onClickHandler);

// // Set up context menu tree at install time.
// chrome.runtime.onInstalled.addListener(function() {
//   // Create one test item for each context type.
//   var contexts = ["page","selection","link","editable","image","video",
//                   "audio"];
//   for (var i = 0; i < contexts.length; i++) {
//     var context = contexts[i];
//     var title = "Test '" + context + "' menu item";
//     var id = chrome.contextMenus.create({"title": title, "contexts":[context],
//                                          "id": "context" + context});
//     console.log("'" + context + "' item:" + id);
//   }

//   // Create a parent item and two children.
//   chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
//   chrome.contextMenus.create(
//       {"title": "Child 1", "parentId": "parent", "id": "child1"});
//   chrome.contextMenus.create(
//       {"title": "Child 2", "parentId": "parent", "id": "child2"});
//   console.log("parent child1 child2");

//   // Create some radio items.
//   chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
//                               "id": "radio1"});
//   chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
//                               "id": "radio2"});
//   console.log("radio1 radio2");

//   // Create some checkbox items.
//   chrome.contextMenus.create(
//       {"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
//   chrome.contextMenus.create(
//       {"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
//   console.log("checkbox1 checkbox2");

//   // Intentionally create an invalid item, to show off error checking in the
//   // create callback.
//   console.log("About to try creating an invalid item - an error about " +
//       "duplicate item child1 should show up");
//   chrome.contextMenus.create({"title": "Oops", "id": "child1"}, function() {
//     if (chrome.extension.lastError) {
//       console.log("Got expected error: " + chrome.extension.lastError.message);
//     }
//   });
// });
