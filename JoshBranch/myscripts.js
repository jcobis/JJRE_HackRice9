// Wikipedia tooltip div
// TODO: move style things to a CSS file ?

var fontId = "fontLink";
if (!document.getElementById(fontId)) {
  var fontLink = document.createElement('link');
  fontLink.id = fontId;
  fontLink.rel = 'stylesheet';
  fontLink.type = 'text/css';
  fontLink.href = 'https://fonts.googleapis.com/css?family=Merriweather&display=swap';

  document.head.appendChild(fontLink);
}

var div = document.createElement('div');
div.id = 'wikipediaTooltip';
div.style.position = 'absolute';
div.style.display = 'none';
div.style.padding = '10px';
div.style.border = '1px solid black';
div.style.borderRadius = '15px';
div.style.width = '30%';
div.style.background = 'white';
div.style.top = '100px';
div.style.left = '100px';
div.style.fontFamily = 'Merriweather';

document.body.appendChild( div );

var xhr = new XMLHttpRequest();

// Show and hide tip
function addTip() {
    var sel = document.getSelection();
    if (!sel.isCollapsed) {

        // Blank at first while we wait for call to return, which prompts a seperate method
        div.textContent = "";

        xhr.open('GET', "https://en.wikipedia.org/api/rest_v1/page/summary/" + sel, true);
        xhr.send();
        xhr.onreadystatechange = fillTip;

        var r = sel.getRangeAt(0).getBoundingClientRect();
        div.style.top = (r.bottom + window.pageYOffset) + 'px'; //this will place div below the selection
        div.style.left = (r.left + window.pageXOffset)+ 'px'; //this will align the right edges together

        //code to set content

        div.style.display = 'block';
    }
};

function removeTip() {
    div.style.display = 'none';
};

// So many different tip functions!
// Extract or extracthtml? Decide later. Would have to change functionality of links so maybe not.
function fillTip(response) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(response);
        var r = JSON.parse(xhr.responseText);
        console.log(r);
        console.log(r.extract)
        if (r.type == "disambiguation") {
            // do something else.
        } else {
            // blahblah
        }

        div.textContent = r.extract;
    }
}

// Need to have two competing functions, tip and reponse


document.onmouseup = addTip;
document.onmousedown = removeTip;



// IDEAS
// Might want disambugation support, link following through the popup, wikipedia interface
// WIKIPEDIA INTEGRATION with article reading, maybe sharing screen or something
// Preload and make calls for common words on the page (but make sure to impose 200 limits? Or for different API)


// This was everything I needed and more (it's written all over your face) 20 seconds ago:
//When you do this, your code will stop at this point until your request has been fully processed. All UI interactions would stop. Your page will look like it is frozen. These are not good things, so to reiterate what I mentioned in the previous section, you should keep your requests asynchronous.
// does a rest response contain the call url?? Need to know this for matching requests to responses
