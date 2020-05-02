import React, { Component } from 'react'
import classes from './Layout.module.css';

class Layout extends Component {
    render() {
        return (
            <div className={classes.Layout}>
                <header className={classes.header}>LED Matrix</header>

                <main className={classes.main}>
                    {this.props.children}
                </main>
            </div >)
    }
}

export default Layout;