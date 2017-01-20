import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import Db from './db';

const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve (user) {
                    return user.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve (user) {
                    return user.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve (user) {
                    return user.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve (user) {
                    return user.email;
                }
            },
            status:{
                type:GraphQLInt,
                resolve(user){
                    return user.status;
                }
            }
        };
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
        return {
            user: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve (root, args) {
                    return Db.models.user.findAll({where: args});
                }
            }
        };
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields () {
        return {
            addPerson: {
                type: User,
                args: {
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve (source, args) {
                    return Db.models.user.create({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email.toLowerCase()
                    });
                }
            }
        };
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;
