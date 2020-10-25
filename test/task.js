let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);


let token;


describe('Tasks API', () => {

    /**
     * Test the base url : GET method for route '/'
     */
    describe("GET /", () => {
        it("It should GET PING from server", (done) => {
            chai.request(server)
                .get("/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('status').eq('live');
                    response.body.should.have.property('time');
                    done();
                });
        })

    });

    /**
    * Test the POST route
    */
    describe("POST /api/auth/", () => {
        it("It should Create new user session", (done) => {
            const task = {
                username: "wafsefsef",
                password: "dfesfsfrds"
            };
            chai.request(server)                
                .post("/api/auth/")
                .send(task)
                .end((err, response) => {
                    
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(1);
                    response.body.should.have.property('accessToken')
                    token = response.body.accessToken;
                    done();
                });
        });

        it("It should NOT create new session : missing username", (done) => {
            const task = {
                username: "",
                password: "dfesfsfrds"
            };
            chai.request(server)                
                .post("/api/auth/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(0);
                    response.body.should.have.property('error')
                    done();
                });
        });

        it("It should NOT create new session : missing password", (done) => {
            const task = {
                username: "wafsefsef",
                password: ""
            };
            chai.request(server)                
                .post("/api/auth/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('success').eq(0);
                    response.body.should.have.property('error')
                    done();
                });
        });

    });






    describe("GET /api/user_details/", () => {
        
        
        it("It should GET user details", (done) => {
            chai.request(server)
                .get("/api/user_details/")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        })

    

        it("It should NOT get user details : as Bearer token is invalid", (done) => {
            chai.request(server)
                .get("/api/user_details/")
                .set({ Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.have.property('success').eq(0);
                    response.body.should.have.property('error')
                    done();
                });
        });

        it("It should NOT get user details : as Bearer token is empty", (done) => {
            chai.request(server)
                .get("/api/user_details/")
                .set({ Authorization: `Bearer ` })
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.have.property('success').eq(0);
                    response.body.should.have.property('error')
                    done();
                });
        });

    

    });




    /**
    * Test the POST route
    */
   describe("POST /api/create_Thumbnail/", () => {
    it("It should Create new image thumbnil", (done) => {
        const task = {
            imageurl: "https://img.etimg.com/thumb/msid-73268134,width-640,resizemode-4,imgsize-35417/surprise-heard-of-a-sony-car.jpg",
        };
        chai.request(server)                
            .post("/api/create_Thumbnail/")
            .set({ Authorization: `Bearer ${token}` })
            .send(task)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(1);
                response.body.should.have.property('thumbnil_image')
                done();
            });
    });

    it("It should NOT create new image thumbnil : wrong url", (done) => {
        const task = {
            imageurl: "com/thumb/msid-73268134,width-640,resizemode-4,imgsize-35417/surprise-heard-of-a-sony-car.jpg",
        };
        chai.request(server)                
            .post("/api/create_Thumbnail/")
            .set({ Authorization: `Bearer ${token}` })
            .send(task)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('success').eq(0);
                response.body.should.have.property('error')
                done();
            });
    });

    it("It should NOT create new image thumbnil : failed autentication", (done) => {
        const task = {
            username: "wafsefsef",
            password: ""
        };
        chai.request(server)                
            .post("/api/create_Thumbnail/")
            .set({ Authorization: `Bearer jhdsvhjsvhjhjbf` })
            .send(task)
            .end((err, response) => {
                response.should.have.status(401);
                response.body.should.have.property('success').eq(0);
                response.body.should.have.property('error')
                done();
            });
    });

});


});




