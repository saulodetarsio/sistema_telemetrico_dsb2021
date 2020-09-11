function Equipe(id, nome, cor, coords, img){
    this.id = id
    this.nome = nome;
    this.cor = cor;
    this.img = img

    this.coords = coords;
    this.tensao_modulo = 15.2
    this.velocidade = 3.14


    this.set_tensao_modulo = function(tensao_modulo){
        this.tensao_modulo = tensao_modulo
    }

    this.set_coords = function(coords){
        this.coords = coords
    }

    this.set_coords = function(velocidade){
        this.velocidade = velocidade
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

    object_json["Adsumus"] = {'cor':'red', 'coords':[-22.90674600033454, -42.03463554382325], 'img':'adsumus.png'}
    object_json["Arariboia"] = {'cor':'orange', 'coords':[-22.906815179605964, -42.03444242477418], 'img':'arariboia.png'}
    object_json["Fernando Amorim"] = {'cor':'green', 'coords':[-22.907042482677856, -42.03479647636414], 'img':'fernando-amorim.png'}

    return object_json
}
