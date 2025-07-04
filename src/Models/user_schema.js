import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Ensures the city name is always provided
    },
    code: {
      type: String,
      required: true, // Ensures the city code is always provided
      unique: true, // Ensures each city code is unique
    },
    district: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the District model
      ref: 'District',
      required: true, // Ensures a district must be associated with the city
    },
    province: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Province model
      ref: 'Province',
      required: true, // Ensures a province must be associated with the city
    },
    population: {
      type: Number,
      required: true, // Population of the city
    },
    status: {
      type: String,
      enum: ['active', 'inactive'], // Only allows "active" or "inactive" values
      default: 'active', // Default value if not provided
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

const CityModel = mongoose.model('City', CitySchema);

export default CityModel;