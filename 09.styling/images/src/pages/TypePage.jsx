import React, {Component} from 'react';
import css from "./TypePage.module.css";
import Jp2Img from "../img/jp2.jp2";
import WebpImg from "../img/webp.webp";

class TypePage extends Component {
    render() {
        return (
            <div>
                <picture>
                    <source srcSet={Jp2Img} type='image/jp2'/>
                    <source srcSet={WebpImg} type='image/webp'/>

                    <img src={WebpImg} className={css.image}/>
                </picture>
            </div>
        );
    }
}

export default TypePage;
