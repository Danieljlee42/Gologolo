import React, { Component } from 'react'
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


const GET_Img= gql`
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
class ViewImg extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            console.log(this.props.imgId),
            <Query pollInterval={500} query={GET_Img} variables={{ imgId: this.props.imgId }}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return(
                        // <div style ={{
                        //     position: 'absolute',
                        //     backgroundImage: "url("+data.img.url+")",
                        //     width: data.img.width,
                        //     height: data.img.height,
                        //     top: data.img.x + "pt",
                        //     left: data.img.y + "pt"
                        // }}>
                        // </div>
                        <img src={data.img.url} style={{
                            width: data.img.width,
                            height: data.img.height,
                            top: data.img.x + "pt",
                            left: data.img.y + "pt",
                            position: 'absolute' 
                        }}/>
                    )
                }}
            </Query>
        )
    }
}

export default ViewImg