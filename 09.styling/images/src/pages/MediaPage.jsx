import React, {Component} from 'react';
import SmallImg from "../img/small.jpg";
import MediumImg from "../img/meduim.jpg";
import BigImg from "../img/big.jpg";
import css from "./SizePage.module.css";

class MediaPage extends Component {
    render() {
        return (
            <picture>
                <source srcSet={SmallImg} media="(max-width: 375px)" />
                <source srcSet={MediumImg} media="(max-width: 768px)" />

                <img
                    src={BigImg}
                    className={css.image}
                />
            </picture>
        );
    }
}

export default MediaPage;
