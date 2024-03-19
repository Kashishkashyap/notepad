const jwt = require('jsonwebtoken');

const JWT_SECRET = "SecurePassword";

const fetchUser = async (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        res.status(401).send({ error: "Invalid Token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid Token" })
    }

}

module.exports = fetchUser;