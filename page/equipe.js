function Equipe(nome, cor, coords, img){
    this.nome = nome;
    this.cor = cor;
    this.img = img

    this.coords = coords;
    this.tensao_modulo = 15.2
    this.velocidade = 3.14

    this.marcador = null

    this.set_marcador_equipe = function(){
        var classe="geolocalizacao equipe-"+this.nome.split(" ").join("")
        var myIcon = L.divIcon({className: classe})
        this.marcador = L.marker(this.coords, {icon: myIcon})
    }

    this.get_marcador_equipe = function(){
        return this.marcador
    }

    this.set_tensao_modulo = function(tensao_modulo){
        this.tensao_modulo = tensao_modulo
    }

    this.set_coords = function(coords){
        this.coords = coords
    }

    this.set_velocidade = function(velocidade){
        this.velocidade = velocidade
    }

    this.acionar_popup_equipe = function(){
	    this.marcador.bindPopup("<div class='popup_marcador'>"+this.create_popup()+"</div>").openPopup()
	}

    this.create_popup = function(){

        var div_pai = $("<div></div>")
        div_pai.css("display", "flex")
        div_pai.css("flex-direction", "row")

        var image = $("<img>")
        image.attr('src', "img/"+this.img);
        image.css("height","80")
        image.css("width","80")
        image.css("margin-right", "5px")


        var div_infos = $("<div></div>")
        div_infos.css("display", "flex")
        div_infos.css("flex-direction", "column")

        var nome_equipe = $("<h4></h4>")
        nome_equipe.css("text-align", "center")
        nome_equipe.text(this.nome)

        nome_equipe.appendTo(div_infos)


       var div_bateria = $("<div></div>")
       div_bateria.css("display", "flex")
       div_bateria.css("flex-direction", "row")

        var label_bat = $("<p></p>")
        label_bat.text("Bateria: ")
        label_bat.css("font-weight", "bold")
        label_bat.css("margin-right", "5px")

        var valor_bat = $("<p></p>")
        valor_bat.text(this.tensao_modulo+" V")

        label_bat.appendTo(div_bateria)
        valor_bat.appendTo(div_bateria)
        div_bateria.appendTo(div_infos)

       var div_velocidade = $("<div></div>")
       div_velocidade.css("display", "flex")
       div_velocidade.css("flex-direction", "row")


        var label_vel = $("<p></p>")
        label_vel.text("Velocidade: ")
        label_vel.css("font-weight", "bold")
        label_vel.css("margin-right", "5px")

        var valor_vel = $("<p></p>")
        valor_vel.text(this.velocidade+" nós")

        label_vel.appendTo(div_velocidade)
        valor_vel.appendTo(div_velocidade)
        div_velocidade.appendTo(div_infos)

       image.appendTo(div_pai)
       div_infos.appendTo(div_pai)

        return div_pai.html()


    }
}

function EquipesJson(){
    var object_json = {}

    object_json[1] = {'nome': 'Adsumus', 'cor':'red', 'coords':[-22.90674600033454, -42.03463554382325], 'img':'adsumus.png'}
    object_json[2] = {'nome':'Arariboia', 'cor':'orange', 'coords':[-22.906815179605964, -42.03444242477418], 'img':'arariboia.png'}
    object_json[3] = {'nome':'Fernando Amorim', 'cor':'green', 'coords':[-22.907042482677856, -42.03479647636414], 'img':'fernando-amorim.png'}
    object_json[4] = {'nome':'Solaris','cor':'yellow', 'coords':[-22.907195664967922, -42.03439950942994], 'img':'fernando-amorim.png'}
    object_json[5] = {'nome':'Solares', 'cor':'purple', 'coords':[-22.907057306778, -42.03512907028199], 'img':'fernando-amorim.png'}

    return object_json
}
