



//This is where you define the map start up options, here defined to center on Paris and to have a particular zoom.
	var mapOptions = {
		center: [48.86, 2.33],
		zoom: 13,
		maxZoom : 20,
		minZoom: 4,
		touchZoom: true
	};

  //This creates the map variable itself based on the options set above
  	var map = new L.map('map', mapOptions);
    //Creation of pan/scale function in the top left cornder of the map.
    L.control.pan().addTo(map);
  	L.control.scale().addTo(map);
		map.addControl(new L.Control.Fullscreen());

//////////////////////////////////////////////////////////
//Overlay Maps and Pane order

//Setting map underlays in specific z-order. The lower the number, the lower down the map will appear.
//Here it is set up so that the modern imagery is the lowest, followed by the europe imagery, followed by the france imagery, etc.
//Just below, when the layers are imported, you'll see that some are put in a specific pane so they don't cover up smaller ones.
		map.createPane('modern');
		map.getPane('modern').style.zIndex = 5;

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
    	var paris1578 = L.tileLayer('./tiledMaps/1578/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 12, maxZoom: 18});
    	var paris1615 = L.tileLayer('./tiledMaps/1615/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 11, maxZoom: 16});
    	var paris1652 = L.tileLayer('./tiledMaps/1652/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 25});
    	var paris1675 = L.tileLayer('./tiledMaps/1675/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 9, maxZoom: 16}).addTo(map);

    //Note that these last 3 have a "pane" that is definined in their options. This is so that they will appear beneath the smaller maps instead of on top
    //See just above for the z values of the different panes
    	var ileDeFrance1598 = L.tileLayer('./tiledMaps/1598/{z}/{x}/{y}.png', {tms: true, pane: 'iledeFrance', attribution: "", minZoom: 9, maxZoom: 13});
    	var france1570 = L.tileLayer('./tiledMaps/1570/{z}/{x}/{y}.png', {tms: true, pane: 'france', attribution: "", minZoom: 6, maxZoom: 10}).addTo(map);
    	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, pane: 'europe', attribution: "", minZoom: 1, maxZoom: 8});



///////////////////////////////////////////////////////////////////////////////
////VECTOR LAYERS//////
///////////////////////////////////////////////////////////////////////////////

var characterMovement = L.geoJson(movement, {
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
var movementGroup = L.layerGroup([characterMovement]);
movementGroup.addTo(map);
//Function sets a particular color and style for each character and part of the book
	function swapStyle(feature) {
		if (feature.properties.Book_Part === 1) {
				switch (feature.properties.Character) {
					case 'Prince de Cl??ves': return {color: "#ff0000" }; //red
					case 'Duc de Nemours': return {color: "#0000ff"}; //blue
					case 'Cardinal de Lorraine': return {color: "#F16E6E"}; //light red
					case 'Conn??table de Montmorency': return {color: "#5e8d46"}; //dark green
					case 'Mar??chal de Saint-Andr??' : return {color: "#c59be9"}; //light purple
					case 'Henri II': return {color: "#000000"}; //black
					case 'Duc de Savoie': return {color: "#E75C00"}; //light brown
					case 'Comte de Radan': return {color: "#c400ff"}; //purple
					case 'Lignerolles': return {color: "#ffab00"}; //orange
					case 'Conn??table de Bourbon': return {color: "#541B54"}; //yellow
					case 'Princesse de Cl??ves': return {color: "#e931be"}; //pink
					case 'Vidame de Chartres': return {color: "#9AFF00"}; //bright green
					case "Duc d'Albe": return {color: "#B7950B" }; //green-brown
					case "M??decin du roi d'Espagne": return {color: "#00FFA4" }; //aqua-blue
					case 'La Cour': return {color: "#A04000"}; //brown
					case 'Roi de Navarre': return {color: "#C1C1BF"}; //grey
					case 'Prince de Cond??': return {color: "#9B870C"}; //light yellow
					case '??lisabeth de France': return {color: "#85C1E9"}; //light blue
					case 'Gentilhomme': return {color: "#1D8348"}; //dark green
					case 'Madame de Martigues': return {color: "#FAD7A0"}; //peach
				}
			}

		if (feature.properties.Book_Part === 2) {
				switch (feature.properties.Character) {
					case 'Princesse de Cl??ves': return {color: "#e931be", dashArray: '25,20'};
				}
			}
		if (feature.properties.Book_Part === 3) {
				switch (feature.properties.Character) {
					case 'Prince de Cl??ves': return {color: "#ff0000", dashArray: '15, 10, 5' };
					case 'Duc de Nemours': return {color: "#0000ff", dashArray: '15, 10, 5'};
					case 'Henri II': return {color: "#000000", dashArray: '15, 10, 5'};
					case 'Duc de Savoie': return {color: "#E75C00", dashArray: '15, 15, 5'};
					case 'Princesse de Cl??ves': return {color: "#e931be", dashArray: '15, 10, 5'};
					case 'Vidame de Chartres': return {color: "#9AFF00", dashArray: '15, 10, 5' };
					case "Duc d'Albe": return {color: "#B7950B", dashArray: '15, 10, 5' };
					case "M??decin du roi d'Espagne": return {color: "#00FFA4", dashArray: '15, 10, 5' };
					case 'La Cour': return {color: "#A04000", dashArray: '15, 10, 5'};
				}
			}

		if (feature.properties.Book_Part === 4) {
				switch (feature.properties.Character) {
					case 'Prince de Cl??ves': return {color: "#ff0000", dashArray: '5, 10' };
					case 'Duc de Nemours': return {color: "#0000ff", dashArray: '5, 10' };
					case 'Conn??table de Montmorency': return {color: "#5e8d46", dashArray: '5, 10' };
					case 'Princesse de Cl??ves': return {color: "#e931be", dashArray: '5, 10' };
					case 'Vidame de Chartres': return {color: "#9AFF00" , dashArray: '5, 10' };
					case 'La Cour': return {color: "#A04000", dashArray: '5, 10' };
					case 'Roi de Navarre': return {color: "#C1C1BF", dashArray: '5, 10' };
					case 'Prince de Cond??': return {color: "#9B870C", dashArray: '5, 10' };
					case '??lisabeth de France': return {color: "#85C1E9", dashArray: '5, 10' };
					case 'Gentilhomme': return {color: "#1D8348", dashArray: '5, 10' };
					case 'Madame de Martigues': return {color: "#FAD7A0", dashArray: '5, 10' };
				}
			}
		};

/////////////////////////////////////////
///Search Boxes/////
//create Search Control for part of Book
var searchControlPart = new L.Control.Search({
  layer: L.featureGroup([movementGroup]),
  propertyName: 'Book_Part',
  textPlaceholder: 'Filter by Part (1-4)',
  marker: false,
  collapsed: false,
	position: 'bottomleft',
  zoom: 8,
	textErr: "Only Book Parts 1-4"
  });
map.addControl( searchControlPart);

	searchControlPart.on('search:locationfound', function(e) {
    movementGroup.clearLayers();

    var choicePart = document.getElementById("searchtext20").value;
    var choiceCharacter = document.getElementById("searchtext19").value;

    var characterMovement = L.geoJson(movement, { //filter geojson based on user input and record start and stop data and province data
			filter:
				function (feature, layer) {
						if(choiceCharacter=='') {
              return (feature.properties.Book_Part == choicePart);
            }
            else {
              return (feature.properties.Character == choiceCharacter && feature.properties.Book_Part == choicePart);
            }
				},
			style: swapStyle,
      onEachFeature: function (feature, layer) {
        var out = [];
          if (feature.properties){
            out.push("<b>Character: </b>" +feature.properties.Character);
            out.push("<b>Travel From: </b>" +feature.properties.Start);
            out.push("<b>Travel To: </b>" +feature.properties.End);
            out.push("<b>Book Part: </b>" +feature.properties.Book_Part);
          }
        layer.bindPopup(out.join("<br />"));
      }
		});
    movementGroup.addLayer(characterMovement).addTo(map); //add layer back to group

  }).on('search:cancel', function(e) {
    movementGroup.clearLayers();

    var choiceCharacter = document.getElementById("searchtext19").value;

    if (choiceCharacter == ''){
    var characterMovement = L.geoJson(movement, { //filter geojson based on user input and record start and stop data and province data
			style: swapStyle,
      onEachFeature: function (feature, layer) {
        var out = [];
          if (feature.properties){
            out.push("<b>Character: </b>" +feature.properties.Character);
            out.push("<b>Travel From: </b>" +feature.properties.Start);
            out.push("<b>Travel To: </b>" +feature.properties.End);
            out.push("<b>Book Part: </b>" +feature.properties.Book_Part);
          }
        layer.bindPopup(out.join("<br />"));
      }
		});
    }
    else {
      var characterMovement = L.geoJson(movement, { //filter geojson based on user input and record start and stop data and province data
        filter:
        function (feature, layer) {
                return (feature.properties.Character == choiceCharacter);
        },
        style: swapStyle,
        onEachFeature: function (feature, layer) {
          var out = [];
            if (feature.properties){
              out.push("<b>Character: </b>" +feature.properties.Character);
              out.push("<b>Travel From: </b>" +feature.properties.Start);
              out.push("<b>Travel To: </b>" +feature.properties.End);
              out.push("<b>Book Part: </b>" +feature.properties.Book_Part);
            }
          layer.bindPopup(out.join("<br />"));
        }
      });

    }
    movementGroup.addLayer(characterMovement).addTo(map); //add layer back to group
});




//create search control for people
var searchControlPeople = new L.Control.Search({
  layer: L.featureGroup([movementGroup]),
  propertyName: 'Character',
  textPlaceholder: 'Filter by Character',
  marker: false,
  collapsed: false,
	position: 'bottomleft',
  zoom: 8,
	textErr: "Character not found; see Character List"

  });
map.addControl( searchControlPeople );

	searchControlPeople.on('search:locationfound', function(e) {
    //clear movement layer
    movementGroup.clearLayers();
    //check search boxes for content
    var choiceCharacter = document.getElementById("searchtext19").value;
    var choicePart = document.getElementById("searchtext20").value;

    //filter movement based on search box contents, checking both boxes
    var characterMovement = L.geoJson(movement, { //filter geojson based on user input and record start and stop data and province data
			filter:
				function (feature, layer) {
          if(choicePart=='') {
            return (feature.properties.Character == choiceCharacter);
            }
          else {
              return (feature.properties.Character == choiceCharacter && feature.properties.Book_Part == choicePart);
          }
				},
			style: swapStyle,
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
      }
		});
    movementGroup.addLayer(characterMovement).addTo(map); //add layer back to group

    //Clear Search, checking if the other search box has content
  }).on('search:cancel', function(e) {
    movementGroup.clearLayers();
    var choicePart = document.getElementById("searchtext20").value;
    if (choicePart=='') {
    var characterMovement = L.geoJson(movement, { //filter geojson based on user input and record start and stop data and province data
			style: swapStyle,
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
      }
		});
    }
    else {
      var characterMovement = L.geoJson(movement, { //filter geojson based on user input and record start and stop data and province data
        filter:
        function (feature, layer) {
								return (feature.properties.Book_Part == choicePart);
				},
        style: swapStyle,
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
        }
  		});
    }
    movementGroup.addLayer(characterMovement).addTo(map); //add layer back to group
});

//////////////////////////////////////////////////////
/////////////////SIDEBAR//////////////////////////////
//////////////////////////////////////////////////////
	var sidebarLeft = L.control.sidebar({position:"left"}).addTo(map);


//This is where I have begun to create the legend, defining characters with their colors.
	var princess = "<b>Princesse de Cl??ves</b>";
	var colorPrincess = princess.fontcolor("#e931be"); //pink
	var prince = "<b>Prince de Cl??ves</b>";
	var colorPrince = prince.fontcolor("#ff0000"); //red
	var ducdeNemours = "<b>Duc de Nemours</b>";
	var colorNemours = ducdeNemours.fontcolor("#0000ff"); //blue
	var laCour = "<b>La Cour</b>";
	var colorCour = laCour.fontcolor("#A04000"); //brown
	var henri = "<b>Henri II</b>";
	var colorHenri = henri.fontcolor("#000000"); //black
	var elisabeth = "<b>??lisabeth de France</b>";
	var colorElisabeth = elisabeth.fontcolor("#85C1E9"); //light blue
	var vidame= "<b>Vidame de Chartres</b>";
	var vidameColor = vidame.fontcolor("#9AFF00"); //bright green
	var connetableMont = "<b>Conn??table de Montmorency</b>";
	var colorConnetableMont = connetableMont.fontcolor("#5e8d46"); //dark green
	var marechal = "<b>Mar??chal de Saint-Andr??</b>";
	var colorMarechal = marechal.fontcolor("#c59be9"); //light purple
	var lorraine = "<b>Cardinal de Lorraine</b>";
	var colorLorraine = lorraine.fontcolor("#F16E6E"); //light red
	var conde = "<b>Prince de Cond??</b>";
	var colorConde = conde.fontcolor("#9B870C"); // yellow
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
	var bourbon = "<b>Conn??table de Bourbon</b>";
	var colorBourbon = bourbon.fontcolor("#541B54"); //yellow
	var espagne = "<b>M??decin du roi d'Espagne</b>";
	var colorEspagne = espagne.fontcolor("#00FFA4"); //aqua-blue
	var gentilhomme = "<b>Gentilhomme</b>";
	var colorGentilhomme = gentilhomme.fontcolor("#1D8348");

	//This will eventually create the legend will all associated information
	var legendContent = "The movements of the following characters appear on the interactive map in their respective colors. The filtering boxes on the left side of the map allow you to filter by the part of the novel, with '1', '2', '3', and '4' as possible choices (top filter), or to view a selected character???s movements (bottom filter). To filter by character, begin typing their name according to the list below; the name will appear for selection.<br><br>To start a new filter after a search, click the 'x' button on the right side of the filter box. Note that character movements are not weighted, meaning that the character???s movements that occur repeatedly back and forth between a location <i>within</i> a single part of the novel do not appear. To see all characters??? movements, turn off  filters or refresh the map. To turn off characters??? movements or locations of interest, use the checked boxes in the upper-right list of layers.<br><br><b><u>Filter by Character</u></b><br>" + colorPrincess + "<br>" + colorPrince + "<br>" + colorNemours + "<br>" + colorCour + "<br>" + colorHenri + "<br>" + colorElisabeth + "<br>" + vidameColor + "<br>"
	+ colorConnetableMont + "<br>" + colorMarechal + "<br>" + colorLorraine + "<br>" + colorConde + "<br>" + colorRoiNavarre + "<br>"
	+ colorSavoie + "<br>" + colorAlbe + "<br>" + colorMartigues + "<br>" + colorRadan + "<br>" + colorLignerolles + "<br>" + colorBourbon + "<br>" + colorEspagne + "<br>" + colorGentilhomme + "<br><br>" + "<b><u>Filter by Part<br></u></b>" + "<b style='color:black'>Part 1: _______ (solid line)<br>Part 2: ___  ___ (long dashes)<br>Part 3: ___ ___ _ (long-long-short)<br>Part 4: _ _ _ (short dashes)</b>";


//panel creations for left sidebar
//character legend tab
	var panelContent = {
		id: 'legendTab',                     // UID, used to access the panel
		tab: '<i class="fa fa-user"></i>',  // content can be passed as HTML string,
		pane: legendContent,        // DOM elements can be passed, too
		title: 'Characters of Interest',              // an optional pane header
		position: 'top'                  // optional vertical alignment, defaults to 'top'
	};


	//Sets the initial left sidebar content for popup pane and sites of interest pane
		var popupContent = 'Click on a location on the map to receive more information.';

		var sitesContent = 'Click on one of the following sites to zoom in on the chosen location. Click on the location marker, and a popup window with images will open and a brief description of the location will appear in the left sidebar.<br><br>' +
			"<a id='myLink' href='#' onclick='goTo(48.058348493290794,1.1604309082031252, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Blois</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(50.0289165635219, 4.084167480468751, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Cateau-Cambr??sis</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(50.24720490139267, 2.6312255859375004, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Cercamp</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(47.94762618352869,1.1343383789062502, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Chambord</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(49.19483004925347, 2.4860000610351567, 13)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Chantilly</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(48.72358515157852, 3.0514526367187504, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Coulommiers</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(48.86196212502818, 2.3345947265625004, 15)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>H??tel de Rambouillet</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(48.85736700174229,2.3655581474304204, 17)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Palais des Tournelles</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(48.860352821094246, 2.3385858535766606, 15)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Palais du Louvre</b>" +
			"<br><a id='myLink' href='#' onclick='goTo(48.849152831982494, 2.3335892036870893, 15)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Quartier de Lafayette</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(49.1781125831520, 3.9413452148437504 , 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Reims</b>"+
			"<br><a id='myLink' href='#' onclick='goTo(48.85918110234517, 2.3500013351440434, 14)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Salon de Scud??ry</b>";


	//sites of interest panel
		var sitesOfInterestPane = {
			id: 'sites',
			tab: '<i class="fas fa-map-marker"></i>' ,
			pane: sitesContent,
			title: 'Sites of Interest',
			position: 'top'
		};


	//popup info panel
		var popup = {
			id: 'popupCont',                     // UID, used to access the panel
			tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
			pane: popupContent,        // DOM elements can be passed, too
			title: 'Additional Information',              // an optional pane header
			position: 'top'                  // optional vertical alignment, defaults to 'top'
		};


		//function for zooming to a specific location on the sites of interest pane
		function goTo(lat, lon, zooml) {
				map.setView([lat,lon], zooml);
			  };


	//This creates the right sidebar (not currently in use)
	//var sidebar = L.control.sidebar({position:"right"}).addTo(map);


	//creation of map information panel
		var mapInformation = "<center><h3>About the Interactive Map</h3></center>" +
		"This interactive map is built using the opensource LeafletJS javascript package, along with plugins allowing for searching (leaflet-search), sidebars (leaflet-sidebar-v2), opacity (leaflet-control-opacity), fullscreen (leaflet-fullscreen), panning and zooming (leaflet-pancontrol) as well as FontAwesome. Historical map underlays may be turned on and off using the menu on the top-right portion of the map; certain maps are only available at certain zoom levels. An opacity functionality is also available to make the historical maps more or less transparent. Historical maps and images appear with permission and/or are not under copyright; sources for images and maps are referenced.<br><br>" +
		"<center><h3>Historical Maps</h3></center>" +
		"<b>Europe 1644</b>: Blaeu, Willem, <i>Europa Recens Descripta</i>, [atlas map], Amsterdam, Williem Janszoon Blaeu, 1644, 42 cm x 56 cm. <a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~285941~90058459:Europa-recens-descripta-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:Europa%20Recens%20Descripta;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=1&trs=2'>Link</a><br><br>"+
		"<b>France 1570</b>: Ortelius, Abraham, <i>Galliae Regni Potentiss: Nova Descriptio. Ioanne Ioliveto Auctore</i>, [atlas map], Antwerp, Gielis Coppens van Diest, 1570, 34 cm x 50 cm. <a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~275240~90048525:-9--Galliae-Regni-Potentiss-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:Galliae%20Regni;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=0&trs=21'>Link</a><br><br>" +
		"<b>??le-de-France 1598</b>: Ortelius, Abraham and Vrients, Jan Baptista, <i>L???Isle de France. Parisiensis Agri Descrip.</i>, [atlas map], Antwerp, Jan Baptista Vrients, 1598, 34 cm x 46 cm. <a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~275581~90048943:-29--L-Isle-de-France-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:L%E2%80%99Isle%20de%20France.%20Parisiensis%20Agri%20Descrip.;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=0&trs=2'>Link</a><br><br>" +
		"<b>Paris 1575</b>: Braun, Georg and Hogenberg, Franz<i>, Lutetia, vulgari nomine Paris</i>, [atlas map], Cologne, Peter von Brachel, 1575, 35 cm x 48 cm. <a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~286750~90059245:Vol-I--7--Lutetia,-vulgari-nomine-P'>Link</a><br>[The digital mapping interface displays a nineteenth-century version based on Braun and Hogenberg???s atlas map of Paris reproduced many times]<br><br>"+
		"<b>Paris 1615</b>: Merian, Mathieu, <i>Le Plan de la Ville, Cit??, Universit?? et Fauxbourgs de Paris</i>, Paris, Nicolas de Mathoni??re, 1615, six plates of 90 cm x 102 cm. Facsimile: Paris, A. Taride, 1908. <a target='_blank' href='https://commons.wikimedia.org/wiki/File:Matth??us_Merian,_Le_Plan_de_la_ville,_cit??_et_fauxbourgs_de_Paris,_1615_-_BHVP.jpg'>Link</a><br><br>"+
		"<b>Paris 1652</b>: Gomboust, Jacques, <i>Lutetia, Paris</i>, Paris, Impr. Ch. Chardon, 1652, nine plates of 33 cm x 50 cm. Facsimile: Paris, A. Taride, 1900. <a target='_blank' href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~301378~90072338:Composite-Map--Pl--XVIII--Paris-en-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:Gomboust%20Paris;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=4&trs=5'>Link</a><br><br>" +
		"<b>Paris 1675</b>: Rochefort, Jouvin de, <i>Paris et ses environs</i>, Paris, chez Sieur de Richesource, 1672-75, nine plates of 49 cm x 60 cm. Facsimile: Paris, Impr. Ch. Chardon a??n??, 1870. <a target='_blank' href='https://gallica.bnf.fr/ark:/12148/btv1b53010929s/'>Link</a>";

		var mapInfoContent = {
			id: 'aboutMapTab',                     // UID, used to access the panel
			tab: '<i class="fa fa-question-circle"></i>',  // content can be passed as HTML string,
			pane: mapInformation,        // DOM elements can be passed, too
			title: 'Map Information',              // an optional pane header
			position: 'bottom'                  // optional vertical alignment, defaults to 'top'
		};
		sidebarLeft.addPanel(mapInfoContent);


var projectInformation = "This interactive map accompanies the editorial project published by Lever Press: <b>La Princesse de Cl??ves <i>by Lafayette: A New Translation and Bilingual Pedagogical Edition for the Digital Age</i></b>, eds H??l??ne E. Bilis, Jean-Vincent Blanchard, David Harrison, and H??l??ne Visentin.<br><br>" +
"The mapping interface displays several layers of early modern maps???Europe, France, ??le de France, Paris???in which major landmarks and spaces, and character movements are delineated.<br><br>" +
"We built the mapping interface with georeferenced historical maps to (1) orient readers and help them acquire a firmer grasp of the geography where <i>La Princesse de Cl??ves</i> unfolds; (2) picture the places where different events occur and relationships evolve; and (3) map the social and geographic sites of the novel as well as those of Lafayette???s era. Designed with French language and culture learners in mind, the digital version of <i>La Princesse de Cl??ves</i> provides a bilingual edition to foreground French literary and linguistic content. It offers students and instructors, hailing from a multiplicity of backgrounds, a variety of pedagogical dossiers with a wide range of resources and approaches for exploring <i>La Princesse de Cl??ves</i> from new perspectives. The article titled ???Geographies of <i>La Princesse de Cl??ves</i>??? in the dossier <i>Mapping Lafayette???s Spaces and Relationships</i> contains some pedagogical activities based on this digital mapping interface.<br><br>" +
"The editors would like to thank Matthew Naglak, Digital Scholarship Librarian at Boston College, for his technical expertise and Jessica Simon ???24, research assistant to H??l??ne Visentin at Smith College.";


		var aboutProject = {
			id: 'aboutProject',
			tab:'<i class="fas fa-at"></i>',
			pane: projectInformation,
			title: 'About',
			position: 'top'
		}
		sidebarLeft.addPanel(aboutProject);
		sidebarLeft.addPanel(sitesOfInterestPane);
		sidebarLeft.addPanel(popup);
		sidebarLeft.addPanel(panelContent);

/*	//creation of contact panel
		var contactContent = "Contact us!";
		var panelContent2 = {
			id: 'contactUs',                     // UID, used to access the panel
			tab: '<i class="fa fa-envelope"></i>',  // content can be passed as HTML string,
			pane: contactContent,        // DOM elements can be passed, too
			title: 'Contact Information',              // an optional pane header
			position: 'bottom'                  // optional vertical alignment, defaults to 'top'
		};
		sidebarLeft.addPanel(panelContent2); */

		//when closing sidbar, resets icon color changes for each site
			map.on('click', function() {
				sidebarLeft.close();
				louvre.setIcon(blueIcon);
				reims.setIcon(blueIcon);
				coulommiers.setIcon(blueIcon);
				cateauCambr??sis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
				lafayette.setIcon(blueIcon);
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
					reims.setIcon(blueIcon);
					coulommiers.setIcon(blueIcon);
					cateauCambr??sis.setIcon(blueIcon);
					leCercamp.setIcon(blueIcon);
					chantilly.setIcon(blueIcon);
					blois.setIcon(blueIcon);
					chambord.setIcon(blueIcon);
					palaisDesTournelles.setIcon(blueIcon);
					hotels.setIcon(blueIcon);
					hotels2.setIcon(blueIcon);
					lafayette.setIcon(blueIcon);
				});

		//function resets sidebar content for popup pane
				function resetSidebarContent(){
					popupContent = 'Click on a location to receive more information.';
					return popupContent;
				};



		//Here is where the marker creation takes place and the content for the popup content will be set
		//The lat/long for a particular point can be found either online or by opening the console box of the map and clicking the desired spot

		//Image and Text in sidebar

///////////////////////////////////////////////////////////////////////////////////////////////////
		//for Le Palais de Louvre
				var louvre = L.marker([48.860352821094246, 2.3385858535766606], {myCustomID: "abc123"});
					louvre.bindTooltip("Palais du Louvre").openTooltip();
					louvre.on("click", function (e) {
						louvrecontent();
						sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'Palais du Louvre',              // an optional pane header
							position: 'top'
						});
						sidebarLeft.open('popupCont');
						louvre.setIcon(greenIcon);
						coulommiers.setIcon(blueIcon);
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

function louvreSlideShow() {
	var images= [['./Images/louvre/Figure-LOC-02.png','Detail of the Louvre, Braun and Hogenberg???s map of Paris, 1578'],
	            ['./Images/louvre/Figure-LOC-03.jpg','The Louvre, <i>Le Premier Volume des plus Excellents B??timents</i> de France by J. A. Du Cerceau, 1576 (Wikimedia Commons)'],
							['./Images/louvre/Figure-LOC-04.jpg','Drawing of the Louvre, J. A. Du Cerceau, c. 1570 (British Museum)'],
							['./Images/louvre/Figure-LOC-05.jpg','Louvre???s Caryatids, drawing by J. A. Du Cerceau, c. 1570 (British Museum)'],
							['./Images/louvre/Figure-LOC-06.png','Detail of the Louvre, Merian???s map of Paris, 1615'],
							['./Images/louvre/Figure-LOC-07.jpeg','The Louvre Palace, drawing by R. Zeeman, 1656 (BnF)'],
							['./Images/louvre/Figure-LOC-01.jpeg','The Louvre, engraving by I. Silvestre, 1652 (BnF)'],
							['./Images/louvre/Figure-LOC-08.jpeg','The Louvre Palace, engraving by I. Silvestre, c. 1650-1655 (BnF)'],
							['./Images/louvre/Figure-LOC-09.jpeg','The Louvre, c. 1666 (BnF)'],
							['./Images/louvre/Figure-LOC-10.jpeg','The Louvre, engraving by S. Leclerc, 1677 (BnF)'],
						];
			var slideshowContent = '';
	    for(var i = 0; i < images.length; i++) {
	        var img = images[i];

	        slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
	                              '<img src="' + img[0] + '" />' +
	                              '<div class="caption">' + img[1] +'</div>' +
	                            '</div>';
	         }
					 var popupContent = L.popup()

					 .setContent('<div id="' + "Louvre" + '" class="popup">' +
													 '<div class="slideshow">' +
															 slideshowContent +
													 '</div>' +
													 '<div class="cycle">' +
															 '<a href="#" class="prev">&laquo; Previous</a>' +
															 '<a href="#" class="next">Next &raquo;</a>' +
													 '</div>' +
											 '</div>');
											 popupContent.update();

	 louvre.bindPopup(popupContent, {maxWidth: "auto"});
};
louvreSlideShow();


$('#map').on('click', '.popup .cycle a', function() {
    var $slideshow = $('.slideshow'),
        $newSlide;

    if ($(this).hasClass('prev')) {
        $newSlide = $slideshow.find('.active').prev();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').last();
        }
    } else {
        $newSlide = $slideshow.find('.active').next();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').first();
        }
    }

    $slideshow.find('.active').removeClass('active').hide();
    $newSlide.addClass('active').show();
    return false;
});

			function louvrecontent() {
					popupContent = "<center><h1>Palais du Louvre</h1></center><br>" +
"The initial construction of the Louvre occurred around 1200, under the reign of King Philippe-Auguste (1190???1223). Initially, the Louvre was located near the Seine and the wall that surrounded Paris and served as a fortress that protected the city from English invasions. At the time, the building was a rectangular structure with four towers at the corners and a keep at its center. The Louvre was not a royal residence but a place where assemblies gathered and where prisoners were kept. King Charles V (1364???80) included the Louvre among his residences and ordered the architect Raymond du Temple to construct new lodgings there. <br><br>Until the reign of King Fran??ois I, the kings of France moved often from one city to another (specifically, from one castle to another). In contrast, Fran??ois I decided to reside, for the most part, close to Paris, in the current regions of ??le de France and Centre-Val de Loire. In 1528, Fran??ois I ordered the destruction of the keep at the center of the Louvre. Sometimes, the king received representatives from foreign states, including the emperor Charles V, at the Louvre. In 1546, approximately a year before his death, King Fran??ois I ordered Pierre Lescot to transform the former fortress into a royal residence.<br><br>This construction began under the reign of King Henri II. Lescot demolished part of the medieval castle and built on its foundations. This structure later formed the southwest corner of the Cour Carr??e, the eastern part of the Louvre today. The allegorical fa??ades by the sculptor Jean Goujon demonstrated the power of the king. Inside the new part of the Louvre, the Salle des Caryatides, named for the four statues that supported a musicians??? gallery in the room, served as a court and as a ballroom. After the death of Henri II, the construction of the Louvre continued, and in 1564, Catherine de M??dicis ordered the construction of the Tuileries palace beyond Paris???s walls. The construction on the Tuileries was paused after the death of its first architect, Philibert Delorme. In 1572, a few days after the marriage of the future King Henri IV and Marguerite de Valois, the Louvre was the site of the Saint Bartholomew???s Day Massacre, which was set in motion by the assassination of Admiral Coligny, one of the leaders of the Protestants.<br><br>Under the reign of Henri IV, plans to connect the Louvre and the Tuileries, called the 'Grand Dessein', were formed. From 1598 to 1608, the architects Louis M??tezeau and Jacques Androuet du Cerceau worked on the Petite Galerie (which connected the Louvre to the Seine) and the Grande Galerie (which ran along the Seine toward the Tuileries). Under the Grand Dessein, during the reigns of King Louis XIII and King Louis XIV, the Louvre???s Cour Carr??e quadrupled in size. In 1661, the Petite Galerie was destroyed by a fire. The painter Charles Le Brun supervised the decoration of the new gallery, which focused on the theme of Apollo, the Greco-Roman god of the sun. After the court of Louis XIV moved to Versailles, work on the Galerie d???Apollon, the Grande Galerie, and the fa??ades of the Louvre stopped. However, during this time, the palace continued to provide a home for artists, and in 1692, the Royal Academy of Painting and Sculpture, which supported salons where artists could exhibit their works, was established at the Louvre.<br><br>Like his predecessors, including King Fran??ois I and King Henri II, King Louis XIV collected paintings and sculptures. In 1793, during the French Revolution, the Louvre became an art museum. The building underwent further expansions during the reigns of Emperor Napoleon I (1804???14, 1815) and Emperor Napoleon III (1852???70). In 1871, a fire destroyed the Tuileries palace. During the presidency of Fran??ois Mitterrand (1981???95), I. M. Pei constructed the Louvre pyramid, an iconic symbol of the present-day Louvre museum.<br><br><br>" +
					"<i>Les fondations du Louvre sont construites vers 1200, sous le r??gne du roi Philippe-Auguste (1190???1223). Initialement, le Louvre se trouvait entre la Seine et le mur entourant Paris et servait de forteresse prot??geant la ville de Paris des invasions anglaises. Le b??timent rectangulaire poss??de alors des tours aux quatre coins et un donjon au centre de la structure. Le Louvre n???est pas une r??sidence royale mais plut??t un lieu o?? sont convoqu??es des assembl??es et o?? sont enferm??s des prisonniers. Le roi Charles V (1364???1380) inclut le Louvre dans ses r??sidences et ordonne ?? l???architecte Raymond du Temple d???y construire de nouveaux appartements.<br><br>Jusqu???au r??gne du roi Fran??ois I<sup>er</sup> (1515???1549), les rois de France se d??placent souvent d???une ville ?? l???autre???pr??cis??ment, d???un ch??teau ?? l???autre. En revanche, Fran??ois I<sup>er</sup> d??cide de s??journer principalement pr??s de Paris, dans les r??gions actuelles de l?????le de France et du Centre-Val de Loire. En 1528, Fran??ois I<sup>er</sup> commande la destruction du donjon construit au centre du b??timent du Louvre. Le roi re??oit parfois des repr??sentants des ??tats ??trangers au Louvre, dont l???empereur Charles Quint. En 1546, environ un an avant sa mort, Fran??ois I<sup>er</sup> ordonne ?? Pierre Lescot de transformer l???ancienne forteresse en une r??sidence royale.<br><br>Cette construction commence sous le r??gne du roi Henri II (1547???1559). Lescot d??molit une partie du ch??teau m??di??val et construit une nouvelle structure sur les anciennes fondations. Cette structure forme plus tard le coin sud-ouest de la Cour Carr??e, la partie est du Louvre actuel. Les fa??ades all??goriques du sculpteur Jean Goujon mettent en ??vidence le pouvoir royal. ?? l???int??rieur de la nouvelle partie du Louvre, la Salle des Caryatides, ainsi nomm??e pour les quatre statues supportant une tribune de musiciens dans la salle int??rieure, sert de tribunal et de salle de bal. Apr??s la mort d???Henri II, la construction du Louvre se poursuit et, en 1564, Catherine de M??dicis ordonne la construction du Palais des Tuileries ?? l???ext??rieur des murs de Paris, adjacent au Louvre. Cependant, la construction des Tuileries est interrompue apr??s la mort de son premier architecte, Philibert Delorme. En 1572, quelques jours apr??s le mariage du futur roi Henri IV et de Marguerite de Valois, le Louvre est le th????tre du massacre de la Saint-Barth??lemy, d??clench?? par l???assassinat de l???amiral Coligny, chef du parti protestant.<br><br>Sous le r??gne d???Henri IV, des plans pour relier le Louvre et le Palais des Tuileries, appel??s ?? le Grand Dessein ??, sont con??us. De 1598 ?? 1608, les architectes Louis M??tezeau et Jacques Androuet du Cerceau travaillent ?? la Petite Galerie (qui relie le Louvre et la Seine) et ?? la Grande Galerie (qui longe la Seine jusqu???au palais des Tuileries). Dans le cadre du Grand Dessein, la taille de la Cour Carr??e du Louvre quadruple sous les r??gnes de Louis XIII et de Louis XIV. En 1661, la Petite Galerie est d??truite par un incendie ; le peintre Charles Le Brun supervise la d??coration de la nouvelle galerie sur le th??me d???Apollon, le dieu gr??co-romain du soleil. Apr??s que la cour de Louis XIV se d??place ?? Versailles, les travaux de construction de la Galerie d???Apollon, de la Grande Galerie et des fa??ades sont interrompus. Cependant, ?? cette ??poque, le palais du Louvre continue d???abriter des artistes et, en 1692, l???Acad??mie Royale de Peinture et de Sculpture, qui h??bergent des salons o?? des artistes exposent leurs ??uvres, y est ??tablie. <br><br>Comme ses pr??d??cesseurs (dont Fran??ois I<sup>er</sup> et Henri II), le roi Louis XIV collectionne des peintures et des sculptures. En 1793, pendant la R??volution fran??aise, le Louvre devient un mus??e d???art. Le b??timent subit plusieurs agrandissements successifs pendant les r??gnes des empereurs Napol??on I<sup>er</sup> (1804???1814, 1815) et Napol??on III (1852???1870). En 1871, un violent incendie d??truit le Palais des Tuileries. Durant le mandat pr??sidentiel de Fran??ois Mitterrand (1981???1995), la pyramide du Louvre est construite par l???architecte I. M. Pei.</i>"

					return popupContent;
			};

/////////////////////////////////////////////////////////////////////////////////////////////
		//for Lafayette
		var lafayette = L.marker([48.84908775346996, 2.3335981943120765]);
			lafayette.bindTooltip("Quartier de Lafayette").openTooltip();
			lafayette.on("click", function (e){
				lafayetteContent();
				sidebarLeft.removePanel('popupCont');
				sidebarLeft.addPanel({
					id: 'popupCont',                     // UID, used to access the panel
					tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
					pane: popupContent,        // DOM elements can be passed, too
					title: 'Quartier de Lafayette',              // an optional pane header
					position: 'top'
				});
				sidebarLeft.open('popupCont');
				coulommiers.setIcon(blueIcon);
				louvre.setIcon(blueIcon);
				cateauCambr??sis.setIcon(blueIcon);
				leCercamp.setIcon(blueIcon);
				chantilly.setIcon(blueIcon);
				blois.setIcon(blueIcon);
				chambord.setIcon(blueIcon);
				palaisDesTournelles.setIcon(blueIcon);
				hotels.setIcon(blueIcon);
				hotels2.setIcon(blueIcon);
				reims.setIcon(blueIcon);
				lafayette.setIcon(greenIcon);
			});


			function lafayetteSlideShow() {
				var images= [['./Images/lafayette/lafayette1.jpg','Vue et perspective du Palais d???Orl??ans, engraving by I. Silvestre, 1640-60 (Mus??e Carnavalet)'],
										['./Images/lafayette/lafayette2.png','Photo of the Petit Luxembourg (Google Arts and Culture)'],
										['./Images/lafayette/lafayette3.png','Detail of the Luxembourg neighborhood, Rochefort???s map of Paris, 1672']
									];
						var slideshowContent = '';
						for(var i = 0; i < images.length; i++) {
								var img = images[i];

								slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																			'<img src="' + img[0] + '" />' +
																			'<div class="caption">' + img[1] +'</div>' +
																		'</div>';
								 }
								 var popupContent = L.popup()

								 .setContent('<div id="' + "Lafayette" + '" class="popup">' +
																 '<div class="slideshow">' +
																		 slideshowContent +
																 '</div>' +
																 '<div class="cycle">' +
																		 '<a href="#" class="prev">&laquo; Previous</a>' +
																		 '<a href="#" class="next">Next &raquo;</a>' +
																 '</div>' +
														 '</div>');
														 popupContent.update();
				 lafayette.bindPopup(popupContent, {maxWidth: "auto"
				 });

			};
			lafayetteSlideShow();





			function lafayetteContent()
			{
				popupContent = "<center><h1>Quartier de Lafayette</h1></center><br>" +
				"Marie-Madeleine Pioche de La Vergne (with marriage she would become the countess de Lafayette) lived in the Left Bank area near the present-day Luxembourg Gardens. She was born in the building pictured here as the Palais d???Orl??ans. At the time of her birth in 1634, the smaller, northern wing of the building was called the Petit Luxembourg palace and was owned by the duchesse d???Aiguillon, niece of the Cardinal de Richelieu. Marie-Madeleine???s mother was in service to the duchess, hence her parents lived in the palace. Later, her parents had two houses built on the rue de Vaugirard, (numbers 48 and 50), where Marie-Madeleine spent her childhood???a sign of the family???s social status and the growing importance of this part of the city. Marie-Madeleine became a maiden of honor to Anne of Austria and began to frequent the salons of Paris, including those hosted by the marquise de Rambouillet and Madeleine de Scud??ry. Soon after her marriage to the count de Lafayette in 1655, she lived at her husband???s estates in Auvergne; around 1660, she resided primarily at her private residence on the rue de Vaugirard, with a high degree of independence. Members of the nobility, as well as men and women of letters, visited her salon. Among her close friends were the marquise de S??vign??, the duke de La Rochefoucauld, and Henriette d???Angleterre, King Louis XIV???s sister-in-law.<br><br><br>" +
				"<i>Marie-Madeleine Pioche de La Vergne (par son mariage avec le comte de Lafayette elle deviendra comtesse de Lafayette) v??cut dans le quartier de la rive gauche, pr??s de l???actuel jardin du Luxembourg. Elle est n??e dans le Palais d???Orl??ans repr??sent?? ici. ?? l?????poque de sa naissance en 1634, l???aile nord du b??timent, plus petite, s???appelait alors le Petit Luxembourg et appartenait ?? la duchesse d???Aiguillon, ni??ce du cardinal de Richelieu. La m??re de Marie-Madeleine ??tait au service de la duchesse, c???est pourquoi ses parents vivaient dans le palais. Plus tard, ses parents firent construire deux maisons dans la rue de Vaugirard (n<sup>o</sup> 48 et n<sup>o</sup> 50) o?? Marie-Madeleine passa son enfance, signe du statut social de la famille et de l???importance croissante de ce quartier de la ville. Marie-Madeleine devient demoiselle d???honneur d???Anne d???Autriche et commence ?? fr??quenter les salons de Paris, dont celui de la marquise de Rambouillet et celui de Madeleine de Scud??ry. Juste apr??s son mariage avec le comte de Lafayette en 1655, elle habite dans les domaines de son mari en Auvergne. ?? compter de 1660, elle r??side principalement dans son h??tel particulier dans la rue de Vaugirard, avec un degr?? ??lev?? d???ind??pendance. Les membres de la noblesse et les gens de lettres fr??quentent son salon. La marquise de S??vign??, le duc de La Rochefoucauld et Henriette d???Angleterre, belle-s??ur du roi Louis XIV, sont parmi les gens proches de son entourage qui fr??quentent le salon.</i>";
				return popupContent;
			};



//////////////////////////////////////////////////////////////////////////////
		//for Rambouillet
				var hotels = L.marker([48.86196212502818, 2.3345947265625004]);
				hotels.bindTooltip("H??tel de Rambouillet").openTooltip();
					hotels.on("click", function (e) {
						hotels1content();
						sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'H??tel de Rambouillet',              // an optional pane header
							position: 'top'
						});
						sidebarLeft.open('popupCont');
						coulommiers.setIcon(blueIcon);
						louvre.setIcon(blueIcon);
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(greenIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

					function rambouilletSlideShow() {
						var images= [['./Images/Rambouillet/Figure-LOC-18.jpg','The Ruins of the H??tel de Rambouillet, drawing by F. A. Pernot, 1800s (Mus??e Carnavalet)'],

											];
								var slideshowContent = '';
						    for(var i = 0; i < images.length; i++) {
						        var img = images[i];

						        slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
						                              '<img src="' + img[0] + '" />' +
						                              '<div class="caption">' + img[1] +'</div>' +
						                            '</div>';
						         }
										 var popupContent = L.popup()

										 .setContent('<div id="' + "Rambouillet" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 //'<a href="#" class="prev">&laquo; Previous</a>' +
																				 //'<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>' +
																 '</div>');
																 popupContent.update();

						 hotels.bindPopup(popupContent, {maxWidth: "auto"});
					};
					rambouilletSlideShow();



					function hotels1content()
					{
						popupContent = "<center><h1>H??tel de Rambouillet</h1></center><br>" +
						"The former Carrousel district, in front of the Louvre, included several luxurious urban residences occupied by noble families, the so-called h??tels particuliers. Representative of this type of aristocratic residence, the H??tel de Rambouillet was located in the Carrousel district, on the rue Saint-Thomas du Louvre. Even though this private residence was next to the Louvre, Catherine de Vivonne de Savelli, marquise de Rambouillet, (1588???1665) envisioned it as the opposite of the royal court. The Rambouillet salon, which began around 1610 and ended around 1665, inaugurated the tradition of literary salons in Paris during the ancien r??gime. The marquise de Rambouillet, also known as Arth??nice, hosted the salons in her famous blue room (<i>la chambre bleue</i>), to which members of the old nobility (<i>la noblesse d?????p??e</i> and the new nobility (<i>la noblesse de robe</i>), as well as men and women of letters, were invited. Some of the guests who frequented the salon were Lafayette, S??vign??, Corneille, Scud??ry, and Conrart, one of the founders of the Acad??mie Fran??aise. The Rambouillet salon soon became an ideal model of courtly behavior, defined by courtesy and politeness.<br><br><br>" +
						"<i>L???ancien quartier du Carrousel, en face du Louvre, comportait plusieurs demeures urbaines luxueuses occup??es par la noblesse, appel??es h??tels particuliers. Repr??sentatif de ce type de demeure aristocratique, l???h??tel de Rambouillet ??tait situ?? dans le quartier du Carrousel, rue Saint-Thomas du Louvre. Bien que cet h??tel particulier jouxte le palais du Louvre, Catherine de Vivonne de Savelli, marquise de Rambouillet (1588???1665), le con??oit comme un lieu qui s???oppose ?? la cour royale. Le salon de Rambouillet, dont les activit??s commencent vers 1610 et se terminent vers 1665, inaugure la tradition des salons litt??raires ?? Paris pendant l???ancien r??gime. La marquise de Rambouillet, connue aussi sous le nom d???Arth??nice, anime le salon dans sa fameuse ?? chambre bleue ?? o?? sont invit??s des membres de la noblesse d?????p??e et de la noblesse de robe, ainsi que des gens de lettres. Lafayette, S??vign??, Corneille, Scud??ry et Conrart, l???un des fondateurs de l???Acad??mie fran??aise, fr??quentent ce salon. Tr??s vite, le salon de Rambouillet devient un mod??le id??al de la soci??t?? de cour, d??fini par la galanterie et la politesse.</i>";
						return popupContent;
					};

//////////////////////////////////////////////////////////////////////////
////////for scudery
				var hotels2 = L.marker([48.85678111084862, 2.3626613616943364]);
				hotels2.bindTooltip("Salon de Scud??ry").openTooltip();
					hotels2.on("click", function (e) {
						hotels2content();
						sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'Salon de Scud??ry',              // an optional pane header
							position: 'top'
						});
						sidebarLeft.open('popupCont');
						coulommiers.setIcon(blueIcon);
						louvre.setIcon(blueIcon);
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(greenIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});


					function scuderySlideShow() {
						var images= [['./Images/Scudery/Figure-LOC-19.jpg','Photo of a H??tel Particulier, 1800s-1900s (Mus??e Carnavalet)'],
						            ['./Images/Scudery/Figure-LOC-20.jpg','The H??tel Carnavalet c. 1740, painting by Westermann after N. J.-B. Raguenet, c. 1926 (Mus??e Carnavalet)'],
						            ['./Images/Scudery/Figure-LOC-21.jpg','The H??tel Carnavalet???s Gardens, photo by Lemarc (Mus??e Carnavalet)'],
												['./Images/Scudery/Figure-LOC-22.jpg','Photo of the H??tel Carnavalet???s Gardens, c. 1850-1900 (Mus??e Carnavalet)'],

											];
								var slideshowContent = '';
						    for(var i = 0; i < images.length; i++) {
						        var img = images[i];

						        slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
						                              '<img src="' + img[0] + '" />' +
						                              '<div class="caption">' + img[1] +'</div>' +
						                            '</div>';
						         }
										 var popupContent = L.popup()

										 .setContent('<div id="' + "Scudery" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>' +
																 '</div>');
																 popupContent.update();
						 hotels2.bindPopup(popupContent, {maxWidth: "auto"
						 });

					};
					scuderySlideShow();



				function hotels2content()
				{
					popupContent = "<center><h1>Salon de Scud??ry</h1></center><br>" +
					"In the sixteenth and seventeenth centuries, many aristocratic residences were built near the Palais des Tournelles, in the Marais district. Madeleine de Scud??ry???s salon was located in a private mansion, in the neighborhood of the Marais. Madeleine de Scud??ry (1607???1701) was born in Le Havre and moved to Paris around 1637, following her brother, the playwright Georges de Scud??ry. She frequented the Rambouillet salon starting in 1639, and around 1653, she began to host her own salon, known as the Saturday meetings (<i>les Samedis</i>) or the Saturday Group (<i>la Soci??t?? du Samedi</i>). Several writers who visited the H??tel de Rambouillet also met at mademoiselle de Scud??ry???s salon, including Valentin Conrart, Gilles M??nage, S??vign??, and Lafayette. They discussed, among other worldly topics, the nature of love and friendship, literary works, and philosophy. Madeleine de Scud??ry wrote heroic novels, including <i>Cl??lie, histoire romaine</i> (1654???60), philosophical works, and dialogues that reflected common debates in the salons.<br><br><br>" +
					"<i>Aux XVI<sup>e</sup> et XVII<sup>e</sup> si??cles, de nombreuses r??sidences aristocratiques sont construites ?? proximit?? du palais des Tournelles, dans le quartier du Marais. Le salon de Madeleine de Scud??ry ??tait situ?? dans une r??sidence du Marais. Madeleine de Scud??ry (1607???1701) est n??e au Havre et d??m??nage ?? Paris vers 1637, suivant son fr??re, le dramaturge et acad??micien Georges de Scud??ry. Elle fr??quente le salon de Rambouillet ?? partir de 1639 et, vers 1653, elle commence ?? animer son propre salon, dit ?? les Samedis ?? ou ?? la Soci??t?? du Samedi ??. Plusieurs ??crivains, qui fr??quentent l???h??tel de Rambouillet, se retrouvent dans le salon de Madeleine de Scud??ry, dont Conrart, M??nage, S??vign?? et Lafayette. Ils discutent, entre autres choses, la nature de l???amour et de l???amiti??, les ??uvres litt??raires et la philosophie. Madeleine de Scud??ry a ??crit quelques romans h??ro??ques, dont</i> Cl??lie, histoire romaine<i> (1654???1660), des ??uvres philosophiques et des dialogues qui refl??tent les sujets couramment d??battus dans les salons. </i>";
					return popupContent;
				};



///////////////////////////////////////////////////////////////////////////
//////////for Coulommiers
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
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

					function coulommiersSlideShow() {
						var images= [['./Images/Coulommiers/Figure-LOC-34.JPG','The Town of Coulommiers, engraving by C. Chastillon (Wikimedia Commons)'],
						            ['./Images/Coulommiers/Figure-LOC-35.jpeg','The Ch??teau de Coulommiers, drawing by S. de Brosse, c. 1613 (BnF)'],
						            ['./Images/Coulommiers/Figure-LOC-36.jpeg','Map of the Town of Coulommiers, 1800s (BnF)'],

											];
								var slideshowContent = '';
						    for(var i = 0; i < images.length; i++) {
						        var img = images[i];

						        slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
						                              '<img src="' + img[0] + '" />' +
						                              '<div class="caption">' + img[1] +'</div>' +
						                            '</div>';
						         }
										 var popupContent =  '<div id="' + "Coulommiers" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>'
																 '</div>';

						 coulommiers.bindPopup(popupContent, {maxWidth: "auto"});
					 };
				coulommiersSlideShow();


				function coulommierscontent() {
					popupContent = "<center><h1>Coulommiers</h1></center><br>The town of Coulommiers is located nearly 54 km (33 miles) from Paris, in the ??le-de-France region. In 1613, the duchess of Longueville, the niece of Jacques de Cl??ves (upon whom the fictional character of the Prince de Cl??ves is based), ordered the architect Salomon de Brosse to construct a castle at Coulommiers. The castle was destroyed in the eighteenth century, but its ruins can be found in the present-day Parc des Capucins. In the novel, the Prince and the Princesse de Cl??ves owns a country house in Coulommiers. It???s in this house in Coulommiers that the Princesse de Cl??ves makes her famous confession to her husband (Part 3).<br><br><br>"+
					"<i>La ville de Coulommiers est situ??e ?? peu pr??s ?? 54 km de Paris, dans la r??gion de l?????le-de-France. En 1613, la duchesse de Longueville, la ni??ce de Jacques de Cl??ves (sur qui le personnage fictif du Prince de Cl??ves est bas??), ordonne ?? l???architecte Salomon de Brosse de construire un ch??teau ?? Coulommiers. Le ch??teau est d??truit au XVIII<sup>e</sup> si??cle, mais quelques vestiges se trouvent aujourd???hui dans le Parc des Capucins. Dans le roman, le Prince et la Princesse de Cl??ves poss??dent une maison de campagne ?? Coulommiers. C???est dans cette maison de Coulommiers que la Princesse de Cl??ves fait le fameux aveu ?? son mari (troisi??me partie).</i>";

					return popupContent;
				};


		//for cateauCambr??sis
		var cateauCambr??sis = L.marker([50.0289165635219, 4.084167480468751]);
			cateauCambr??sis.bindTooltip("Cateau-Cambr??sis").openTooltip();
			cateauCambr??sis.on("click", function (e) {
				cateauCambr??siscontent();
				sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'Cateau-Cambr??sis',              // an optional pane header
							position: 'top'
						});
						sidebarLeft.open('popupCont');
						coulommiers.setIcon(blueIcon);
						louvre.setIcon(blueIcon);
						cateauCambr??sis.setIcon(greenIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

					function cateauCambresisSlideShow() {
						var images= [['./Images/CateauCambresis/Figure-LOC-32.jpeg','The Region of Cateau-Cambr??sis, map by J.-L. Bol?? de Chamlay, c. 1675 (BnF)'],
												['./Images/CateauCambresis/Figure-LOC-33.jpg','Map of the Town of Cateau-Cambr??sis, 1782 (Digital archives from Cateau-Cambr??sis)'],

											];
								var slideshowContent = '';
								for(var i = 0; i < images.length; i++) {
										var img = images[i];

										slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																					'<img src="' + img[0] + '" />' +
																					'<div class="caption">' + img[1] +'</div>' +
																				'</div>';
										 }
										 var popupContent =  '<div id="' + "Cateau-Cambre??sis" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>'
																 '</div>';

						 cateauCambr??sis.bindPopup(popupContent, {maxWidth: "auto"});
					};
					cateauCambresisSlideShow();


				function cateauCambr??siscontent() {
					popupContent = "<center><h1>Cateau-Cambr??sis</h1></center><br>Cateau-Cambr??sis is located in the region of Hauts-de-France, around 163 km (101 miles) from Paris. The name of the town comes from the fortress of Ch??teau Sainte-Marie, which was constructed around 1000 CE. The town hall of Cateau-Cambr??sis was constructed starting in 1533. As <i>La Princesse de Cl??ves</i> indicates (Part 1), the representatives of the sovereigns of France, England, and Spain gathered at Cateau-Cambr??sis in 1559 to put an end to the Italian Wars. In 1678, under the treaty of Nijmegen, the town of Cateau-Cambr??sis, which had belonged to the territories of the Spanish Netherlands, was rejoined to France. Today, Cateau-Cambr??sis is home to a museum mostly dedicated to the works of the painter Henri Matisse, who was born in the town.<br><br><br>" +
					"<i>Le Cateau-Cambr??sis se trouve dans la r??gion des Hauts-de-France, ?? environ 163 km de Paris. Le nom de la ville vient de la forteresse du Ch??teau Sainte-Marie qui est construite vers l???an mille. L???h??tel de ville du Cateau-Cambr??sis est construit ?? partir de 1533. Comme </i>La Princesse de Cl??ves<i> l???indique (premi??re partie), c???est au Cateau-Cambr??sis que les repr??sentants des souverains de la France, de l???Angleterre et de l???Espagne se rassemblent en 1559 pour mettre fin ?? la derni??re guerre d???Italie. En 1678, sous le trait?? de Nim??gue, la ville du Cateau-Cambr??sis, qui appartenait aux territoires des Pays-Bas espagnols, est rattach??e ?? la France. Aujourd???hui, le Cateau-Cambr??sis abrite un mus??e consacr?? principalement aux ??uvres du peintre Henri Matisse, natif de cette ville.</i>";
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
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(greenIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

					function cercampSlideShow() {
						var images= [['./Images/Cercamp/Cercamp1.jpg','Ch??teau de Cercamp, old abbatial residence, [in] <i>Bulletin de la commission des antiquit??s d??partementales du Pas-de-Calais</i>, T. IV, 1875 (Wikimedia Commons)'],
												['./Images/Cercamp/Cercamp2.jpg','Ch??teau de Cercamp, rest of the convent buildings (Wikimedia Commons)']
											];
								var slideshowContent = '';
								for(var i = 0; i < images.length; i++) {
										var img = images[i];

										slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																					'<img src="' + img[0] + '" />' +
																					'<div class="caption">' + img[1] +'</div>' +
																				'</div>';
										 }
										 var popupContent = L.popup()

										 .setContent('<div id="' + "Cercamp" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>' +
																 '</div>');
																 popupContent.update();
						 leCercamp.bindPopup(popupContent, {maxWidth: "auto"
						 });

					};
					cercampSlideShow();


				function leCercampcontent() {
					popupContent = "<center><h1>Cercamp</h1></center><br>Located approximately 158 km (98 miles) from Paris, Cercamp is a hamlet within the municipality of Fr??vent, in the Hauts-de-France region. The abbey of Cercamp was founded in the twelfth century, but it was partially destroyed during the Hundred Years War (1337???1453). The present castle of Cercamp was built in 1740 on the site of this Cistercian abbey. As the novel explains, the representatives of the sovereigns of France and Spain met at the abbey of Cercamp in 1558 to begin the negotiations of the Treaty of Cateau-Cambr??sis. At the time of the novel???s plot, Cercamp was located in the Artois region, which belonged to Hapsburg Spain; at the time of the novel???s publication, however, that region belonged to France.<br><br><br>" +
					"<i>Situ?? ?? environ 158 km de Paris, Cercamp est un hameau de la commune de Fr??vent, dans la r??gion des Hauts-de-France. L???abbaye de Cercamp est fond??e au XII<sup>e</sup> si??cle mais elle est partiellement d??truite pendant la guerre de Cent Ans (1337???1453). L???actuel ch??teau de Cercamp est ??difi?? en 1740 sur le site de cette abbaye cistercienne. Comme le roman l???explique, les repr??sentants des souverains de la France et de l???Espagne se r??unissent ?? l???abbaye de Cercamp en 1558 afin de commencer les n??gociations du trait?? du Cateau-Cambr??sis. ?? l?????poque de l???intrigue du roman, Cercamp se trouve dans la r??gion d???Artois, appartenant alors aux Habsbourg du royaume espagnol ; cependant, ?? l?????poque de la parution du roman, cette r??gion appartient ?? la France.</i>"
					return popupContent;
				};

/////////////////////////////////////////////////////////////////////////
		//for Chantilly
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
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(greenIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
					});

					function chantillySlideShow() {
						var images= [['./Images/Chantilly/Figure-LOC-30.jpg','The Ch??teau de Chantilly, drawing by J. A. Du Cerceau, c. 1570 (British Museum)'],
												['./Images/Chantilly/Figure-LOC-31.jpeg','The Ch??teau de Chantilly, 1600s (BnF)'],

											];
								var slideshowContent = '';
								for(var i = 0; i < images.length; i++) {
										var img = images[i];

										slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																					'<img src="' + img[0] + '" />' +
																					'<div class="caption">' + img[1] +'</div>' +
																				'</div>';
										 }
										 var popupContent =  '<div id="' + "Chantilly" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>'
																 '</div>';

						 chantilly.bindPopup(popupContent, {maxWidth: "auto"});
					};
					chantillySlideShow();


				function chantillycontent() {
					popupContent = "<center><h1>Chantilly</h1></center><br>The Ch??teau de Chantilly is located about 39 km (24 miles) from Paris, in the Hauts-de-France region. The castle was constructed as a fortress during the Middle Ages. As <i>La Princesse de Cl??ves</i> suggests, the conn??table Anne de Montmorency owned the estate of the Ch??teau de Chantilly during the majority of the sixteenth century. From 1557 to 1558, the architect Jean Bullant expanded the castle by constructing the ???Petit Ch??teau??? next to the old building, called the ???Grand Ch??teau.??? During the seventeenth century, the castle became the property of the Bourbon family. Louis II de Bourbon (known as the Great Cond??) invited famous artists and writers, such as Moli??re, Racine, and La Fontaine to the castle; in addition, he requested that Andr?? Le N??tre, the gardener of King Louis XIV, design the castle???s gardens. The Grand Ch??teau was destroyed during the French Revolution and reconstructed toward the end of the nineteenth century under the orders of Henri d???Orl??ans, the son of the former king Louis-Philippe. Today the castle houses the Cond?? museum which exhibits the art and book collections of Henri d???Orl??ans.<br><br><br>" +
					"<i>Le Ch??teau de Chantilly est situ?? ?? environ 39 km de Paris, dans la r??gion des Hauts-de-France (nord). Au moyen ??ge, le ch??teau est d???abord con??u comme une forteresse. Comme l???insinue </i>La Princesse de Cl??ves<i>, le conn??table Anne de Montmorency poss??de le domaine du Ch??teau de Chantilly tout au long du XVI<sup>e</sup> si??cle. De 1557 ?? 1558, l???architecte Jean Bullant fait agrandir le ch??teau en construisant le ?? Petit Ch??teau ?? ?? c??t?? du b??timent ancien, dit le ?? Grand Ch??teau ??. Au XVII<sup>e</sup> si??cle, le ch??teau devient la propri??t?? de la famille de Bourbon. Louis II de Bourbon (appel?? le Grand Cond??) y invite des artistes et des ??crivains c??l??bres, dont Moli??re, Racine et La Fontaine. Il demande ?? Andr?? Le N??tre, le jardinier du roi Louis XIV, de dessiner les jardins du ch??teau. Le Grand Ch??teau est d??truit pendant la R??volution et reconstruit vers la fin du XIX<sup>e</sup> si??cle sous l???ordre d???Henri d???Orl??ans, fils de l???ancien roi Louis-Philippe. Aujourd???hui, le ch??teau abrite le mus??e de Cond?? qui expose les collections d???art, de livres et de manuscrits pr??cieux d???Henri d???Orl??ans.</i>";
					return popupContent;
				};

		//for Blois
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
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(greenIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});


					function bloisSlideShow() {
						var images= [['./Images/Blois/Figure-LOC-23.jpg','The Ch??teau de Blois, drawing by J. A. Du Cerceau, c. 1570 (British Museum)'],
												['./Images/Blois/Figure-LOC-24.jpg','The Ch??teau de Blois, drawing by J. A. Du Cerceau, c. 1570 (British Museum)'],
												['./Images/Blois/Figure-LOC-25.jpg','The Ch??teau de Blois, drawing by J. A. Du Cerceau, c. 1570 (British Museum)']
											];
								var slideshowContent = '';
								for(var i = 0; i < images.length; i++) {
										var img = images[i];

										slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																					'<img src="' + img[0] + '" />' +
																					'<div class="caption">' + img[1] +'</div>' +
																				'</div>';
										 }
										 var popupContent =  '<div id="' + "Blois" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>'
																 '</div>';

						 blois.bindPopup(popupContent, {maxWidth: "auto"});
					};
					bloisSlideShow();




				function bloiscontent() {
					popupContent = "<center><h1>Blois</h1></center><br>The Ch??teau de Blois is located in the region of Centre-Val de Loire, around 160 km (100 miles) from Paris. In the ninth century, the beginnings of the future Ch??teau de Blois (including a fortress, a chapel, and towers) were constructed. In 1429, Joan of Arc became a military leader at Blois before going to lift the siege of Orleans. King Louis XII (1498???15) ordered the transformation of the fortress into a castle in the Gothic style. King Fran??ois I (r. 1515???47) requested the construction of a new wing of the castle and in 1524, Queen Claude de France, his wife, died at Blois. King Henri II, as well as his sons King Fran??ois II, King Charles IX, and King Henri III, stayed at the Ch??teau de Blois often. In December 1588, the oldest son and one of the younger sons of Duke Fran??ois de Guise were assassinated at Blois; in January of 1589, Catherine de M??dicis died there as well. The castle expanded again under the direction of Gaston d???Orl??ans (1608???60), the younger brother and presumptive heir of King Louis XIII before the birth of the future King Louis XIV. At this time, the architect Fran??ois Mansart constructed a new part of the castle incorporating elements of Classical architecture. After being abandoned, the castle was restored starting in the nineteenth century and today contains an art museum.<br><br><br>" +
					"<i>Le Ch??teau de Blois est situ?? dans la r??gion du Centre-Val de Loire, ?? environ 160 km de Paris. C???est au IX<sup>e</sup> si??cle que commence la construction du futur Ch??teau de Blois???dont une forteresse, une chapelle et des tours. En 1429, c???est ?? Blois que Jeanne d???Arc devient chef de guerre avant d???aller lever le si??ge d???Orl??ans. Le roi Louis XII (1498???1515) ordonne la transformation de la forteresse en un ch??teau de style gothique. Le roi Fran??ois I<sup>er</sup> (1515???1547) commande la construction d???une nouvelle aile du ch??teau et, en 1524, la reine Claude de France, son ??pouse, meurt ?? Blois. Le roi Henri II, ainsi que ses fils le roi Fran??ois II, le roi Charles IX et le roi Henri III, s??journent souvent au Ch??teau de Blois. En d??cembre 1588, le fils a??n?? et l???un des fils cadets de Fran??ois, duc de Guise, meurent assassin??s ?? Blois. En janvier 1589, Catherine de M??dicis y meurt aussi. Le ch??teau continue de s???agrandir sous la commande de Gaston d???Orl??ans (1608???1660), le fr??re cadet et h??ritier pr??somptif du roi Louis XIII avant la naissance du futur roi Louis XIV. ?? cette ??poque, l???architecte Fran??ois Mansart construit une nouvelle partie du ch??teau incorporant des ??l??ments d???architecture classique. Apr??s avoir ??t?? laiss?? ?? l???abandon, le ch??teau est r??guli??rement restaur?? depuis le XIXe si??cle et contient aujourd???hui un mus??e d???art.</i>";
					return popupContent;
				};
		//Reims

		var reims = L.marker([49.1781125831520, 3.9413452148437504]);
		reims.bindTooltip("Reims").openTooltip();
		reims.on("click", function (e) {
			reimscontent();
			sidebarLeft.removePanel('popupCont');
					sidebarLeft.addPanel({
						id: 'popupCont',                     // UID, used to access the panel
						tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
						pane: popupContent,        // DOM elements can be passed, too
						title: 'Reims',              // an optional pane header
						position: 'top'
					});
					sidebarLeft.open('popupCont');
					reims.setIcon(greenIcon);
					coulommiers.setIcon(blueIcon);
					louvre.setIcon(blueIcon);
					cateauCambr??sis.setIcon(blueIcon);
					leCercamp.setIcon(blueIcon);
					chantilly.setIcon(blueIcon);
					blois.setIcon(blueIcon);
					chambord.setIcon(blueIcon);
					palaisDesTournelles.setIcon(blueIcon);
					hotels.setIcon(blueIcon);
					hotels2.setIcon(blueIcon);
					lafayette.setIcon(blueIcon);
				});

				function reimsSlideShow() {
					var images= [['./Images/Reims/Figure-LOC-37.jpg','The Reims Cathedral, engraving by N. de Son, 1625 (British Museum)'],
											['./Images/Reims/Figure-LOC-38.jpeg','The Reims Cathedral, drawing by the J. Hardouin-Mansart Agency, c. 1690 (BnF)'],
											['./Images/Reims/Figure-LOC-39.jpeg','The Reims Cathedral, photo by Agence Rol, 1919 (BnF)']
										];
							var slideshowContent = '';
							for(var i = 0; i < images.length; i++) {
									var img = images[i];

									slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																				'<img src="' + img[0] + '" />' +
																				'<div class="caption">' + img[1] +'</div>' +
																			'</div>';
									 }
									 var popupContent =  '<div id="' + "Reims" + '" class="popup">' +
																	 '<div class="slideshow">' +
																			 slideshowContent +
																	 '</div>' +
																	 '<div class="cycle">' +
																			 '<a href="#" class="prev">&laquo; Previous</a>' +
																			 '<a href="#" class="next">Next &raquo;</a>' +
																	 '</div>'
															 '</div>';

					 reims.bindPopup(popupContent, {maxWidth: "auto"});
				};
				reimsSlideShow();


				function reimscontent() {
					popupContent = "<center><h1>Reims</h1></center><br>The city of Reims is located about 130 km (81 miles) from Paris, in the Grand Est region. Clovis, the first king of the Franks, was baptized at Reims around 498. In 816, Louis le Pieux, a son of Charlemagne, came to Reims to be crowned king. The current Notre-Dame de Reims cathedral was constructed in the thirteenth century, in a gothic style that incorporated flying buttresses, complex stained-glass windows, and more than twenty-three hundred statues. The coronations of the majority of the kings of France from Louis VIII (1223???26) to Charles X (1825???30) took place at the Notre-Dame de Reims, including the coronation of Charles VII, who was accompanied from Orleans to Reims by Joan of Arc. During World War I, the cathedral was bombed by Germany and was partially destroyed. The team of the architect Henri Deneux restored the cathedral, with a few new stained-glass windows by the artist Marc Chagall.<br><br><br>" +
					"<i>La ville de Reims est situ??e ?? environ 130 km de Paris, dans la r??gion Grand Est. Clovis, le premier roi des Francs, est baptis?? ?? Reims vers 498. En 816, Louis le Pieux, fils de Charlemagne, vient ?? Reims pour son sacre. L???actuelle cath??drale Notre-Dame de Reims est construite au XIII<sup>e</sup> si??cle, dans un style gothique qui comprend des arcs-boutants, des vitraux ??labor??s et plus de 2 300 statues. C???est dans cette cath??drale que les sacres de la plupart des rois de France de Louis VIII (1223???1226) ?? Charles X (1825???1830) ont lieu, dont celui de Charles VII qui est conduit d???Orl??ans ?? Reims par Jeanne d???Arc. Pendant la Premi??re Guerre mondiale, la cath??drale subit des bombardements allemands et est partiellement d??truite. Elle est restaur??e apr??s la guerre sous les ordres de l???architecte Henri Deneux, avec quelques nouveaux vitraux de l???artiste Marc Chagall.</i>";
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
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(greenIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

					function chambordSlideShow() {
						var images= [['./Images/Chambord/Figure-LOC-26.jpg','The Ch??teau de Chambord, drawing by J. A. Du Cerceau, c. 1570 (British Museum)'],
												['./Images/Chambord/Figure-LOC-27.jpeg','The Ch??teau de Chambord, drawing by A. F. Van der Meulen, 1600s (BnF)'],
												['./Images/Chambord/Figure-LOC-28.jpeg','The Ch??teau de Chambord, photo by Agence Rol, 1922 (BnF)'],
												['./Images/Chambord/Figure-LOC-29.jpeg','The Ch??teau de Chambord, photo by M. Maillard, 1946 (BnF)']

											];
								var slideshowContent = '';
								for(var i = 0; i < images.length; i++) {
										var img = images[i];

										slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																					'<img src="' + img[0] + '" />' +
																					'<div class="caption">' + img[1] +'</div>' +
																				'</div>';
										 }
										 var popupContent =  '<div id="' + "Chambord" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>'
																 '</div>';

						 chambord.bindPopup(popupContent, {maxWidth: "auto"});
					};
					chambordSlideShow();


				function chambordcontent() {
					popupContent = "<center><h1>Chambord</h1></center><br>Located about 154 km (96 miles) from Paris, the Ch??teau de Chambord is in the Centre-Val de Loire region. The construction of the castle began in 1519, during the reign of King Fran??ois I and ended under the reign of King Louis XIV. During this time, the castle???s grounds were partly used to hunt game. The architecture of the castle incorporates elements (including a double-helix staircase) that were probably influenced by the ideas of Leonardo da Vinci, who stayed at the French court from 1516 until his death in 1519.<br><br><br>" +
					"<i>Situ?? ?? environ 154 km de Paris, le Ch??teau de Chambord se trouve dans la r??gion du Centre-Val de Loire. La construction du Ch??teau de Chambord commence en 1519 sous le r??gne du roi Fran??ois I<sup>er</sup> et se termine sous le r??gne du roi Louis XIV. ?? cette ??poque, les terres du ch??teau sont en partie utilis??es comme terrains de chasse. L???architecture du ch??teau comprend des ??l??ments (dont un escalier en double colima??on) probablement influenc??s par les id??es de Leonardo da Vinci qui s??journe ?? la cour de France de 1516 jusqu????? sa mort en 1519.</i>";
					return popupContent;
				};

		//for Palais des Tournelles
				var palaisDesTournelles = L.marker([48.85736700174229,2.3655581474304204]);
				palaisDesTournelles.bindTooltip("Palais des Tournelles").openTooltip();
				palaisDesTournelles.on("click", function (e) {
				palaisDesTournellescontent();
				sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'Palais des Tournelles',              // an optional pane header
							position: 'top'
						});
						sidebarLeft.open('popupCont');
						coulommiers.setIcon(blueIcon);
						louvre.setIcon(blueIcon);
						cateauCambr??sis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(greenIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
						lafayette.setIcon(blueIcon);
					});

					function tournellesSlideShow() {
						var images= [['./Images/PalaisdesTournelles/Figure-LOC-13.jpeg','The Tournament at the Palais des Tournelles, engraving by J. Perrissin and J. Tortorel, 1570 (British Museum)'],
												['./Images/PalaisdesTournelles/Figure-LOC-14.jpg','The Death of Henri II at the Palais des Tournelles, engraving after J. Perrissin and J. Tortorel, 1569-75 (British Museum)'],
												['./Images/PalaisdesTournelles/Figure-LOC-15.jpg','The Place Royale, engraving by G. Perelle, 1639-95 (British Museum)'],
												['./Images/PalaisdesTournelles/Figure-LOC-16.jpeg','Map of the Place Royale, 1700s (BnF)'],
												['./Images/PalaisdesTournelles/Figure-LOC-17.jpeg','Photo of the Place des Vosges, 1913 (BnF)']


											];
								var slideshowContent = '';
								for(var i = 0; i < images.length; i++) {
										var img = images[i];

										slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
																					'<img src="' + img[0] + '" />' +
																					'<div class="caption">' + img[1] +'</div>' +
																				'</div>';
										 }
										 var popupContent = L.popup()

										 .setContent('<div id="' + "Tournelles" + '" class="popup">' +
																		 '<div class="slideshow">' +
																				 slideshowContent +
																		 '</div>' +
																		 '<div class="cycle">' +
																				 '<a href="#" class="prev">&laquo; Previous</a>' +
																				 '<a href="#" class="next">Next &raquo;</a>' +
																		 '</div>' +
																 '</div>');

						 palaisDesTournelles.bindPopup(popupContent, {maxWidth: "auto"});


					};
					tournellesSlideShow();




				function palaisDesTournellescontent() {
					popupContent = "<center><h1>Palais des Tournelles</h1></center><br>The site of the Palais des Tournelles (ch??teau des Tournelles in the novel) is located in Paris, in the present-day neighborhood of the Marais. In 1388, Pierre d???Orgemont ordered the construction of the Palais des Tournelles, so named for its numerous small towers. Around 1402, the son of Pierre d???Orgemont sold it to the duke Jean de Berry, who exchanged it with Louis d???Orl??ans, the brother of King Charles VI. As the novel states, it is at the Palais des Tournelles that Henri II died after the fatal tournament (end of Part 3). After Henri II???s death, Catherine de M??dicis abandoned the palace. Under the reign of Henri IV, the Place Royale, renamed Place des Vosges since the French Revolution, was constructed on the south part of the palace???s estate.<br><br><br>" +
					"<i>Le Palais des Tournelles (ch??teau des Tournelles dans le roman) ??tait situ?? sur l???actuelle Place des Vosges, dans le quartier du Marais. En 1388, Pierre d???Orgemont fait construire le palais des Tournelles, ainsi nomm?? ?? cause de ses nombreuses petites tours. Vers 1402, le fils de Pierre d???Orgemont le vend au duc Jean de Berry, qui l?????change avec Louis d???Orl??ans, fr??re du roi Charles VI. Comme le roman le pr??cise, c???est au Palais des Tournelles que Henri II meurt apr??s le fatal tournoi (fin de la troisi??me partie). Apr??s la mort d???Henri II, Catherine de M??dicis abandonne le palais. Sous le r??gne d???Henri IV, la Place royale, rebaptis??e la Place des Vosges depuis la R??volution, est construite sur la partie sud du domaine du palais.</i>";
					return popupContent;
				};



		//	merging of these sites for turning on/off
				var pointsOfFocus = L.featureGroup([reims,louvre, coulommiers, chantilly, cateauCambr??sis, leCercamp, blois, chambord, palaisDesTournelles, hotels, hotels2, lafayette]).addTo(map);


/////////////////////////////////////////////////////////////////////////////////////////////
//LAYER CONTROLS////
//List of desired baseMap layers
//Right now it just includes our modern underlay
	/*var baseLayers = {
		"Modern Imagery" : esri_WorldImagery
	};*/

//Maps put in the overlayMaps variable are check boxes, meaning any variety of them can be turned on at a time
//Right now it includes all the other maps we have imported, as well as our Points of Focus icon group
//Note the order the maps are listed here is the order they will appear in the checkbox. The first part of each row is the label to accompany it
	var fooLayers = {
			"<span style='font-size:13px'/>1575 Paris": paris1578,
			"<span style='font-size:13px'/>1615 Paris" : paris1615,
			"<span style='font-size:13px'/>1652 Paris" : paris1652,
			"<span style='font-size:13px'/>1675 Paris" : paris1675,
			"<span style='font-size:13px'/>1598 ??le-de-France" : ileDeFrance1598,
			"<span style='font-size:13px'/>1570 France" : france1570,
			"<span style='font-size:13px'/>1644 Europe" : europe1644,
			"<span style='font-size:13px'/>Sites" : pointsOfFocus,
			"<span style='font-size:13px'/>Characters" : movementGroup
			};

			// 1. start with Control
var fooLegend = L.control({position: 'topright'});

fooLegend.onAdd = function () {
      var div = L.DomUtil.create('div');
      // here is Your part:
      div.innerHTML = "<span class='your-class'><b>Layer Controls</b></span>";
      return div;
};
fooLegend.addTo(map);

var fooCtrl = L.control.layers(null, fooLayers,
              {collapsed : false, position: 'topright'})
              .addTo(map);

//
// Nothing unusual, until now:
const fooCtrlDiv = fooCtrl.getContainer();
//fooCtrlDiv.insertBefore(fooLegend.getContainer(), fooCtrlDiv.firstChild);

fooCtrlDiv
  .querySelector('.leaflet-control-layers-list')
  .insertBefore(
    fooLegend.getContainer(),
    fooCtrlDiv.querySelector('.leaflet-control-layers-list').firstChild
  );


/*var fooLegend = L.control ({position: 'topright'});
//Then this created the actual control box

fooLegend.onAdd = function () {
			var divLegend = L.DomUtil.create('div');
      // here is Your part:
      divLegend.innerHTML = "<span class='layersTitle'>'Available Layers'</span>";
      return divLegend;
};

var fooCtrl = L.control.layers(overlayMaps, null,
              {collapsed : false, position: 'topright'})
              .addTo(map);
var fooCtrlDiv = fooCtrl.getContainer();
fooCtrlDiv.insertBefore(fooLegend.getContainer(), fooCtrlDiv.firstChild); */
	//Now we do the same thing for the opacity control box
	//Here is our list of Layers to be controlled by the Opacity Control Box, again in the proper order
			var opacityLayers = {
				"1575 Paris" : paris1578,
				"1615 Paris" : paris1615,
				"1652 Paris" : paris1652,
				"1675 Paris" : paris1675,
				"1598 Ile de France" : ileDeFrance1598,
				"1570 France" : france1570,
				"1644 Europe" : europe1644
				};


	//Now we similar create the opacity control box
		var opactiyControl =	L.control.opacity(
				opacityLayers, //the variable containing all the maps
				{label: "<b>Opacity</b>", //the label for the box
				position: 'topright',
				collapsed: true} //if we want the opacity box to be collapsed or not. We can do the same thing for the control layers box if desired
				).addTo(map);

				//Function to see map coordinates in console on click
						map.on('click', function(e){
							var coord = e.latlng;
							var lat = coord.lat;
							var lng = coord.lng;
							console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
						});
