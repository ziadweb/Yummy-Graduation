const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.get("Authorization").split(" ")[1];

        let decoded = jwt.verify(token, process.env.secret);
        // console.log(decoded);

        req.role = decoded.role;
        req.id = decoded.id;
        req.orders = decoded.orders;
        next();
    }
    catch (error) {
        error.message = "You are not authorized to access this resource."
        error.status = 403;
        next(error);
    }
}