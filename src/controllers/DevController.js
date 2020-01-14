const axios = require('axios');
const Dev = require('../models/Dev');
const parseString = require('../utils/parseStringAsArray');
exports.index = async (req, res, next) => {
    const data = await Dev.find();
    res.json(data);
}
exports.search = async (req, res, next) => {

    const { techs, latitude, longitude } = req.query;
    const techsArray = parseString.parseStringAsArray(techs);
    const devs = await Dev.find({
        techs: {
            $in: techsArray,
        },

    })
    res.json(devs);
}

// location: {
//     $near: {
//         $geometry: {
//             type: 'Point',
//             coordinates: [longitude, latitude],
//         },
//         $maxDistance: 10000
//     }
// }
exports.store = async (req, res, next) => {
    const { github_username, techs, latitude, longitude } = req.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
        const techsArray = parseString.parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio } = apiResponse.data;
        console.log(name, avatar_url, bio);
        dev = await Dev.create({
            name,
            github_username,
            bio,
            avatar_url,
            techs: techsArray,
            location
        });
    }



    return res.json(dev);
}

exports.update = async (req, res, next) => {
    console.log(req.params.id)
    res.json(req.params.id);
}

exports.delete = async (req, res, next) => {
    await Dev.findByIdAndDelete(req.params.id);
    res.send('Já elvis');
}