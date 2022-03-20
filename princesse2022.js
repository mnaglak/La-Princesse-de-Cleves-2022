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

/////////////////////////////////////////
///Search Boxes/////
//create Search Control for part of Book
var searchControlPart = new L.Control.Search({
  layer: L.featureGroup([movementGroup]),
  propertyName: 'Book_Part',
  textPlaceholder: 'Filter by Part of Book (1-4)',
  marker: false,
  collapsed: false,
  zoom: 8
  });
map.addControl( searchControlPart);

	searchControlPart.on('search:locationfound', function(e) {
    movementGroup.clearLayers();

    var choicePart = document.getElementById("searchtext22").value;
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
  zoom: 8

  });
map.addControl( searchControlPeople );

	searchControlPeople.on('search:locationfound', function(e) {
    //clear movement layer
    movementGroup.clearLayers();
    //check search boxes for content
    var choiceCharacter = document.getElementById("searchtext19").value;
    var choicePart = document.getElementById("searchtext22").value;

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
    var choicePart = document.getElementById("searchtext22").value;
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
			'<br>' + "<a id='myLink' href='#' onclick='goTo(48.860352821094246, 2.3385858535766606, 15)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Le Louvre</b><br><a id='myLink' href='#' onclick='goTo(48.85736700174229,2.3655581474304204, 17)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Le Palais des Tournelles</b><br><a id='myLink' href='#' onclick='goTo(48.85918110234517, 2.3500013351440434, 14)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Salon of Madeleine de Scudéry</b><br><a id='myLink' href='#' onclick='goTo(48.72358515157852, 3.0514526367187504, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Coulommiers</b><br><a id='myLink' href='#' onclick='goTo(48.058348493290794,1.1604309082031252, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Blois</b><br><a id='myLink' href='#' onclick='goTo(50.0289165635219, 4.084167480468751, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Cateau-Cambrésis</b><br><a id='myLink' href='#' onclick='goTo(50.24720490139267, 2.6312255859375004, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Cercamp</b><br><a id='myLink' href='#' onclick='goTo(47.94762618352869,1.1343383789062502, 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Chambord</b><br><a id='myLink' href='#' onclick='goTo(49.19483004925347, 2.4860000610351567, 13)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Chantilly</b><br><a id='myLink' href='#' onclick='goTo(49.1781125831520, 3.9413452148437504 , 10)'><img src='./Images/marker-icon-blue.png' class='nav-text' height='40' width='25'></a><b>Reims</b>";


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
		var mapInformation = "<center><h1>About the Interactive Map</h1></center><br>" +
		"Text Matt will write about the building of the interactive map<br><br><br>" +
		"<center><h1>Historical Maps</h1></center><br>" +
		"Several historical maps are used as underlays within the interactive character map.<br><br>"+
		"<b>Europe 1644</b>: Blaeu, Willem, Europa Recens Descripta, Amsterdam, 1644, 41 cm x 55 cm. <a href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~285941~90058459:Europa-recens-descripta-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:Europa%20Recens%20Descripta;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=1&trs=2'>Link</a><br><br>"+
		"<b>France 1570</b>: Ortelius, Abraham, Galliae Regni Potentiss: Nova Descriptio. Ioanne Ioliveto Auctore, [atlas map], Antwerp, Gielis Coppens van Diest, 1570, 34 cm x 50 cm.<br><br>"+
		"<b>Île de France 1598</b>: Ortelius, Abraham and Vrients, Jan Baptista, L’Isle de France. Parisiensis Agri Descrip., [atlas map], Antwerp, Jan Baptista Vrients, 1598, 34 cm x 46 cm. <a href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~275581~90048943:-29--L-Isle-de-France-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:L%E2%80%99Isle%20de%20France.%20Parisiensis%20Agri%20Descrip.;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=0&trs=2'>Link</a><br><br>" +
		"<b>Paris 1575</b>: Braun, Georg and Hogenberg, Franz, Lutetia, vulgari nomine Paris, [atlas map], Cologne, Peter von Brachel, 1575, 35 cm x 48 cm. <a href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~286750~90059245:Vol-I--7--Lutetia,-vulgari-nomine-P'>Link</a><br><br>"+
		"<b>Paris 1615</b>: Merian, Mathieu, Le Plan de la Ville, Cité, Université et Fauxbourgs de Paris, Paris, Nicolas de Mathonier, 1615, six plates of 90 cm x 102 cm. Facsimile: Paris, A. Taride, 1908. <a href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~301368~90072328:Pl--XV--Paris-en-1615-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:merian;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=10&trs=348'>Link</a><br><br>"+
		"<b>Paris 1652</b>: Gomboust, Jacques, Lutetia, Paris, Paris, Impr. Ch. Chardon, 1652, nine plates of 33 cm x 50 cm. Facsimile: Paris, Taride, 1900. <a href='https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~301378~90072338:Composite-Map--Pl--XVIII--Paris-en-?sort=pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no&qvq=q:Gomboust%20Paris;sort:pub_list_no_initialsort%2Cpub_date%2Cpub_list_no%2Cseries_no;lc:RUMSEY~8~1&mi=4&trs=5'>Link</a><br><br>" +
		"<b>Paris 1675</b>: Rochefort Map of Paris";
		var mapInfoContent = {
			id: 'aboutMapTab',                     // UID, used to access the panel
			tab: '<i class="fa fa-question-circle"></i>',  // content can be passed as HTML string,
			pane: mapInformation,        // DOM elements can be passed, too
			title: 'Map Information',              // an optional pane header
			position: 'bottom'                  // optional vertical alignment, defaults to 'top'
		};
		sidebarLeft.addPanel(mapInfoContent);

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
					reims.setIcon(blueIcon);
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

		//for Le Palais de Louvre
				var louvre = L.marker([48.860352821094246, 2.3385858535766606], {myCustomID: "abc123"});
					louvre.bindTooltip("Le Palais du Louvre").openTooltip();
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
						reims.setIcon(blueIcon);
					});

function louvreSlideShow() {
	var images= [['./Images/louvre/Figure-LOC-01.jpeg','Here is an example image of the Louvre with a caption.'],
	            ['./Images/louvre/Figure-LOC-02.png','Caption 2'],
	            ['./Images/louvre/Figure-LOC-03.jpg','Caption 3'],
							['./Images/louvre/Figure-LOC-04.jpg','Caption 4'],
							['./Images/louvre/Figure-LOC-05.jpg','Caption 5'],
							['./Images/louvre/Figure-LOC-06.png','Caption 6'],
							['./Images/louvre/Figure-LOC-07.jpeg','Caption 7'],
							['./Images/louvre/Figure-LOC-08.jpeg','Caption 8'],
							['./Images/louvre/Figure-LOC-09.jpeg','Caption 9'],
							['./Images/louvre/Figure-LOC-10.jpeg','Caption 10'],
							['./Images/louvre/Figure-LOC-11.jpg','Caption 11'],
							['./Images/louvre/Figure-LOC-12.jpeg','Caption 12']
						];
			var slideshowContent = '';
	    for(var i = 0; i < images.length; i++) {
	        var img = images[i];

	        slideshowContent += '<div class="image' + (i == 0 ? ' active' : '') + '">' +
	                              '<img src="' + img[0] + '" />' +
	                              '<div class="caption">' + img[1] + '</div>' +
	                            '</div>';
	         }
					 var popupContent =  '<div id="' + "Louvre" + '" class="popup">' +
													 '<div class="slideshow">' +
															 slideshowContent +
													 '</div>' +
													 '<div class="cycle">' +
															 '<a href="#" class="prev">&laquo; Previous</a>' +
															 '<a href="#" class="next">Next &raquo;</a>' +
													 '</div>'
											 '</div>';

	 louvre.bindPopup(popupContent);
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
					popupContent = "<center><h1>Le palais du Louvre</h1></center><br>" +
					"Les fondations du palais du Louvre ont été construites vers 1200, sous le règne du roi Philippe-Auguste (1190-1223). Initialement, le palais se trouvait entre la Seine et le mur entourant Paris et servait de forteresse protégeant la ville de Paris des invasions anglaises. Le bâtiment rectangulaire possède alors des tours aux quatre coins et un donjon au centre de la structure. Le Louvre n’est pas une résidence royale mais plutôt un lieu où sont convoquées des assemblées et où sont enfermés des prisonniers. Le roi Charles V (1364-1380) inclut le Louvre dans ses résidences et ordonne à l’architecte Raymond du Temple d’y construire de nouveaux appartements.<br><br>" +
					"Jusqu’au règne du roi François Ier (1515-1549), les rois de France se déplacent souvent d’une ville à l’autre—précisément, d’un château à l’autre. En revanche, François Ier décide de séjourner principalement près de Paris, dans les régions actuelles de l’Île de France et du Centre-Val de Loire. En 1528, François Ier commande la destruction du donjon construit au centre du bâtiment du Louvre. Le roi reçoit parfois des représentants des États étrangers au palais du Louvre, dont l’empereur Charles. En 1546, environ un an avant sa mort, François Ier ordonne à Pierre Lescot de transformer le palais du Louvre en une résidence royale.<br><br>" +
					"Cette construction commence sous le règne du roi Henri II (1547-1559). Lescot démolit une partie du château médiéval et construit une nouvelle structure sur les anciennes fondations. Cette structure forme plus tard le coin sud-ouest de la Cour Carrée, la partie est du Louvre actuel. Les façades allégoriques du sculpteur Jean Goujon mettent en évidence le pouvoir royal. À l’intérieur de la nouvelle partie du Louvre, la Salle des Caryatides, ainsi nommée pour les quatre statues qui supportent une tribune de musiciens dans la salle intérieure, sert de tribunal et de salle de bal. Après la mort d’Henri II, la construction du Louvre se poursuit et, en 1564, Catherine de Médicis ordonne la construction du palais des Tuileries à l’extérieur des murs de Paris, adjacent au Louvre. Cependant, la construction des Tuileries est interrompue après la mort de son premier architecte, Philibert Delorme. En 1572, quelques jours après le mariage du futur roi Henri IV et de Marguerite de Valois, le Louvre est une scène principale du massacre de la Saint-Barthélemy qui est déclenché par l’assassinat de l’amiral Coligny, chef du parti protestant.<br><br>"+
					"Sous le règne d’Henri IV, des plans pour relier le palais du Louvre et le palais des Tuileries, appelés « le Grand dessein », sont conçus. De 1598 à 1608, les architectes Louis Métezeau et Jacques Androuet du Ccerceau travaillent sur la Petite Galerie (qui relie le Louvre et la Seine) et la Grande Galerie (qui longe la Seine jusqu’au palais des Tuileries). Dans le cadre du Grand Dessein, la taille de la Cour Carrée du Louvre quadruple sous les règnes de Louis XIII et de Louis XIV. En 1661, la Petite Galerie est détruite par un incendie ; le peintre Charles Le Brun supervise la décoration de la nouvelle galerie sur le thème d’Apollon, le dieu gréco-romain du soleil. Après que la cour de Louis XIV se déplace au palais de Versailles, les travaux de construction de la Galerie d’Apollon, de la Grande Galerie et des façades sont interrompus. Cependant, à cette époque, le palais du Louvre continue d’abriter des artistes et, en 1692, l’Académie Royale de Peinture et de Sculpture, qui soutient des salons où des artistes exposent leurs œuvres, y est établie.<br><br>" +
					"Comme ses prédécesseurs (dont François Ier et Henri II), le roi Louis XIV collectionne des peintures et des sculptures. En 1793, pendant la Révolution française, le Louvre devient un musée d’art. Le bâtiment subit plusieurs agrandissements successifs pendant les règnes des empereurs Napoléon Ier (1804-1814, 1815) et Napoléon III (1852-1870). En 1871, un violent incendie détruit le palais des Tuileries. Durant le mandat présidentiel de François Mitterrand (1981-1995), la pyramide du Louvre est construite.<br><br><br>" +
					"<center><h1>The Louvre</h1></center><br>The initial construction of the Louvre palace occurred around 1200, under the reign of King Philippe-Auguste (1190-1223). Initially, the palace was located near the Seine and the wall that surrounded Paris; the Louvre served as a fortress that protected the city from English invasions. At the time, the building was a rectangular structure with four towers at the corners and a keep at its center. The Louvre was not a royal residence but a place where assemblies gathered and where prisoners were kept. King Charles V (1364-80) included the Louvre among his residences and ordered the architect Raymond du Temple to construct new lodgings there.<br><br>Until the reign of King François I, the kings of France moved often from one city to another (specifically, from one castle to another). In contrast, François I decided to reside for the most part close to Paris, in the current regions of Île de France and Centre-Val de Loire. In 1528, François I ordered the destruction of the keep at the center of the Louvre. Sometimes, the king received representatives from foreign states, including the Emperor Charles V, at the Louvre. In 1546, approximately a year before his death, King François I ordered Pierre Lescot to transform the palace into a royal residence.<br><br>This construction began under the reign of King Henri II. Lescot demolished part of the medieval castle and built on its foundations. This structure later formed the southwest corner of the Cour Carrée, the eastern part of the Louvre today. The allegorical façades by the sculptor Jean Goujon demonstrated the power of the king. Inside the new part of the Louvre, the Salle des Caryatides, named for the four statues that supported a musicians’ gallery in the room, served as a court and as a ballroom. After the death of Henri II, the construction of the Louvre continued, and in 1564, Catherine de Médicis ordered the construction of the Tuileries palace beyond Paris’s walls. The construction on the Tuileries was paused after the death of its first architect, Philibert Delorme. In 1572, a few days after the marriage of the future King Henri IV and Marguerite de Valois, the Louvre was the site of the Saint Bartholomew’s Day Massacre, which wasset in motion by the assassination of Admiral Coligny, one of the leaders of the Protestants.<br><br>Under the reign of Henri IV, plans to connect the Louvre and the Tuileries, called the Grand dessein, were formed. From 1598 to 1608, the architects Louis Métezeau and Jacques Androuet du Cerceau worked on the Petite Galerie (which connected the Louvre to the Seine) and the Grande Galerie (which ran along the Seine toward the Tuileries). Under the “Grand Dessein,” during the reigns of King Louis XIII and King Louis XIV, the Louvre’s Cour Carrée quadrupled in size. In 1661, the Petite Galerie was destroyed by a fire. The painter Charles Le Brun supervised the decoration of the new gallery, which focused on the theme of Apollo, the Greco-Roman god of the sun. After the court of Louis XIV moved to the palace of Versailles, work on the Galerie d’Apollon, the Grande Galerie, and the façades of the Louvre stopped. However, during this time, the palace continued to provide a home for artists, and in 1692, the Royal Academy of Painting and Sculpture, which supported salons where artists could exhibit their works, was established at the Louvre.<br><br>Like his predecessors, including King François I and King Henri II, King Louis XIV collected paintings and sculptures. In 1793, during the French Revolution, the Louvre became an art museum. The building underwent further expansions during the reigns of Emperor Napoleon I  (1804-14, 1815) and Emperor Napoleon III (1852-70). In 1871, a fire destroyed the Tuileries Palace. During the presidency of François Mitterrand (1981-95), I. M. Pei constructed the Louvre Pyramid, an iconic symbol of the present-day Louvre Museum.";
					return popupContent;
			};

		//for hotels
				var hotels = L.marker([48.86196212502818, 2.3345947265625004]);
				hotels.bindTooltip("Salon of Rambouillet").openTooltip();
					hotels.on("click", function (e) {
						hotels1content();
						sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'Salon of Rambouillet',              // an optional pane header
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
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
					});
					function hotels1content()
					{
						popupContent = "<center><h1>Salon of Rambouillet</h1></center><br>" +
						"L’hôtel de Rambouillet se situe à Paris, dans l’ancien quartier du « Carrousel », dans la rue Saint-Thomas du Louvre. Le salon de Rambouillet, dont les activités commencent vers 1610 et se terminent vers 1665, inaugure la tradition des salons littéraires à Paris pendant l’ancien régime. Bien que cet hôtel particulier jouxte le palais du Louvre, Catherine de Vivonne de Savelli, marquise de Rambouillet (1588-1665), le conçoit comme un lieu qui s’oppose à la cour royale. La marquise de Rambouillet, dit Arthénice, anime le salon dans sa fameuse « chambre bleue » où sont invités des membres de la noblesse d’épée et de la noblesse de robe, ainsi que des gens de lettres. Madame de Lafayette, Madame de Sévigné, Pierre Corneille, Madeleine de Scudéry et Valentin Conrart, l’un des fondateurs de l’Académie française fréquentent ce salon. Très vite, le salon de Rambouillet devient un modèle idéal de la société de cour, défini par la galanterie et la politesse." +
						"<center><h1>Salon of Rambouillet</h1></center><br>" +
						"The Hôtel de Rambouillet was located in Paris, in the former neighborhood of the “Carrousel,” on the rue Saint-Thomas du Louvre. The Rambouillet salon, which began around 1610 and ended around 1665, inaugurated the tradition of literary salons in Paris during the Ancien Régime. Even though this private residence was next to the Louvre, Catherine de Vivonne de Savelli, Marquise de Rambouillet, (1588-1665) envisioned it as the opposite of the royal court. The Marquise de Rambouillet, also known as Arthénice, hosted the salons in her famous blue room (la chambre bleue), to which members of the old nobility (la noblesse d’épée) and the new nobility (la noblesse de robe), as well as men and women of letters, were invited. Some of the guests who frequented the salon were Madame de Lafayette, Madame de Sévigné, Pierre Corneille, Madeleine de Scudéry and Valentin Conrart, one of the founders of the Académie française. The Rambouillet salon soon became an ideal model of courtly behavior, defined by courtesy and politeness.";
						return popupContent;
					};
				var hotels2 = L.marker([48.85678111084862, 2.3626613616943364]);
				hotels2.bindTooltip("Salon of Madeleine de Scudéry").openTooltip();
					hotels2.on("click", function (e) {
						hotels2content();
						sidebarLeft.removePanel('popupCont');
						sidebarLeft.addPanel({
							id: 'popupCont',                     // UID, used to access the panel
							tab: '<i class="fa fa-comment-alt"></i>',  // content can be passed as HTML string,
							pane: popupContent,        // DOM elements can be passed, too
							title: 'Salon of Madeleine de Scudéry',              // an optional pane header
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
						hotels.setIcon(blueIcon);
						hotels2.setIcon(greenIcon);
						reims.setIcon(blueIcon);
					});


				function hotels2content()
				{
					popupContent = "<center><h1>Salon of Madeleine de Scudéry</h1></center><br>" +
					"Le salon de Madeleine de Scudéry se trouve à Paris, dans le quartier du Marais. Madeleine de Scudéry (1607-1701) est née au Havre et déménage à Paris vers 1637, suivant son frère, le dramaturge et académicien Georges de Scudéry. Elle fréquente le salon de Rambouillet à partir de 1639 et, vers 1653, elle commence à animer son propre salon, dit « les Samedis » ou « la Société du samedi ». Plusieurs écrivains qui fréquentent l’hôtel de Rambouillet se retrouvent au salon de Mademoiselle de Scudéry, dont Valentin Conrart, Gilles Ménage, Madame de Sévigné et Madame de Lafayette. Ils discutent, entre autres choses, la nature de l’amour et de l’amitié, les œuvres littéraires et de philosophie. Madeleine de Scudéry a écrit quelques romans héroïques, dont Clélie, histoire romaine (1654-1660), des œuvres philosophiques et des dialogues qui reflètent des débats courants dans les salons." +
					"<center><h1>Salon of Madeleine de Scudéry</h1></center><br>" +
					"Madeleine de Scudéry’s salon was located in Paris, in the neighborhood of the Marais. Madeleine de Scudéry (1607-1701) was born in Le Havre and moved to Paris around 1637, following her brother, the playwright Georges de Scudéry. She frequented the Rambouillet salon starting in 1639, and around 1653, she began to host her own salon, known as the Saturday meetings (les Samedis) or the Saturday Group (la Société du Samedi). Several writers who visited the Hôtel de Rambouillet also met at Mademoiselle de Scudéry’s salon, including Valentin Conrart, Gilles Ménage, Madame de Sévigné, and Madame de Lafayette. They discussed, among other worldly topics, the nature of love and friendship, literary works, and philosophy. Madeleine de Scudéry wrote heroic novels, including Clélie, histoire romaine (1654-60), philosophical works, and dialogues that reflected common debates in the salons.";
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
						reims.setIcon(blueIcon);
					});

				function coulommierscontent() {
					popupContent = "<center><h1>Coulommiers</h1></center><br>La ville de Coulommiers se situe à peu près à 54 km de Paris, dans la région de l’Île-de-France. En 1613, la duchesse de Longueville, la nièce de Jacques de Clèves (sur qui le personnage fictif du Prince de Clèves est basé), ordonne à l’architecte Salomon de Brosse de construire un château à Coulommiers. Dans le roman La Princesse de Clèves, c’est à Coulommiers que la Princesse de Clèves fait le fameux aveu à son mari. Le château est détruit au XVIIIe siècle, mais des vestiges se trouvent aujourd’hui dans le Parc des Capucins.<br><br><br>"+
					"<center><h1>Coulommiers</h1></center><br>The town of Coulommiers is located nearly 54 km from Paris, in the Île-de-France region. In 1613, the duchess of Longueville, the niece of Jacques de Clèves (upon whom the fictional character of the Prince de Clèves is based), ordered the architect Salomon de Brosse to construct a castle at Coulommiers. In the novel, it is at Coulommiers that the Princesse de Clèves makes her famous confession to her husband. The castle was destroyed in the eighteenth century, but its ruins can be found in the present-day Parc des Capucins."

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
						reims.setIcon(blueIcon);
					});

				function cateauCambrésiscontent() {
					popupContent = "<center><h1>Cateau-Cambrésis</h1></center><br>Le Cateau-Cambrésis se trouve dans la région des Hauts-de-France, à environ 163 km de Paris. Le nom de la ville vient de la forteresse du Château Sainte-Marie qui est construite vers l’an mille. L’hôtel de ville du Cateau-Cambrésis est construit à partir de 1533. Comme La Princesse de Clèves l’indique (première partie), c’est au Cateau-Cambrésis que les représentants des souverains de la France, de l’Angleterre et de l’Espagne se rassemblent en 1559 pour mettre fin à la dernière guerre d’Italie. En 1678, sous le traité de Nimègue, la ville du Cateau-Cambrésis, qui appartenait aux territoires des Pays-Bas espagnols, est rattachée à la France. Aujourd’hui, le Cateau-Cambrésis abrite un musée consacré principalement aux œuvres du peintre Henri Matisse, natif de cette ville.<br><br><br>" +
					"<center><h1>Cateau-Cambrésis</h1></center><br>Cateau-Cambrésis is located in the region of Hauts-de-France, around 163 km from Paris. The name of the town comes from the fortress of Chateau Sainte-Marie, which was constructed around 1000 CE. The town hall of Cateau-Cambrésis was constructed starting in 1533. As La Princesse de Clèves indicates (part 1), the representatives of the sovereigns of France, England, and Spain gathered at Cateau-Cambrésis in 1559 to put an end to the Italian Wars. In 1678, under the treaty of Nijmegen, the town of Cateau-Cambrésis, which had belonged to the territories of the Spanish Netherlands, was rejoined to France. Today, Cateau-Cambrésis is home to a museum mostly dedicated to the works of the painter Henri Matisse, who was born in the town.";
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
						reims.setIcon(blueIcon);
					});

				function leCercampcontent() {
					popupContent = "<center><h1>Cercamp</h1></center><br>Situé à environ 158 km de Paris, Cercamp est un hameau de la commune de Frévent, dans la région des Hauts-de-France. L’abbaye de Cercamp est fondée au XIIe siècle mais elle est partiellement détruite pendant la guerre de Cent Ans (1337-1453). Comme le roman La Princesse de Clèves l’explique, les représentants des souverains de la France et de l’Espagne se réunissent à l’abbaye de Cercamp en 1558 afin de commencer les négociations du traité du Cateau-Cambrésis. À l’époque de l’intrigue du roman, Cercamp se trouve dans la région d’Artois, appartenant alors aux Habsbourg du royaume espagnol, mais à l’époque de la parution du roman, cette région appartient à la France.<br><br><br>" +
					"<center><h1>Cercamp</h1></center><br>Located approximately 158 km from Paris, Cercamp is a hamlet within the municipality of Frévent, in the Hauts-de-France region. The abbey of Cercamp was founded in the twelfth century, but it was partially destroyed during the Hundred Years War (1337-1453). As the novel explains, the representatives of the sovereigns of France and Spain met at the abbey of Cercamp in 1558 to begin the negotiations of the Treaty of Cateau-Cambrésis. At the time of the novel’s plot, Cercamp was located in the Artois region, which belonged to Hapsburg Spain; at the time of the novel’s publication, however, that region belonged to France.";
					return popupContent;
				};


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
						cateauCambrésis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(greenIcon);
						blois.setIcon(blueIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
					});

				function chantillycontent() {
					popupContent = "<center><h1>Chantilly</h1></center><br>Le château de Chantilly se situe à environ 39 km de Paris, dans la région des Hauts-de-France (nord). Au moyen âge, le château est d’abord conçu comme une forteresse. Comme l’insinue La Princesse de Clèves, le connétable Anne de Montmorency possède le domaine du Château de Chantilly tout au long du XVIe siècle. De 1557 à 1558, l’architecte Jean Bullant fait agrandir le château en construisant le « Petit Château » à côté du bâtiment ancien, dit le « Grand Château ». Au XVIIe siècle, le château devient la propriété de la famille de Bourbon. Louis II de Bourbon (appelé le Grand Condé) y invite des artistes et des écrivains célèbres, dont Molière, Racine et La Fontaine. Il demande à André Le Nôtre, le jardinier du roi Louis XIV, de dessiner les jardins du château. Le « Grand Château » est détruit pendant la Révolution et reconstruit vers la fin du XIXe siècle sous l’ordre d’Henri d’Orléans, fils de l’ancien roi Louis-Philippe. Aujourd’hui, le château abrite le musée de Condé qui expose les collections d’art et de livres d’Henri d’Orléans.<br><br><br>"+
					"<center><h1>Chantilly</h1></center><br>The Chateau de Chantilly is located about 39 km from Paris, in the Hauts-de-France region. The castle was constructed as a fortress during the Middle Ages. As La Princesse de Clèves suggests, the Connétable Anne de Montmorency owned the estate of the Chateau de Chantilly during the majority of the sixteenth century. From 1557 to 1558, the architect Jean Bullant expanded the castle by constructing the “Petit Chateau” next to the old building, called the “Grand Chateau.” During the seventeenth century, the castle became the property of the Bourbon family. Louis II de Bourbon (known as the Great Condé) invited famous artists and writers, such as Molière, Racine, and La Fontaine to the castle; in addition, he requested that André Le Nôtre, the gardener of King Louis XIV, design the castle’s gardens. The “Grand Chateau” was destroyed during the French Revolution and reconstructed toward the end of the nineteenth century under the orders of Henri d’Orléans, the son of the former king Louis-Philippe. Today the castle houses the Condé museum which exhibits the art and book collections of Henri d’Orléans.";
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
						cateauCambrésis.setIcon(blueIcon);
						leCercamp.setIcon(blueIcon);
						chantilly.setIcon(blueIcon);
						blois.setIcon(greenIcon);
						chambord.setIcon(blueIcon);
						palaisDesTournelles.setIcon(blueIcon);
						hotels.setIcon(blueIcon);
						hotels2.setIcon(blueIcon);
						reims.setIcon(blueIcon);
					});

				function bloiscontent() {
					popupContent = "<center><h1>Blois</h1></center><br>Le château de Blois se situe dans la région du Centre-Val de Loire, à environ 160 km de Paris. C’est au IXe siècle que commence la construction du futur château de Blois—dont une forteresse, une chapelle et des tours. En 1429, c’est à Blois que Jeanne d’Arc devient chef de guerre avant d’aller lever le siège d’Orléans. Le roi Louis XII (1498-1515) ordonne la transformation de la forteresse en un château de style gothique. Le roi François Ier (1515-1547) commande la construction d’une nouvelle aile du château et, en 1524, la reine Claude de France, son épouse, meurt à Blois. Le roi Henri II, ainsi que ses fils le roi François II, le roi Charles IX et le roi Henri III, séjournent souvent au château de Blois. En décembre 1588, le fils aîné et l’un des fils cadets de François, duc de Guise, meurent assassinés à Blois. En janvier 1589, Catherine de Médicis y meurt aussi. Le château continue de s’agrandir sous la commande de Gaston d’Orléans (1608-1660), le frère cadet et héritier présomptif du roi Louis XIII avant la naissance du futur roi Louis XIV. À cette époque, l’architecte François Mansart construit une nouvelle partie du château incorporant des éléments d’architecture classique. Après avoir été laissé à l’abandon, le château est régulièrement restauré depuis le XIXe siècle et contient aujourd’hui un musée d’art.<br><br><br>" +
					"<center><h1>Blois</h1></center><br>The Chateau de Blois is located in the region of Centre-Val de Loire, around 160 km from Paris. In the ninth century, the beginnings of the future Chateau de Blois (including a fortress, a chapel, and towers) were constructed. In 1429, Joan of Arc became a military leader (chef de guerre) at Blois before going to lift the siege of Orleans. King Louis XII (1498-15) ordered the transformation of the fortress into a castle in the Gothic style. King François I (r. 1515-47) requested the construction of a new wing of the castle and in 1524, Queen Claude de France, his wife, died at Blois. King Henri II, as well as his sons King François II, King Charles IX, and King Henri III, stayed at the Chateau de Blois often. In December of 1588, the oldest son and one of the younger sons of Duke François de Guise were assassinated at Blois; in January of 1589, Catherine de Medici died there as well. The castle expanded again under the direction of Gaston d’Orléans (1608-60), the younger brother and presumptive heir of King Louis XIII before the birth of the future King Louis XIV. At this time, the architect François Mansart constructed a new part of the castle incorporating elements of Classical architecture. After being abandoned, the castle was restored starting in the nineteenth century and today contains an art museum.";
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
					cateauCambrésis.setIcon(blueIcon);
					leCercamp.setIcon(blueIcon);
					chantilly.setIcon(blueIcon);
					blois.setIcon(blueIcon);
					chambord.setIcon(blueIcon);
					palaisDesTournelles.setIcon(blueIcon);
					hotels.setIcon(blueIcon);
					hotels2.setIcon(blueIcon);
				});
				function reimscontent() {
					popupContent = "<center><h1>Reims</h1></center><br>La ville de Reims est située à environ 130 km de Paris, dans la région Grand Est. Clovis, le premier roi des Francs, est baptisé à Reims vers 498. En 816, Louis le Pieux, fils de Charlemagne, vient à Reims pour être sacré. L’actuelle cathédrale Notre-Dame de Reims est construite au XIIIe siècle, dans un style gothique qui comprend des arcs-boutants, des vitraux élaborés et plus de 2 300 statues. C’est à cette cathédrale que les sacres de la plupart des rois de France de Louis VIII (1223-1226) à Charles X (1825-1830) ont lieu, dont celui de Charles VII qui est conduit d’Orléans à Reims par Jeanne d’Arc. Pendant la Première Guerre mondiale, la cathédrale subit des bombardements allemands et est partiellement détruite. La cathédrale est restaurée après la Première Guerre mondiale sous les ordres de l’architecte Henri Deneux, et la restauration inclut quelques nouveaux vitraux de l’artiste Marc Chagall.<br><br><br>" +
					"<center><h1>Reims</h1></center><br>The city of Reims is located about 130 km from Paris, in the Grand Est region. Clovis, the first king of the Franks, was baptized at Reims around 498; in 816, Louis le Pieux, a son of Charlemagne, came to Reims to be crowned king. The current Notre-Dame de Reims Cathedral was constructed in the thirteenth century, in a Gothic style that incorporated flying buttresses, complex stained-glass windows, and more than 2,300 statues. The coronations of the majority of the kings of France from Louis VIII (1223-26) to Charles X (1825-30) took place at the Notre-Dame de Reims Cathedral, including the coronation of Charles VII, who was accompanied from Orleans to Reims by Joan of Arc. During WWI, the cathedral was bombed by Germany and was partially destroyed. The team of the architect Henri Deneux restored the cathedral, with a few new stained-glass windows by the artist Marc Chagall.";
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
						reims.setIcon(blueIcon);
					});

				function chambordcontent() {
					popupContent = "<center><h1>Chambord</h1></center><br>Situé à environ 154 km de Paris, le château de Chambord se trouve dans la région du Centre-Val de Loire. La construction du château de Chambord commence en 1519 sous le règne du roi François Ier et se termine sous le règne du roi Louis XIV. À cette époque, les terres du château sont en partie utilisées comme terrains de chasse. L’architecture du château comprend des éléments (dont un escalier en double colimaçon) probablement influencés par les idées de Leonardo da Vinci qui séjourne à la cour de France de 1516 jusqu’à sa mort en 1519.<br><br><br>" +
					"<center><h1>Chambord</h1></center><br>Located about 154 km from Paris, the Chateau de Chambord is in the Centre-Val de Loire region. The construction of the castle began in 1519, during the reign of King François I, and ended under the reign of King Louis XIV. During this time, the castle’s grounds were partly used to hunt game. The architecture of the castle incorporates elements (including a double-helix staircase) that were probably influenced by the ideas of Leonardo da Vinci, who stayed at the French court from 1516 until his death in 1519.";
					return popupContent;
				};

		//for Palais des Tournelles
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
						reims.setIcon(blueIcon);
					});

				function palaisDesTournellescontent() {
					popupContent = "<center><h1>Palais des Tournelles</h1></center><br>Le palais des Tournelles était situé dans l’actuelle Place des Vosges, dans le quartier du Marais, à Paris. En 1388, Pierre d’Orgemont fait construire le palais des Tournelles, ainsi nommé à cause de ses nombreuses petites tours. Vers 1402, le fils de Pierre d’Orgemont le vend au duc Jean de Berry, qui l’échange avec Louis d’Orléans, frère du roi Charles VI. Comme le roman La Princesse de Clèves le précise, c’est au Palais des Tournelles qu’Henri II meurt après le fatal tournoi (fin de la troisième partie). Après la mort d'Henri II, Catherine de Médicis abandonne le palais. Sous le règne d’Henri IV, la Place royale, rebaptisée la Place des Vosges depuis la Révolution, est construite sur la partie sud du domaine du palais.<br><br>"+
					"<center><h1>Palais des Tournelles</h1></center><br>The site of the Palais des Tournelles is located in Paris, in the present-day neighborhood of the Marais. In 1388, Pierre d’Orgemont ordered the construction of the Palais des Tournelles, so named for its numerous small towers. Around 1402, the son of Pierre d’Orgemont sold it to the duke Jean de Berry, who exchanged it with Louis d’Orléans, the brother of King Charles VI. As the novel states, it is at the Palais des Tournelles that Henri II died after the fatal tournament (end of part 3). After Henri II’s death, Catherine de Médicis abandoned the palace. Under the reign of Henri IV, the Place Royale, renamed Place des Vosges since the French Revolution, was constructed on the south part of the palace’s estate.";
					return popupContent;
				};



		//	merging of these sites for turning on/off
				var pointsOfFocus = L.layerGroup([reims,louvre, coulommiers, chantilly, cateauCambrésis, leCercamp, blois, chambord, palaisDesTournelles, hotels, hotels2]).addTo(map);


/////////////////////////////////////////////////////////////////////////////////////////////
//LAYER CONTROLS////
//List of desired baseMap layers
//Right now it just includes our modern underlay
	var baseLayers = {
		"Modern Imagery" : esri_WorldImagery
		};

//Maps put in the overlayMaps variable are check boxes, meaning any variety of them can be turned on at a time
//Right now it includes all the other maps we have imported, as well as our Points of Focus icon group
//Note the order the maps are listed here is the order they will appear in the checkbox. The first part of each row is the label to accompany it
	var overlayMaps = {
			"1575 Paris": paris1578,
			"1615 Paris" : paris1615,
			"1652 Paris" : paris1652,
			"1675 Paris" : paris1675,
			"1598 Ile de France" : ileDeFrance1598,
			"1570 France" : france1570,
			"1644 Europe" : europe1644,
			//"Points of Focus" : pointsOfFocus,
			//"Character Movements" : characterMovement
			};

//Then this created the actual control box
	L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);

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
			L.control.opacity(
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
