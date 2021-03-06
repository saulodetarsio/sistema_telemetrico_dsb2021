# Sistema telemétrico DSB 2021 - Tela de acompanhamento

Esse projeto consiste na elaboração de um sistema telemétrico que auxiliará o acompanhamento das
embarcações ao longo das provas do Desafio Solar Brasil edição 2021. 

Essa parte em específico consiste na implementação da tela que exibirá as informações coletadas pelos
sensores utilizados no projeto. Os códigos e os passos para configurar e executar essa parte do sistema telemétrico encontram-se neste
repositório.

## Pré-requisistos
* Sistema operacional Linux;
* Ter o python3 instalado na máquina;
* No momento, a aplicação precisa ter acesso à internet para baixar
bibliotecas css e javascript.


## Instalando as depedências
1. Abra o terminal e execute o seguinte comando:
    * sudo apt-get update
    
2. Ainda com o terminal aberto, instale as seguintes dependências:

    * sudo apt-get install build-essential quilt python-setuptools
    * sudo apt-get install libssl-dev
    * sudo apt-get install cmake
    * sudo apt-get install libc-ares-dev
    * sudo apt-get install uuid-dev
    * sudo apt-get install daemon
    * sudo apt-get install libwebsockets-dev
    * sudo apt-get install python3-venv
    * sudo apt-get install python3-pip

## Instalando e utilizando as bibliotecas necessárias

1. Com o terminal aberto na pasta raiz do projeto, crie um ambiente virtual 
com o seguinte comando:
    * python3 -m venv libs

2. Ative o ambiente virtual com o seguinte comando:
    * source libs/bin/activate
    
3. Instale todas as bibliotecas necessárias com o seguinte comando:
    * pip3 install -r requirements.txt

4. Logo após a instalação das bibliotecas necessárias, feche o terminal.

## Instale o servidor mosquitto

1. Instale o servidor mosquitto na máquina:
    * sudo apt-get install mosquitto

2. Verifique o status do servidor mosquitto com o seguinte comando:
    * sudo systemctl status mosquitto
    
## Connfigurando o servidor mosquitto

1. Com um navegador de sua preferências, baixe o código fonte do mosquitto 
com o seguinte link:
    
    * http://mosquitto.org/files/source/mosquitto-1.4.10.tar.gz

2. Faça a extração do arquivo baixado em um diretórioa de sua preferência

3. Entre na pasta mosquitto-1.4.10/ que foi extraida e execute o seguinte
comando para editar o arquivo config.mk

    * sudo nano config.mk

4. Altere o valor do parâmetro WITH_WEBSOCKETS para 'yes'
    * WITH_WEBSOCKETS:=yes
    
5. Salve e feche arquivo

## Build mosquitto

Com o terminal aberto na pasta mosquitto-1.4.10/, execute os 
seguintes comandos:
* make
* sudo make install 
* sudo cp mosquitto.conf /etc/mosquitto
    
## Configurando portas no servidor mosquitto:
1. Com o terminal, navegue até a pasta /etc/mosquitto

2. Abra o arquivo mosquitto.conf com o seguinte comando:
    * sudo nano mosquitto.conf

3. Adicione os seguintes valores na seção "Default Listener" do arquivo:

    * port 1883
    * listener 9001
    * protocol websockets

4. Salve e feche o arquivo


## Execute o servidor mosquitto
1. Finalize a execução do servidor mosquitto com o seguinte comando:
    * sudo systemctl stop mosquitto
    
2. Verifique o status do servidor com o seguinte comando:
    * sudo systemctl status mosquitto
   
3. Inicialize o servidor mosquitto com o seguinte comando:
    * mosquitto -c /etc/mosquitto/mosquitto.conf
    
## Abrindo a aplicação
1. Na pasta raiz da aplicação, ative o ambiente virtual criado nos passos anteriores
com o seguinte comando:
    * source libs/bin/activate
    
2. Na pasta transmissão_fake, dentro da pasta raiz do projeto,
 encontram-se os scripts que simulam a transmissão que deve ser realizada 
 por uma embarcação. Navegue até essa pasta com o terminal e ambiente 
 virtual ativado e execute um dos scripts com o seguinte comando:
 
    * python3 equipe_1.py

3. Vá até a pasta 'page', localizada dentro da pasta raiz, e com o navegador, abra o arquivo mapa.html

3. No menu "Ferramentas de Densenvolvedor" do browser, na aba "Console", você verá os dados que estão
sendo transmitidos pelo script.

4. Você verá também que a localização de ums dos barcos está sendo atualizada no mapa.

5. Se você quiser atualizar a localização de mais barcos, abra outro terminal e execute os scripts em python
que estão na pasta transmissão fake.
      * python3 equipe_2.py
      * python3 equipe_3.py
      * ...
      * python3 equipe_7.py
