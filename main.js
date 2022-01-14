require('dotenv').config();
const AWS = require('aws-sdk');
const Hapi = require('@hapi/hapi');

'use strict';


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

// Configure client for use with Spaces
const spacesEndpoint = new AWS.Endpoint(process.env.DO_ENDPOINT);
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_KEY_ACCESS,
    secretAccessKey: process.env.DO_SECRET
});

// Add a file to a Space
var params = {
    Bucket: "arae",
};

s3.getObject(params,(error, data) => {
    if(error){
        throw error;
    }
    console.dir(data);
})

s3.listObjects(params,(error, data) => {
    if(error){
        throw error;
    }
    console.dir(data);
});


/*
s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
});
 */