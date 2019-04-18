import { connect } from 'react-redux';
import styled from 'styled-components'
import { Button } from './../_components';
import React from 'react';
import { userActions } from './../_actions';
import { userService } from './../_services';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    padding: 20px;
    background-color: #f9f9f9;

    box-shadow: 0 0 15px 1px #cccccc;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Input = styled.input`
    font-size: 1em;
    padding: 16px 8px;
    border-radius: 0.5em;
    border: navajowhite;
`

export const Title = styled.h2`
    font-size: 2.7em;
    font-family: Helvetica;
    text-transform: uppercase;
`;

export const ButtonStyle = styled.button`
    color: red;
    background-color: #000000;
    border: none;
    padding: 15px;
    font-size: 1em;
    border-radius: 0.72em;
    &:disabled {
        opacity: 0.54;
    }
`;

export const ErrorLabel = styled.label`
    color: red;
`;

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        // reset login status
        this.props.dispatch(userActions.logout());
    }

    handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                this.props.dispatch(userActions.updateUsernameField({
                    username: value
                }));
                break;
            case 'password':
                this.props.dispatch(userActions.updatePasswordField({
                    password: value
                }));
                break;
        }
        
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            await userService.login(this.props.user.username, this.props.user.password);
            this.props.history.push('/api/users')
        } catch (error) {
            this.props.dispatch(userActions.failedLogin({
                error: 'Credentials is not correct'
            }));
            console.error('invalid username and / or password', e)
        }
    }

    render() {
        return (
            <Container>
                <Title>Login</Title>
                <Form name="form" onSubmit={this.handleSubmit.bind(this)}>
                    <Input placeholder="username" type="text" name="username" value={this.props.user.username} onChange={this.handleChange.bind(this)} />
                    <Input placeholder="password" type="password" className="form-control" name="password" value={this.props.user.password} onChange={this.handleChange.bind(this)} />
                        {this.props.user.error && 
                        <ErrorLabel>{this.props.user.error}</ErrorLabel>}
                    <Button name="Login"/>
                </Form>
            </Container>
        )
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 