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
var ImgModel = require('../models/Img');

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

var imgType = new GraphQLObjectType({
    name: 'img',
    fields: function () {
        return{
            _id: { type: GraphQLID },
            name: { type: GraphQLString },
            url: { type: GraphQLString },
            width: { type: GraphQLInt },
            height: { type: GraphQLInt },
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
            },
            imgs: {
                type: GraphQLList(imgType),
                resolve(parent, args){
                    return ImgModel.find({logoId: parent.id})
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
            // texts: {
            //     type: new GraphQLList(textType),
            //     args: { logoId: {type: GraphQLString }}, //which logo the text located in
            //     resolve: function (root, params) {
            //         const textDetails = TextModel.find({logoId: logoId}).exec()
            //         //const textDetails = TextModel.findBy (params.id).exec()
            //         if (!textDetails) {throw new Error('Error')}
            //         return textDetails
            //     }
            // },

            // imgs: {
            //     type: imgType,
            //     args: { id: {type: GraphQLString }},
            //     resolve: function (root, params) {
            //         const imgDetails = ImgModel.findById(params.id).exec()
            //         if (!imgDetails) {throw new Error('Error')}
            //         return imgDetails
            //     }
            // },


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
            },
            text: {
                type: textType,
                args: { id: {type: GraphQLString }},
                resolve: function (root, params) {
                    const textDetails = TextModel.findById(params.id).exec()
                    if (!textDetails) {throw new Error('Error')}
                    return textDetails
                }
            },

            img: {
                type: imgType,
                args: { id: {type: GraphQLString }},
                resolve: function (root, params) {
                    const imgDetails = ImgModel.findById(params.id).exec()
                    if (!imgDetails) {throw new Error('Error')}
                    return imgDetails
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
            addImg:{
                type: imgType,
                args: {
                    name: { type: new GraphQLNonNull(GraphQLString)},
                    url: {type: new GraphQLNonNull(GraphQLString)},
                    width: { type: new GraphQLNonNull(GraphQLInt)},
                    height: { type: new GraphQLNonNull(GraphQLInt)},
                    x: { type: new GraphQLNonNull(GraphQLInt)},
                    y: { type: new GraphQLNonNull(GraphQLInt)},
                    order: { type: new GraphQLNonNull(GraphQLInt)},
                    logoId: { type: new GraphQLNonNull(GraphQLID)}
                },
                resolve: function (parent,args) {
                    const imgModel = new ImgModel(args);
                    const newImg = imgModel.save();
                    if (!newImg){throw new Error('Error');}
                    return newImg
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
                    logoName: {type: new GraphQLNonNull(GraphQLString)},
                    backgroundColor: {type: new GraphQLNonNull(GraphQLString)},
                    borderColor: {type: new GraphQLNonNull(GraphQLString)},
                    borderRadius: {type: new GraphQLNonNull(GraphQLInt)},
                    borderWidth:{type: new GraphQLNonNull(GraphQLInt)},
                    padding:{type: new GraphQLNonNull(GraphQLInt) },
                    margin:{type: new GraphQLNonNull(GraphQLInt)},
                    width:{type: new GraphQLNonNull(GraphQLInt)},
                    height:{type: new GraphQLNonNull(GraphQLInt)}
                    //x:{type: new GraphQLNonNull(GraphQLInt)},
                    //y:{type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, 
                        {
                        logoName: params.logoName, 
                        backgroundColor: params.backgroundColor,
                        borderColor: params.borderColor,
                        boarderRadius: params.boarderRadius,
                        borderWidth: params.borderWidth,
                        padding: params.padding,
                        margin: params.margin,
                        width: params.width,
                        height: params.height,                     
                        // x: params.x,
                        // y: params.y,
                        lastUpdate: new Date() }, 
                        function (err) { if (err) return (err);
                    });
                }
            },
            updateText: {
                type: textType,
                args: {
                    id: {name: 'id', type: new GraphQLNonNull(GraphQLString)},
                    text: {type: new GraphQLNonNull(GraphQLString)},
                    color: {type: new GraphQLNonNull(GraphQLString)},
                    fontSize: {type: new GraphQLNonNull(GraphQLInt)},
                    x:{type: new GraphQLNonNull(GraphQLInt)},
                    y:{type: new GraphQLNonNull(GraphQLInt)},
                    order:{type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve(root, params) {
                    return TextModel.findByIdAndUpdate(params.id, 
                        {
                        text: params.text, 
                        color: params.color,
                        fontSize: params.fontSize,
                        x: params.x,
                        y: params.y 
                        }, 
                        function (err) {if (err) return (err);}
                    );
                }
            },
            updateImg: {
                type: imgType,
                args: {
                    id: {name: 'id', type: new GraphQLNonNull(GraphQLString)},
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    url: {type: new GraphQLNonNull(GraphQLString)},
                    width: {type: new GraphQLNonNull(GraphQLInt)},
                    height: {type: new GraphQLNonNull(GraphQLInt)},
                    x:{type: new GraphQLNonNull(GraphQLInt)},
                    y:{type: new GraphQLNonNull(GraphQLInt)},
                    order:{type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve(root, params) {
                    return ImgModel.findByIdAndUpdate(params.id, 
                        {
                        name: params.name, 
                        url: params.url,
                        width: params.width,
                        height: params.height,
                        x: params.x,
                        y: params.y,
                        order: params.order
                        }, 
                        function (err) {if (err) return (err);}
                    );
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
            },
            removeImg: {
                type: imgType,
                args: {id: {type: new GraphQLNonNull(GraphQLString)}},
                resolve(root, params) {
                    const remImg = ImgModel.findByIdAndRemove(params.id).exec();
                    if (!remImg) {throw new Error('Error')}
                    return remImg;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });