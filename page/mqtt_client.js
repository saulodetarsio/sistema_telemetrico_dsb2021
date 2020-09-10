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
    //console.log(mensagem)

    if(mensagem.length > 22){
        mensagem = mensagem.slice(1, mensagem.length-1)

        var vec = mensagem.split(",")

        var id = parseInt(vec[0])

        var latitude = parseFloat(vec[1])
        var longitude = parseFloat(vec[2])

        console.log('Lat: '+latitude)
        console.log('Lng: '+longitude)
        console.log("Id: "+id)

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
})

$("#btn-cadastrar-boias").click(function(){
    var lat = $("#latitude-value").val()
    var lng = $("#longitude-value").val()

    if(localStorage.getItem("boias") == null){
        var boias_json = {"1": lat+","+lng}
        localStorage.setItem("boias", JSON.stringify(boias_json))
    }else{
        var retrievedObject = JSON.parse(localStorage.getItem('boias'));
        var index = Object.keys(retrievedObject).length + 1

        var prop = index.toString()

        retrievedObject[prop] = lat+","+lng

        localStorage.setItem("boias", JSON.stringify(retrievedObject))

    }

    //Chamar o método do controle reponsável por renderizar as boias no mapa

    $("#longitude-value").val("")
    $("#latitude-value").val("")
    alert("Boia adicionada no mapa com sucesso!")

})


// Tick-tack
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