Simple API
======================

## Getting Started

# Instalação

Para poder executar esta aplicação, precisara instalar os seguintes framewords.

- [NodeJS](https://nodejs.org/)
- [Grunt](http://gruntjs.com/getting-started)

Após as instalações, baixar o projeto e entrar na pasta.

```shell
git clone https://github.com/picheli20/nodejs-simple-api.git

cd nodejs-simple-api
```

Instalar as dependencias do NodeJS

```shell
npm install
```
# Configurações

Para poder fazer as configurações (como banco de dados, etc..) você deverá alterar a pasta `config`. Lá existem 4 arquivos. Faça a alteração vendo qual ambiente é antes (por exemplo, se quiser mudar o banco da produção vc terá que abrir o arquivo production.js).

## Executando

#Desenvolvimento
Para executar a aplicação em modo de desenvolvimento é só preciso executar o seguinte comando:

```sh
$ grunt dev
``` 

#Produção
Para executar a aplicação em modo de produção é só preciso executar o seguinte comando:

```sh
$ grunt prod
``` 


#Testes
Para executar os testes da aplicação só é preciso executar o seguinte comando:

```sh
$ grunt test
``` 

