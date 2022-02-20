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
    	var france1570 = L.tileLayer('./tiledMaps/1570/{z}/{x}/{y}.png', {tms: true, pane: 'france', attribution: "", minZoom: 6, maxZoom: 10});
    	var europe1644 = L.tileLayer('./tiledMaps/1644/{z}/{x}/{y}.png', {tms: true, pane: 'europe', attribution: "", minZoom: 1, maxZoom: 8});

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
      			//"Points of Focus" : pointsOfFocus,
      			//"Character Movements" : movement
      			};

      //Then this created the actual control box
      	L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);

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
  textPlaceholder: 'Filter by Part',
  marker: false,
  collapsed: false,
  zoom: 8
  });
map.addControl( searchControlPart);

	searchControlPart.on('search:locationfound', function(e) {
    movementGroup.clearLayers();

    var choicePart = document.getElementById("searchtext14").value;
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
    var choicePart = document.getElementById("searchtext14").value;

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
    var choicePart = document.getElementById("searchtext14").value;
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
