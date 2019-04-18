import { connect } from 'react-redux';
import React from 'react';
import { ButtonStyle } from './../LoginPage'


class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ButtonStyle type="submit" disabled={!this.props.user.username || !this.props.user.password}>{this.props.name}</ButtonStyle>
        );
    }
    
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const connectedLoginPage = connect(mapStateToProps)(Button);
export { connectedLoginPage as Button }; 