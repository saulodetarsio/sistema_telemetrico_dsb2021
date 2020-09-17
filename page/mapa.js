function map_controller(){

    //de 14 a 17
    this.zoom = 15

    this.mymap = L.map('mapid').setView([-22.895489074551936, -42.00747013092042], this.zoom);
    L.control.polylineMeasure({position:'topleft', unit:'metres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true, showUnitControl: true}).addTo(this.mymap);
    this.marcadores_equipes = {}
    this.boias_circuito = {}

     this.tileLayer =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    }).addTo(this.mymap);


    this.adicionar_marcador_map = function(equipe){
        var classe="geolocalizacao equipe-"+equipe["nome"].split(" ").join("")
        var myIcon = L.divIcon({className: classe});
        this.marcadores_equipes[equipe["id"]] = L.marker(equipe['coords'], {icon: myIcon}).addTo(this.mymap)
        this.marcadores_equipes[equipe["id"]].bindPopup("<div class='popup_marcador'>"+equipe.create_popup()+"</div>").openPopup()
    }

    this.atualizar_localizacao_barco = function(equipe){
        var marcador_equipe = this.marcadores_equipes[equipe.id]
        marcador_equipe.setLatLng(equipe.coords)
        this.marcadores_equipes[equipe["id"]].bindPopup("<div class='popup_marcador'>"+equipe.create_popup()+"</div>").openPopup()
	}

    this.adicionar_boia_mapa = function(boias){

        for(var key in boias){
            var valor = boias[key].split(",")

            var lat = parseFloat(valor[0])
            var lng = parseFloat(valor[1])

            var myIcon = L.divIcon({className: 'boia'});
		    this.boias_circuito[key] = L.marker([lat, lng], {icon: myIcon})
		    this.boias_circuito[key].addTo(this.mymap);

		}

		this.renderizar_circuito_prova()
    }


	this.renderizar_circuito_prova = function(){
		var coords = []

		for(var k in this.boias_circuito){
		    var lat = this.boias_circuito[k].getLatLng()['lat']
		    var lng = this.boias_circuito[k].getLatLng()['lng']

			coords.push([lat, lng])
		}

		console.log(coords)

		var polygon = L.polygon(coords, {color: 'white', fill: true,
			lineJoin: 'round', fillColor: 'none', fillOpacity: 0.5}).addTo(this.mymap);
	}
}