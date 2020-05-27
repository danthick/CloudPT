// Import the libraries for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./server');
var requestp = require("supertest-as-promised");

// Configure chai and server
chai.use(chaiHttp);
chai.should();
var agent = chai.request.agent(app);

// Creating test item and user
var user = {
    firstName: "Test",
    lastName: "User",
    email: "test@user.com",
    password: "test"
};

 // Testing user functions. Registering, and logging in.
describe("Users", () => {
    describe("Register User", () => {
        it("should register a new user", (done) => {
            agent
                .post("/api/register")
                .type('form')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Incorrect Password", () => {
        it("should fail to log test user in due to incorrect password", (done) => {
            agent
                .post('/api/login')
                .type('form')
                .send({
                    email: user.email,
                    password: "wrong"
                })
                .end((err, res) => {
                    chai.assert.equal(false, res.body.auth)
                    done();
                });
        });
    });
    describe("Incorrect Email", () => {
        it("should fail to log test user in due to incorrect email", (done) => {
            agent
                .post('/api/login')
                .type('form')
                .send({
                    email: "wrong@wrongemail.com",
                    password: user.password
                })
                .end((err, res) => {
                    chai.assert.equal(false, res.body.auth)
                    done();
                });
        });
    });
    describe("Log User In", () => {
        it("should log test user in successfully", (done) => {
            agent
                
                .post('/api/login')
                .set('content-type', 'application/json', "access-control", true)
                .send(JSON.stringify({
                    email: user.email,
                    password: user.password
                }))
                .end((err, res) => {
                    chai.assert.equal(true, res.body.auth)
                    done();
                });
        });
    });
});


// // Testing item functions. Adding, editing and deleting items.
// describe("Items", () => {
//     describe("Get To Do List", () => {
//         it("should get all user to do item", (done) => {
//             agent
//                 .get('/todo')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     done();
//                 });
//         });
//     });
//     describe("Add Item", () => {
//         it("should add an item to test users to do list", (done) => {
//             agent
//                 .post("/todo")
//                 .type('form')
//                 .send({
//                     item: testItem.item
//                 })
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     done();
//                 });
//         });
//     });
//     describe("Edit Item", () => {
//         it("should edit an items name", (done) => {
//             agent
//                 .put("/todo/" + testItem.item)
//                 .type('form')
//                 .send({
//                     old: testItem.item,
//                     new: "Updated"
//                 })
//                 .end()
//                 .then(function (err, res) {
//                     done()
//                 })
//                 .catch(function (err) {
//                     done(err);
//                 })
//         })
//     });
//     describe("Delete Item", () => {
//         it("should delete an item", (done) => {
//             agent
//                 .delete("/todo/" + "Updated")
//                 .type('form')
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     done();
//                 });
//         })
//     });
// });

// Testing deleting a user
describe("Delete User", () => {
    it("should delete an existing user", (done) => {
        agent
            .delete("/api/register")
            .type('form')
            .set('content-type', 'application/json', "access-control", true, "access-control-allow-credentials", true)
            .withCredentials(true)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});