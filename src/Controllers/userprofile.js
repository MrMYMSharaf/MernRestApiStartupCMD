import CityModel from '../../Model/city-schema.js';

// Get all cities
const GetCities = async (req, res) => {
    try {
        const cities = await CityModel.find().populate('district province');
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a specific city by ID
const GetCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await CityModel.findById(id).populate('district province');
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        console.error('Error fetching city:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create a new city
const PostCity = async (req, res) => {
    try {
        const { name, code, district, province, population, status } = req.body;
        const newCity = new CityModel({ name, code, district, province, population, status });
        const savedCity = await newCity.save();
        res.status(201).json({
            message: 'City created successfully',
            data: savedCity,
        });
    } catch (error) {
        console.error('Error creating city:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update an existing city by ID
const UpdateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, code, district, province, population, status } = req.body;
        const updatedCity = await CityModel.findByIdAndUpdate(
            id,
            { name, code, district, province, population, status },
            { new: true } // Return the updated document
        );
        if (!updatedCity) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json({
            message: 'City updated successfully',
            data: updatedCity,
        });
    } catch (error) {
        console.error('Error updating city:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a city by ID
const DeleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCity = await CityModel.findByIdAndDelete(id);
        if (!deletedCity) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        console.error('Error deleting city:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { 
    GetCities, 
    GetCityById, 
    PostCity, 
    UpdateCity, 
    DeleteCity 
}