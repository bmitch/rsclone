var Game;

$(document).ready(function()
{
	init();
});


function init()
{
	$(document).on("viewLoaded", function()
	{
		initListeners();
	});

	setupGame();
	loadView("getstagename");
}


function loadView(sViewToLoad)
{
	sViewToLoad = "views/" + sViewToLoad + ".html"; 
	jQuery.ajax({
    	url:    sViewToLoad,
        success: function(result) 
        {
        	$("#main").html(result);
        },
        // we don't want to do anything until the view loads
        async:   false
    });   
    $(document).trigger( "viewLoaded" );
}

function loadWindow(sWindowToLoad)
{
	sWindowToLoad = "views/" + sWindowToLoad + ".html"; 
	jQuery.ajax({
	url:    sWindowToLoad,
    success: function(result) 
    {
    	$(result).insertAfter("#main");
    	$(".dialog").dialog({ dialogClass: 'topleftcorner'});
    },
    // we don't want to do anything until the view loads
    async:   false
});   


}

function clearView()
{
	$("#main").html("");
}

function setupGame()
{
	Game = new Object();
	Game.difficulty = 5;
	Game.Player = createPlayer();
}

function initListeners()
{
	$('#stagename').on('keypress', function (e) 
	{
		var key = e.which || e.keyCode;
	    if (key == 13) 
	    {
	    	Game.Player.name = $(this).val();
	    	clearView();
	    	loadView("mainscreen");
	    	loadWindow("whattodo");
	    }
	});
	


}

function createPlayer()
{
	Player = new Object();
	Player.name			= "";
	Player.health		= 100;
	Player.creativity	= 100;
	Player.happiness 	= 100;
	Player.alertness	= 100;

	Player.getHealth = function()
	{
		return Player.health;
	}

	return Player;
}

