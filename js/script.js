var Game = new Object();

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
	initDisplay();
	initGame();
	initMenus();
	
	Display.LoadView("getstagename");
}

function clearView()
{
	$("#main").html("");
}

function initGame()
{
	Game = new Object();
	Game.difficulty = 5;
	Game.Player = createPlayer();
}

function initDisplay()
{
	Display = new Object();

	Display.LoadWindow = function(sWindowToLoad)
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

	Display.LoadView = function(sViewToLoad)
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

	Display.LoadMenu = function(MenuToLoad)
	{
		var MenuList = $(".menu");
		var sMenuItemHTML = ''; 

		// loop through object
		for (var key in MenuToLoad) {			
			if (MenuToLoad.hasOwnProperty(key)) 
			{
				sMenuItemHTML = '<li class="list-group-item" ><a href="#" class="window-option menu-option" data-menuoption="'; 
				sMenuItemHTML += key + '">' + MenuToLoad[key] + "</a></li>\n";
				//console.log(key + " > " + MenuToLoad[key]);
				console.log(sMenuItemHTML);
				MenuList.append(sMenuItemHTML);
			}
		}
		
	}

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
	    	Display.LoadView("mainscreen");
	    	Display.LoadWindow("whattodo");
	    	Display.LoadMenu(Menus.WhatToDo);
	    }
	});
}

function initMenus()
{
	Menus = 
	{
		WhatToDo: 
		{
			"L" : "Laze Around for a while",
			"W" : "Write songs & practise",
			"G" : "Gig",
			"R" : "Record a single or album",
			"H" : "Have a holiday",
			"V" : "Visit your doctor",
			"C" : "Consult your analyst",
			"U" : "Unwind in a sanitorium"
		}
	}
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

