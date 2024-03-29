import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import html2canvas from 'html2canvas';

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


const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;




class ViewLogoScreen extends Component {

    
    

    render() {

        // function handleSaveImage(){
        //     console.log("HEREY")
        //     var node = document.getElementById('capture');
        //     htmlToImage.toPng(node)
        //     .then(function (dataUrl) {
        //         var img = new Image();
        //         img.src = dataUrl;
        //         document.body.appendChild(img);
        //     })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error);
        //     })
            
        // }

        // function handleSaveImage(){
        //     htmlToImage.toJpeg(document.getElementById('capture'), { quality: 0.95 })
        //     .then(function (dataUrl) {
        //     var link = document.createElement('a');
        //     link.download = 'Gologolo.jpeg';
        //     link.href = dataUrl;
        //     link.click();
        //     });
        // }
        // function handleSaveImage(){
        //     html2canvas(document.getElementById("capture")).then(canvas => {document.body.appendChild(canvas)
        //     });
        // }

        
        function handleSaveImage(){
                html2canvas(document.getElementById("capture"), {
                    //foreignObjectRendering: true, 
                    imageTimeout: 15000, 
                    //removeContainer: true,
                    useCORS: true
                }).then(canvas => {
                    saveAs(canvas.toDataURL(), 'file-name.png');
                });
            }
        function saveAs(uri, filename) {
            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
            } else {
                window.open(uri);
            }
        }


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
                                        <div className = "col-4" style={{backgroundColor: "#cdf5c7"}}> 
                                            <div style={{padding: 10}}>
                                                <h3 className="panel-title" style = {{fontSize: '1.5vw', textAlign: 'center', whiteSpace: 'pre', overflow: 'auto'}}>
                                                    View Logo: {data.logo.logoName}</h3>
                                            </div>
                                            
                                            <div className = "row">
                                                <div className = "col">
                                                    
                                                    <dt>Background Color:</dt>
                                                    <dd>{data.logo.backgroundColor}</dd>

                                                    <dt>Border Color:</dt>
                                                    <dd>{data.logo.borderColor}</dd> 

                                                    <dt>Border Radius:</dt>
                                                    <dd>{data.logo.borderRadius}</dd> 

                                                    <dt>Border Width:</dt>
                                                    <dd>{data.logo.borderWidth}</dd> 

                                                </div>

                                                <div className = "col">
                                                    
                                                    <dt>width:</dt>
                                                    <dd>{data.logo.width}</dd> 

                                                    <dt>height:</dt>
                                                    <dd>{data.logo.height}</dd> 

                                                </div>
                                            </div>

                                            <div style={{border: "1px solid gray"}}></div>

                                            <div className = "row">
                                                <div className = "col">
                                                    <dt>Padding:</dt>
                                                    <dd>{data.logo.padding}</dd> 
                                                </div>
                                                <div className = "col">
                                                    <dt>Margin:</dt>
                                                    <dd>{data.logo.margin}</dd> 
                                                </div>
                                            </div>

                                            <dt>Last Updated:</dt>
                                                <dd style = {{overflow: 'auto'}} >{data.logo.lastUpdate}</dd>
                                                
                                            
                                            <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeLogo, { loading, error }) => (
                                                    <div>
                                                        <div className='row'>
                                                            <form
                                                                onSubmit={e => {
                                                                    e.preventDefault();
                                                                    removeLogo({ variables: { id: data.logo._id } });
                                                                }}>
                                                                <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                            <button type="submit" className="btn btn-danger">Delete</button>
                                                            </form>
                                                            <button id='snap' className="btn btn-success"  onClick={handleSaveImage} style={{backgroundColor:"yellow", color: "black", position: "relative", left: "3px"}}>SNAP</button>
                                                        </div>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error :( Please try again</p>}
                                                    </div>
                                                )}
                                            </Mutation>

                                        </div>

                                        <div style = {{border: "3px solid red", position:'relative'}}>
                                            <div id="capture" 
                                                style = {{
                                                    whiteSpace: 'pre',
                                                    border:"solid",
                                                    position: "relative",
                                                    overflow: "auto",
                                                    backgroundColor:data.logo.backgroundColor,
                                                    borderColor:data.logo.borderColor,
                                                    borderRadius:data.logo.borderRadius,
                                                    borderWidth:data.logo.borderWidth,
                                                    padding:data.logo.padding,
                                                    margin:data.logo.margin,
                                                    top: data.logo.y,
                                                    left: data.logo.x,
                                                    width: data.logo.width,
                                                    height: data.logo.height,
                                                    lastUpdate:data.logo.lastUpdate,
                                                }}>
                                                
                                                {/*the text in the bounds of the logo area  */}
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