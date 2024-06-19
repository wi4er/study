import React from 'react';
import PropTypes from 'prop-types';
import css from "./AreasTemplates.module.css";

AreasTemplates.propTypes = {

};

function AreasTemplates(props) {
    return (
        <div className={css.index}>
            <div>
                <h2>
                    WITH AREAS ITEM
                </h2>

                <div className={css.example1}>
                    <div className={css.first} />

                    <div className={css.second} />

                    <div className={css.third} />
                </div>
            </div>
        </div>
    );
}

export default AreasTemplates;
