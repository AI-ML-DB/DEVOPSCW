// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access Denied / Unauthorized request');

    try {
        token = token.split(' ')[1]; // Remove Bearer from string
        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedUser; // Now req.user contains the decoded JWT
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

const verifyClerkRole = (req, res, next) => {
    // Assuming the roles are stored in an array within req.user.roles
    if (req.user && req.user.roles && req.user.roles.includes('clerk')) {
        next(); // User has the 'clerk' role, proceed to the next middleware
    } else {
        // User does not have the 'clerk' role, deny access
        return res.status(403).send("Access denied. Insufficient permissions.");
    }
};

module.exports = { verifyToken, verifyClerkRole };