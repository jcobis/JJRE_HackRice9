function highlightHandler(e) {
    // get the highlighted text
    var text = document.getSelection();
    // check if anything is actually highlighted
    if(text.toString() !== '') {
        // we've got a highlight, now do your stuff here
        doStuff(text);
    }
}

document.onmouseup = highlightHandler;

// Display wikipedia stuff above the top left corner of the text
function doStuff(text) {
	oRange = text.getRangeAt(0); //get the text range
	oRect = oRange.getBoundingClientRect();
	console.log(oRect);
	console.log(text.toString())
}


// IDEAS
// Might want disambugation support, link following through the popup, wikipedia interface
// WIKIPEDIA INTEGRATION with article reading, maybe sharing screen or something