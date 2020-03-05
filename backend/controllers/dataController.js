const schemas = require("../schemas")

module.exports = function (app) {
    app.post("/api/weight", async function (req, res) {
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        console.log(user);
        var newWeight = new schemas.Weight({
            email: user[0].email,
            weight: req.body.weight,
            date: req.body.date
        })
        newWeight.save();
    })
}