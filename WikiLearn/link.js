var htmlString;

function hrefExtracter(htmlString) {
  var array = [];
  var start = htmlString.indexOf("!DOCTYPE");
  while (start + 20 < htmlString.length) {

    currentPos = start;
    var substring = htmlString.substring(start, start + 20);
    
    if (substring == "<a rel=\"mw:WikiLink\"") {
   
      while (htmlString.substring(currentPos - 4, currentPos) != "</a>"){
        currentPos += 1;
      }
      end = currentPos; // Exclusive

      linkString = htmlString.substring(start, end);



      var el = document.createElement( 'a' );
      el.innerHTML = linkString;
      var wikiTitle = el.childNodes[0].title;
      var text = el.childNodes[0].innerText;
      var replacementForText = "<a href='#' onclick='TryToPopulateTip('" + wikiTitle + "');return false;'>" + text + "</a>";
      array.push(text);
      array.push(replacementForText);
    } 
    start = currentPos + 1;
  }
  console.log(array);
  return array;
}