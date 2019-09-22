var htmlString;

function hrefExtracter(htmlString, firstWord) {
  firstWord = firstWord.replace(new RegExp("\\b[^\\w]"), "");
  var array = [];
  var start = htmlString.search("<p[^>]*>.{0,20}" + firstWord);
  //console.log(htmlString.substring(start, start + 100));
  //console.log(start);
  //console.log("<p[^>]*>.{0,20}" + firstWord);
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
      if(el.childNodes[0]) {
        var wikiTitle = el.childNodes[0].title;
        var text = el.childNodes[0].innerText;
        var replacementForText = "<button class='link' id=" + encodeURIComponent(text.trim()) + " data-wiki=" + encodeURIComponent(wikiTitle.trim()) + ">" + text + "</button>";
        array.push(text);
        array.push(replacementForText);
      }

    }
    start = currentPos + 1;
  }
  return array;
}
