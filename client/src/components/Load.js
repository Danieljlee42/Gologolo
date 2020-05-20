import React, { Component } from 'react';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      lastUpdate
    }
  }
`;

class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false 
        }
    }
    
    componentDidMount() {
        setTimeout(function() { 
            this.setState({render: true}) 
        }.bind(this), 2000)
      }

    handleMouseEnter = (addr) => {
        console.log(addr)
        this.props.history.push('/modify/textImag/'+addr)
    }

    render() {
    
         return(
                <Query pollInterval={500} query={GET_LOGOS}>
                    {({ loading, error, data }) => {
                        if ( !this.state.render) return 'Loading...'; //made it manually slowed down here, so the data gets udpated
                        if (error) return `Error! ${error.message}`;
                        return (
                            <div className="container" >
                                    <div onMouseEnter={this.handleMouseEnter(
                                        data.logos.reduce((prev, current) => (prev.lastUpdate > current.lastUpdate) ? prev : current)._id
                                    )}/>
                            </div>
                        );
                    }}
                </Query >
            );
        
        
    }  
    
}

export default Load;
