import React from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {

    render() {
        return <div>
            <h1>Welcome!</h1>
            <p>
                <Link to="/api/login">Logout</Link>
            </p>
        </div>
    }
}