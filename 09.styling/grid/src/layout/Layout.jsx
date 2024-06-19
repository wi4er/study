import React from 'react';
import PropTypes from 'prop-types';
import css from "./Layout.module.css";

Layout.propTypes = {

};

function Layout(props) {
    const {children} = props;

    return (
        <div className={css.index}>
            <div>
                <a href="/">
                    {"TO LAYOUT"}
                </a>

                <a href="/cell">
                    {"TO CELL"}
                </a>

                <a href="/areas">
                    {"TO AREA"}
                </a>
            </div>

            {children}
        </div>
    );
}

export default Layout;
