# payfast api

## Requirements
* NodeJS
* NPM

## Installation
* `npm install`
* ` create database payfast;`
* `CREATE TABLE `pagamentos` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
       `forma_de_pagamento` varchar(255) NOT NULL,
       `valor` decimal(10,2) NOT NULL,
       `moeda` varchar(3) NOT NULL,
       `status` varchar(255) NOT NULL,
       `data` DATE,
       `descricao` text,
        PRIMARY KEY (id)
       );`

## Usage
* `nodemon index.js` - to start the server

`curl http://localhost:3000/pagamentos -X POST -v -H "Content-type: application/json" -d '{
  "forma_de_pagamento" : "payfast",
  "valor" : 10,
  "moeda" : "BRL",
  "descricao" : "criando um pagamento"
}'; echo`

`curl http://localhost:3000/pagamentos -X POST -v -H "Content-type: application/json" -d @pagamento_sample.json; echo`
