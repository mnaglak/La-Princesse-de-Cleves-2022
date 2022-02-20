
//This is where you define the map start up options, here defined to center on Paris and to have a particular zoom. 
	var mapOptions = {
		center: [48.86, 2.33],
		zoom: 10,
		maxZoom : 20,
		minZoom: 4
	}

//This creates the map variable itself based on the options set above	
	var map = new L.map('map', mapOptions); 

//Sidebar creation
	var sidebarLeft = L.control.sidebar({position:"left"}).addTo(map);


//This is where I have begun to create the legend, defining characters with their colors. 
	var princess = "<b>Princesse de Clèves</b>";
	var colorPrincess = princess.fontcolor("#e931be"); //pink
	var prince = "<b>Prince de Clèves</b>";
	var colorPrince = prince.fontcolor("#ff0000"); //red
	var ducdeNemours = "<b>Duc de Nemours</b>";
	var colorNemours = ducdeNemours.fontcolor("#0000ff"); //blue
	var laCour = "<b>La Cour</b>";
	var colorCour = laCour.fontcolor("#A04000"); //brown
	var henri = "<b>Herni II</b>";
	var colorHenri = henri.fontcolor("#000000"); //black
	var elisabeth = "<b>Élisabeth de France</b>"; 
	var colorElisabeth = elisabeth.fontcolor("#85C1E9"); //light blue
	var vidame= "<b>Vidame de Chartres</b>";
	var vidameColor = vidame.fontcolor("#9AFF00"); //bright green
	var connetableMont = "<b>Connétable de Montmorency</b>";
	var colorConnetableMont = connetableMont.fontcolor("#5e8d46"); //dark green
	var marechal = "<b>Maréchal de Saint-André</b>";
	var colorMarechal = marechal.fontcolor("#c59be9"); //light purple
	var lorraine = "<b>Cardinal de Lorraine</b>";
	var colorLorraine = lorraine.fontcolor("#F16E6E"); //light red
	var conde = "<b>Prince de Condé</b>";
	var colorConde = conde.fontcolor("#F2F772"); //light yellow
	var roiNavarre = "<b>Roi de Navarre</b>";
	var colorRoiNavarre = roiNavarre.fontcolor("#C1C1BF"); //grey
	var savoie = "<b>Duc de Savoie</b>";
	var colorSavoie = savoie.fontcolor("#E75C00"); //light brown
	var albe = "<b>Duc d'Albe</b>";
	var colorAlbe = albe.fontcolor("#B7950B"); //green-brown
	var martigues = "<b>Madame de Martigues</b>";
	var colorMartigues = martigues.fontcolor("#FAD7A0"); //peach
	var radan = "<b>Comte de Radan</b>";
	var colorRadan = radan.fontcolor("#c400ff"); //purple
	var lignerolles = "<b>Lignerolles</b>";
	var colorLignerolles = lignerolles.fontcolor("#ffab00"); //orange
	var bourbon = "<b>Connétable de Bourbon</b>";
	var colorBourbon = bourbon.fontcolor("#ffff00"); //yellow
	var espagne = "<b>Médecin du roi d'Espagne</b>";
	var colorEspagne = espagne.fontcolor("#00FFA4"); //aqua-blue
	var gentilhomme = "<b>Gentilhomme</b>";
	var colorGentilhomme = gentilhomme.fontcolor("#1D8348");
	
	//This will eventually create the legend will all associated information
	var legendContent =  colorPrincess + "<br>" + colorPrince + "<br>" + colorNemours + "<br>" + colorCour + "<br>" + colorHenri + "<br>" + colorElisabeth + "<br>" + vidameColor + "<br>" 
	+ colorConnetableMont + "<br>" + colorMarechal + "<br>" + colorLorraine + "<br>" + colorConde + "<br>" + colorRoiNavarre + "<br>" 
	+ colorSavoie + "<br>" + colorAlbe + "<br>" + colorMartigues + "<br>" + colorRadan + "<br>" + colorLignerolles + "<br>" + colorBourbon + "<br>" + colorEspagne + "<br>" + colorGentilhomme;	


//panel creations for left sidebar
//character legend tab
	var panelContent = {
		id: 'legendTab',                     // UID, used to access the panel
		tab: '<i class="fa fa-user"></i>',  // content can be passed as HTML string,
		pane: legendContent,        // DOM elements can be passed, too
		title: 'Legend',              // an optional pane header
		position: 'top'                  // optional vertical alignment, defaults to 'top'
	};
	sidebarLeft.addPanel(panelContent);


//Sets the initial left sidebar content for popup pane and sites of interest pane
	var popupContent = 'Click on a location on the map to receive more information';
	
	var sitesContent = 'Click on one of the following sites to zoom to the desired location' + 
		'<br>' + "<a id='myLink' href='#' onclick='goTo(48.860352821094246, 2.3385858535766606, 15)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Le Louvre</b><br><a id='myLink' href='#' onclick='goTo(48.85736700174229,2.3655581474304204, 17)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Le Palais des Tournelles</b><br><a id='myLink' href='#' onclick='goTo(48.85918110234517, 2.3500013351440434, 14)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Hôtels particuliers</b><br><a id='myLink' href='#' onclick='goTo(48.72358515157852, 3.0514526367187504, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Coulommiers</b><br><a id='myLink' href='#' onclick='goTo(48.058348493290794,1.1604309082031252, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Blois</b><br><a id='myLink' href='#' onclick='goTo(50.0289165635219, 4.084167480468751, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Cateau-Cambrésis</b><br><a id='myLink' href='#' onclick='goTo(50.24720490139267, 2.6312255859375004, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Cercamp</b><br><a id='myLink' href='#' onclick='goTo(47.94762618352869,1.1343383789062502, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Chambord</b><br><a id='myLink' href='#' onclick='goTo(49.19483004925347, 2.4860000610351567, 13)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Chantilly</b>";


//sites of interest panel
	var sitesOfInterestPane = {
		id: 'sites',
		tab: '<i class="fas fa-map-marker"></i>' ,
		pane: sitesContent,
		title: 'Sites of Interest',
		position: 'top'
	};
	sidebarLeft.addPanel(sitesOfInterestPane);


//popup info panel
	var popup = {
		id: 'popupCont',                     // UID, used to access the panel
		tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
		pane: popupContent,        // DOM elements can be passed, too
		title: 'Additional Information',              // an optional pane header
		position: 'top'                  // optional vertical alignment, defaults to 'top'
	};
	sidebarLeft.addPanel(popup);


	//function for zooming to a specific location on the sites of interest pane
	function goTo(lat, lon, zooml) {
			map.setView([lat,lon], zooml);
		  };


//This creates the right sidebar (not currently in use)
//var sidebar = L.control.sidebar({position:"right"}).addTo(map);


//creation of map information panel
	var mapInformation = "Information about the map";
	var mapInfoContent = {
		id: 'aboutMapTab',                     // UID, used to access the panel
		tab: '<i class="fa fa-question-circle"></i>',  // content can be passed as HTML string,
		pane: mapInformation,        // DOM elements can be passed, too
		title: 'Map Information',              // an optional pane header
		position: 'bottom'                  // optional vertical alignment, defaults to 'top'
	};
	sidebarLeft.addPanel(mapInfoContent);

//creation of contact panel
	var contactContent = "Contact us!";
	var panelContent2 = {
		id: 'contactUs',                     // UID, used to access the panel
		tab: '<i class="fa fa-envelope"></i>',  // content can be passed as HTML string,
		pane: contactContent,        // DOM elements can be passed, too
		title: 'Contact Information',              // an optional pane header
		position: 'bottom'                  // optional vertical alignment, defaults to 'top'
	};
	sidebarLeft.addPanel(panelContent2);




//when closing sidbar, resets icon color changes for each site
	map.on('click', function() {
		sidebarLeft.close();
		louvre.setIcon(blueIcon);
		coulommiers.setIcon(blueIcon);
		cateauCambrésis.setIcon(blueIcon);
		leCercamp.setIcon(blueIcon);
		chantilly.setIcon(blueIcon);
		blois.setIcon(blueIcon);
		chambord.setIcon(blueIcon);
		palaisDesTournelles.setIcon(blueIcon);
		hotels.setIcon(blueIcon);
		hotels2.setIcon(blueIcon);
		});

//definition of blue and green icons		
	var greenIcon = L.icon({
		iconUrl: './Images/marker-icon-green.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
		});
		
	var blueIcon = L.icon({
		iconUrl: './Images/marker-icon-blue.png'
		});
		
//when left sidebar closes, reset sidebar content to what appears on opening in pop up pane, and reset map icons
	sidebarLeft.on('closing', function(e) {
		resetSidebarContent();
		sidebarLeft.removePanel('popupCont');
		sidebarLeft.addPanel({
			id: 'popupCont',                     // UID, used to access the panel
			tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
			pane: popupContent,        // DOM elements can be passed, too
			title: 'Additional Information',              // an optional pane header
			position: 'top'        			
			});
			louvre.setIcon(blueIcon);
			coulommiers.setIcon(blueIcon);
			cateauCambrésis.setIcon(blueIcon);
			leCercamp.setIcon(blueIcon);
			chantilly.setIcon(blueIcon);
			blois.setIcon(blueIcon);
			chambord.setIcon(blueIcon);
			palaisDesTournelles.setIcon(blueIcon);
			hotels.setIcon(blueIcon);
			hotels2.setIcon(blueIcon);
		});

//function resets sidebar content for popup pane
		function resetSidebarContent(){
			popupContent = 'Click on a location to receive more information';
			return popupContent;
		};



//Here is where the marker creation takes place and the content for the popup content will be set 
//The lat/long for a particular point can be found either online or by opening the console box of the map and clicking the desired spot
			
//Image and Text in sidebar

//for the Louvre marker
		var louvre = L.marker([48.860352821094246, 2.3385858535766606], {myCustomID: "abc123"});
			louvre.bindTooltip("Le Louvre").openTooltip();
			louvre.on("click", function (e) {
				louvrecontent();
				sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Le Louvre',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				louvre.setIcon(greenIcon);
				coulommiers.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
			
	function louvrecontent() {
			popupContent = "<b> I am a sketch of the Le Louvre from the past </b>"
			+ "<br>" + "<img src='./Images/Fig. 1 Louvre Israel Silvestre.jpeg' width=100%/>" + "<br>" + "See my metadata " + "<a target='_blank' href=''>here</a>" + "<br>" +
			"<i>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet </i>"
			+ "<br>" + "<br>" + 
			"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet";		

			return popupContent;
	};
	
//for hotels
		var hotels = L.marker([48.860875144709475, 2.3408818244934086]);
		hotels.bindTooltip("Hôtels particuliers").openTooltip();
			hotels.on("click", function (e) {
				hotelscontent();
				sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Hôtels particuliers',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(greenIcon);
				hotels2.setIcon(greenIcon);
			});
			
		var hotels2 = L.marker([48.85678111084862, 2.3626613616943364]);
		hotels2.bindTooltip("Hôtels particuliers").openTooltip();
			hotels2.on("click", function (e) {
				hotelscontent();
				sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Hôtels particuliers',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(greenIcon);
				hotels2.setIcon(greenIcon);
			});	
			
			
		function hotelscontent() {
			popupContent = "<b> I am Hôtels particuliers</b>";

			return popupContent;
		};
	
	
	
	
	
	

//for Coulommiers
		var coulommiers= L.marker([48.72358515157852, 3.0514526367187504]);
			coulommiers.bindTooltip("Coulommiers").openTooltip();
			coulommiers.on("click", function (e) {
				coulommierscontent();
				sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Coulommiers',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(greenIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
			
		function coulommierscontent() {
			popupContent = "<b> I am Coulommiers</b>"
			+ "<br>" + "<img src='./Images/Coulommiers_vers_1600.JPG' width=100%/>"+ "<br>" + "See my metadata " + "<a target='_blank' href=''>here</a>" + "<br>" +
			"I am also Coulommiers" + "<br>" + "<img src='./Images/Prospect_du_Chasteau_de_Coulommiers_en_Brie.jpg' width=100%/>" 
			+"<br>" + "See my metadata " + "<a target='_blank' href=''>here</a>";

			return popupContent;
		};


//for cateauCambrésis
var cateauCambrésis = L.marker([50.0289165635219, 4.084167480468751]);
	cateauCambrésis.bindTooltip("Cateau-Cambrésis").openTooltip();
	cateauCambrésis.on("click", function (e) {
		cateauCambrésiscontent();
		sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Cateau-Cambrésis',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(greenIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
		
		function cateauCambrésiscontent() {
			popupContent = "<b> I am Cateau-Cambrésis! I will have content soon! <b>";
			return popupContent;
		};


//for Cercamp 
var leCercamp = L.marker([50.24720490139267, 2.6312255859375004]);
	leCercamp.bindTooltip("Cercamp").openTooltip();
	leCercamp.on("click", function (e) {
		leCercampcontent();
		sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Cercamp',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(greenIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
		
		function leCercampcontent() {
			popupContent = "<b> I am Cercamp! I will have content soon! <b>";
			return popupContent;
		};


//for chantilly
		var chantilly = L.marker([49.19483004925347,2.4860000610351567]);
		chantilly.bindTooltip("Chantilly").openTooltip();
		chantilly.on("click", function (e) {
		chantillycontent();
		sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Chantilly',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(greenIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
		
		function chantillycontent() {
			popupContent = "<b> I am Chantilly! I will have content soon! <b>";
			return popupContent;
		};

//for blois 
		var blois = L.marker([48.058348493290794,1.1604309082031252]);
		blois.bindTooltip("Blois").openTooltip();
		blois.on("click", function (e) {
		bloiscontent();
		sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Blois',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(greenIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
		
		function bloiscontent() {
			popupContent = "<b> I am Blois! I will have content soon! <b>";
			return popupContent;
		};

//chambord
		var chambord = L.marker([47.94762618352869,1.1343383789062502]);
		chambord.bindTooltip("Chambord").openTooltip();
		chambord.on("click", function (e) {
		chambordcontent();
		sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Chambord',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(greenIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
		
		function chambordcontent() {
			popupContent = "<b> I am Chambord! I will have content soon! <b>";
			return popupContent;
		};

//Palais des Tournelles
		var palaisDesTournelles = L.marker([48.85736700174229,2.3655581474304204]);
		palaisDesTournelles.bindTooltip("Le Palais des Tournelles").openTooltip();
		palaisDesTournelles.on("click", function (e) {
		palaisDesTournellescontent();
		sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Le Palais des Tournelles',              // an optional pane header
					position: 'top'        			
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambrésis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(greenIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
			});
		
		function palaisDesTournellescontent() {
			popupContent = "<b> I am Le Palais des Tournelles! I will have content soon! <b>";
			return popupContent;
		};
		
			
			
//	merging of these sites for turning on/off
		var pointsOfFocus = L.layerGroup([louvre, coulommiers, chantilly, cateauCambrésis, leCercamp, blois, chambord, palaisDesTournelles, hotels, hotels2]).addTo(map);


//Function to see map coordinates in console on click
		map.on('click', function(e){
			var coord = e.latlng;
			var lat = coord.lat;
			var lng = coord.lng;
			console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
		});
		




//Setting map underlays in specific z-order. The lower the number, the lower down the map will appear.
//Here it is set up so that the modern imagery is the lowest, followed by the europe imagery, followed by the france imagery, etc. 
//Just below, when the layers are imported, you'll see that some are put in a specific pane so they don't cover up smaller ones.	
		map.createPane('modern');
		map.getPane('modern').style.zIndex = 140;
			
		map.createPane('iledeFrance');
		map.getPane('iledeFrance').style.zIndex = 150;

		map.createPane('france');
		map.getPane('france').style.zIndex = 145;
	
		map.createPane('europe');
		map.getPane('europe').style.zIndex = 143;	


//Here is where we bring in the different map underlays
//This first is the modern world imagery, currently called from arcGIS online.
	var esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		pane :'modern', attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}).addTo(map); 
		
	
//Now we start calling our locally stored and created Tile Maps. For how to tile a map, see the tiling instructions in the tutorial
//Note that some have .addTo(map) on the end. This means they will appear when the map is initially loaded
//You can also set the min/max zoom for these maps, though this is also relient upon actually having made tiles at these zoom levels 
	var paris1578 = L.tileLayer('./tiledMaps/1578/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 12, maxZoom: 18}).addTo(map);
	var paris1615 = L.tileLayer('./tiledMaps/1615/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 11, maxZoom: 16});
	var paris1652 = L.tileLayer('./tiledMaps/1652/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25});
	var paris1675 = L.tileLayer('./tiledMaps/1675/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 16}).addTo(map);
	
//Note that these last 3 have a "pane" that is definined in their options. This is so that they will appear beneath the smaller maps instead of on top
//See just above for the z values of the different panes
	var ileDeFrance1598 = L.tileLayer('./tiledMaps/1598/{z}/{x}/{y}.png', {tms: true, pane: 'iledeFrance', attribution: "", minZoom: 9, maxZoom: 13}).addTo(map);
	var france1570 = L.tileLayer('./tiledMaps/1570/{z}/{x}/{y}.png', {tms: true, pane: 'france', attribution: "", minZoom: 6, maxZoom: 10}).addTo(map);
	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, pane: 'europe', attribution: "", minZoom: 1, maxZoom: 8}).addTo(map);


//This is where we import the .geoJson file exported from ArcGIS Pro
//This also tells the pop up boxes to come up on each feature (see fuction popup below)
//As well as to swap the style for each line according to the book/character attributes of the geojson
	var movement =  new L.GeoJSON.AJAX("PdCMovement_all.geojson", {
		
		//this will eventually be removed when fully integrated into the sidebar with no popup boxes on the map, only swapstyle will be left
		onEachFeature: function (feature, layer) {
			var out = [];
				if (feature.properties){
					out.push("<b>Character: </b>" +feature.properties.Character);
					out.push("<b>Travel From: </b>" +feature.properties.Start);
					out.push("<b>Travel To: </b>" +feature.properties.End);
					out.push("<b>Book Part: </b>" +feature.properties.Book_Part);
					/*for(key in f.properties){
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
					}*/
				}
			layer.bindPopup(out.join("<br />"));		
		},
		style: swapStyle
	});


//Now we want to create our layer box that lets us turn different maps on and off
//These can be divided into two types, basically radio buttons and check boxes
//Maps put in the "baseMaps" variable are radio buttons, which means only one map can be turned on at a time

//List of desired baseMap layers
//Right now it just includes our modern underlay
	var baseLayers = {
		"Modern Imagery" : esri_WorldImagery
		};
	

//Maps put in the overlayMaps variable are check boxes, meaning any variety of them can be turned on at a time
//Right now it includes all the other maps we have imported, as well as our Points of Focus icon group
//Note the order the maps are listed here is the order they will appear in the checkbox. The first part of each row is the label to accompany it
	var overlayMaps = {
			"<a target='_blank' href=''>1578 Paris</a>": paris1578,
			"<a target='_blank' href=''>1615 Paris</a>" : paris1615,
			"<a target='_blank' href=''>1652 Paris</a>" : paris1652,
			"<a target='_blank' href=''>1675 Paris</a>" : paris1675,
			"<a target='_blank' href=''>1598 Ile de France</a>" : ileDeFrance1598,
			"<a target='_blank' href=''>1570 France</a>" : france1570,
			"<a target='_blank' href=''>1644 Europe</a>" : europe1644,
			"Points of Focus" : pointsOfFocus,
			"Character Movements" : movement
			};

//Then this created the actual control box
	L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);



//Function sets a particular color and style for each character and part of the book	
	function swapStyle(feature) {
		if (feature.properties.Book_Part === 1) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000" }; //red
					case 'Duc de Nemours': return {color: "#0000ff"}; //blue
					case 'Cardinal de Lorraine': return {color: "#F16E6E"}; //light red
					case 'Connétable de Montmorency': return {color: "#5e8d46"}; //dark green
					case 'Maréchal de Saint-André' : return {color: "#c59be9"}; //light purple
					case 'Henri II': return {color: "#000000"}; //black
					case 'Duc de Savoie': return {color: "#E75C00"}; //light brown
					case 'Comte de Radan': return {color: "#c400ff"}; //purple
					case 'Lignerolles': return {color: "#ffab00"}; //orange
					case 'Connétable de Bourbon': return {color: "#ffff00"}; //yellow
					case 'Princesse de Clèves': return {color: "#e931be"}; //pink
					case 'Vidame de Chartres': return {color: "#9AFF00"}; //bright green
					case "Duc d'Albe": return {color: "#B7950B" }; //green-brown
					case "Médecin du roi d'Espagne": return {color: "#00FFA4" }; //aqua-blue
					case 'La Cour': return {color: "#A04000"}; //brown
					case 'Roi de Navarre': return {color: "#C1C1BF"}; //grey
					case 'Prince de Condé': return {color: "#F2F772"}; //light yellow
					case 'Élisabeth de France': return {color: "#85C1E9"}; //light blue
					case 'Gentilhomme': return {color: "#1D8348"}; //dark green 
					case 'Madame de Martigues': return {color: "#FAD7A0"}; //peach
				}
			}
		
		if (feature.properties.Book_Part === 2) {
				switch (feature.properties.Character) {
					case 'Princesse de Clèves': return {color: "#e931be", dashArray: '25,20'};
				}
			}
		if (feature.properties.Book_Part === 3) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000", dashArray: '15, 10, 5' };
					case 'Duc de Nemours': return {color: "#0000ff", dashArray: '15, 10, 5'};
					case 'Henri II': return {color: "#000000", dashArray: '15, 10, 5'};
					case 'Duc de Savoie': return {color: "#E75C00", dashArray: '15, 15, 5'};
					case 'Princesse de Clèves': return {color: "#e931be", dashArray: '15, 10, 5'};
					case 'Vidame de Chartres': return {color: "#9AFF00", dashArray: '15, 10, 5' };
					case "Duc d'Albe": return {color: "#B7950B", dashArray: '15, 10, 5' };
					case "Médecin du roi d'Espagne": return {color: "#00FFA4", dashArray: '15, 10, 5' };
					case 'La Cour': return {color: "#A04000", dashArray: '15, 10, 5'};
				}
			}
			
		if (feature.properties.Book_Part === 4) {
				switch (feature.properties.Character) {
					case 'Prince de Clèves': return {color: "#ff0000", dashArray: '5, 10' };
					case 'Duc de Nemours': return {color: "#0000ff", dashArray: '5, 10' };
					case 'Connétable de Montmorency': return {color: "#5e8d46", dashArray: '5, 10' };
					case 'Princesse de Clèves': return {color: "#e931be", dashArray: '5, 10' };
					case 'Vidame de Chartres': return {color: "#9AFF00" , dashArray: '5, 10' };
					case 'La Cour': return {color: "#A04000", dashArray: '5, 10' };
					case 'Roi de Navarre': return {color: "#C1C1BF", dashArray: '5, 10' };
					case 'Prince de Condé': return {color: "#F2F772", dashArray: '5, 10' };
					case 'Élisabeth de France': return {color: "#85C1E9", dashArray: '5, 10' };
					case 'Gentilhomme': return {color: "#1D8348", dashArray: '5, 10' };
					case 'Madame de Martigues': return {color: "#FAD7A0", dashArray: '5, 10' };
				}
			}
		}; 
			

//Setting up the two filtered drop down boxes, one by part and one by character, to show only certain characters/parts at any one time
//Its based on two attributes which must both be "on" for the line to show	
var partDropdown = L.control({position: 'topright'});
	
	partDropdown.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend');
		div.innerHTML = '<select><option>Parts of the Novel</option><option>Show All Parts</option><option>Part 1</option><option>Part 2</option><option>Part 3</option><option>Part 4</option></select>';
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		return div;
		};
		partDropdown.addTo(map);
		$('select').change(function(){
			var value = $(this).val();
			
				if (value === 'Parts of the Novel') {
					movement.refilter(function(feature){
							feature.properties.turnOn = 0;
							
						return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}
						
			
				
				if (value === 'Show All Parts') {
					movement.refilter(function(feature){
							feature.properties.turnOn = 1;
							
						return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}

			if (value == 'Part 1') {
				movement.refilter(function(feature){
					if (feature.properties.Book_Part==1) {
						feature.properties.turnOn = 1; }
					else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	} 
			
			if (value == 'Part 2') {
				movement.refilter(function(feature){
				if (feature.properties.Book_Part==2) {
					feature.properties.turnOn = 1; }
				else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}
			
			if (value == 'Part 3') {
				movement.refilter(function(feature){
				if (feature.properties.Book_Part==3) {
					feature.properties.turnOn = 1; }
					else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}

			if (value == 'Part 4') {
				movement.refilter(function(feature){
				if (feature.properties.Book_Part==4) {
					feature.properties.turnOn = 1; }
					else 
						feature.properties.turnOn=0;
			 return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	} 

			 
});
function filterInfo(){
	var div2 = L.DomUtil.get("box1");
	div2.innerHTML="<strong>Filtering Controls</strong>";
	return div2; }

filterInfo();
//creates and controls character filter. showOnMap is the character associated attribute and turnOn is the part associated attribute
var characterDropdown = L.control({position: 'topright'});
	characterDropdown.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info');
		div.innerHTML = "<select><option>Character Movements in the Novel</option><option>Show All Characters</option><option>Princesse de Clèves</option><option>Prince de Clèves</option><option>Duc de Nemours</option><option>La Cour</option><option>Henri II</option><option>Élisabeth de France</option><option>Vidame de Chartres</option><option>Connétable de Montmorency</option><option>Maréchal de Saint-André</option><option>Cardinal de Lorraine</option><option>Prince de Condé</option><option>Roi de Navarre</option><option>Duc de Savoie</option><option>Duc d'Albe</option><option>Madame de Martigues</option><option>Comte de Radan</option><option>Lignerolles</option><option>Connétable de Bourbon</option><option>Médecin du roi d'Espagne</option><option>Gentilhomme</option></select>";
		
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		return div;
		};
		characterDropdown.addTo(map);
		
		$('select').change(function(){
			var value = $(this).val();
			movement.addTo(map);
			if (value === 'Character Movements in the Novel') {
					movement.refilter(function(feature){
							feature.properties.showOnMap = 0;
							
						return feature.properties.turnOn == 1 && feature.properties.showOnMap==1;})	}
						
			if (value == 'Show All Characters') {
				movement.refilter(function(feature){
					feature.properties.showOnMap = 1;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Prince de Clèves') {
				movement.refilter(function(feature){
					if (feature.properties.Character=='Prince de Clèves') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
					
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Duc de Nemours') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Duc de Nemours') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Cardinal de Lorraine') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Cardinal de Lorraine') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Connétable de Montmorency') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Connétable de Montmorency') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Maréchal de Saint-André') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Maréchal de Saint-André') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Henri II') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Henri II') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Duc de Savoie') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Duc de Savoie') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Comte de Radan') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Comte de Radan') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Connétable de Bourbon') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Connétable de Bourbon') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == 'Lignerolles') {
				movement.refilter(function(feature){
			if (feature.properties.Character=='Lignerolles') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
		
			
			if (value == 'Princesse de Clèves') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Princesse de Clèves') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			
			if (value == 'Vidame de Chartres') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Vidame de Chartres') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == "Duc d'Albe") {
				movement.refilter(function(feature){
				if (feature.properties.Character=="Duc d'Albe") {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			if (value == "Médecin du roi d'Espagne") {
				movement.refilter(function(feature){
				if (feature.properties.Character=="Médecin du roi d'Espagne") {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
		
			if (value == 'La Cour') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='La Cour') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
			if (value == 'Roi de Navarre') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Roi de Navarre') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
			if (value == 'Prince de Condé') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Prince de Condé') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	
	if (value == 'Élisabeth de France') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Élisabeth de France') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			
			if (value == 'Gentilhomme') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Gentilhomme') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
			
			
			
			if (value == 'Madame de Martigues') {
				movement.refilter(function(feature){
				if (feature.properties.Character=='Madame de Martigues') {
					feature.properties.showOnMap = 1; }
					else 
						feature.properties.showOnMap=0;
			return feature.properties.showOnMap===1 && feature.properties.turnOn===1;})	}
	}); 

//Now we do the same thing for the opacity control box
//Here is our list of Layers to be controlled by the Opacity Control Box, again in the proper order
		var opacityLayers = {
			"1578 Paris" : paris1578,
			"1615 Paris" : paris1615,
			"1652 Paris" : paris1652,
			"1675 Paris" : paris1675,
			"1598 Ile de France" : ileDeFrance1598,
			"1570 France" : france1570,
			"1644 Europe" : europe1644
			};


//Now we similar create the opacity control box
		L.control.opacity(
			opacityLayers, //the variable containing all the maps
			{label: "<b>Opacity</b>", //the label for the box
			position: 'topright',
			collapsed: true} //if we want the opacity box to be collapsed or not. We can do the same thing for the control layers box if desired
			).addTo(map);


//Creation of pan/scale function in the top left cornder of the map.
		L.control.pan().addTo(map);
		L.control.scale().addTo(map);
		map.addControl(new L.Control.Fullscreen());

	
	/*Removed timeline to use dropdown box instead
//The following portion of the code is all about the timeline
//This portion of the code sets up the style of the timeline. 
//Here you can pick the max/min of the slider, the number of ticks, the width between ticks, etc
 var slider = d3
    .sliderHorizontal()
    .min(1)
    .max(4)
    .step(1)
	.ticks(4)
	.tickFormat(d3.format(',.0f')) //integer format. Others possible
    .width(150)
    .displayValue(true)
    .on('end', val => { //tells it to run onSlider when engaged with
	    onSlider(val);
    });
//This portion of the code sets up the size attributes of the of the timeline
  d3.select('#slider') 
    .append('svg')
    .attr('width', 200)
    .attr('height', 50)
    .append('g')
    .attr('transform', 'translate(20,10)')
    .call(slider); 
	
//This portion of the code says what happens when different values (1, 2, 3, 4) of the timeline are chosen
//Right now, since there is only one part of the book with data, it turns on part 1 when part 1 is chosen, and turns if off when any other part is chosen
//It will need to be updated when more parts are available
	function onSlider(val) { //function receives the value on the slider
		if (val==1) {
		movement.addTo(map);}
		else {
		movement.remove();}
	}
//This is the initial filter to open the map with
	onSlider(1); 					
*/



/* Arrows currently broken on filtering
//This sets the style of the arrows on the geojson characters. It will need to be updated for future geoJSON files.
//It uses the leaflet.text plug in
	movement.on('mouseover', function () {
        this.setText('  ►  ', {repeat: true, offset: 6, attributes: {fill: 'black', 'font-size': 17}});
		});
    movement.on('mouseout', function () {
        this.setText(null);
    }); 
*/

/* Added to inside of onEachFeature function 
//Function to allow for popup box containing attributes of .geoJSON files
//This can be customized further when the final characteristics fo the .geoJSON are set up
	function popUp(f,l){
		var out = [];
				if (f.properties){
					out.push("<b>Character: </b>" +f.properties.Character);
					out.push("<b>Travel From: </b>" +f.properties.Start);
					out.push("<b>Travel To: </b>" +f.properties.End);
					out.push("<b>Book Section: </b>" +f.properties.Book_Part);
					/*for(key in f.properties){
						out.push(key+": "+f.properties[key]); //pushes out .geoJSON attributes exported from ArcGIS
					}
				}
		l.bindPopup(out.join("<br />"))		
	}*/	
	
/*This section of the code created the original legend. It has been moved into a side panel 
//the .css info for the legend can be found in the .css file
//getColor will need to be updated with future character colors, along with the categories array for character names
	function getColor(d) {
		return 	d === 'Prince de Clèves' ? '#ff0000' :
				d === 'Duc de Nemours'? '#0000ff' :			
				d === 'Cardinal de Lorraine'? "#d9ff15":
				d === 'Connétable de Montmorency'?  "#5e8d46":
				d === 'Maréchal de Saint-André' ? "#c59be9":				
				d === 'Henri II'?  "#000000":
				d === 'Duc de Savoie'?  "#a66c32":
				d === 'Comte de Radan'?  "#c400ff":
				d === 'Lignerolles'?  "#ffab00":
				d === 'Connétable de Bourbon'?  "#ffff00":
				d === 'Princesse de Clèves'? "#e931be":
				d === 'Vidame de Chartres'? "#CACFD2":
				d === "Duc d'Albe"? "#B7950B":
				d === "Médecin du roi d'Espagne"? "#D7BDE2" :
				d === 'La Cour'? "#A04000" :
				d === 'Roi de Navarre'? "#FDFEFE" :
				d === 'Prince de Condé'? "#A93226" :
				d === 'Élisabeth de France'? "#85C1E9" :
				d === 'Gentilhomme'? "#1D8348" :
				d === 'Madame de Martigues'? "#FAD7A0":
										'#0000ff';
}

	var legend = L.control({position: 'bottomleft'});
	function showLegend() {
		legend.addTo(map);
    }
	function hideLegend() {
        var div = document.getElementById("info legend")
        div.innerHTML = "<h2>Legend</h2>";
    }
	legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
			labels= ['<b>Characters</b>'],
			categories = ['Prince de Clèves', 'Duc de Nemours', 'Cardinal de Lorraine', 'Connétable de Montmorency', 'Maréchal de Saint-André','Henri II', 'Duc de Savoie',
							'Comte de Radan', 'Lignerolles', 'Connétable de Bourbon', 'Princesse de Clèves',
							'Vidame de Chartres', "Duc d'Albe", "Médecin du roi d'Espagne", 'La Cour', 'Roi de Navarre', 'Prince de Condé', 'Élisabeth de France', 'Gentilhomme','Madame de Martigues' ];


		// loop through our characters and generate a label with a colored square for each character
		for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
		div.setAttribute("onmouseenter", "showLegend()");
		div.setAttribute("onmouseleave", "hideLegend()");
		    div.id = "info legend"
		return div;
	};
	legend.addTo(map);
	hideLegend();
*/	
	
	
	