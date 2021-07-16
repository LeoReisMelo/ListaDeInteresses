const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: 'http://localhost:4000'
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_USERS = 'users';

const getUsers = async() => {
    const params = {
        TableName: TABLE_USERS
    };
    const users = await dynamoClient.scan(params).promise();

    if(users){
        return users;
    }

    return [];
}

const getUserById = async(id) =>{
    const params = {
        TableName: TABLE_USERS,
        Key: {
            id
        }
    };

    return await dynamoClient.get(params).promise();
}

const createUsers = async(user) => {
    const params = {
        TableName: TABLE_USERS,
        Item: user
    };

    return await dynamoClient.put(params).promise();
}


module.exports = {
    dynamoClient,
    getUsers,
    getUserById,
    createUsers
}