Simple API
======================

A aplicação foi feita utilizando o seguite Yeoman gerador: [Generator-Mvp](https://github.com/lykmapipo/generator-mvp)

## Instalação

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
## Configurações

Para poder fazer as configurações (como banco de dados, etc..) você deverá alterar a pasta `config`. Lá existem 4 arquivos. Faça a alteração vendo qual ambiente é antes (por exemplo, se quiser mudar o banco da produção vc terá que abrir o arquivo production.js).

# Executando

##Desenvolvimento
Para executar a aplicação em modo de desenvolvimento é só preciso executar o seguinte comando:

```sh
$ grunt dev
``` 

##Produção
Para executar a aplicação em modo de produção é só preciso executar o seguinte comando:

```sh
$ grunt prod
``` 


##Testes
Para executar os testes da aplicação só é preciso executar o seguinte comando:

```sh
$ grunt test
``` 


# Serviços

Após executar a aplicação no modo desejado você terá 3 serviçoes disponíveis.

## [url]/signin

Este end-point cria um usuário. Ele recebe o seguinte objeto:

```json
{
    "nome" : "String",
    "email" : "String",
    "senha" : "String",
    "telefones" : [
        {
            "numero": Number,
            "ddd" : Number
        }  
    ]
}
``` 
Caso o usuário seja criado com sucesso, irá retornar o seguinte objeto criado com código 200:

``` json
{
  "id": "String",
  "data_criacao": "Date",
  "data_atualizacao": "Date",
  "ultimo_login": "Date",
  "token": "String",
  "email": "String"
}

``` 

## [url]/signup

Este end-point faz o login de um usuário no sistema. Ele recebe o seguinte objeto:

```json
{
    "email" : "String",
    "senha" : "String"
}
``` 

Caso o email exista e a senha seja valida, irá retornar o usuário com código 200:

``` json
{
  "id": "String",
  "data_criacao": "Date",
  "data_atualizacao": "Date",
  "ultimo_login": "Date",
  "token": "String",
  "email": "String"
}

``` 

## [url]/users?page=[page_number]

Este end-point mostra a lista de todos os usuários listado no sistema. Ele o header Authorization com o seguinte valor: Bearer [código do token]


Caso o token seja válido, irá retornar um objeto com a lista de objetos e o código 200:

``` json
{
  "users": [
    [user object]
  ],
  "pages": Number,
  "count": Number
}

``` 

