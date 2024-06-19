import React, {Component} from 'react';
import w400 from "../img/w400.png";
import w700 from "../img/w700.png";
import w1200 from "../img/w1200.png";
import w1500 from "../img/w1500.png";
import w900 from "../img/w900.png";

import css from "./WidthPage.module.css";

class WidthPage extends Component {
    render() {
        return (
            <img
                srcSet={`${w400} 400w, ${w700} 700w, ${w900} 900w, ${w1200} 1200w, ${w1500} 1500w`}
                className={css.image}
            />
        );
    }
}

export default WidthPage;
