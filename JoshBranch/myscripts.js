// Wikipedia tooltip div
// TODO: move style things to a CSS file ?

// adding fonts. for some reason this doesn't work in the CSS so it's going here:
var fontId = 'fonts';
if (!document.getElementById(fontId)) {
  var fonts = document.createElement('link');
  fonts.href = 'https://fonts.googleapis.com/css?family=Noto+Serif&display=swap';
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

    var apiEndpoint = "https://en.wikipedia.org/w/api.php";
    var params = "format=json&action=query&prop=extracts&titles=" + encodeURIComponent(title.trim()) + "&redirects=true"


    // Send the request and replace tip when the request returns
    fetch(apiEndpoint + "?" + params + "&origin=*")
        .then(function(response){return response.json();})
        .then(function(response) {
              var pages = response.query.pages;
              if (pages) {
                for (var page in pages) {
                  var content =  pages[page].extract;
                  if (content) {
                      div.innerHTML = content; // This will only run once
                      div.style.display = 'block';
                  }
                  break;
              }
            }
        });

    return false;

}


// Show tip when text selected
// document.onmouseup = selectionTip;

// If the window is not visisible and you release a click with highlighted text, it shows the window
// If the window is visisible and you click outside the screen, it hides the window
// Partial source https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
function showAndHideListeners(element) {
    
    const outsideClickListener = event => {
        
        // If click is outside box and box is onscreen,
        if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
          element.style.display = 'none';
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

// IDEAS
// Might want disambugation support, link following through the popup, wikipedia interface
// WIKIPEDIA INTEGRATION with article reading, maybe sharing screen or something
// Preload and make calls for common words on the page (but make sure to impose 200 limits? Or for different API)
