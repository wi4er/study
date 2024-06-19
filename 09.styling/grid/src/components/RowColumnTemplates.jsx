import React from 'react';
import PropTypes from 'prop-types';
import * as css from "./RowColumnTemplates.module.css";


class RowColumnTemplates extends React.Component {
    render() {
        return (
            <div className={css.index}>
                <div>
                    <h2 className={css.title}>FIXE SIZES</h2>

                    <div className={css.example1}>
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                    </div>
                </div>

                <div>
                    <h2 className={css.title}>PROPORTIONAL SIZES</h2>

                    <div className={css.example2}>
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                    </div>
                </div>

                <div>
                    <h2 className={css.title}>MIZED SIZES</h2>

                    <div className={css.example3}>
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                    </div>
                </div>

                <div>
                    <h2 className={css.title}>PROPORTIONAL GAPS</h2>

                    <div className={css.example4}>
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                    </div>
                </div>

                <div>
                    <h2 className={css.title}>AUTO FLOW COLUMN</h2>

                    <div className={css.example5}>
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                        <div className={css.item} />
                    </div>
                </div>
            </div>
        );
    }
}

RowColumnTemplates.propTypes = {};

export default RowColumnTemplates;
