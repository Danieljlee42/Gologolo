import React, { Component } from 'react'
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {Rnd} from 'react-rnd'

const GET_IMG= gql`
    query img($imgId: String) {
        img(id: $imgId) {
            _id
            name
            url
            width
            height
            x
            y
            order
        }
    } 
`;

// DISPLAY THE Img COMPONENT
class EditImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            url: "",
            width: "",
            height: "",
            x: "",
            y: "",
            order: ""
        }
    }
    render() {

        return (
            console.log(this.props.imgId),
            <Query pollInterval={500} query={GET_IMG} variables={{ imgId: this.props.imgId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if (this.state.name === ""){
                        this.setState({ name: data.img.name});
                        this.setState({ url: data.img.url});
                        this.setState({ width: data.img.width});
                        this.setState({ height: data.img.height});
                        this.setState({ x: data.img.x});
                        this.setState({ y: data.img.y});
                        this.setState({ order: data.img.order});
                    }
                    
                    return(
                        <Rnd 
                            style = {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "solid 1px #ddd",
                                background: "$f0f0f0"
                            }}
                            default = {{
                                //x : data.img.x,
                                //y : data.img.y,
                                // width: data.img.width,
                                // height: data.img.height
                            }}

                            size={{width: this.state.width, height: this.state.height}}
                            position={{x: this.state.x, y: this.state.y}}
                            onDragStop ={(e,d)=>{this.setState({x: d.x, y: d.y})}}
                            onResize={(e,direction, ref, delta, position) =>{
                                this.setState({
                                    width: ref.style.width,
                                    height: ref.style.height
                                })    
                            }}
                            >
                            <img src={this.state.url} style ={{width: this.state.width, height: this.state.height}}/>
                        </Rnd>
                        // <Rnd 
                        //     size={{width: this.state.width, height:this.state.height}}
                        //     position={{x: this.state.x, y: this.state.y}}>
                        //     <img src={data.img.url} style={{position: 'absolute'}}/>
                        // </Rnd>


                    )
                }}
            </Query>
        )
    }
}

export default EditImg