function map_controller(){

    //de 14 a 17
    this.zoom = 15

    this.mymap = L.map('mapid').setView([-22.895489074551936, -42.00747013092042], this.zoom);
    var options = {
        position:'topleft',
        unit:'metres',
        showBearings:true,
        clearMeasurementsOnStop: false,
        showClearControl: true,
        showUnitControl: true,
        measureControlTitleOn: 'Habilitar a medida',   // Title for the control going to be switched on
        measureControlTitleOff: 'Desabilitar medida', // Title for the control going to be switched off
        clearControlTitle: 'Limpar medidas', // Title text to show on the clear measurements control button
        tooltipTextFinish: 'Clique para <b>finalizar a linha</b><br>',
        tooltipTextDelete: 'Pressione SHIFT-key e clique para <b>excluir o ponto</b>',
        tooltipTextMove: 'Clique e arraste para <b>mover o ponto</b><br>',
        tooltipTextResume: '<br>Pressione CTRL-key e clique para <b>continuar a linha</b>',
        tooltipTextAdd: 'Pressione CTRL-key e clique para <b>adicionar o ponto</b>',

        unitControlTitle: {             // Title texts to show on the Unit Control button
            text: 'Mudar a unidade de medida',
            metres: 'metro',
            landmiles: 'milhas terrestres',
            nauticalmiles: 'milhas náuticas'
        },

        unitControlLabel: {             // Unit symbols to show in the Unit Control button and measurement labels
            metres: 'm',
            kilometres: 'km',
            feet: 'pés',
            landmiles: 'mi',
            nauticalmiles: 'mn'
        },

    }
    L.control.polylineMeasure(options).addTo(this.mymap);
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