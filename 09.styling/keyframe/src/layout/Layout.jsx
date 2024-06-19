import React, {Component} from 'react';
import {Link} from "react-router-dom";
import css from "./Layout.module.css";

class Layout extends Component {
    render() {
        const {children} = this.props;

        return (
            <div>
                <div className={css.list}>
                    <Link to="/">
                        Transitions
                    </Link>

                    <Link to="/keyframes">
                        Keyframes
                    </Link>

                    <Link to="/">
                        Transitions
                    </Link>
                </div>

                {children}
            </div>
        );
    }
}

export default Layout;
