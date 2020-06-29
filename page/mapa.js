function map_controller(){
     this.boias_prova3 = [
        new Boia(0, [-26.244333, -48.640946], true),
        new Boia(1, [-26.238000, -48.644670], false),
        new Boia(2, [-26.233880, -48.648480], false),
        new Boia(3, [-26.260000, -48.669770], false),
        new Boia(4, [-26.263730,-48.660700], false)
      ]

      this.boias_prova4 = [
          new Boia(0, [-26.245687515304795,-48.64505767822266], true),
           new Boia(1, [-26.24051035632444, -48.6461091041565], false),
           new Boia(2, [-26.24255045393935,-48.6411738395690], false)

      ]

      this.boias_prova5 = [
                new Boia(0, [-26.242500, -48.641033], true),
                new Boia(1, [-26.241116, -48.641800], false),
                new Boia(2, [-26.243316, -48.642450], false),
                new Boia(3, [-26.243733, -48.641150], false)

      ]

    //de 14 a 17
    this.zoom = 14
    this.boias = this.boias_prova3;


    this.mymap = L.map('mapid').setView([-26.243898,-48.640687], this.zoom);
    L.control.polylineMeasure({position:'topleft', unit:'metres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true, showUnitControl: true}).addTo(this.mymap);
    this.marcadores_equipes = []



     this.tileLayer =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(this.mymap);


    this.renderizar_boias = function(){
        var myIcon = L.divIcon({className: 'boia teste'});
           var index1, index2

        for(var k in this.boias){
             L.marker(this.boias[k].coord, {icon: myIcon}).addTo(this.mymap).bindPopup(this.boias[k].coord);
        }
    }


	this.renderizar_circuito_prova = function(){
	    var boias = []

	    for(var k in this.boias){
            boias.push(this.boias[k].coord)
        }


		var polygon = L.polygon(boias, {color: 'white', fill: true,
			lineJoin: 'round', fillColor: 'none', fillOpacity: 0.5}).addTo(this.mymap);
	}


    this.renderizar_marcador_equipe = function(id, coord){

        var classe="geolocalizacao equipe-"+id

        var myIcon = L.divIcon({className: classe});

		var equipe = L.marker(coord, {icon: myIcon}).addTo(this.mymap);

		var img = "<img src='img/equipe-"+id+".png' width='80' height='80'>"

		equipe.bindPopup(img);

		this.marcadores_equipes.push(equipe)
    }

    this.atualizar_localizacao_barco = function (id, coord){
        this.marcadores_equipes[id-1].setLatLng(coord);
	}

}