const {getUsers, getUserById, createUsers} = require('./dynamo');
const dataCourse = new Date();

module.exports = {
    Query: {
        users: () =>  getUsers(),
        user: (_, {id}) => getUserById(id),
    },
    Mutation: {
        createUser: (_, {name, email, course, dataCourse}) => createUsers({name, email, course, dataCourse})
    }
};