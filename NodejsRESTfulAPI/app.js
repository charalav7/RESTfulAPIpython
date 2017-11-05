const Hapi = require("hapi");
const Joi = require("joi");

const server = new Hapi.Server();

server.connection({ 
	"host": "localhost", 
	"port": 3000 
});

server.start(error => {
    if(error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
});

server.route({
    method: "GET",
    path: "/",
    handler: (request, response) => {
        response("Hello Nodejs RESTful API!");
    }
});

server.route({
    method: "GET",
    path: "/user/{username}",
    handler: (request, response) => {
        var userMock = {};
        if (request.params.username == "billakos") {
            userMock = {
                "username": "billakos",
                "password": "12345"
            }
        }
        response(userMock);
    }
});

server.route({
    method: "POST",
    path: "/user",
    config: {
        validate: {
            payload: {
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: (request, response) => {
        response(request.payload);
    }
});

server.route({
    method: "PUT",
    path: "/user/{username}",
    config: {
        validate: {
            payload: {
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            },
            params: {
                username: Joi.string().required()
            },
            query: {
                alert: Joi.boolean().default(false)
            }
        }
    },
    handler: (request, response) => {
        response(request.payload);
    }
});