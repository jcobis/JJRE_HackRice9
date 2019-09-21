idempotent_element =
    document.body.getAttribute( "eikmpmafdimllogceehaijmnlndineje" );
if ( ! idempotent_element )
{
    chrome.extension.onRequest.addListener(
	function(url, sender, response_func)
	{
	    elements = document.getElementsByTagName( "a" );

	    for ( i = 0; i < elements.length; i++ )
	    {
		if ( elements[ i ].href == url )
		{
		    response_func( elements[ i ].text );
		    return;
		}
	    }
	    response_func( "" );
	}
    );

    document.body.setAttribute( "eikmpmafdimllogceehaijmnlndineje", "inplace" );

}
