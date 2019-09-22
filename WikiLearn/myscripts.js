// Wikipedia tooltip div

// Adding fonts. for some reason this doesn't work in the CSS so it's going here:
var fontId = 'fonts';
if (!document.getElementById(fontId)) {
  var fonts = document.createElement('link');
  fonts.href = 'https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Serif&display=swap';
  fonts.rel = 'stylesheet';
  fonts.type = 'text/css';

  document.head.appendChild(fonts);
}

var div = document.createElement('div');
div.id = 'wikipediaTooltip';
document.body.appendChild( div );


// Function name pretty self explanatory, no?
function setTipLocationToSelection() {
    var sel = document.getSelection();
    var r = sel.getRangeAt(0).getBoundingClientRect();
    div.style.top = (r.bottom + window.pageYOffset) + 'px'; //this will place div below the selection
    div.style.left = (r.left + window.pageXOffset)+ 'px'; //this will align the right edges together
}


// Try to use the current selection to show a tip in the right location and populate it with text too
function selectionTip() {

    // Gets the current selection
    var sel = document.getSelection();
    if (!sel.isCollapsed) {

        // Set the tip location
        setTipLocationToSelection();

        // Try to populate the tip
        tryToPopulateTip(sel.toString());

    }
};


// Makes a request to wikipedia and populates the tip if the request returns succesfully
function tryToPopulateTip(title) {

    var plainAPIEndpoint = "https://en.wikipedia.org/w/api.php";
    var plainParams = "format=json&action=query&prop=extracts&titles=" + encodeURIComponent(title.trim()) + "&redirects=true"

    var htmlAPIEndpoint = "https://en.wikipedia.org/w/api.php";
    var htmlParams = "format=json&action=visualeditor&paction=parse&page=" + encodeURIComponent(title.trim()) + "&redirects=true"

    var processesToWaitOn = 2;
    var plainResponse = "";
    var htmlResponse = "";

    // Waits until both responses come in to change page
    function actOnResponse (content) {

        processesToWaitOn--;
        if (processesToWaitOn == 0) {

            var toDisplay = plainResponse;

            // Replace words with in environment links
            // First get the first link in the plaintext
            firstInText = 0;
            linkArray = hrefExtracter(htmlResponse);
            while (firstInText < linkArray.length) {
                
                firstInText += 2
            }


            div.innerHTML = toDisplay; // This will only run once
            div.style.display = 'block';
            div.scrollTop = 0;

        }

    }

    // Plain request handling
    fetch(plainAPIEndpoint + "?" + plainParams + "&origin=*")
        .then(function(response){return response.json();})
        .then(function(response) {
              var pages = response.query.pages;
              if (pages) {
                for (var page in pages) {
                  var content = pages[page].extract;
                  if (content) {

                    plainResponse = content;
                    actOnResponse(content);

                    // Showing new wikipedia page:
                    console.log(pages[page].title);
                    storeWord(pages[page].title);

                    // chrome.storage.sync.get(pages[page].title, function(obj) {
                    //   console.log("Finished storing: " + obj);
                    // });
                  }
                  break;
              }
            }
        });

    // HTML request handling
    fetch(htmlAPIEndpoint + "?" + htmlParams + "&origin=*")
        .then(function(response){return response.json();})
        .then(function(response) {
              var content = response.visualeditor
              if (content) {
                content = content.content;

                if (content) {
                    htmlResponse = content;
                    actOnResponse(content);
                }
              }
            });

    return false;
}


function storeWord(word) {
  var defaultValue = 0;
  console.log("Store Word");
  chrome.storage.sync.get({wordCount: defaultValue}, function(data) {
    chrome.storage.sync.set({wordCount: data.wordCount + 1}, function() {
      console.log("wordCount: " + data.wordCount);
    });
  });

  // chrome.storage.sync.get("wordCounter", function(data2) {
  //       if (typeof data2.word === 'undefined') { // undefined without quotes?
  //         // Instantiate counter
  //         chrome.storage.sync.set({"wordCounter": 1}, function() {
  //           //console.log("Setting wordCounter to 1: " + data3.wordCounter);
  //         });
  //       } else {
  //         console.log(wordCounter)
  //         console.log("wordCounter previously: " + data2.wordCounter)
  //         chrome.storage.sync.set({"wordCounter": data2.wordCounter + 1}, function(data3) {
  //           console.log("wordCounter now: " + data3.wordCounter);
  //         });
  //       }
  //     });
  // console.log("storeWord called: " + word)
  // chrome.storage.sync.get([word], function(data) {
  //   console.log("data.word: " + data.word)
  //   if (typeof data.word === 'undefined') { // undefined without quotes?
  //     chrome.storage.sync.set({[word]: "stored"}, function(result) {
  //         console.log("Stored: " + word);
  //         console.log(result)
  //     });
      // chrome.storage.sync.get("wordCounter", function(data2) {
      //   if (typeof data2.word === 'undefined') { // undefined without quotes?
      //     // Instantiate counter
      //     chrome.storage.sync.set({"wordCounter": 1}, function(data3) {
      //       console.log("Setting wordCounter to 1: " + data3.wordCounter);
      //     });
      //   } else {
      //     console.log("wordCounter previously: " + data2.wordCounter)
      //     chrome.storage.sync.set({"wordCounter": data2.wordCounter + 1}, function(data3) {
      //       console.log("wordCounter now: " + data3.wordCounter);
      //     });
      //   }
      // });
    // } else {
    //   console.log("Already have stored: " + data.word);
    // }
  // });

  // chrome.storage.sync.get([word], function(result) {
  //   if (result[word] === undefined) {
  //     //word not found in storage, so store it.
  //     var storeWord = {};
  //     storeURL[word] = 1;
  //     chrome.storage.sync.set(storeWord, function() {
  //       console.log("Stored: "+ word);
  //     });
  //   } else {
  //     console.log(Object.values(result)); // [0].val
  //   }
  // });

  // var testPrefs = {'val': 1};
  // chrome.storage.sync.set({[word]: testPrefs}, function() {
  //   console.log('Saved', word, testPrefs);
  // });
}


function getWord(key) {
  chrome.storage.sync.get(key, function(data) { console.log(Object.values(data)[0].val); })
}


// const setStorageData = data =>
//   new Promise((resolve, reject) =>
//     chrome.storage.sync.set(data, () =>
//       chrome.runtime.lastError
//         ? reject(Error(chrome.runtime.lastError.message))
//         : resolve()
//     )
//   )

// await setStorageData({ data: [someData] })

// const getStorageData = key =>
//   new Promise((resolve, reject) =>
//     chrome.storage.sync.get(key, result =>
//       chrome.runtime.lastError
//         ? reject(Error(chrome.runtime.lastError.message))
//         : resolve(result)
//     )
//   )

// const { data } = await getStorageData('data')

// Show tip when text selected
// document.onmouseup = selectionTip;

// If the window is not visisible and you release a click with highlighted text, it shows the window
// If the window is visible and you click outside the screen, it hides the window
// Partial source https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
function showAndHideListeners(element) {

    const outsideClickListener = event => {

        // If click is outside box and box is onscreen,
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
          element.style.display = 'none';
        }
        if (event.ctrlKey) {
            console.log("held!");
        }

    };

    // Only update tip if selection exists and is outside the tooltip if there is any on display right now
    const selectionShower = event => {
        if (!isVisible(element) || !element.contains(event.target)) {

            // Gets the current selection
            var sel = document.getSelection();
            if (!sel.isCollapsed) {

                // Set the tip location
                setTipLocationToSelection();

                // Try to populate the tip
                tryToPopulateTip(sel.toString());

            }
        }
    }

    document.addEventListener('click', outsideClickListener);
    document.addEventListener('mouseup', selectionShower)
};

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length ); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
showAndHideListeners(div);

// Event listener for pressing 'w' and passing a message to open a new tab
window.addEventListener("keypress", function(event) {
    console.log(event.keyCode);
    if (event.keyCode == 119 && isVisible(div)) {
        alert('message passing time.');
    }
})



// IDEAS
// Might want disambugation support, link following through the popup, wikipedia interface
// WIKIPEDIA INTEGRATION with article reading, maybe sharing screen or something
// Preload and make calls for common words on the page (but make sure to impose 200 limits? Or for different API)
