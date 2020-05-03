import React, { Component } from 'react';
import classes from './Layout.module.css';
import { Link } from 'react-router-dom';

class Layout extends Component {
    render() {
        const resetLinkStyle = {
            textDecoration: 'none',
            color: 'inherit'
        };

        return (
            <div className={classes.Layout}>
                <header className={classes.header}>
                    <Link
                        to="/"
                        style={resetLinkStyle}
                    >LED Matrix</Link>
                </header>

                <main className={classes.main}>
                    {this.props.children}
                </main>
            </div >)
    }
}

export default Layout;