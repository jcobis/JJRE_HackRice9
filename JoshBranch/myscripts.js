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

function doStuff(text) {
	oRange = text.getRangeAt(0); //get the text range
	oRect = oRange.getBoundingClientRect();
	console.log(oRect);
	console.log(text.toString())
}
