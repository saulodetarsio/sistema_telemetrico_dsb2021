import sys
import paho.mqtt.client as mqtt # importa o pacote mqtt
import threading 
import time
from datetime import datetime
import random
import csv


broker = "localhost" # define o host do broker mqtt'
port = 1883 # define a porta do broker
keppAlive = 60 # define o keepAlive da conexao
topico_medidas = 'app/medidas' # define o topico que este script assinara
topico_loc = 'app1/dados/equipe2'
periodo = 0.01
identificador_barco = 2


# funcao on_connect sera atribuida e chamada quando a conexao for iniciada
# ela printara na tela caso tudo ocorra certo durante a tentativa de conexao
# tambem ira assina o topico que foi declarado acima
def on_connect(client, userdata, flags, rc):
    client.subscribe(topico_medidas)


def gravar_linha_csv(div1, div2, div3, div4, div5, div6, lng):
    with open('dados_iffsolaris_provas78_dsb2020.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        #writer.writerow(["SN", "Name", "Contribution"])
        writer.writerow([div1, div2, div3, div4, div5, div6, lng])
    #a = f"{div1} {div2} {div3} {div4} {div5} {div6} {lng}"
    #writer.writerow([div1, div2, div3, div4, div5, div6, lng])

   

def definir_valores_da_linha(linha):

    div = linha.split(",")
    if linha == '\n':
        return "",""

    if (len(div) < 7):
        return "", "";

    lng = "0"
    if div[6] != '0':
        lng = div[6][0:len(div[6])-1]

    medidas = "["+div[0]+","+div[1]+","+div[2]+","+div[3]+","+div[4]+"]"
    localizacao = "["+str(identificador_barco)+","+div[5]+","+lng+"]"


    print(medidas, localizacao)

   # gravar_linha_csv(div[0], div[1], div[2], div[3], div[4], div[5], lng)

    return medidas, localizacao



#Ficará publicando dados aleátórios para o canal no qual está escrito, que é renderizar\
try:

    """
    with open('dados_iffsolaris_provas78_dsb2020.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        #writer.writerow(["SN", "Name", "Contribution"])
        writer.writerow(["bateria_principal", "baterias_auxilires", "placas", "corrente_motor", "velocidade", "latitude", "longitude"])

    """

    ref_arquivo = open("dados_iffsolaris_prova5_dsb2020.txt","r")

    client = mqtt.Client('publicador_{}'.format(identificador_barco)) # instancia a conexao
    client.on_connect = on_connect # define o callback do evento on_connect
    client.connect(broker, port, keppAlive) # inicia a conexao



    linha = ref_arquivo.readline()
    medidas = "[xx.x,yy.y,ww.w,zz.z,vv.v]"
    localizacao = "[-aa.aaaaaa,-bb.bbbbbb]"

    #Mandar dados aleatórios
    e = threading.Event()
    flag = True
    while not e.wait(periodo) and linha:
        medidas, localizacao = definir_valores_da_linha(linha)

        if medidas != "":
            client.publish(topico_medidas, medidas)
        if localizacao != "":
            client.publish(topico_loc, localizacao)
        
        linha = ref_arquivo.readline()


    ref_arquivo.close() 
    client.loop_forever() # a conexao mqtt entrara em loop ou seja, ficara escutando e processando todas mensagens recebidas

except KeyboardInterrupt:
    print ("\nScript finalizado.")
    #GPIO.cleanup()
    sys.exit(0)
