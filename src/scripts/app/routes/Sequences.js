import React, { Component } from 'react';

import Panel from '../components/Panel';
import BeatPanel from '../containers/BeatPanel';

export default class Sequences extends Component {
    render = () => {
        const beats = this.props.beats
            .filter(beat => beat.id !== 'total')
            .map((beat, i) => <Panel key={i}><BeatPanel beat={ beat }/></Panel> );

        return (
            <div>
                { beats }
            </div>
        );
    }
}
