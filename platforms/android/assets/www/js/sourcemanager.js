$(function() {
	var sources = [
		   { 'name' : 'DBpedia', 'endpoint' : 'http://dbpedia.org/sparql' },
		   { 'name' : 'Linked Geo Data', 'endpoint' : 'http://linkedgeodata.org/sparql' }
		];
	var types = [
		   { 'uri' : 'http://dbpedia.org/ontology/Airport' },
		   { 'uri' : 'http://linkedgeodata.org/ontology/Airport' }
		];
	localStorage.setItem("sources", JSON.stringify(sources));
	localStorage.setItem("types", JSON.stringify(types));
	if(!localStorage.sources){
		sources = [
		   { 'name' : 'Wiktionary', 'endpoint' : 'http://wiktionary.dbpedia.org/sparql' },
		];
	}
	
	else{
		sources = localStorage.sources;
		// Recreate saved source list
		var i = 1;
		$("#sources ul").html('');
		$.each($.parseJSON(localStorage.sources), function(key, source){
			$("#sources ul").append('<li id="' + i + '">' + source.name + '<br />' + source.endpoint + '</li>');
			i++;
		});
	}
	
	if(!localStorage.types){
		types = [
		   { 'uri' : 'http://dbpedia.org/ontology/Airport' },
		];
	}
	else{
		types = localStorage.types;
		// Recreate saved source list
		var i = 1;
		$("#types ul").html('');
		$.each($.parseJSON(localStorage.types), function(key, type){
			$("#types ul").append('<li id="' + i + '">' + type.uri + '</li>');
			i++;
		});
	}
	
	$( "#sources-title a" ).click(function() {
      $('#source-form').dialog({show:'fade',hide:'fade'});
	  $('#source-form').dialog("open");
	  $('#source-form').dialog("option","position",[220,87]);
    });
	
	$( "#source-form" ).dialog({
      autoOpen: false,
      height: 230,
      width: 510,
      modal: true,
      buttons: {
        "Add source": function() {
			var linkid = 1;
			if($('#sources ul li').last().length){
				linkid = parseInt($('#sources ul li').last().attr('id'), 10) + 1;
			}
			$("#sources ul").append('<li id="' + linkid + '">' + $("#source").val() + '<br />' + $("#endpoint").val() + '</li>');
			sources.push({ 'name' : $("#source").val(), 'endpoint' :  $("#endpoint").val() });
			$.cookie("sources", JSON.stringify(sources));
			console.log($.cookie("sources"));
			$( this ).dialog( "close" );
        },
        Cancel: function() {
			$( this ).dialog( "close" );
        }
      }
    });
	
	// using a delegated .on("click") event to attach the event handler AFTER injecting new HTML (i.e. adding a SPARQL source)
	$("#sources").on("click", "li a.remove", function() {
		var item = $(this).siblings().text();
		var i = 0;
		$.each(sources, function(key, source){	
			if(source.name == item){
				sources.splice(i,1);
				return false;
			}
			i++;
		});
		
		$(this).parent().remove();
		$.cookie("sources", JSON.stringify(sources));
	});
});