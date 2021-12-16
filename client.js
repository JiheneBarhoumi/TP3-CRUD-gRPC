const grpc=require('grpc');
const protoLoader= require('@grpc/proto-loader');
const packageDef=protoLoader.loadSync("users.proto",{});
const grpcObject=grpc.loadPackageDefinition(packageDef);
const userPackage=grpcObject.userPackage


const client=new userPackage.UserService('localhost:9000',grpc.credentials.createInsecure());
const { v4: uuidv4 } = require("uuid");

//GET ALL USERS
client.GetAll({},(err,response)=>{ 
    console.log('GET ALL USERS : Received from server '+JSON.stringify(response));
})

//GET USER
client.Get({
    'id': "a68b823c-7ca6-44bc-b721-fb4d5312cafc"
},(err,response)=>{ 
    console.log('GET USER : Received from server '+JSON.stringify(response));
})

//CREATE USER
client.Create({
    'id': uuidv4(),
    name: "Jihen Barhoumi",
    age: 25,
    address: "Address 3"
},(err,response)=>{ 
    console.log('CREATE USER : Received from server '+JSON.stringify(response));
})

//UPDATE USER
client.Update({
    id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
    name: "Houda",
    age: 25,
    address: "Address 14"
},(err,response)=>{ 
    console.log('UPDATE USER : Received from server '+JSON.stringify(response));
})

//DELETE USER
client.Delete({
    id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
},(err,response)=>{ 
    console.log('DELETE USER : Received from server '+JSON.stringify(response));
})