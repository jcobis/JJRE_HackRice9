// Wikipedia tooltip div
// TODO: move style things to a CSS file ?

var div = document.createElement('div');
div.id = 'wikipediaTooltip';
document.body.appendChild( div );

// Show and hide tip
var xhr = new XMLHttpRequest();
function addTip() {
    var sel = document.getSelection();
    if (!sel.isCollapsed) {

        // Blank at first while we wait for call to return, which prompts a seperate method
        div.textContent = "";

        // xhr.open('GET', "https://en.wikipedia.org/api/rest_v1/page/summary/" + sel, true);
        // xhr.send();
        // xhr.onreadystatechange = fillTip;

        var r = sel.getRangeAt(0).getBoundingClientRect();
        div.style.top = (r.bottom + window.pageYOffset) + 'px'; //this will place div below the selection
        div.style.left = (r.left + window.pageXOffset)+ 'px'; //this will align the right edges together

        //code to set content

        var apiEndpoint = "https://en.wikipedia.org/w/api.php";
        //var params = "action=query&list=allimages&ailimit=3&format=json";
        var params = "format=json&action=query&prop=extracts&titles=" + encodeURIComponent(sel.toString().trim()) + "&redirects=true"

        /**
         * Send the request
         */
        fetch(apiEndpoint + "?" + params + "&origin=*")
            .then(function(response){return response.json();})
            .then(function(response) {
                  var pages = response.query.pages;
                  for (var page in pages) {
                    console.log(pages[page].extract);
                    div.innerHTML = pages[page].extract; // This will only run once
                    break;
                  }
             });

        div.style.display = 'block';
    }
};

function removeTip() {designers
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
