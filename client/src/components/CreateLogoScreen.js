import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor:, String!
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin
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
            text: '',
            textColor: '',
            fontSize: '',
            backgroundColor: '',
            borderColor: '',
            borderRadius: '',
            borderWidth: '',
            padding: '',
            margin: ''
        }
    }

    handleTempTextChange = (event) => {
        console.log("handleTempTextChange to " + event.target.value);
        this.setState({ text: event.target.value });

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

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value }, this.completeUserEditing);
    }

    handleBackgroundColorChange = (event) => {
        console.log("handleBackgroundColorChange to " + event.target.value);
        this.setState({ backgroundColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value);
        this.setState({ borderColor: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChange to " + event.target.value);
        this.setState({ fontSize: event.target.value }, this.completeUserEditing);
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

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        
        let errorMsg;
        if (!this.state.isEnabled){
            errorMsg = <div style = {{color: "red"}}>  Not a valid input</div>
        }
        else{
            errorMsg = <br></br>
        }
        
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
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

                                    <div className="panel-body" class="col-2" style={{backgroundColor: "#cdf5c7"}}>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { 
                                        text: text.value, 
                                        color: color.value, 
                                        fontSize: parseInt(fontSize.value),
                                        backgroundColor: backgroundColor.value, 
                                        borderColor: borderColor.value, 
                                        borderRadius: parseInt(borderRadius.value), 
                                        borderWidth: parseInt(borderWidth.value), 
                                        padding: parseInt(padding.value), 
                                        margin: parseInt(margin.value)
                                    } });

                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";

                                    backgroundColor.value = ""; 
                                    borderColor.value = ""; 
                                    borderRadius.value = ""; 
                                    borderWidth.value = ""; 
                                    padding.value = "";
                                    margin.value = "";
                                }}>

                                <div style={{padding: 10}}>
                                    <h3 className="panel-title" style={{fontSize: 25}}>Create Logo</h3>
                                </div>  
                                <div className="form-group">
                                    <label htmlFor="text">Text:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="text" ref={node => {text = node;}}
                                        placeholder="Text" 
                                        onChange={this.handleTempTextChange}
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="color">Color:</label>
                                    <input 
                                        type="color" 
                                        className="form-control" 
                                        name="color" 
                                        ref={node => {color = node;}} 
                                        placeholder="Color" 
                                        onChange={this.handleTextColorChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fontSize">Font Size:</label>
                                    <input 
                                        type="number"
                                        min = "2"
                                        max = "144"
                                        className="form-control" 
                                        name="fontSize"
                                        ref={node => {fontSize = node;}} 
                                        placeholder="Font Size" 
                                        onChange={this.handleFontSizeChange}
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="backgroundColor">Background Color:</label>
                                    <input type="color"  
                                        className="form-control" 
                                        name="backgroundColor" 
                                        ref={node => {backgroundColor = node;}} 
                                        placeholder="BackgroundColor" 
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

                                <button type="submit" className="btn btn-success" disabled={!this.state.isEnabled}>Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                                {errorMsg}
                            </div>
                                
                                    <div>
                                        <div
                                            style = {{
                                                whiteSpace: 'pre',
                                                border: '0px solid',
                                                color: this.state.textColor,
                                                fontSize: this.state.fontSize + "px",
                                                backgroundColor: this.state.backgroundColor,
                                                borderColor: this.state.borderColor,
                                                borderRadius: this.state.borderRadius + "px",
                                                borderWidth: this.state.borderWidth + "px",
                                                padding: this.state.padding + "px",
                                                margin: this.state.margin + "px"    
                                            }}>
                                            {this.state.text}
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