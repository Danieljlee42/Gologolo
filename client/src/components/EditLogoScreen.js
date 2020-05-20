import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Draggable, {DraggableCore} from 'react-draggable';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            width
            height
            x
            y
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor:, String!
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!,
        $width: Int!,
        $height: Int!,
        $x: Int!,
        $y: Int!) {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin,
                width: $width,
                height: $height,
                x: $x,
                y: $y
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
            text: null,
            textColor: null,
            fontSize: null,
            backgroundColor: null,
            borderColor: null,
            borderRadius: null,
            borderWidth: null,
            padding: null,
            margin: null,
            x: null,
            y: null,
            width: null,
            height: null,
            imgWidth: null,
            imgHeight: null
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

    handlePositionChange = (e, position) => {
        const {x, y} = position;
        console.log("handlePositionChangeComplete to x= " + x + " y= " + y);
        this.setState({x: x});
        this.setState({y: y}, this.completeUserEditing);
    }

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
                    console.log("handlePaddingChangeComplete to " + data.logo.text);
                    this.setState({ text: data.logo.text})
                }}
            </Query>
        )
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin, x, y, width, height


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


                    if (this.state.text===null) { 
                        this.setState({ text: data.logo.text });
                        this.setState({ textColor: data.logo.color });
                        this.setState({ fontSize: data.logo.fontSize });
                        this.setState({ backgroundColor: data.logo.backgroundColor})
                        this.setState({ borderColor: data.logo.borderColor})
                        this.setState({ borderRadius: data.logo.borderRadius });
                        this.setState({ borderWidth: data.logo.borderWidth });
                        this.setState({ padding: data.logo.padding });
                        this.setState({ margin: data.logo.margin });
                        this.setState({ x: data.logo.x });
                        this.setState({ y: data.logo.y });
                        this.setState({ width: data.logo.width });
                        this.setState({ height: data.logo.height });
                    } 
        
                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
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
                                                            text: text.value, 
                                                            color: color.value, 
                                                            fontSize: parseInt(fontSize.value),
                                                            backgroundColor: backgroundColor.value, 
                                                            borderColor: borderColor.value, 
                                                            borderRadius: parseInt(borderRadius.value), 
                                                            borderWidth: parseInt(borderWidth.value), 
                                                            padding: parseInt(padding.value), 
                                                            margin: parseInt(margin.value),
                                                            x: parseInt(x.value),
                                                            y: parseInt(y.value),
                                                            height: parseInt(y.value),
                                                            width: parseInt(width.value),
                                                            height: parseInt(height.value)
                                                        }});
                                                        x.value = "";
                                                        y.value = "";
                                                        width.value = "";
                                                        height.value = "";
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
                                                    <div className='row'>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <div className="form-group">
                                                                    <label htmlFor="text">Text:</label>
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control" 
                                                                        name="text" 
                                                                        ref={node => {text = node;}} 
                                                                        placeholder="Text" 
                                                                        defaultValue={data.logo.text} 
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
                                                                        defaultValue={data.logo.color} 
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
                                                                        defaultValue={data.logo.fontSize}
                                                                        onChange={this.handleFontSizeChange}
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
                                                                    <label htmlFor="x">x-axis:</label>
                                                                    <input 
                                                                        disabled= "true"
                                                                        //type="number" 
                                                                        className="form-control" 
                                                                        name="x" 
                                                                        ref={node => {x = node;}}
                                                                        defaultValue={this.state.x}
                                                                        />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="y">y-axis:</label>
                                                                    <input 
                                                                        disabled= "true"
                                                                        //type="number" 
                                                                        className="form-control" 
                                                                        name="y" 
                                                                        ref={node => {y = node;}}
                                                                        defaultValue={this.state.y}
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


                                                    <button type="submit" className="btn btn-success" disabled={!this.state.isEnabled}>Submit</button>
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
                                                        //maxWidth: "100px",
                                                        //maxHeight: "100px"
                                                        }}>
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