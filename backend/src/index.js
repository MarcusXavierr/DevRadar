const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const http = require('http');
const routes = require('./routes'); 
const { setupWebsocket } = require('./websocket');



const app = express();

const server = http.Server(app);

setupWebsocket(server);


//Conexão com o Mongoose
mongoose.connect('mongodb://omnistack:omnistack@cluster0-shard-00-00-ittpl.mongodb.net:27017,cluster0-shard-00-01-ittpl.mongodb.net:27017,cluster0-shard-00-02-ittpl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json());
app.use(routes);
//METODOS HTTP: GET, PUT, DELETE, POST

//Tipos de parametros

//Query params: request.query (Filtros, ordenação, paginação, ...) Get
//Route params: request.params (identificar um recurso na alteraçao ou remoção) Delete
//Body: request.body (Dados para a criação ou alteraçao de um registro) Post/Put 
 

server.listen(3333);