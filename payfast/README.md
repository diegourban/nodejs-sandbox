# payfast api

## Requirements
* NodeJS
* NPM
* Memcached

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

`curl -X POST http://localhost:3000/pagamentos -v -H "Content-type: application/json" -d '{
  "forma_de_pagamento" : "payfast",
  "valor" : 10,
  "moeda" : "BRL",
  "descricao" : "criando um pagamento"
}'; echo`

`curl -X POST http://localhost:3000/pagamentos -v -H "Content-type: application/json" -d @files/pagamento.json; echo`

`curl -X POST http://localhost:3000/pagamentos -v -H "Content-type: application/json" -d @files/pagamentocartao.json; echo`

`curl -X PUT http://localhost:3000/pagamentos/2 -v`

`curl -X DELETE http://localhost:3000/pagamentos/3 -v`

`curl -X POST http://localhost:3000/correios/calculo-prazo -H "Content-type: application/json" -d @files/dados-entrega.json`

`node util/fileReader.js` - to read and write a file from using a buffer

`node util/streamFileReader.js` - to read and write a file from using stream

`curl -X POST http://localhost:3000/upload/imagem --data-binary @files/image.jpg -H "Content-type: application/octet-stream" -H "filename: image.jpg" -v`

`curl -v http://localhost:3000/pagamentos/1`;

`node cluster.js` - to start slave apps
