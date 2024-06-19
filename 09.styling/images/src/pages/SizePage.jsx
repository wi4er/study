import React, {Component} from 'react';
import SmallImg from "../img/small.jpg";
import MediumImg from "../img/meduim.jpg";
import BigImg from "../img/big.jpg";

import css from "./SizePage.module.css";

class SizePage extends Component {
    render() {
        return (
            <img
                srcSet={`${BigImg} 1x, ${MediumImg} 2x, ${SmallImg} 3x`}
                className={css.image}
            />
        );
    }
}

export default SizePage;
