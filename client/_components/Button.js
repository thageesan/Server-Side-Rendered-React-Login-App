import React from 'react';
import { ButtonStyle } from './../LoginPage'


const button = (props) => {
    return (
        <ButtonStyle type="submit" disabled={props.disabled}>{props.name}</ButtonStyle>
    );
}

export default button;