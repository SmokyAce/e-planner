import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classes from './Zen.scss';


export const Zen = (props) => {
    return (
        <div>
            <div>
                <h2 className={classes.zenHeader}>
                    {props.zen ? props.zen.value : ''}
                </h2>
                <button className='btn btn-default' onClick={() => {
                    props.fetchZen(props.saved.size);
                }}
                >
                    Fetch a wisdom
                </button>
                {' '}
                <button className='btn btn-default' onClick={props.saveCurrentZen}>
                    Save
                </button>
            </div>
            {props.saved.size
                ? <div className={classes.savedWisdoms}>
                    <h3>
                        Saved wisdoms
                    </h3>
                    <ul>
                        {props.saved.map(zen =>
                            (<li key={zen.id}>
                                {zen.value}
                            </li>)
                        )}
                    </ul>
                </div>
                : null
            }
        </div>
    );
};

Zen.propTypes = {
    zen           : PropTypes.object,
    saved         : PropTypes.instanceOf(Immutable.List).isRequired,
    fetchZen      : PropTypes.func.isRequired,
    saveCurrentZen: PropTypes.func.isRequired
};

export default Zen;
