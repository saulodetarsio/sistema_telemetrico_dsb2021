/**
* Esse objeto contém todas as ações que podem ser feitas em cima do mapa da aplicação
**/
function ControleMapa (){	

	this.mapa = L.map('mapa', { zoomControl:false, dragging: true})	
	this.popup = null
	this.boias = []

	/**
	* Cria o objeto mapa para ser manipulado
	**/
	this.criar_mapa = function(id, coords,  z){		
		this.mapa.setView([coords[0], coords[1]], z);		
		this.mapa.on('click', this.onMapClick);
	}

	this.onMapClick = function(e){
		console.log("Lng: "+e.latlng.toString())

	}

	/**
		Renderiza o mapa com as propriedades passadas por meio dos parâmetros passados para o método.
	**/
	this.renderizar_mapa = function(src, zMin,  zMax){
		L.tileLayer(src, {
			maxZoom: zMax,
      		minZoom: zMin,
      		zoomControl: false
    	}).addTo(this.mapa);
	}

	/**
	* Cria e adiciona no mapa o marcador que representa o barco.
	**/
	this.adicionar_marcador_barco = function(coord){
		var myIcon = L.divIcon({className: 'geolocalizacao'});
		this.barco = L.marker(coord, {icon: myIcon}).addTo(this.mapa);
	}

	/**
	* Adiciona o marcador referêncial para medir a distância de afastamento do barco
	**/
	this.adicionar_marcador_referencial = function(coord){
		var myIcon = L.divIcon({className: 'referencial'});
		this.barco = L.marker(coord, {icon: myIcon}).addTo(this.mapa);
	}

	/**
	* Método que atualiza a coordenada do marcador que representa o barco, dando a ideia de movimento.
	**/
	this.atualizar_localizacao_barco = function (coord){
		this.barco.setLatLng(coord);
	}

	/**
	* Método que adiciona as boias que irão delimitar o percurso da prova.
	**/
	this.renderizar_boia = function(boia){
		var myIcon = L.divIcon({className: 'boia'});
		L.marker(boia, {icon: myIcon}).addTo(this.mapa);
		this.boias.push(boia)
	}


	this.renderizar_circuito_prova = function(boias){
		var coords = []
		console.log(boias)
		for(var k in boias){
			var latitude = boias[k][0]
			var longitude = boias[k][1]
			coords.push([latitude, longitude])
		}

		coords.push(boias[0])
		var polygon = L.polygon(coords, {color: 'white', fill: true, 
			lineJoin: 'round', fillColor: 'none', fillOpacity: 0.5}).addTo(this.mapa);	
	}
}




