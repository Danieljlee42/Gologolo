import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Link } from 'react-router-dom';

import EditText from './EditText.js'
import EditImg from './EditImg.js'

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            logoName
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            width
            height
            texts{
                _id
                order
            }
            imgs{
                _id
                order
            }
            lastUpdate
        }
    }
`;

const ADD_TEXT = gql`
    mutation AddText(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $x: Int!,
        $y: Int!,
        $order: Int!,
        $logoId: ID!
        ) {
        addText(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            x: $x,
            y: $y,
            order: $order,
            logoId: $logoId
            ) {
            _id
        }
    }
`;

const ADD_IMG = gql`
    mutation AddImg(
        $name: String!,
        $url: String!,
        $width: Int!,
        $height: Int!,
        $x: Int!,
        $y: Int!,
        $order: Int!,
        $logoId: String!
        ) {
        addLogo(
            name: $name,
            url: $url,
            width: $width,
            height: $height,
            x: $x,
            y: $y,
            order: $order,
            logoId: $logoId
            ) {
            _id
        }
    }
`;

class ModifyTextImgScreen extends Component {

    constructor(props) {
        super(props);

        this.state={
            save: false
        }


    }
    handleSave = () => {
        console.log("SAVE");
        this.setState({save: true});
    }

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default" style={{backgroundColor: "lightyellow"}}>
                                <div className="panel-heading">
                                    <div style = {{background: "skyblue", padding: 12}}>
                                        <h4><Link to="/">
                                            <div style={{fontFamily: 'Lexend Exa', fontSize: 34, color: 'black'}}>GoLogoLo Home</div>
                                        </Link></h4>
                                    </div>
                                </div>
                                <div className = "col">
                                    <div className="row" >
                                        <div className = "col-4" style={{backgroundColor: "#cdf5c7"}}> 
                                            <div style={{padding: 10}}>
                                                <h3 className="panel-title" style = {{fontSize: '1.5vw', textAlign: 'center', whiteSpace: 'pre', overflow: 'auto'}}>
                                                    Add Texts & Imgs : {data.logo.logoName}</h3>
                                            </div>

                                                <Mutation mutation={ADD_TEXT}>
                                                    {(AddText, { loading, error }) => (
                                                        <form onSubmit={e => {
                                                            console.log("ADD")
                                                            e.preventDefault();
                                                            
                                                            AddText({ variables: { 
                                                                text: "SampleText", 
                                                                color: "#FFFFFF", 
                                                                fontSize: parseInt(12), 
                                                                x: parseInt(0), 
                                                                y: parseInt(0), 
                                                                order: parseInt(0),
                                                                logoId: this.props.match.params.id
                                                                // text: text.value, 
                                                                // color: color.value, 
                                                                // fontSize: parseInt(fontSize.value), 
                                                                // x: parseInt(x.value), 
                                                                // y: parseInt(y.value), 
                                                                // order: parseInt(order.value),
                                                                // logoId: logoId.value
                                                            }});

                                                            // text.value = '',
                                                            // color.value = '',
                                                            // fontSize.value = '',
                                                            // x.value = '',
                                                            // y.value = '',
                                                            // order.value = '',
                                                            // logoId.value = ''
                                                        }}>
                                                            <button type="submit" className="btn btn-outline-secondary btn-lg">
                                                                Add Text
                                                            </button>
                                                        </form> 
                                                    )}
                                                </Mutation>                                              
                                                

                                                <button type="button" className="btn btn-outline-secondary btn-lg">
                                                    Add Image
                                                </button>

                                            <Link id="home" to="/">
                                                <button type="submit" onClick={this.handleSave} className="btn btn-outline-secondary btn-lg">
                                                    SAVE
                                                </button>
                                            </Link>
                                        </div>

                                        <div style = {{border: "3px solid red", position:'relative'}}>
                                            <div
                                                style = {{
                                                    whiteSpace: 'pre',
                                                    border:"solid",
                                                    position: "relative",
                                                    overflow: "auto",
                                                    backgroundColor:data.logo.backgroundColor,
                                                    borderColor:data.logo.borderColor,
                                                    borderRadius:data.logo.borderRadius,
                                                    borderWidth:data.logo.borderWidth,
                                                    padding:data.logo.padding,
                                                    margin:data.logo.margin,
                                                    top: data.logo.y,
                                                    left: data.logo.x,
                                                    width: data.logo.width,
                                                    height: data.logo.height,
                                                    lastUpdate:data.logo.lastUpdate,
                                                }}>

                                                <div >
                                                    {[...data.logo.imgs]
                                                    .map((img, i) => (
                                                    <div key = {i} style={{position: "absolute", left: 0, top: 0}}>
                                                        <EditImg imgId={img._id} save={this.state.save}></EditImg>
                                                    </div>))}
                                                </div>
                                                <div >
                                                    {[...data.logo.texts]
                                                    .map((text, i) => (
                                                    <div key = {i} style={{position: "absolute", left: 0, top: 0}}>
                                                        <EditText textId={text._id} save={this.state.save}></EditText>
                                                    </div>))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ModifyTextImgScreen;