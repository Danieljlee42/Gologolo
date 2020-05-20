import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $logoName: String!,
        $backgroundColor: String!,
        $borderColor:, String!
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!,
        $width: Int!,
        $height: Int!) {
        addLogo(
            logoName: $logoName,
            backgroundColor: $backgroundColor
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin,
            width: $width,
            height: $height
            ) {
            _id
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


class CreateLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEnabled: false,
            logoName: '',
            backgroundColor: '#7FFFD4',
            borderColor: '',
            borderRadius: '',
            borderWidth: '',
            padding: '',
            margin: '',
            width: 500,
            height: 500
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
    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value);
        this.setState({ backgroundColor: event.target.value }, this.completeUserEditing);
    }
    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value);
        this.setState({ borderColor: event.target.value }, this.completeUserEditing);
    }
    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChangeComplete to " + event.target.value);
        this.setState({ borderRadius: event.target.value }, this.completeUserEditing);
    }
    handleBorderWidthChange = (event) => {
        console.log("handleBorderWidthChangeComplete to " + event.target.value);
        this.setState({ borderWidth: event.target.value }, this.completeUserEditing);
    }
    handleMarginChange = (event) => {
        console.log("handleMarginChangeComplete to " + event.target.value);
        this.setState({ margin: event.target.value }, this.completeUserEditing);
    }
    handlePaddingChange = (event) => {
        console.log("handlePaddingChangeComplete to " + event.target.value);
        this.setState({ padding: event.target.value }, this.completeUserEditing);
    }
    handleWidthChange = (event) => {
        console.log("handleWidthChangeComplete to " + event.target.value);
        this.setState({ width: event.target.value }, this.completeUserEditing);
    }
    handleHeightChange = (event) => {
        console.log("handleHeightChangeComplete to " + event.target.value);
        this.setState({ height: event.target.value }, this.completeUserEditing);
    }

    render() {
        let logoName, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width, height
        
        let errorMsg;
        if (!this.state.isEnabled){
            errorMsg = <div style = {{color: "red"}}>  Not a valid input</div>
        }
        else{
            errorMsg = <br></br>
        }
        
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/load')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default" style={{backgroundColor: "lightyellow"}}>
                            <div className="panel-heading">
                                <div style = {{background: "skyblue", padding: 12}}>
                                    <h4>
                                        <Link to="/">
                                            <div style={{fontFamily: 'Lexend Exa', fontSize: 34, color: 'black'}}>GoLogoLo Home</div>
                                        </Link>
                                    </h4>
                                </div>
                            </div>

                            <div class = 'col'>
                                <div class='row'>
                                    <div className="panel-body" class="col-4" style={{backgroundColor: "#cdf5c7"}}>
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            addLogo({ variables: { 
                                                logoName: logoName.value, 
                                                backgroundColor: backgroundColor.value, 
                                                borderColor: borderColor.value, 
                                                borderRadius: parseInt(borderRadius.value), 
                                                borderWidth: parseInt(borderWidth.value), 
                                                padding: parseInt(padding.value), 
                                                margin: parseInt(margin.value),
                                                width: parseInt(width.value),
                                                height: parseInt(height.value),
                                            }});
                                            logoName.value = "";
                                            backgroundColor.value = ""; 
                                            borderColor.value = ""; 
                                            borderRadius.value = ""; 
                                            borderWidth.value = ""; 
                                            padding.value = "";
                                            margin.value = "";
                                            width.value = "";
                                            height.value = "";
                                        }}>

                                        <div style={{padding: 10}}>
                                            <h3 className="panel-title" style={{fontSize: 25}}>Create Logo Template</h3>
                                        </div> 

                                        <div className="row">
                                            <div className="col">
                                                <div className="form-group">
                                                <label htmlFor="logoName">LogoName:</label>
                                                <input 
                                                    type="logoName" 
                                                    className="form-control" 
                                                    name="logoName" ref={node => {logoName = node;}}
                                                    placeholder="Logo Name" 
                                                    onChange={this.handleTempLogoNameChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color"  
                                                        className="form-control" 
                                                        name="backgroundColor" 
                                                        ref={node => {backgroundColor = node;}} 
                                                        placeholder="BackgroundColor" 
                                                        defaultValue={this.state.backgroundColor}
                                                        onChange={this.handleBackgroundColorChange}
                                                        />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color"  
                                                        className="form-control" 
                                                        name="borderColor" 
                                                        ref={node => {borderColor = node;}} 
                                                        placeholder="BorderColor" 
                                                        onChange={this.handleBorderColorChange}
                                                        />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input 
                                                        type="number" 
                                                        min = "2"
                                                        max = "144"
                                                        className="form-control" 
                                                        name="borderRadius"
                                                        ref={node => {borderRadius = node;}} 
                                                        placeholder="Border Radius" 
                                                        onChange={this.handleBorderRadiusChange}
                                                        />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input 
                                                        type="number" 
                                                        min = "2"
                                                        max = "144"
                                                        className="form-control" 
                                                        name="borderWidth"
                                                        ref={node => {borderWidth = node;}} 
                                                        placeholder="Border Width" 
                                                        onChange={this.handleBorderWidthChange}
                                                        />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input 
                                                        type="number" 
                                                        min = "2"
                                                        max = "144"
                                                        className="form-control" 
                                                        name="padding"
                                                        ref={node => {padding = node;}} 
                                                        placeholder="Padding" 
                                                        onChange={this.handlePaddingChange}
                                                        />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input 
                                                        type="number"
                                                        min = "2" 
                                                        max = "144"
                                                        className="form-control" 
                                                        name="margin"
                                                        ref={node => {margin = node;}} 
                                                        placeholder="Margin" 
                                                        onChange={this.handleMarginChange}
                                                        />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="width">Width:</label>
                                                    <input 
                                                        type="number"
                                                        min = "200" 
                                                        max = "600"
                                                        className="form-control" 
                                                        name="width"
                                                        ref={node => {width = node;}} 
                                                        placeholder="Width" 
                                                        defaultValue={this.state.width} 
                                                        onChange={this.handleWidthChange}
                                                        />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="margin">Height:</label>
                                                    <input 
                                                        type="number"
                                                        min = "200" 
                                                        max = "600"
                                                        className="form-control" 
                                                        name="height"
                                                        ref={node => {height = node;}} 
                                                        placeholder="Height" 
                                                        defaultValue={this.state.height} 
                                                        onChange={this.handleHeightChange}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                        

                                       

                                        <button type="submit" className="btn btn-success" disabled={!this.state.isEnabled}>NEXT</button>
                                        </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                                {errorMsg}
                            </div>
                                
                                    <div>
                                        <div
                                            style = {{
                                                border: '0px solid',
                                                backgroundColor: this.state.backgroundColor,
                                                borderColor: this.state.borderColor,
                                                borderRadius: this.state.borderRadius + "px",
                                                borderWidth: this.state.borderWidth + "px",
                                                padding: this.state.padding + "px",
                                                margin: this.state.margin + "px",
                                                width: this.state.width + "px",
                                                height: this.state.height + "px"
                                            }}>
                                        </div>
                                    </div>
                                </div>
                            </div>        
                        
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;