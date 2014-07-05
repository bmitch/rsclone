var Game = new Object();

$(document).ready(function()
{
	init();
});

function init()
{
	$(document).on("PageLoad", function()
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
	Game.scene ="init";
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
	    $(document).trigger( "PageLoad" );
	    Game.scene = sViewToLoad;
	}

	Display.LoadMenu = function(MenuToLoad)
	{
		var MenuList = $(".menu");
		var sMenuItemHTML = ''; 

		// loop through object
		for (var key in MenuToLoad) {			
			if (MenuToLoad.hasOwnProperty(key)) 
			{
				if (key !== "Name")
				{				
					sMenuItemHTML = '<li class="list-group-item" ><a href="#" class="window-option menu-option" data-menuoption="'; 
					sMenuItemHTML += key + '">' + MenuToLoad[key] + "</a></li>\n";
					MenuList.append(sMenuItemHTML);
				}
			}
		}
		$(document).trigger( "PageLoad" );
		Game.scene = MenuToLoad.Name;
		
	}

	Display.UpdatePlayerStatus = function()
	{
		$(".statusbar").each(function() {
			var StatusBar = $(this);
			var StatusBarImg = $("img", this);
			var sNameOfStatus = StatusBar.attr("id");
			var nStatusValue = Player[sNameOfStatus];
			StatusBarImg.css('width', nStatusValue * 3);

		});
		
	}

}

function initListeners()
{

	$(document).on("PageLoad", function()
	{
		Display.UpdatePlayerStatus();
	});

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

	$(".menu-option").on("click", function()
	{
		var MenuItem = $(this);
		var sMenuOption = MenuItem.attr("data-menuoption");
		console.log(sMenuOption);
		console.log(Game.scene);
	});

	
}

function initMenus()
{
	Menus = 
	{
		WhatToDo: 
		{
			"Name" : "WhatToDo",
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

