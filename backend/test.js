// Import the libraries for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('./server');
var requestp = require("supertest-as-promised");

// Configure chai and server
chai.use(chaiHttp);
chai.should();
var agent = chai.request.agent(app);

// Creating test user
var user = {
    firstName: "Test",
    lastName: "User",
    email: "test@user.com",
    password: "test"
};

 // Testing authentication functions
describe("Authentication", () => {
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

describe("Data", () => {
    describe("Add a weight", () => {
        it("should add a weight for the current user", (done) => {
            agent
                .post("/api/weight")
                .type('form')
                .send({
                    weight: 60,
                    date: new Date()
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    var weight;
    describe("Get a weight", () => {
        it("should get all weights for the current user", (done) => {
            agent
                .post("/api/weight/user")
                .type('form')
                .end((err, res) => {
                    weight = res.body.weights[0]
                    chai.assert.equal(60, res.body.weights[0].weight)
                    done();
                });
        });
    });
    describe("Delete a weight", () => {
        it("should delete a specific weight for the current user", (done) => {
            agent
                .delete("/api/weight/" + weight._id)
                .type('form')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Add a height", () => {
        it("should add a height for the current user", (done) => {
            agent
                .post("/api/height/")
                .type('form')
                .send({
                    height: 180,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe("Get a height", () => {
        it("should get the height for the current user", (done) => {
            agent
                .get("/api/height/")
                .type('form')
                .end((err, res) => {
                    chai.assert.equal(180, res.body.height)
                    done();
                });
        });
    });
    describe("Create a Relationship", () => {
        it("should create a new relationship with another user", (done) => {
            agent
                .post("/api/user/relationship")
                .type('form')
                .send({
                    email: "jack.naughton@gmail.com",
                })
                .end((err, res) => {
                    chai.assert.equal("true", res.body.success)
                    done();
                });
        });
    });
    describe("Remove a Relationship", () => {
        it("should remove a relationship with another user", (done) => {
            agent
                .delete("/api/user/relationship")
                .type('form')
                .send({
                    email: "jack.naughton@gmail.com",
                })
                .end((err, res) => {
                    chai.assert.equal("true", res.body.success)
                    done();
                });
        });
    });
});


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