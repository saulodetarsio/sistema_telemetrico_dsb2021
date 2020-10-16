var map = new map_controller()
var equipes_json = new EquipesJson()
var opcoes_equipes = [["Arariboia", 1], ["Adsumus", 2],  ["Fernando Amorim",3], ["Solaris",4], ["Solares",5]]
var client = new Paho.MQTT.Client("localhost", Number(9001), "/app1/dados/", "solaris"+parseInt(Math.random() * 100 ));


var equipes = {}
var selecionados = []
var t = 0


//document.write("connecting to "+ host);
var options1 = {
    timeout: 3,
    onSuccess: onConnect1,
    useSSL: false,
 };

function onConnect1() {
  client.subscribe("app1/dados/#");
}

function onMessage(msg){
    var mensagem = msg.payloadString


    if(Object.keys(equipes).length > 0){
        processar_mesagem_recebida(mensagem)




    }
}

function processar_mesagem_recebida(msg){

    var msgs = msg.split("*")



    for (var i = 0; i < msgs.length; i++){

        if(msgs[i][0] == '[' && msgs[i][msgs[i].length-1] == ']'){
            msgs[i] = msg.slice(1, msgs[i].length-1)

            var vec = msgs[i].split(",")



            var id = parseInt(vec[0])
            var latitude = parseFloat(vec[1])
            var longitude = parseFloat(vec[2])


            var velocidade = parseFloat(vec[5])
            var tensao_modulo = parseFloat(vec[6])


            var equipe = equipes[id]

            if(equipe == null){
                break;
            }

            equipe.set_coords([latitude, longitude])

            equipe.set_tensao_modulo(tensao_modulo)
            equipe.set_velocidade(velocidade)

            map.atualizar_localizacao_barco(equipe)

            console.log("->", id, latitude, longitude, velocidade, tensao_modulo)

        }
    }



}



function renderizar_opcoes_equipes(){
    opcoes_equipes  = opcoes_equipes.sort()

    for(var i = 0; i < opcoes_equipes.length; i++){
        var opt = $("<option></option>").text(opcoes_equipes[i][0]);
        opt.attr("value", opcoes_equipes[i][1])
        $("#equipe-selecionada").append(opt)
    }
}

function renderizar_equipes_selecionadas(){
    var t = localStorage.getItem("equipes_selecionadas")
    var e;

    if(t != null){
        e = t.split(",")
        for(var i = 0; i < e.length; i++){
            var x = equipes_json[e[i]]
            var nova_equipe = new Equipe(x['nome'], x['cor'], x['coords'], x['img'])

           map.adicionar_marcador_map(nova_equipe)
           equipes[e[i]] = nova_equipe
        }
    }
}

function renderizar_equipes(){
    var box = $(".equipes-box")

     for(var key in equipes){
        var equipe = $('<div class="equipe"></div>')
        equipe.attr('id', "equipe_"+key)

        box.append(equipe)

        var div1 = $('<div></div>')
        var marcador_equipe = $('<div class="marcador-equipe"></div>')
        marcador_equipe.css('background-color', equipes[key].cor)
        div1.append(marcador_equipe)

        var nome_equipe = $('<div class="nome-equipe"></div>')
        nome_equipe.text(equipes[key].nome)

        equipe.append(div1)
        equipe.append(nome_equipe)
        selecionados.push(key)

    }
}


function ativar_popup_equipes(quant_segundos_total){
   //Para o teste
    if(quant_segundos_total % 5 == 0 && localStorage.getItem("equipes_selecionadas") != null){
        var f = equipes[selecionados[t]]

        f.acionar_popup_equipe()

        //$(".equipe-"+f).click()


         t = t+1

         if(t == Object.keys(equipes).length){
            t = 0;
         }
    }
}

function renderizar_boias_circuito(){
   if(localStorage.getItem('boias') != null){
        map.adicionar_boia_mapa(JSON.parse(localStorage.getItem('boias')))
   }
}


/**
   Programa em execução
**/


//Cliente 1
client.onMessageArrived = onMessage
client.connect(options1); //connect


renderizar_opcoes_equipes()
renderizar_equipes_selecionadas()
renderizar_equipes()
renderizar_boias_circuito()

map.mymap.on('click', function(e){
    var lat = e.latlng.lat
         var lng = e.latlng.lng

          console.log(lat, lng)
})
//Eventos

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
    location.reload()

    renderizar_boias_circuito()


})

$("#adicionar_equipes_b").click(function(){
    $("#adicionar_equipes_form").modal("show");
})

$("#adicionar_boias_b").click(function(){
    $("#adicionar_boias_form").modal("show");
})

$("#btn-cadastrar-equipes").click(function(){
    var equipes_escolhidas = $("#equipe-selecionada").val()
    localStorage.setItem("equipes_selecionadas", equipes_escolhidas.toString())
    location.reload()
    alert("Equipes adicionadas com sucesso")
})


$("#botao-remover-equipes").click(function(){
    if(localStorage.getItem("equipes_selecionadas") != null){
        localStorage.removeItem("equipes_selecionadas")
        alert("Todas as equipes foram removidas do mapa!")
        location.reload()
    }else{
        alert("Não há equipes adicionadas ainda!")
    }
})

$("#botao-remover-boias").click(function(){
    if(localStorage.getItem("boias") != null){
        localStorage.removeItem("boias")
        alert("Todas as boias foram removidas do mapa!")
        location.reload()
    }else{
        alert("Não há boias adicionadas ainda!")
    }
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

        ativar_popup_equipes(quant_segundos_total);


    }
}, 1000)