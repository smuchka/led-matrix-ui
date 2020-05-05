import React from 'react';
import classes from './Layout.module.css';
import { NavLink, withRouter } from 'react-router-dom';

// React.FC<RouteComponentProps<>> ???
function Layout(props: any) {
    const title = 'LED Matrix';
    const headerRoute = '/select-template';
    const isOnSelectTemplate = headerRoute === props.location.pathname;
    const resetLinkStyle = {
        textDecoration: 'none',
        color: 'inherit'
    };

    return (
        <div className={classes.Layout}>
            <header className={classes.header}>
                {
                    !isOnSelectTemplate ?
                        <NavLink
                            to={headerRoute}
                            style={resetLinkStyle}
                            title={title}
                        >{title}</NavLink>
                        : <span>{title}</span>
                }
            </header>

            <main className={classes.main}>
                {props.children}
            </main>
        </div >
    )
}

const LayoutWithRouter = withRouter(props => <Layout {...props} />);
export default LayoutWithRouter;