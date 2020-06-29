var map = new map_controller()

var equipes = []

var client = new Paho.MQTT.Client("localhost", Number(9001), "/app1/dados/", "solaris"+parseInt(Math.random() * 100 ));

// called when the client connects
function onConnect1() {
  // Once a connection has been made, make a subscription and send a message.
  client.subscribe("app1/dados/#");
}

function onMessage(msg){
    var mensagem = msg.payloadString
    console.log(mensagem)

    if(mensagem.length > 22){
        mensagem = mensagem.slice(1, 22)

        var vec = mensagem.split(",")
        var id = parseInt(vec[0])
        var latitude = parseFloat(vec[1]/1000000)
        var longitude = parseFloat(vec[2]/1000000)

        map.atualizar_localizacao_barco(id, [latitude, longitude])

    }

}

function renderizar_equipes(){
    var box = $(".equipes-box")

    for(var i = 0; i < equipes.length; i++){
        var equipe = $('<div class="equipe"></div>')
        equipe.attr('id', "equipe_"+equipes[i].id)

        box.append(equipe)

        var div1 = $('<div></div>')
        var marcador_equipe = $('<div class="marcador-equipe"></div>')
        marcador_equipe.css('background-color', equipes[i].cor)
        div1.append(marcador_equipe)

        var nome_equipe = $('<div class="nome-equipe"></div>')
        nome_equipe.text(equipes[i].nome)


        equipe.append(div1)
        equipe.append(nome_equipe)

    }
}




//document.write("connecting to "+ host);
var options1 = {
    timeout: 3,
    onSuccess: onConnect1,
    useSSL: false,
 };


//Cliente 1
 client.onMessageArrived = onMessage
 client.connect(options1); //connect


map.renderizar_boias()
map.renderizar_circuito_prova()

//Equipes
equipes.push(new Equipe(1, "ARARIBOIA", "#990033", [-26.243243, -48.643391]))
equipes.push(new Equipe(2, "BABITONGA", "#6600cc", [-26.244061, -48.645301]))
equipes.push(new Equipe(3, "SOLARIS", "#3333FF", [-26.241790, -48.646213]))
equipes.push(new Equipe(4, "ADSUMUS", "#00FF99", [-26.241001, -48.643595]))
equipes.push(new Equipe(5, "ETEHL", "#220900", [-26.244784, -48.643923]))

equipes.push(new Equipe(6, "HURAKAN", "#FF4300", [-26.247648, -48.653017]))
equipes.push(new Equipe(7, "LAFAE", "#CDE242", [-26.249833, -48.650635]))
equipes.push(new Equipe(8, "LEVIATÃ", "#FF00FF", [-26.245365, -48.648508]))
equipes.push(new Equipe(9, "MSP", "#800000", [-26.245075, -48.643740]))
equipes.push(new Equipe(10, "SMART CEFET", "#FFD700", [-26.246378, -48.646438]))
equipes.push(new Equipe(11, "SOLARES", "#ADFF2F", [-26.247689, -48.646131]))
equipes.push(new Equipe(12, "FERNANDO AMORIM", "#254000", [-26.245302, -48.652746]))
equipes.push(new Equipe(13, "REI DO SOL", "#FF6347", [-26.245763, -48.644399]))

for(var a = 0; a < equipes.length; a++){
    map.renderizar_marcador_equipe(equipes[a].id, equipes[a].coords)
}

renderizar_equipes()
 map.mymap.on("click", function(e){
          console.log(e)
         //new L.Marker([e.latlng.lat, e.latlng.lng]).addTo(this.mymap);
         var lat = e.latlng.lat
         var lng = e.latlng.lng

          console.log(lat, lng)

      })



//Eventos
$('.equipe').mouseover(
    function(){
        var id = parseInt($(this).attr('id').split("_")[1]);
        $('.equipe-'+id).click()
    }
)

$('.equipe').mouseout(
    function(){
        var id = parseInt($(this).attr('id').split("_")[1]);
        $('.leaflet-popup-close-button')[0].click()
    }
)


$("#iniciar_prova_button").click(function(){
    var data = new Date()

    if(localStorage.getItem("hora_gravada") == null){
       localStorage.setItem("hora_gravada", data)
    }


})

$("#recomecar_prova_button").click(function(){
     if(localStorage.getItem("hora_gravada") != null){
       localStorage.removeItem("hora_gravada")
    }
    $('#info-hora').text("00 : 00 : 00")
   // localStorage.setItem("hora_gravada", new Date())
})


setInterval(function(){
    if(localStorage.getItem("hora_gravada") != null){
        var tempo_decorrido = ""

        var data_agora = new Date()
        var data_gravada = localStorage.getItem("hora_gravada")



        var agora = data_agora.toString().split(" ")[4]
        var gravada = data_gravada.toString().split(" ")[4]

         var g_data = new Date(data_gravada)


        var timestamp_ref= g_data.getTime()
        var timestamp_atual = data_agora.getTime()

        var quant_segundos_total = parseInt((timestamp_atual - timestamp_ref)/1000)

        var h = parseInt((quant_segundos_total) / 3600)
        var m = parseInt((quant_segundos_total % 3600)/60)
        var s = parseInt((quant_segundos_total % 3600)%60)

        if(h < 10){
            tempo_decorrido += "0";
        }
        tempo_decorrido+=h+" : "

        if(m < 10){
            tempo_decorrido += "0";
        }
        tempo_decorrido+=m+" : "

        if(s < 10){
            tempo_decorrido += "0"
        }
        tempo_decorrido+=s

        $('#info-hora').text(tempo_decorrido)

    }
}, 1000)