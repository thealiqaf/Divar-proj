const City = require('../models/city');

exports.createCity = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            console.log('Name of city is required');
            return res.status(400).json({
                message: 'Name of city is required'
            });
        }
        const city = new City( { name } );
        await city.save();

        console.log('City created');
        res.status(201).json({
            message: 'City created'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });
    }
};

exports.getCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};

exports.getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            console.log('City not found');
            return res.status(404).json({
                message: 'City not found'
            });
        }
        res.status(200).json(city);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: err
        });
    }
};