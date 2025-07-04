import express from 'express';
import { 
    GetCities, 
    GetCityById, 
    PostCity, 
    UpdateCity, 
    DeleteCity 
} from '../Controllers/Admin/CityControllers.js';
import { isAdmin } from '../Middleware/VerifyToken.js';

const CityRoutes = express.Router();

// Fetch all cities
CityRoutes.get('/getCities', isAdmin, GetCities);

// Fetch a specific city by ID
CityRoutes.get('/getCity/:id', isAdmin, GetCityById);

// Create a new city
CityRoutes.post('/postCity', isAdmin, PostCity);

// Update an existing city by ID
CityRoutes.put('/updateCity/:id', isAdmin, UpdateCity);

// Delete a city by ID
CityRoutes.delete('/deleteCity/:id', isAdmin, DeleteCity);

export default CityRoutes;