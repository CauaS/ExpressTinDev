const Dev = require('../models/Dev');

module.exports = {
    async store(req, resp ) {
        //dev que recebe o like
        const { devId } = req.params;
        //deve que da o like
        const { user } = req.headers;

        //buscando as duas entidades, models deles no BD
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return resp.status(400).json({ erro: 'Dev does not exist!' });
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('deu match!');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return resp.json(loggedDev)

    }
};

//1hr e 4min