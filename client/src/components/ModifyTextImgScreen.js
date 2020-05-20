import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Link } from 'react-router-dom';


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
        $logoId: String!
        ) {
        addLogo(
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

        this.state = {
            isEnabled: false,
            logoName: '',
            backgroundColor: '',
            borderColor: '',
            borderRadius: '',
            borderWidth: '',
            padding: '',
            margin: ''
        }
    }

    handleTempLogoNameChange = (event) => {
        console.log("handleTempLogoNameChange to " + event.target.value);
        this.setState({ logoName: event.target.value });

        let noSpaces = event.target.value.replace(/\s/g, '').length
        console.log("length of string without spaces: "+ noSpaces)
        if (event.target.value.replace(/\s/g, '').length === 0){
            this.setState({isEnabled: false});
        }
        else if (event.target.value !== ''){
            this.setState({isEnabled: true});
        }
        else{
            this.setState({isEnabled: false});
        }
    }

    // handleTextColorChange = (event) => {
    //     console.log("handleTextColorChange to " + event.target.value);
    //     this.setState({ textColor: event.target.value }, this.completeUserEditing);
    // }


    // handleFontSizeChange = (event) => {
    //     console.log("handleFontSizeChange to " + event.target.value);
    //     this.setState({ fontSize: event.target.value }, this.completeUserEditing);
    // }

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
                                                    View Logo: {data.logo.logoName}</h3>
                                            </div>
                                            
                                            <div className = "row">
                                                <div className = "col">
                                                    
                                                    <dt>Background Color:</dt>
                                                    <dd>{data.logo.backgroundColor}</dd>

                                                    <dt>Border Color:</dt>
                                                    <dd>{data.logo.borderColor}</dd> 

                                                    <dt>Border Radius:</dt>
                                                    <dd>{data.logo.borderRadius}</dd> 

                                                    <dt>Border Width:</dt>
                                                    <dd>{data.logo.borderWidth}</dd> 

                                                </div>

                                                <div className = "col">
                                                    
                                                    <dt>width:</dt>
                                                    <dd>{data.logo.width}</dd> 

                                                    <dt>height:</dt>
                                                    <dd>{data.logo.height}</dd> 

                                                    <dt>x-axis:</dt>
                                                    <dd>{data.logo.x}</dd> 

                                                    <dt>y-axis:</dt>
                                                    <dd>{data.logo.y}</dd> 
                                                </div>
                                            </div>

                                            <div style={{border: "3px solid red"}}></div>

                                            <div className = "row">
                                                <div className = "col">
                                                    <dt>Padding:</dt>
                                                    <dd>{data.logo.padding}</dd> 
                                                </div>
                                                <div className = "col">
                                                    <dt>Margin:</dt>
                                                    <dd>{data.logo.margin}</dd> 
                                                </div>
                                            </div>

                                            <dt>Last Updated:</dt>
                                                <dd style = {{overflow: 'auto'}} >{data.logo.lastUpdate}</dd>
                                                
                                            
                                            
                                        
                                        </div>

                                        <div style = {{border: "3px solid red", position:'relative'}}>
                                            <div
                                                style = {{
                                                    whiteSpace: 'pre',
                                                    border:"solid",
                                                    position: "relative",
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
                                            </div>
                                                {/* If the text was to be in the bounds of the logo area add
                                                the bottom to the div on the top which is logo div. */}
                                            
                                            {/* <div>
                                                {[...data.logo.imgs]
                                                .map((img, i) => (
                                                <div key = {i}>
                                                    <ViewImg imgId={img._id}></ViewImg>
                                                </div>))}
                                            </div>
                                            <div>
                                                {[...data.logo.texts]
                                                .map((text, i) => (
                                                <div key = {i}>
                                                    <ViewText textId={text._id}></ViewText>
                                                </div>))}
                                            </div> */}
                                           

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