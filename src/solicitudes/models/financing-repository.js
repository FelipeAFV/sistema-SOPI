const { Financing } = require("./models");

const findAllFinancing = async () => {
    
    try {
        const financing = await Financing.findAll();
        return financing;

    } catch (e) {
        return null;
    }
}

exports.findAllFinancing = findAllFinancing;