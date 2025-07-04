import jwt from 'jsonwebtoken';
import USERModel from '../Model/user-schema.js';

const isAdmin = async (req, res, next) => {
    try {
        // Step 1: Get the token from the cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Step 2: Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Secret key for verification

        // Step 3: Check if the user exists
        const user = await USERModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Step 4: Check if the user is an admin
        if (decoded.role !== 'Admin') {
            return res.status(403).json({ error: 'Access denied: Admins only' });
        }

        // Step 5: Store decoded user information in the request object
        req.user = decoded;  // You can store the decoded user in the request object if needed
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};


export { isAdmin };