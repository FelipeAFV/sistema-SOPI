const { Profile } = require("./models")

const findAllPermisionFromProfileId = async (profileId) => {
    const profile = await Profile.findOne({where: { id: profileId}});
    const permissions = await profile.getPermissions();
    return permissions;

} 

exports.findAllPermisionFromProfileId = findAllPermisionFromProfileId; 