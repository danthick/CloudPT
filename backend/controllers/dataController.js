const schemas = require("../schemas")

module.exports = function (app) {
    app.post("/api/weight", async function (req, res) {
        // Get user
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
        res.sendStatus(200);
    });

    app.get("/api/messages", async function(req, res){        
        var user = await getUserByEmail(req._passport.session.user);
        messages = await schemas.Message.find({$or: [{userTo: user[0].email}, {userFrom: user[0].email}]})
        
        return res.json({
            messages: messages,
            currentUser: user
        })
        
    })

    app.post("/api/messages", async function(req, res){ 
        var newMessage = new schemas.Message({
            userTo: req.body.userTo.email,
            userFrom: req.body.currentUser[0].email,
            read: false,
            text: req.body.text,
            date: new Date(),

        })
        newMessage.save();
        res.sendStatus(200);
    })

    app.post("/api/message/read", async function(req, res){
        await schemas.Message.findOneAndUpdate({_id: req.body._id}, {read: true}, {new: true, useFindAndModify: false});
        res.sendStatus(200);
    })

    // Route to return user 
    app.post("/api/user", async function(req, res){
        var user = await getUserByEmail(req.body.email)
        if (user.length != 0){
            return res.json({
                user: {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email
                }
            })
        } else {
            return res.json({
                user: { email: null }
            })
        }
    })

    // Function to get user from email
    async function getUserByEmail(email) {
        return await schemas.User.find({email: email});
    }
}