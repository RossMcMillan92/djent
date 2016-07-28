import React, { Component } from 'react';

import Panel from '../components/Panel';
import BeatPanel from '../containers/BeatPanel';

export default class Sequences extends Component {
    render = () => {
        const beats = this.props.beats
            .filter(beat => beat.id !== 'total')
            .map((beat, i, arr) => (
                <div key={i} className={`group-padding-y ${i !== arr.length - 1 ? 'u-bdr-b' : ''}`}>
                    <BeatPanel beat={ beat }/>
                </div>
            ));

        return (
            <Panel>
                <h2 className="title-primary">
                    Sequences
                </h2>

                { beats }
            </Panel>
        );
    }
}
