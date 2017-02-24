/* @flow */
import React from 'react';
import Immutable from 'immutable';
import classes from './Zen.scss';


import type { ZenObject } from '../interfaces/zen';

type Props = {
    zen: ?ZenObject,
    saved: Array<ZenObject>,
    fetchZen: Function,
    saveCurrentZen: Function
};

export const Zen = (props: Props) => {
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
                            <li key={zen.id}>
                                {zen.value}
                            </li>
                        )}
                    </ul>
                </div>
                : null
            }
        </div>
    );
};

Zen.propTypes = {
    zen           : React.PropTypes.object,
    saved         : React.PropTypes.instanceOf(Immutable.List).isRequired,
    fetchZen      : React.PropTypes.func.isRequired,
    saveCurrentZen: React.PropTypes.func.isRequired
};

export default Zen;
