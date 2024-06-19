import React, {Component} from 'react';
import {Link} from "react-router-dom";
import css from "./Layout.module.css";

class Layout extends Component {
    render() {
        const {children} = this.props;

        return (
            <div>
                <div className={css.line}>
                    <Link to={"/"} className={css.link}>
                        {"TO TYPE"}
                    </Link>

                    <Link to={"/size/"} className={css.link}>
                        {"TO SIZE"}
                    </Link>

                    <Link to={"/width/"} className={css.link}>
                        {"TO WIDTH"}
                    </Link>

                    <Link to={"/media/"} className={css.link}>
                        {"TO MEDIA"}
                    </Link>
                </div>

                <div>
                    {children}
                </div>
            </div>
        );
    }
}

export default Layout;
