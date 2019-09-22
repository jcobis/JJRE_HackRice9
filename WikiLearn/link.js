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

      wikiTitle = "";
      text = "";

      var el = document.createElement( 'a' );
      el.innerHTML = linkString;
      wikiTitle = el.childNodes[0].title;
      text = el.childNodes[0].innerText;


      var replacementForText = "<a href='#' onclick='TryToPopulateTip('" + wikiTitle + "');return false;'>" + text + "</a>";

      console.log(replacementForText);
      console.log(linkString);
      // console.log(linkString);
      //console.log(JSON.parse(linkString));


      //   var newWord = "";
      //   while (htmlString.charAt(i) != '<' && i < htmlString.length) {
      //     newWord += htmlString.charAt(i);
      //     i += 1;
      //   }
      //   var newLink = "<a href='#' onclick='TryToPopulateTip(" + linkAddOn + ");return false;'>" + newWord + "</a>";
      //   if (newWord != "") {
      //     console.log("word: " + newWord);
      //     console.log("link:" + newLink);
      //     array.push((newWord, newLink));
      //   }
      //}
    } 
    start = currentPos + 1;
  }
  return array;
}
