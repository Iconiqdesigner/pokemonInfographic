(function($, window) {

var POKEMONAPP = {
  //VARIABLES
  //---------------------------------------------------------------------------------
  pokeapi: 'http://pokeapi.co/api/v2/',
  front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  pokemonGeneData: [{name: 'Gen I', count: 151, color: "#3498db" }, {name: 'Gen II', count: 100, color: "#16a085"}, {name: 'Gen III', count: 135, color: "#EE543A" }, {name: 'Gen IV', count: 107, color: "#00B5B5" }, {name: 'Gen V', count: 156, color: "#F07818"  }, {name: 'Gen VI', count: 72, color: "#AE44C8" }, ],
  pokemonStatData: [],
  typeDamageReset: [ {"type": "Bug", "damage": 1, "tooltip": "Normal damage to Bug Pokémon.", "image": "i/typ_bug_sm.png"}, {"type": "Dark","damage": 1, "tooltip": "Normal damage to Dark Pokémon.", "image": "i/typ_dark_sm.png"}, { "type": "Dragon", "damage": 1, "tooltip": "Normal damage to Dragon Pokémon.", "image": "i/typ_dragon_sm.png" }, { "type": "Electric", "damage": 1, "tooltip": "Normal damage to Electric Pokémon.", "image": "i/typ_electric_sm.png"  }, { "type": "Fairy", "damage": 1, "tooltip": "Normal damage to Fairy Pokémon.", "image": "i/typ_fairy_sm.png"  }, { "type": "Fighting", "damage": 1, "tooltip": "Normal damage to Fighting Pokémon.", "image": "i/typ_fighting_sm.png"  }, { "type": "Fire", "damage": 1, "tooltip": "Normal damage to Fire Pokémon.", "image": "i/typ_fire_sm.png" }, { "type": "Flying", "damage": 1, "tooltip": "Normal damage to Flying Pokémon.", "image": "i/typ_flying_sm.png" }, { "type": "Ghost", "damage": 1, "tooltip": "Normal damage to Ghost Pokémon.", "image": "i/typ_ghost_sm.png" }, { "type": "Grass", "damage": 1, "tooltip": "Normal damage to Grass Pokémon.", "image": "i/typ_grass_sm.png" }, { "type": "Ground", "damage": 1, "tooltip": "Normal damage to Ground Pokémon.", "image": "i/typ_ground_sm.png" }, { "type": "Ice", "damage": 1, "tooltip": "Normal damage to Ice Pokémon.", "image": "i/typ_ice_sm.png" }, { "type": "Normal", "damage": 1, "tooltip": "Normal damage to Normal Pokémon.", "image": "i/typ_normal_sm.png" }, { "type": "Poison", "damage": 1, "tooltip": "Normal damage to Poison Pokémon.", "image": "i/typ_poison_sm.png" }, { "type": "Psychic", "damage": 1, "tooltip": "Normal damage to Psychic Pokémon.", "image": "i/typ_psychic_sm.png" }, { "type": "Rock", "damage": 1, "tooltip": "Normal damage to Rock Pokémon.", "image": "i/typ_rock_sm.png" }, { "type": "Steel", "damage": 1, "tooltip": "Normal damage to Steel Pokémon.", "image": "i/typ_steel_sm.png" }, { "type": "Water", "damage": 1, "tooltip": "Normal damage to Water Pokémon.", "image": "i/typ_water_sm.png" } ],
  typeDamage: [ {"type": "Bug", "damage": 1, "tooltip": "Normal damage to Bug Pokémon.", "image": "i/typ_bug_sm.png"}, {"type": "Dark","damage": 1, "tooltip": "Normal damage to Dark Pokémon.", "image": "i/typ_dark_sm.png"}, { "type": "Dragon", "damage": 1, "tooltip": "Normal damage to Dragon Pokémon.", "image": "i/typ_dragon_sm.png" }, { "type": "Electric", "damage": 1, "tooltip": "Normal damage to Electric Pokémon.", "image": "i/typ_electric_sm.png"  }, { "type": "Fairy", "damage": 1, "tooltip": "Normal damage to Fairy Pokémon.", "image": "i/typ_fairy_sm.png"  }, { "type": "Fighting", "damage": 1, "tooltip": "Normal damage to Fighting Pokémon.", "image": "i/typ_fighting_sm.png"  }, { "type": "Fire", "damage": 1, "tooltip": "Normal damage to Fire Pokémon.", "image": "i/typ_fire_sm.png" }, { "type": "Flying", "damage": 1, "tooltip": "Normal damage to Flying Pokémon.", "image": "i/typ_flying_sm.png" }, { "type": "Ghost", "damage": 1, "tooltip": "Normal damage to Ghost Pokémon.", "image": "i/typ_ghost_sm.png" }, { "type": "Grass", "damage": 1, "tooltip": "Normal damage to Grass Pokémon.", "image": "i/typ_grass_sm.png" }, { "type": "Ground", "damage": 1, "tooltip": "Normal damage to Ground Pokémon.", "image": "i/typ_ground_sm.png" }, { "type": "Ice", "damage": 1, "tooltip": "Normal damage to Ice Pokémon.", "image": "i/typ_ice_sm.png" }, { "type": "Normal", "damage": 1, "tooltip": "Normal damage to Normal Pokémon.", "image": "i/typ_normal_sm.png" }, { "type": "Poison", "damage": 1, "tooltip": "Normal damage to Poison Pokémon.", "image": "i/typ_poison_sm.png" }, { "type": "Psychic", "damage": 1, "tooltip": "Normal damage to Psychic Pokémon.", "image": "i/typ_psychic_sm.png" }, { "type": "Rock", "damage": 1, "tooltip": "Normal damage to Rock Pokémon.", "image": "i/typ_rock_sm.png" }, { "type": "Steel", "damage": 1, "tooltip": "Normal damage to Steel Pokémon.", "image": "i/typ_steel_sm.png" }, { "type": "Water", "damage": 1, "tooltip": "Normal damage to Water Pokémon.", "image": "i/typ_water_sm.png" } ],
  typeGraphColor: "#333333",
  singlePokemonStats: [],
  //MANIPULATION FUNCTIONS
  //---------------------------------------------------------------------------------
  uppercase: function(str){
    return str.charAt(0).toUpperCase() + str.substr(1);
  },

  //INTERACTION FUNCTIONS
  //---------------------------------------------------------------------------------
  smoothScroll: $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  }),

  markWaypoint: $(window).scroll(function() {
    $('.info-section').each( function() {
      if (POKEMONAPP.checkVisible($(this))) {
          $(this).delay(1000).addClass("visible")
          $("#" + $(this).data('waypoint') + "-waypoint").addClass('on-screen');
      } else {
          $("#" + $(this).data('waypoint') + "-waypoint").removeClass('on-screen');
      }
    });
  }),

  pokePop: $(".main-logo").hover(function() {
    random = Math.floor(Math.random() * 4);
    $showPokemon = $($(this).parent().find('.hidden-pokemon')[random]);
    $showPokemon.addClass("show-pokemon");
  }, function() {
    $showPokemon.removeClass("show-pokemon");
  }),

  clearGenerationList: $("#clear-generation-list").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $("#pokemon-generation-list").html('');
    $("#generation-form label").removeClass("selected");
    $(this).removeClass("visible");
  }),

  clearTypeChart: $("#hide-type-chart").click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".responsive-chart-container.type-chart-container").removeClass("type-chart-container");
    $("#type-chart").html('');
    $(".type-list li").removeClass("inactive");
  }),

  checkVisible: function ( elm, eval ) {
      eval = eval || "visible";
      var vpH = $(window).height(), // Viewport Height
          st = $(window).scrollTop(), // Scroll Top
          y = $(elm).offset().top, // Element Position
          elementHeight = $(elm).height(); // Element Height

      if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
      if (eval == "above") return ((y < (vpH + st)));
  },

  //GRAPHS
  //---------------------------------------------------------------------------------
  printGenerationGraph: function() {
    var genData = JSON.stringify(POKEMONAPP.pokemonGeneData);
    var chart = AmCharts.makeChart( "gen-chart", {
      "type": "serial",
      "rotate": true,
      "dataProvider": POKEMONAPP.pokemonGeneData,
      "valueAxes": [ {
        "axisTitleOffset": 20,
        "minimum": 0,
        "axisAlpha": 0.15
      } ],
      "startDuration": 2,
      "graphs": [ {
        "balloonText": "There were [[count]] Pokémon introduced in [[name]].",
        "lineThickness": 2,
        "fillColorsField": "color",
        "fillAlphas": 0.9,
        "lineAlpha": 0,
        "type": "column",
        "valueField": "count"
      } ],
      "categoryField": "name"
    });
  },

  printTypeGraph: function(color) {
    $("#type-chart").removeClass("loading");
    var chart = AmCharts.makeChart( "type-chart", {
      "type": "radar",
      "dataProvider": POKEMONAPP.typeDamage,
      "addClassNames": true,
      "valueAxes": [ {
        "axisTitleOffset": 35,
        "minimum": 0,
        "axisAlpha": 0.15
      } ],
      "graphs": [ {
        "balloonText": "[[tooltip]]",
        "bullet": "round",
        "lineThickness": 2,
        "lineColor": color,
        "fillColor": color,
        "fillAlphas": 0.6,
        "valueField": "damage"
      } ],
      "categoryField": "type",
      "listeners": [ {
        "event": "rendered",
        "method": updateLabels
      }, {
        "event": "resized",
        "method": updateLabels
      } ]
    });

    function updateLabels( event ) {
      var labels = event.chart.chartDiv.getElementsByClassName( "amcharts-axis-title" );
      for ( var i = labels.length - 1; i >= 0; i-- ) {
        var src = event.chart.dataProvider[ i ].image;
        if ( src === undefined )
          continue;
        var label = labels[ i ];
        var parent = label.parentNode;
        var group = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
        var img = document.createElementNS( "http://www.w3.org/2000/svg", "image" );

        // Setup image
        img.setAttributeNS( "http://www.w3.org/1999/xlink", "href", src );
        img.setAttribute( "x", "-17" );
        img.setAttribute( "y", "-17" );
        img.setAttribute( "width", "40" );
        img.setAttribute( "height", "40" );

        // Swap position to group; remove from label
        group.setAttribute( "transform", label.getAttribute( "transform" ) );
        parent.removeChild( label );

        // Group axis labels
        //group.appendChild(label);
        group.appendChild( img );
        parent.appendChild( group );
      }

    }

    //RESET THE TYPE DAMAGE VARIABLE AFTER PRINTING THE GRAPH
    //NEED TO STRINGIFY THEN PARSE THE DAMAGE RESET OTHERWISE IT WILL BE A
    //COPY BY REFERENCE AND THE GRAPH WILL GET MESSED UP.
    POKEMONAPP.typeDamage = (JSON.parse(JSON.stringify(POKEMONAPP.typeDamageReset)));

  },

  printStatsGraph: function(color) {
    $("#stat-chart").addClass("loaded");
    var chart = AmCharts.makeChart( "stat-chart", {
      "type": "serial",
      // "rotate": true,
      "dataProvider": POKEMONAPP.singlePokemonStats,
      "valueAxes": [ {
        "axisTitleOffset": 20,
        "minimum": 0,
        "maximum": 280,
        "axisAlpha": 0.15
      } ],
      "graphs": [ {
        "balloonText": "[[name]] base value is [[value]]",
        "lineThickness": 2,
        "lineColor": "#004a94",
        "fillColor": "#004a94",
        "fillAlphas": 0.8,
        "type": "column",
        "valueField": "value"
      } ],
      "categoryField": "name"
    });
  },

  //CLICK FUNCTION TO GET ALL THE POKEMON IN A GENERATION
  getGenerationNum: function () {
    $('#generation-form').on('click', 'label', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $("#pokemon-generation-list").addClass("loading");
      //TAG CLASS OF CURRENT GENERATION
      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');
      $("#clear-generation-list").addClass('visible');
      //CLEAR OUT THE LIST
      $("#pokemon-generation-list").html('');
      $generation = $(this).find('input').val();

      // MAKE THE API CALL
      POKEMONAPP.makeGenerationCall($generation, POKEMONAPP.renderPokemonFromGeneration);
    });
  },

  selectSinglePokemon: function() {
    $("#pokemon-generation-list").on('click', 'li', function() {
      $pokeId = $(this).data("number")
      $(this).siblings().removeClass('selected');
      $(this).toggleClass('selected');
    })
  },

  //POKEMON GENERTAION AJAX CALL
  makeGenerationCall: function(url, callback) {
    $.get({
      url: POKEMONAPP.pokeapi + 'generation/' + url,
      success: callback
    })
  },

  //GET POKEMON CALLBACK
  renderPokemonFromGeneration: function(response) {
    var baseArr = response.pokemon_species;
    //LOOP THROUGH THE LIST AND ADD IT TO A LIST
    baseArr.forEach(POKEMONAPP.addPokemonToLi);
    $("#pokemon-generation-list").removeClass("loading");

  },

  // PUT EACH POKEMON SPRITE AND NAME INTO AN LI AND ADD IT TO THE POKEMON
  // GENERATION LISTS
  addPokemonToLi: function(obj) {
    $li = $('<li class="pokemon-generation-li" data-number="' + POKEMONAPP.getNumber(obj.url) + '"></li>');
    $img = $('<img src="' + POKEMONAPP.front_default + POKEMONAPP.getNumber(obj.url) + '.png" alt="" ' +
            'class="pokemon-sprite" />');
    $name = $('<span class="pokemon-name">' + POKEMONAPP.uppercase(obj.name) + '</span>')
    $li.append($img);
    $li.append($name);
    $("#pokemon-generation-list").append($li);
  },

  //GET A SPRITE BASED ON A POKEMON URL
  getNumber: function(url) {
    var pokemonURL = url
    // SINCE THE POKEMON SPRITES HAVE ALL THE SAME BASE URL WE CAN GET THEIR
    // NUMBER BY MANIPULATING THE STRING
    var pokemonNumber = pokemonURL.slice(41, -1);
    return pokemonNumber
  },


  //----------------------------------------------------------------------------
  //POKEMON WORLD FUNCTIONS

  clickLocation: $("#map-list").on('click', 'li', function(e) {
    e.preventDefault();
    $location = $(this).data('region');
    $("#region-name").text('');
    $("#region-generation").text('');
    $(".region-list.version-list").html('');
    $(".region-list.location-list").html('');
    POKEMONAPP.locationCall($location);
  }),

  closeRegionData: $("#region-data").on('click', '.close-region', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $("#region-data").toggleClass('visible');
  }),

  locationCall: function(location) {
    $.get({
      url: POKEMONAPP.pokeapi + location,
      success: POKEMONAPP.locationCallback
    })
  },

  locationCallback: function(response) {
    $versionList = $(".region-list.version-list");
    $locationList = $(".region-list.location-list");
    $container = $("#region-data");
    $container.find("#region-name").text(POKEMONAPP.uppercase(response.name));
    $container.find("#region-generation").text(POKEMONAPP.uppercase(response.main_generation.name));
    response.version_groups.forEach(POKEMONAPP.versionList);
    response.locations.forEach(POKEMONAPP.locationList);
    $("#region-data").toggleClass('visible');
  },

  versionList: function(object) {
    $li = $("<li></li>");
    $li.text(object.name);
    $versionList.append($li);
  },

  locationList: function(object) {
    $li = $("<li></li>");
    $li.text(object.name);
    $locationList.append($li);
  },

  //----------------------------------------------------------------------------
  //POKEMON TYPE FUNCTIONS
  typeClick: function() {
    $(".type-list").on('click', 'a', function(e) {
      e.preventDefault();
      $("#type-chart").html('');
      $("#type-chart").addClass("loading");
      $("#type-chart").parent().addClass("type-chart-container");
      $type = $(this).data("type");
      POKEMONAPP.typeGraphColor = $(this).data("color");
      $(this).parent().removeClass("inactive");
      $(this).parent().siblings().addClass("inactive");
      POKEMONAPP.typeRequest($type)
    })
  },

  typeRequest: function(type) {
    //reset type damage object to the base object
    $.get({
      url: POKEMONAPP.pokeapi + "type/" + type,
      success: POKEMONAPP.typeDamageAdjustment
    })
  },

  typeDamageAdjustment: function(response) {
    // MODIFY THE DAMAGE ARRAY BASED ON THE RESPONSE FROM THE TYPE CALL
    ddt = response.damage_relations.double_damage_to;
      ddt.forEach(POKEMONAPP.doubleDamage);
    hdt = response.damage_relations.half_damage_to;
      hdt.forEach(POKEMONAPP.halfDamage);
    ndt = response.damage_relations.no_damage_to;
      ndt.forEach(POKEMONAPP.noDamage);

    color = POKEMONAPP.typeGraphColor;
    //ONCE WE HAVE MODIFIED THE DAMAGE ARRAY PRINT THE TYPE GRAPH
    POKEMONAPP.printTypeGraph(color);
  },

  doubleDamage: function(obj) {
    $.each(obj, function(k, v) {
      type = obj["name"]
      type = POKEMONAPP.uppercase(type);
      POKEMONAPP.typeDamage[POKEMONAPP.damageMapper(type)].damage = 2
      POKEMONAPP.typeDamage[POKEMONAPP.damageMapper(type)].tooltip = "Double damage to " + type + " Pokémon."
    })
  },

  halfDamage: function(obj) {
    $.each(obj, function(k, v) {
      type = obj["name"]
      type = POKEMONAPP.uppercase(type);
      POKEMONAPP.typeDamage[POKEMONAPP.damageMapper(type)].damage = 0.5
      POKEMONAPP.typeDamage[POKEMONAPP.damageMapper(type)].tooltip = "Half damage to " + type + " Pokémon."
    })
  },

  noDamage: function(obj) {
    $.each(obj, function(k, v) {
      type = obj["name"]
      type = POKEMONAPP.uppercase(type);
      POKEMONAPP.typeDamage[POKEMONAPP.damageMapper(type)].damage = 0
      POKEMONAPP.typeDamage[POKEMONAPP.damageMapper(type)].tooltip = "Unable to harm " + type + " Pokémon."
    })
  },

  damageMapper: function(type) {
    switch(type) {
      case "Bug":
        return 0
        break;
      case "Dark":
        return 1
        break;
      case "Dragon":
        return 2
        break;
      case "Electric":
        return 3
        break;
      case "Fairy":
        return 4
        break;
      case "Fighting":
        return 5
        break;
      case "Fire":
        return 6
        break;
      case "Flying":
        return 7
        break;
      case "Ghost":
        return 8
        break;
      case "Grass":
        return 9
        break;
      case "Ground":
        return 10
        break;
      case "Ice":
        return 11
        break;
      case "Normal":
        return 12
        break;
      case "Poison":
        return 13
        break;
      case "Psychic":
        return 14
        break;
      case "Rock":
        return 15
        break;
      case "Steel":
        return 16
        break;
      case "Water":
        return 17
        break;
      default:
        return false;
    }
  },


  //----------------------------------------------------------------------------
  //POKEMON EVOLUTION FUNCTIONS
  searchPokemon: function(query, callback) {
    $("#stat-container, #single-pokemon-name, #ability-list, #evolution-chain, #stat-chart").html('');
    $("#single-pokemon").addClass("loading");
    $.get({
      url: POKEMONAPP.pokeapi + 'pokemon/' + query,
      success: callback
    })
  },

  submitSearch: function() {
    var $searchVal = '';
    $("#find-pokemon").on('submit', function(e){
      e.preventDefault();
      $searchVal = $("#s").val().toLowerCase();
      //CLEAR OUT THE STAT CONTAINER

      $("#s").val('');
      POKEMONAPP.searchPokemon($searchVal, POKEMONAPP.searchCallback)

    });
  },

  searchCallback: function(response) {
    pokemon = response.species.url || undefined;
    POKEMONAPP.evolutionCall(pokemon);

    var pokeObj = response;
    var types = response.types;
    var stats = response.stats;
    var abilities = response.abilities;
    var pokeName = POKEMONAPP.uppercase(pokeObj.name)
    console.log(pokeObj);

    $("#single-pokemon").removeClass("loading");
    $pokeSprite = $('<img class="sprite-image" src="' + pokeObj.sprites.front_default + '" alt="' + pokeObj.name + '" />')
    $typeList = $('<ul id="pokemon-type-list"></ul>');
    $abilitiesList = $('<ul id="ability-list"></ul>');

    $("#single-pokemon-name").append($pokeSprite);
    $("#single-pokemon-name").append(pokeName);

    POKEMONAPP.getPokemonStats(stats);
    POKEMONAPP.printStatsGraph();
    $("#stat-chart").prepend("<h3>Base Stats</h3>");

    POKEMONAPP.getPokemonTypes(types);
    $("#stat-container").append("<h3>" + pokeName + "'s types are:</h3>");
    $("#stat-container").append($typeList);

    POKEMONAPP.getPokemonAbilities(abilities);
    $("#stat-container").append("<h3>" + pokeName + "'s abilities are:</h3>");
    $("#stat-container").append($abilitiesList);

  },

  evolutionCall: function(pokemon) {
    if (pokemon !== undefined) {
      $.get({
        url: pokemon,
        success: POKEMONAPP.getEvolutionChain
      });
    }
  },

  getEvolutionChain: function(response) {
    evolutionChain = response.evolution_chain.url;
    $.get({
      url: evolutionChain,
      success: POKEMONAPP.evolutionChainCall
    })
  },

  evolutionChainCall: function(response) {
    $("#evolution-chain").html('');
    console.log(response);
    chain = response.chain;
    is_baby = chain.is_baby;
    evolves_to = chain.evolves_to;
    if(is_baby === true) {
      $("#evolution-chain").append('<li class="baby-form" data-name="' + chain.species.name + '"><span>' + POKEMONAPP.uppercase(chain.species.name) + '</span></li>');
    } else {
      $("#evolution-chain").append('<li data-name="' + chain.species.name + '"><span>' + POKEMONAPP.uppercase(chain.species.name) + '</span></li>');
    }
    evolves_to.forEach(POKEMONAPP.printEvolutionChain);
  },

  printEvolutionChain: function(evolution) {
    $li = $("<li></li>");
    $span = $("<span></span>");
    $li.attr("data-name", evolution.species.name);
    $span.text(POKEMONAPP.uppercase(evolution.species.name));
    $li.append($span);
    $("#evolution-chain").append($li);
    if(evolution.evolves_to.length > 0) {
      evolution.evolves_to.forEach(POKEMONAPP.printEvolutionChain)
    }
  },

  getPokemonStats: function(stats) {
    POKEMONAPP.singlePokemonStats = [];
    stats.forEach( function(stat) {
      pokemonStat = {}
      pokemonStat.name = stat.stat.name;
      pokemonStat.value = stat.base_stat;
      POKEMONAPP.singlePokemonStats.push(pokemonStat);
    });
  },

  clickEvolutionChain: $("#evolution-chain").on('click', "li", function(){
    $searchTerm = $(this).data("name");
    POKEMONAPP.searchPokemon($searchTerm, POKEMONAPP.searchCallback);
  }),

  getPokemonAbilities: function(abilities) {
    abilities.forEach( function(ability) {
      $li = $('<li class="pokemon-abilities"></li>');
      $li.append('<span class="ability-name">' + ability.ability.name + '</span>');
      $abilitiesList.append($li);
    });
  },

  getPokemonTypes: function(types) {
    types.forEach( function(type) {
      $li = $('<li class="pokemon-type ' + type.type.name + '"></li>');
      $li.append('<span class="type-name">' + POKEMONAPP.uppercase(type.type.name) + '</span>');
      $typeList.append($li);
    });
  }


}

POKEMONAPP.pokePop;
POKEMONAPP.smoothScroll;
POKEMONAPP.markWaypoint;
POKEMONAPP.clickLocation;
POKEMONAPP.clearGenerationList;
POKEMONAPP.clearTypeChart;
POKEMONAPP.closeRegionData;
POKEMONAPP.clickEvolutionChain;
POKEMONAPP.printGenerationGraph();
POKEMONAPP.getGenerationNum();
POKEMONAPP.selectSinglePokemon();
POKEMONAPP.typeClick();
POKEMONAPP.submitSearch();


})($, window);




// function storageAvailable(type) {
// 	try {
// 		var storage = window[type],
// 			x = '__storage_test__';
// 		storage.setItem(x, x);
// 		storage.removeItem(x);
// 		return true;
// 	}
// 	catch(e) {
// 		return false;
// 	}
// }
//
// if (storageAvailable('localStorage')) {
// 	// Yippee! We can use localStorage awesomeness
//   alert("You can use storage!!");
// }
// else {
// 	// Too bad, no localStorage for us
//   alert("You can't use storage :(");
// }
