var htmlString;

function hrefExtracter(htmlString) {
  var array = [];
  var i = htmlString.indexOf("!DOCTYPE");
  while (i + 3 < htmlString.length) {
    var substring = htmlString.substr(i, 4);
    if (substring == "href") {
      i = i + 7;
      var linkAddOn = "";
      if (htmlString.charAt(i) == '.') {
        linkAddOn += htmlString.charAt(i);;
        i += 1;
        while (htmlString.charAt(i) != '\\' && i < htmlString.length) {
          linkAddOn += htmlString.charAt(i);
          i = i + 1;
        }
        while (htmlString.charAt(i) != '>' && i < htmlString.length) {
          i += 1;
        }
        var newWord = "";
        while (htmlString.charAt(i) != '<' && i < htmlString.length) {
          newWord += htmlString.charAt(i);
          i += 1;
        }
        var newLink = "<a href='#' onclick='TryToPopulateTip(" + linkAddOn + ");return false;'>" + newWord + "</a>";
        if (newWord != "") {
          array.push((newWord, newLink));
        }
      }
    } else {
      i += 1;
    }
  }
  return array;
}
