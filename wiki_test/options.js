function getCheckBoxForSetting (setting)
{
    if ( setting == "english_only" )
    {
	return document.getElementById( "langsetting" );
    }
    if ( setting == "stay_on_page" )
    {
	return document.getElementById( "focussetting" );
    }
    if ( setting == "show_search_on_links" )
    {
	return document.getElementById( "linksetting" );
    }
}


function restoreOptions()
{
    getCheckBoxForSetting( "english_only" ).checked = 
	checkSettingDefaultOff( "english_only" );

    getCheckBoxForSetting( "stay_on_page").checked = 
	checkSettingDefaultOff( "stay_on_page" ); 

    getCheckBoxForSetting( "show_search_on_links" ).checked = 
	checkSettingDefaultOn( "show_search_on_links" );
}

function saveOptionForSetting (setting)
{
    localStorage[ setting ] = 
	getCheckBoxForSetting( setting ).checked ? 'true' : 'false';
}

function saveOptions()
{
    saveOptionForSetting( "english_only" );
    saveOptionForSetting( "stay_on_page" );
    saveOptionForSetting( "show_search_on_links" );

    var options_status = document.getElementById( "options_status" );
    options_status.innerHTML = "<font color='green'>Options saved</font>";

    resetContextMenus();
}

function clearSavedNote()
{
    var options_status = document.getElementById( "options_status" );
    options_status.innerHTML = "";
}
function setClearSavedNote(id) 
{
    document.getElementById(id).onclick = clearSavedNote;
}

setClearSavedNote("focussetting");
setClearSavedNote("langsetting");
setClearSavedNote("linksetting");
document.getElementById("savebutton").onclick = saveOptions;
restoreOptions();
