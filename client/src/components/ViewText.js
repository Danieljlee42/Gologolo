import React, { Component } from 'react'
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


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

// DISPLAY THE TEXT COMPONENT
class ViewText extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // const styles = {
        //     container: {
        //         whiteSpace: 'pre',
        //         //border: "0px solid",
        //         color: this.props.textColor,
        //         fontSize: this.props.fontSize + "pt",
        //         x: this.props.x + "pt",
        //         y: this.props.y + "pt"
        //     }
        // }
        return (
            console.log(this.props.textId),
            <Query pollInterval={500} query={GET_TEXT} variables={{ textId: this.props.textId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return(
                        <div style ={{
                            whiteSpace: 'pre',
                            position: 'absolute',
                            color: data.text.color,
                            fontSize: data.text.fontSize + "pt",
                            top: data.text.x + "pt",
                            left: data.text.y + "pt"
                        }}>
                        {data.text.text}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default ViewText