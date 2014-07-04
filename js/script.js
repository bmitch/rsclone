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

function clearView()
{
	console.log("clear");
	$("#main").html("");
}

function setupGame()
{
	Game = new Object();
	Game.difficulty = 5;

	Game.Player = new Object();
	Game.Player.name = "";

}

function initListeners()
{


	$('#stagename').on('keypress', function (e) 
	{

		var key = e.which || e.keyCode;
	    if (key == 13) 
	    { 
	    	console.log("Enter");
	    	Game.Player.name = $(this).val();
	    	clearView();
	    }
	});
	


}


