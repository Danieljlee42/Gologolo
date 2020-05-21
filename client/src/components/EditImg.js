import React, { Component } from 'react'
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
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

const UPDATE_IMG = gql`
    mutation updateImg(
        $id: String!,
        $name: String!,
        $url: String!,
        $width: Int!,
        $height: Int!,
        $x: Int!,
        $y: Int!,
        $order: Int!) {
            updateImg(
                id: $id,
                name: $name,
                url: $url,
                width: $width,
                height: $height,
                x: $x,
                y: $y,
                order: $order
            ){
                _id
            }
        }
`;

const REMOVE_IMG = gql`
    mutation removeImg($id: String!){
        removeImg(id:$id){
            _id
        }
    }
`;

// DISPLAY THE Img COMPONENT
class EditImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
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
        let name, url, width, height, x, y, order


        return (
            <Query pollInterval={500} query={GET_IMG} variables={{ imgId: this.props.imgId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if (this.state.id === ""){
                        this.setState({ id: data.img.id});
                        this.setState({ name: data.img.name});
                        this.setState({ url: data.img.url});
                        this.setState({ width: data.img.width});
                        this.setState({ height: data.img.height});
                        this.setState({ x: data.img.x});
                        this.setState({ y: data.img.y});
                        this.setState({ order: data.img.order});
                    }

                    name = this.state.name
                    url = this.state.url
                    width = this.state.width
                    height = this.state.height
                    x = this.state.x
                    y = this.state.y
                    order = this.state.order
                    
                    //if (this.props.save){
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
                                {/* <button type="submit" className="btn btn-secondary btn-sm" style = {{position: "absolute", left: 0, bottom: 0}}>
                                    <div style = {{fontSize: "5pt", color: "yellow"}}>SAVE</div>
                                </button>  */}

                                <Mutation mutation={REMOVE_IMG} key={this.props.imgId}>
                                    {(removeImg) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeImg({ variables: { id: this.props.imgId } });
                                                }}>
                                            {/* <button type="submit" className="btn btn-danger">Delete</button> */}
                                            <button type="submit" class="btn btn-danger" style={{
                                                borderRadius: 1000, 
                                                position: "absolute", 
                                                display: "flex", 
                                                width: "15px", 
                                                justifyContent: "center", 
                                                alignItems: "center", 
                                                height: "15px", 
                                                right: 0,
                                                top: 0,
                                                fontSize: "6pt"}}>X</button>
                                            </form>
                                        </div>
                                    )}
                                </Mutation>

                                <Mutation mutation={UPDATE_IMG} key={this.state.id}>
                                    {(updateImg) => (
                                        <form onSubmit={e => {
                                            console.log("UPDATE IMG")
                                            e.preventDefault();
                                            updateImg({ variables: { 
                                                id: this.props.imgId,
                                                name: this.state.name,
                                                url: this.state.url,
                                                width: parseInt(this.state.width),
                                                height: parseInt(this.state.height),
                                                x: parseInt(this.state.x),
                                                y: parseInt(this.state.y),
                                                order: parseInt(this.state.order)
                                            }});
                                        }}>
                                            <button type="submit" class="btn btn-primary" style={{
                                                borderRadius: 1000, 
                                                position: "absolute", 
                                                display: "flex", 
                                                width: "15px", 
                                                justifyContent: "center", 
                                                alignItems: "center", 
                                                height: "15px", 
                                                left: 0,
                                                bottom: 0,
                                                fontSize: "6pt"}}>Save</button>
                                            
                                        </form>
                                    )}
                                </Mutation>
                            </Rnd>
                        )
                }}
            </Query>
        )
    }
}

export default EditImg