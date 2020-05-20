var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');

var LogoModel = require('../models/Logo');
var TextModel = require('../models/Text');

// const graphql = require('graphql');
// var { 
//     GraphQLSchema, 
//     GraphQLObjectType,
//     GraphQLList, 
//     GraphQLNonNull, 
//     GraphQLInputObjectType, 
//     GraphQLID, 
//     GraphQLString, 
//     GraphQLInt, 
//     GraphQLDate, 
// } = graphql;


var textType = new GraphQLObjectType({
    name: 'text',
    fields: function () {
        return{
            _id: { type: GraphQLID },
            text: { type: GraphQLString },
            color: { type: GraphQLString },
            fontSize: { type: GraphQLString },
            x: { type: GraphQLInt },
            y: { type: GraphQLInt },
            order: { type: GraphQLInt },
            logo: {
                type: logoType,
                resolve(parent, args){
                    return LogoModel.findById(parent.logoId)
                }
            }
        }
    }
})

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {type: GraphQLID},
            logoName: {type: GraphQLString},
            backgroundColor: {type: GraphQLString},
            borderColor: {type: GraphQLString},
            borderRadius: {type: GraphQLInt},
            borderWidth:{type: GraphQLInt},
            padding:{type: GraphQLInt},
            margin:{type: GraphQLInt},
            width:{type: GraphQLInt},
            height:{type: GraphQLInt},
            lastUpdate: {type: GraphQLDate},
            texts: {
                type: GraphQLList(textType),
                resolve(parent, args){
                    return TextModel.find({logoId: parent.id})
                }
            }
        }
    }
});

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
                args: { id: { name: '_id', type: GraphQLString }},
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addText:{
                type: textType,
                args: {
                    text: { type: new GraphQLNonNull(GraphQLString)},
                    color: {type: new GraphQLNonNull(GraphQLString)},
                    fontSize: { type: new GraphQLNonNull(GraphQLInt)},
                    x: { type: new GraphQLNonNull(GraphQLInt)},
                    y: { type: new GraphQLNonNull(GraphQLInt)},
                    order: { type: new GraphQLNonNull(GraphQLInt)},
                    logoId: { type: new GraphQLNonNull(GraphQLID)}
                },
                resolve: function (parent,args) {
                    const textModel = new TextModel(args);
                    const newText = textModel.save();
                    if (!newText){throw new Error('Error');}
                    return newText
                }
            },

            addLogo: {
                type: logoType,
                args: {
                    logoName: {type: new GraphQLNonNull(GraphQLString)},
                    backgroundColor: {type: new GraphQLNonNull(GraphQLString)},
                    borderColor: {type: new GraphQLNonNull(GraphQLString)},
                    borderRadius: {type: new GraphQLNonNull(GraphQLInt)},
                    borderWidth:{type: new GraphQLNonNull(GraphQLInt)},
                    padding:{type: new GraphQLNonNull(GraphQLInt)},
                    margin:{type: new GraphQLNonNull(GraphQLInt)},
                    width:{type: new GraphQLNonNull(GraphQLInt)},
                    height:{type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {throw new Error('Error');}
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
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
                    },

                    width:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },

            
                    
                    x:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    y:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }

                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, {
                        text: params.text, 
                        color: params.color,
                        fontSize: params.fontSize, 
                        backgroundColor: params.backgroundColor,
                        borderColor: params.borderColor,

                        boarderRadius: params.boarderRadius,
                        borderWidth: params.borderWidth,
                        padding: params.padding,
                        margin: params.margin,

                        width: params.width,
                      
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
                    if (!remLogo) {throw new Error('Error')}
                    return remLogo;
                }
                //@todo need to remove the texts and images that comes with the logo

            },
            removeText: {
                type: textType,
                args: {id: {type: new GraphQLNonNull(GraphQLString)}},
                resolve(root, params) {
                    const remText = TextModel.findByIdAndRemove(params.id).exec();
                    if (!remText) {throw new Error('Error')}
                    return remText;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });