const axios = require('axios');

const Dev = require('../models/Dev'); 

const parseStringASArray = require ('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket')
 
//index , show , store ,update, destroy

module.exports = {

async index(request, response){
    const devs = await Dev.find();

    return response.json(devs);
},

 async store(request, response) {

        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});


        if(!dev){//Consertar esse erro
                
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const {name = login,avatar_url,bio} = apiResponse.data
    
        const techArray = parseStringASArray(techs);
    
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude]

        }

        if(name==null){
            name = github_username
        }
    
         dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techArray,
            location
        }) 

        const sendSocketMessageTo = findConnections(
            {latitude, longitude},
            techArray
        ); 

        sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }


        //Filtrar as conexões que estão a no maximo 10 km de distancia e que o deve possua
        //ao menos umas das tecnologias filtradas

    
        return response.json(dev);
    }
}