import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Draggable, {DraggableCore} from 'react-draggable';


import ViewText from './ViewText.js'
import ViewImg from './ViewImg.js'

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

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $logoName: String!,
        $backgroundColor: String!,
        $borderColor:, String!
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!,
        $width: Int!,
        $height: Int!,) {
            updateLogo(
                id: $id,
                logoName: $logoName
                backgroundColor: $backgroundColor
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin,
                width: $width,
                height: $height
                ) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEnabled: true,
            logoName: null,
            textColor: null,
            fontSize: null,
            backgroundColor: null,
            borderColor: null,
            borderRadius: null,
            borderWidth: null,
            padding: null,
            margin: null,
            width: null,
            height: null
        }
    }

    handleTempLogoNameChange  = (event) => {
        console.log("handleLogoNameChange to " + event.target.value);
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

    // handlePositionChange = (e, position) => {
    //     const {x, y} = position;
    //     console.log("handlePositionChangeComplete to x= " + x + " y= " + y);
    //     this.setState({x: x});
    //     this.setState({y: y}, this.completeUserEditing);
    // }

    handleSizeChange = (e, position) => {
        const {x, y} = position;
        console.log("handlePositionChangeComplete to x= " + x + " y= " + y);
        this.setState({width: x});
        this.setState({height: y}, this.completeUserEditing);
    }


    componentDidMount(){
        console.log("handlePaddingChangeComplete to ");
        return( 
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({data}) => { 
                    console.log("handlePaddingChangeComplete to " + data.logo.logoName);
                    this.setState({ logoName: data.logo.logoName})
                }}
            </Query>
        )
    }

    render() {
        let logoName, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, width, height


        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    let errorMsg;
                    if (!this.state.isEnabled){
                        errorMsg = <div style = {{color: "red"}}>  Not a valid input</div>
                    }
                    else{
                        errorMsg = <br></br>
                    }


                    if (this.state.logoName===null) { 
                        this.setState({ logoName: data.logo.logoName });
                        this.setState({ backgroundColor: data.logo.backgroundColor})
                        this.setState({ borderColor: data.logo.borderColor})
                        this.setState({ borderRadius: data.logo.borderRadius });
                        this.setState({ borderWidth: data.logo.borderWidth });
                        this.setState({ padding: data.logo.padding });
                        this.setState({ margin: data.logo.margin });
                        this.setState({ width: data.logo.width });
                        this.setState({ height: data.logo.height });
                    }
                    
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/modify/textImag/`+this.props.match.params.id)}>
                            {(updateLogo, { loading, error }) => (
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

                                        <div className='col'>
                                            <div className='row'>
                                                <div className="panel-body" class="col-4" style={{backgroundColor: "#cdf5c7"}}>
                                                    <div style={{padding: 10}}>
                                                        <h3 className="panel-title" style = {{textAlign: 'center'}}>Edit Logo</h3>
                                                    </div>
                                                    <form onSubmit={e => {
                                                        e.preventDefault();
                                                        updateLogo({ variables: { 
                                                            id: data.logo._id, 
                                                            logoName: logoName.value, 
                                                            backgroundColor: backgroundColor.value, 
                                                            borderColor: borderColor.value, 
                                                            borderRadius: parseInt(borderRadius.value), 
                                                            borderWidth: parseInt(borderWidth.value), 
                                                            padding: parseInt(padding.value), 
                                                            margin: parseInt(margin.value),
                                                            width: parseInt(width.value),
                                                            height: parseInt(height.value)
                                                        }});
                                                        width.value = "";
                                                        height.value = "";
                                                        logoName.value = "";
                                                        backgroundColor.value = ""; 
                                                        borderColor.value = ""; 
                                                        borderRadius.value = ""; 
                                                        borderWidth.value = ""; 
                                                        padding.value = "";
                                                        margin.value = "";
                                                    }}>
                                                    <div className='row'>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <div className="form-group">
                                                                    <label htmlFor="logoName">Logo Name:</label>
                                                                    <input 
                                                                        type="logoName" 
                                                                        className="form-control" 
                                                                        name="logoName" 
                                                                        ref={node => {logoName = node;}} 
                                                                        placeholder="Logo Name" 
                                                                        defaultValue={data.logo.logoName} 
                                                                        onChange={this.handleTempLogoNameChange}
                                                                        />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                                    <input 
                                                                        type="color" 
                                                                        className="form-control" 
                                                                        name="backgroundColor" 
                                                                        ref={node => {backgroundColor = node;}}
                                                                        placeholder="Background Color" 
                                                                        defaultValue={data.logo.backgroundColor} 
                                                                        onChange={this.handleBackgroundColorChange}
                                                                        />
                                                                </div>
                                                                
                                                                <div className="form-group">
                                                                    <label htmlFor="borderColor">Border Color:</label>
                                                                    <input 
                                                                        type="color" 
                                                                        className="form-control" 
                                                                        name="borderColor" 
                                                                        ref={node => {borderColor = node;}}
                                                                        placeholder="Border Color" 
                                                                        defaultValue={data.logo.borderColor} 
                                                                        onChange={this.handleBorderColorChange}
                                                                        />
                                                                </div>
                                                            </div>
                                                                
                                                            <div className='col'>
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
                                                                        defaultValue={data.logo.borderRadius} 
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
                                                                        defaultValue={data.logo.borderWidth} 
                                                                        onChange={this.handleBorderWidthChange}
                                                                        />
                                                                </div>
                                                               
                                                                <div className="form-group">
                                                                    <label htmlFor="width">width:</label>
                                                                    <input 
                                                                        disabled= "true"
                                                                        //type="number" 
                                                                        className="form-control" 
                                                                        name="width" 
                                                                        ref={node => {width = node;}}
                                                                        defaultValue={this.state.width}
                                                                        />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="height">height:</label>
                                                                    <input 
                                                                        disabled= "true"
                                                                        //type="number" 
                                                                        className="form-control" 
                                                                        name="height" 
                                                                        ref={node => {height = node;}}
                                                                        defaultValue={this.state.height}
                                                                        />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className='col'>
                                                                <div className="form-group">
                                                                    <label htmlFor="padding">Padding:</label>
                                                                    <input 
                                                                        type="number" 
                                                                        min = "0"
                                                                        max = "144"
                                                                        className="form-control" 
                                                                        name="padding" 
                                                                        ref={node => {padding = node;}}
                                                                        placeholder="Padding" 
                                                                        defaultValue={data.logo.padding} 
                                                                        onChange={this.handlePaddingChange}
                                                                        />
                                                                </div>
                                                            </div>

                                                            <div className='col'>
                                                                <div className="form-group">
                                                                    <label htmlFor="margin">Margin:</label>
                                                                    <input 
                                                                        type="number" 
                                                                        min = "0"
                                                                        max = "144"
                                                                        className="form-control" 
                                                                        name="margin" 
                                                                        ref={node => {margin = node;}}
                                                                        placeholder="Margin" 
                                                                        defaultValue={data.logo.margin} 
                                                                        onChange={this.handleMarginChange}
                                                                        />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <button type="submit" className="btn btn-success" disabled={!this.state.isEnabled}>SAVE & NEXT</button>
                                                    </form>
                                                    {loading && <p>Loading...</p>}
                                                    {error && <p>Error :( Please try again</p>}
                                                    {errorMsg}
                                                </div>
                                                
                                                

                                                <div>
                                                <div style={{ position: "absolute", border: "3px solid red"}}>
                                                    <div style={{
                                                        position: "relative",
                                                        border: "solid",
                                                        backgroundColor: this.state.backgroundColor,
                                                        borderColor: this.state.borderColor,
                                                        borderRadius: this.state.borderRadius + "px",
                                                        borderWidth: this.state.borderWidth + "px",
                                                        padding: this.state.padding + "px",
                                                        margin: this.state.margin + "px",
                                                        width: this.state.width + "px",
                                                        height: this.state.height + "px",
                                                        }}>
                                                            <div>
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
                                                            </div>


                                                            <Draggable
                                                                handle=".handle"
                                                                bounds= {{left: 0, top: 0, right: 500, bottom: 500}}
                                                                position={{x: this.state.width, y: this.state.height}}
                                                                grid={[1, 1]}
                                                                scale={1}
                                                                onStart={this.handleStart}
                                                                onDrag={this.handleDrag, this.handleSizeChange}
                                                                onStop={this.handleStop}>
                                                                <div>
                                                                    <div className="handle">
                                                                        <div 
                                                                            style = {{
                                                                                whiteSpace: 'pre',
                                                                                position: 'absolute',
                                                                                border: '1px solid blue',
                                                                                fontSize: "15px"

                                                                            }}>
                                                                            Drag Me to resize 
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Draggable>
                                                    </div>
                                                    
                                                    
                                                </div>
                                                </div>

                                                <div>
                                                    <Draggable
                                                        handle=".handle"
                                                        //defaultPosition=
                                                        bounds= {{left: 0, top: 0, right: 500, bottom: 500}}
                                                        position={{x: this.state.x, y: this.state.y}}
                                                        grid={[1, 1]}
                                                        scale={1}
                                                        onStart={this.handleStart}
                                                        onDrag={this.handleDrag, this.handlePositionChange}
                                                        onStop={this.handleStop}>

                                                        <div className="handle">
                                                            <div 
                                                                style = {{
                                                                    whiteSpace: 'pre',
                                                                    position: 'absolute',
                                                                    border: '0px solid',
                                                                    color: this.state.textColor,
                                                                    fontSize: this.state.fontSize + "px",
                                                                }}>
                                                                {this.state.text}
                                                            </div>
                                                        </div>
                                                    </Draggable>
                                                    <Draggable
                                                        handle=".handle"
                                                        defaultPosition={{x:0,y:0}}
                                                        bounds= {{left: 0, top: 0, right: 500, bottom: 500}}
                                                        //position={{x: this.state.x, y: this.state.y}}
                                                        grid={[1, 1]}
                                                        scale={1}
                                                        onStart={this.handleStart}
                                                        onDrag={this.handleDrag}//, this.handlePositionChange}
                                                        onStop={this.handleStop}>

                                                        <div className="handle">
                                                            <img src="https://www.w3schools.com/tags/smiley.gif" alt="Smiley face" width="45" height="40"></img>
                                                        </div>
                                                    </Draggable>
                                                </div>                            

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;