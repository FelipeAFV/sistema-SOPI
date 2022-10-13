const {Profile} = require('./models')


const findAllProfile = async () => {
    try {
        const profiles = await Profile.findAll();
        return profiles;
    } catch (e) {
        return null;
    }
    
}

exports.findAllProfile = findAllProfile;