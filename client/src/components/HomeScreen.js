import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_LOGOS = gql`
  {
    logos {
      _id
      logoName
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                     
                        <div className="container" style={{backgroundColor: "#e6e6e6", padding: 25}}>
                            <div className="row">
                                
                                <div className="col-3">
                                    <h3>Recent Work</h3>
                                    {data.logos.sort((a, b) => b.lastUpdate > a.lastUpdate).map( 
                                        (logo, index) => 
                                        (
                                            <div key={index} className='home_logo_link' style={{ cursor: "pointer", whiteSpace: "pre"}}>
                                                <Link to={`/view/${logo._id}`}>{logo.logoName}</Link>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="col-8">
                                    <div id="home_banner_container">
                                        GoLogoLo
                                    </div>
                                    <div>
                                        <Link id="add_logo_button" to="/create">
                                            <button type="button" className="btn btn-outline-secondary btn-lg">
                                                Add Logo
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>                   
                        
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
