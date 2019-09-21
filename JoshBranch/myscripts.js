

// Wikipedia tooltip div
var div = document.createElement('div');
document.body.appendChild( div );
div.id = 'wikipediaTooltip';
div.style.position = 'absolute';
div.style.display = 'block';
div.style.border = 'grey solid 1px';
div.style.background = 'white';
div.style.top = "100px";
div.style.left = "100px";



function test() {
	var sel = document.getSelection();
    if (!sel.isCollapsed) {

    	// Set element text to the string of the selection
		div.textContent = sel.toString();


        var r = sel.getRangeAt(0).getBoundingClientRect();
        div.style.top = (r.bottom + window.pageYOffset) + 'px'; //this will place ele below the selection
        div.style.left = (r.left + window.pageXOffset)+ 'px'; //this will align the right edges together

        //code to set content

        div.style.display = 'block';
    }
};

function removeTip() {
	div.style.display = 'none';
};


document.onmouseup = test;
document.onmousedown = removeTip;


// IDEAS
// Might want disambugation support, link following through the popup, wikipedia interface
// WIKIPEDIA INTEGRATION with article reading, maybe sharing screen or something