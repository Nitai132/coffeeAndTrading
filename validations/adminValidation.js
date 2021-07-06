

//ולידציה שהמשתמש הוא אדמין
const adminValidation = (req, res, next) => {
    const { isAdmin } = req.user;
    if (isAdmin == 1) {
        next();
    } else {
        res.sendStauts(401);
    };
};

module.exports = {
    adminValidation
}