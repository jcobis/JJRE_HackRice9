function checkSettingDefaultOff (setting)
{
    return localStorage[ setting ] == 'true';
}

function checkSettingDefaultOn (setting)
{
    if ( ! localStorage.getItem( setting ) )
    {
	return true;
    }
    return localStorage[ setting ] == 'true';
}

function deriveLangCode ()
{
	var lang = window.navigator.language;
	if ( checkSettingDefaultOff( "english_only" ) )
	{
	    return "en";
	}
	if ( 2 == lang.length ) {
	    return lang;
	}
	prefix = lang.split( "-" )[ 0 ];
	if ( 2 == prefix.length ) {
	    return prefix;
	}
	return "en";
}

function doSearch (search_target, tab)
{

	var lang_code = deriveLangCode();
	var select_tab = ! checkSettingDefaultOff( "stay_on_page" );

	chrome.tabs.create( {
		url : "http://" + lang_code + ".wikipedia.org/w/index.php?search="+search_target,
		selected : select_tab,
		index : tab.index + 1
	} );
}

function selectionHandler (info, tab)
{
    doSearch( info.selectionText, tab );
}

function urlHandler (info, tab)
{
    chrome.tabs.executeScript(
	null,
	{ file: "get_url.js" },
	function()
	{
	    chrome.tabs.sendRequest(
		tab.id,
		info.linkUrl,
		function (text)
		{
		    if ( text != "" )
		    {
			doSearch( text, tab );
		    }
		}
	    );
	}
    );
}

function resetContextMenus ()
{
    chrome.contextMenus.removeAll(
	function()
	{
	    chrome.contextMenus.create( {
		    title: "Search Wikipedia for '%s'",
		    contexts: [ "selection" ],
		    onclick: selectionHandler
	    } );
	    if ( checkSettingDefaultOn( "show_search_on_links" ) )
	    {
		chrome.contextMenus.create( {
			title: "Search Wikipedia for link text",
			contexts: [ "link" ],
			onclick: urlHandler
		} );
	    }
	}
    );
}
resetContextMenus();
