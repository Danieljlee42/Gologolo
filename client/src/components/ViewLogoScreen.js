import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default" style={{backgroundColor: "lightyellow"}}>
                                <div className="panel-heading">
                                    <div style = {{background: "skyblue", padding: 12}}>
                                        <h4><Link to="/">
                                            <div style={{fontFamily: 'Lexend Exa', fontSize: 34, color: 'black'}}>GoLogoLo Home</div>
                                        </Link></h4>
                                    </div>
                                </div>

                                <div className = "col">
                                    <div className="row" >
                                        <div className = "col-2" style={{backgroundColor: "#cdf5c7"}}> 
                                            <div style={{padding: 10}}>
                                                <h3 className="panel-title" >View Logo</h3>
                                            </div>
                                            <dl>
                                                <dt>Text:</dt>
                                                <dd style = {{whiteSpace: 'pre', overflow: 'auto'}}>{data.logo.text}</dd>
                                                <dt>Color:</dt>
                                                <dd>{data.logo.color}</dd>
                                                <dt>Font Size:</dt>
                                                <dd>{data.logo.fontSize}</dd>
                                                
                                                <dt>Background Color:</dt>
                                                <dd>{data.logo.backgroundColor}</dd>

                                                <dt>Border Color:</dt>
                                                <dd>{data.logo.borderColor}</dd> 

                                                <dt>Border Radius:</dt>
                                                <dd>{data.logo.borderRadius}</dd> 

                                                <dt>Border Width:</dt>
                                                <dd>{data.logo.borderWidth}</dd> 

                                                <dt>Padding:</dt>
                                                <dd>{data.logo.padding}</dd> 

                                                <dt>Margin:</dt>
                                                <dd>{data.logo.margin}</dd> 

                                                <dt>Last Updated:</dt>
                                                <dd style = {{overflow: 'auto'}} >{data.logo.lastUpdate}</dd>
                                            </dl>
                                            <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeLogo, { loading, error }) => (
                                                    <div>
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                removeLogo({ variables: { id: data.logo._id } });
                                                            }}>
                                                            <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                        <button type="submit" className="btn btn-danger">Delete</button>
                                                        </form>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error :( Please try again</p>}
                                                    </div>
                                                )}
                                            </Mutation>
                                        
                                        </div>
                                        <div style = {{overflow: 'auto'}}>
                                            <div
                                                style = {{
                                                    whiteSpace: 'pre',
                                                    border:"solid",
                                                    color:data.logo.color,
                                                    fontSize:data.logo.fontSize,
                                                    backgroundColor:data.logo.backgroundColor,
                                                    borderColor:data.logo.borderColor,
                                                    borderRadius:data.logo.borderRadius,
                                                    borderWidth:data.logo.borderWidth,
                                                    padding:data.logo.padding,
                                                    margin:data.logo.margin,
                                                    lastUpdate:data.logo.lastUpdate,
                                                }}>
                                                {data.logo.text}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    </div>
                                </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;