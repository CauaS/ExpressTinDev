const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, resp){
        //busca user logado.
        const { user } =  req.headers;

        //busca a instancia do usuário logado no db
        const loggedDev = await Dev.findById(user);

        console.log(loggedDev.likes);
        console.log(loggedDev.dislikes);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user }}, // $ne = not equal, primeira cond.
                { _id: { $nin: loggedDev.likes }}, //$nin = not in, tds user já liked
                { _id: { $nin: loggedDev.dislikes }},
            ],
        })

        return resp.json(users);
    },

    async store(req, resp){
         const { username }= req.body;

         const userExists = await Dev.findOne({ user: username })

         if(userExists){
             return resp.json(userExists);
         }

         const response = await axios.get(`https://api.github.com/users/${username}`);

         const { name, bio, avatar_url: avatar } = response.data; 

         //cadastrando no Mongo
         const dev = await Dev.create({
            name: name,
            user: username,
            bio:bio,
            avatar
         })

        return resp.json(dev);
    }
}

//46min