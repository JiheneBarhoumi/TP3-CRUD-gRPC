const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync("users.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.userPackage;

const server = new grpc.Server();
const { v4: uuidv4 } = require("uuid");

const users=[{
    id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
    name: "John Bolton",
    age: 23,
    address: "Address 1"
},
{
    id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
    name: "Mary Anne",
    age: 45,
    address: "Address 2"
}];

server.bind('localhost:9000', grpc.ServerCredentials.createInsecure());
server.addService(userPackage.UserService.service,
    {
        'GetAll' : GetAll,
        'Get' :Get,
        'Create':Create,
        'Update':Update,
        'Delete':Delete
    });

    server.start();

    //GET ALL USERS
    function GetAll(call, callback) {

        callback(null,{
            'users':users
       });
    }

    //GET USER BY ID
    function Get(call, callback) {

        let user = users.find(user => user.id == call.request.id);

        if (user) {
            callback(null, user);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "User Not found"
            });
        }
    }

    //CREATE USER
    function Create (call, callback) {
        let user = call.request;
        
        user.id = uuidv4();
        users.push(user);
        callback(null, user);
    }

    //UPDATE USER
    function Update (call, callback) {
        let userToUpdate = users.find(user => user.id == call.request.id);

        if (userToUpdate) {
            userToUpdate.name = call.request.name;
            userToUpdate.age = call.request.age;
            userToUpdate.address = call.request.address;
            callback(null, userToUpdate);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "User Not found"
            });
        }
    }

    //DELETE USER
    function Delete (call, callback)  {

        let userToDeleteID = users.findIndex(
            user => user.id == call.request.id
        );

        if (userToDeleteID != -1) {
            users.splice(userToDeleteID, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "User Not found"
            });
        }
    }



