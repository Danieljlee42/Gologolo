import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                whiteSpace: 'pre',
                border: "0px solid",
                color: this.props.logo.textColor,
                fontSize: this.props.logo.fontSize + "pt",
                backgroundColor: this.props.logo.backgroundColor,
                borderColor: this.props.logo.borderColor,
                borderRadius: this.props.logo.borderRadius + "pt",
                borderWidth: this.props.logo.borderThickness + "px",
            }
        }
        return (
            <div style = {styles.container}>
                {this.props.logo.text}
            </div>
        )
    }
}

export default TextEditWorkspace