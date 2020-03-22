const schemas = require("../schemas")

module.exports = function (app) {
    app.post("/api/weight", async function (req, res) {
        // Get user
        console.log(req.body)
        var user = await getUserByEmail(req._passport.session.user);
        var newWeight = new schemas.Weight({
            email: user[0].email,
            weight: req.body.weight,
            date: req.body.date
        });
        newWeight.save();
    })

    app.get("/api/weight/", async function(req, res){
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        // Get all weights
        var weights = await schemas.Weight.find({
            email: user[0].email
        })
        return res.json({
            weights: weights
        })
    });

    app.delete("/api/weight/:id", async function(req, res){
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        // Get all weights
        var weights = await schemas.Weight.deleteOne({
            _id: req.params.id,
            email: user[0].email
        })
        
    });

    app.get("/api/height/", async function(req, res){
        // Get user
        var user = await getUserByEmail(req._passport.session.user);
        return res.json({
            height: user[0].height
        })
    });

    app.post("/api/height", async function(req, res){
        // Add or update height to user
        await schemas.User.findOneAndUpdate({email: req._passport.session.user}, {height: req.body.height}, {new: true, useFindAndModify: false});
    });

    app.get("/api/messages", async function(req, res){        
        var user = await getUserByEmail(req._passport.session.user);
        messages = await schemas.Message.find({userTo: "req.body.userTo"})
        
        return res.json({
            messages: messages,
            currentUser: user
        })
        
    })

    app.post("/api/messages", async function(req, res){        
        // Get user
        console.log(req.body)
        var user = await getUserByEmail(req._passport.session.user);
        var newMessage = new schemas.Message({
            userTo: req.body.lastMessage.userTo,
            userFrom: req.body.currentUser[0].email,
            text: req.body.text,
            date: new Date(),
        })
        newMessage.save();
        
    })

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({
            email: email
        });
    }
}