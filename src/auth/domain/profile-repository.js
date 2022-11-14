const {Profile, User} = require('./models')


const findAllProfile = async () => {
    try {
        const profiles = await Profile.findAll();
        return profiles;
    } catch (e) {
        return null;
    }
    
}

const findProfileFromUser = async (userId) => {
    return await Profile.findOne({ include: [{model: User, where: { id: userId}}]});
} 

exports.findAllProfile = findAllProfile;
exports.findProfileFromUser = findProfileFromUser;