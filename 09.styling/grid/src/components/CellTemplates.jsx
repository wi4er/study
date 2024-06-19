import React from 'react';
import PropTypes from 'prop-types';
import css from "./CellTemplates.module.css";

CellTemplates.propTypes = {

};

function CellTemplates(props) {
    return (
        <div className={css.index}>
            <div>
                <h2>
                    WITH MULTI COLUMN CELL
                </h2>

                <div className={css.example1}>
                    <div className={css.wide} />
                    <div className={css.cell} />
                    <div className={css.cell} />

                    <div className={css.cell} />
                    <div className={css.wide} />
                    <div className={css.cell} />

                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.wide} />
                </div>
            </div>

            <div>
                <h2>
                    WITH MULTI ROWS CELL
                </h2>

                <div className={css.example2}>
                    <div className={css.tall} />
                    <div className={css.cell} />
                    <div className={css.cell} />

                    <div className={css.tall} />
                    <div className={css.cell} />
                    <div className={css.cell} />

                    <div className={css.tall} />
                    <div className={css.cell} />
                    <div className={css.cell}>
                        LAST
                    </div>
                </div>
            </div>

            <div>
                <h2>
                    WITH MULTI ROWS AND COLUMNS CELL
                </h2>

                <div className={css.example2}>
                    <div className={css.tall} />
                    <div className={css.wide} />

                    <div className={css.tall} />
                    <div className={css.cell} />
                    <div className={css.cell} />

                    <div className={css.tall} />
                    <div className={css.wide} />
                </div>
            </div>

            <div>
                <h2>
                    WITH MULTI FIXED COLUMNS
                </h2>

                <div className={css.example3}>
                    <div className={css.first} />
                    <div className={css.cell} />
                    <div className={css.wide} />

                    <div className={css.first} />
                    <div className={css.wide} />
                    <div className={css.cell} />

                    <div className={css.first} />
                    <div className={css.cell} />
                    <div className={css.wide} />
                </div>
            </div>

            <div>
                <h2>
                    WITH MULTI FIXED COLUMN AND ROW
                </h2>

                <div className={css.example3}>
                    <div className={css.middle} />
                    <div className={css.middle} />

                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.cell} />

                    <div className={css.cell} />
                    <div className={css.cell} />

                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.cell} />
                    <div className={css.cell} />
                </div>
            </div>
        </div>
    );
}

export default CellTemplates;
