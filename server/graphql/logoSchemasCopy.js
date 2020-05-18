var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/LogoCopy'); //CHANGE BACK TO LOGO!!

var textType = new GraphQLObjectType({
    name: 'text',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            //ADD ON
            x:{
                type: GraphQLInt
            },
            y:{
                type: GraphQLInt
            },
            order:{
                type: GraphQLInt
            }
        }
    }
});

var imgType = new GraphQLObjectType({
    name: 'img',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            width:{
                type: GraphQLInt
            },
            height:{
                type: GraphQLInt
            },
            x:{
                type: GraphQLInt
            },
            y:{
                type: GraphQLInt
            },
            order:{
                type: GraphQLInt
            }
        }
    }
});

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            logoName: {
                type: GraphQLString
            },
            texts: {
                type: new GraphQLList(textType)
            },
            imgs: {
                type: new GraphQLList(imgType)
            },

            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth:{
                type: GraphQLInt
            },
            padding:{
                type: GraphQLInt
            },
            margin:{
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var userType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            username: {
                type: GraphQLString
            },
            firstname: {
                type: GraphQLString
            },
            lastname: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            logos: {
                type: new GraphQLList(logoType)
            }
        }
    }
})

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            texts: {
                type: new GraphQLList(textType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            }
        }
    }
});

var textInputType = new GraphQLInputObjectType({
    name: 'textInput',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            x:{
                type: GraphQLInt
            },
            y:{
                type: GraphQLInt
            },
            order:{
                type: GraphQLInt
            }
        }
    }
});

var imgInputType = new GraphQLInputObjectType({
    name: 'imgInput',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            width:{
                type: GraphQLInt
            },
            height:{
                type: GraphQLInt
            },
            x:{
                type: GraphQLInt
            },
            y:{
                type: GraphQLInt
            },
            order:{
                type: GraphQLInt
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    logoName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    texts: {
                        type: new GraphQLNonNull(new GraphQLList(textInputType))
                    },
                    imgs: {
                        type: new GraphQLNonNull(new GraphQLList(imgInputType))
                    },
                    
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },

                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            addText: {
                type: textType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    x:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    y:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    order:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newText = logoModel.save();
                    if (!newText) {
                        throw new Error('Error');
                    }
                    return newText
                }
            },


            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logoName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                   
                    texts: {
                        type: new GraphQLList(textInputType)
                    },
                    imgs: {
                        type: new GraphQLList(imgInputType)
                    },

                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },

                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, {
                        logoName: params.logoName, 
                        backgroundColor: params.backgroundColor,
                        borderColor: params.borderColor,

                        boarderRadius: params.boarderRadius,
                        borderWidth: params.borderWidth,
                        padding: params.padding,
                        margin: params.margin,

                        x: params.x,
                        y: params.y,

                        lastUpdate: new Date() }, function (err) {
                            if (err) return (err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });