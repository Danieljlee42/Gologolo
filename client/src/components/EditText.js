import React, { Component } from 'react'
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import {Rnd} from 'react-rnd'

const GET_TEXT = gql`
    query text($textId: String) {
        text(id: $textId) {
            _id
            text
            color
            fontSize
            x
            y
            order
        }
    } 
`;

const REMOVE_TEXT = gql`
    mutation removeText($id: String!){
        removeText(id:$id){
            _id
        }
    }
`;

// DISPLAY THE TEXT COMPONENT
class EditText extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            text: "",
            color: "",
            fontSize: "",
            x: "",
            y: "",
            order: ""
        }
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render() {
        return (
            console.log(this.props.textId),
            <Query pollInterval={500} query={GET_TEXT} variables={{ textId: this.props.textId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    if (this.state.id === ""){
                        this.setState({ id: data.text.id});
                    }

                    if (this.state.text === ""){
                        this.setState({ text: data.text.name});
                        this.setState({ color: data.text.url});
                        this.setState({ fontSize: data.text.fontSize});
                        this.setState({ x: data.text.x});
                        this.setState({ y: data.text.y});
                        this.setState({ order: data.text.order});
                    }

                    return(
                        <Rnd 
                            style = {{
                                display: "flex",
                                //alignItems: "center",
                                position: "absolute",
                                justifyContent: "center",
                                border: "solid 1px #eee",
                                background: "$f0f0f0"
                            }}
                            default = {{
                                x : data.text.x,
                                y : data.text.y
                            }}
                            enableResizing = {false}
                            position={{x: this.state.x, y: this.state.y}}
                            onDragStop ={(e,d)=>{this.setState({x: d.x, y: d.y})}}
                            >
                            <div style ={{
                                whiteSpace: 'pre',
                                //position: 'absolute',
                                color: data.text.color,
                                fontSize: data.text.fontSize + "pt",
                                top: data.text.x + "pt",
                                left: data.text.y + "pt"
                                }}>
                                {data.text.text}
                            </div>
                            <Mutation mutation={REMOVE_TEXT} key={this.props.textId}>
                                {(removeText) => (
                                    <div>
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                removeText({ variables: { id: this.props.textId } });
                                            }}>
                                        <button type="submit" class="btn btn-danger" style={{
                                                            borderRadius: 10000, 
                                                            position: "absolute", 
                                                            display: "flex", 
                                                            width: "5px", 
                                                            justifyContent: "center", 
                                                            alignItems: "center", 
                                                            height: "5px", 
                                                            right: -10,
                                                            top: -10,
                                                            fontSize: "5pt"
                                                            }}>X</button>
                                        </form>
                                    </div>
                                )}
                            </Mutation>



                        </Rnd>
                    )
                }}
            </Query>
        )
    }
}

export default EditText