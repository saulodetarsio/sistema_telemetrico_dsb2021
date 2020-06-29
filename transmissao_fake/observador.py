import sys
import paho.mqtt.client as mqtt

import threading 
import time
from datetime import datetime

broker = "localhost" # define o host do broker mqtt'
port = 1883 # define a porta do broker
keppAlive = 60 # define o keepAlive da conexao

eq_1 = 'app1/dados/equipe1' # define o topico que este script assinara
eq_2 = 'app1/dados/equipe2' # define o topico que este script assinara
eq_3 = 'app1/dados/equipe3'
eq_4 = 'app1/dados/equipe4'

topics = 'app1/dados/#'
# funcao on_connect sera atribuida e chamada quando a conexao for iniciada
# ela printara na tela caso tudo ocorra certo durante a tentativa de conexao
# tambem ira assina o topico que foi declarado acima
def on_connect(client, userdata, flags, rc):
    print("[STATUS] Conectado ao Broker. Resultado de conexao: "+str(rc))
    client.subscribe(topics)
   # client.subscribe(eq_2)
   # client.subscribe(eq_3)
   # client.subscribe(eq_4)

# possui o mesmo cenario que o on_connect, porem, ela sera atrelada ao loop
# do script, pois toda vez que receber uma nova mensagem do topico assinado, ela sera invocada
def on_message(client, userdata, msg):
    message = str(msg.payload) # converte a mensagem recebida
    print("Recebendo do BROKER: ", message)

try:

    client = mqtt.Client() # instancia a conexao
    client.on_connect = on_connect # define o callback do evento on_connect
    client.on_message = on_message # define o callback do evento on_message
    client.connect(broker, port, keppAlive) # inicia a conexao
    client.loop_forever() # a conexao mqtt entrara em loop ou seja, ficara escutando e processando todas mensagens recebidas

except KeyboardInterrupt:
    print ("\nScript finalizado.")
    #GPIO.cleanup()
    sys.exit(0)
