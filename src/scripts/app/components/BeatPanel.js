import React, { Component } from 'react';

import AllowedLengthsController from './AllowedLengthsController';
import BeatsController          from './BeatsController';
import HitChanceController      from './HitChanceController';

class BeatPanel extends Component {
    onHitChanceChange = (event) => {
        const hitChance = parseInt(event.target.value);
        this.props.beat.actions.updateHitChance(hitChance);
    }

    render = () => {
        return (
            <section>
                <h2>{ this.props.beat.id }</h2>
                <AllowedLengthsController
                    actions={{ updateAllowedLengths: this.props.actions.updateAllowedLengths }}
                    allowedLengths={this.props.allowedLengths}
                />
                <BeatsController
                    beat={ this.props.beat }
                    actions={{ updateBeats: this.props.actions.updateBeats }}
                />
                <HitChanceController
                    beatID={ this.props.beat.id }
                    hitChance={ this.props.hitChance }
                    actions={{ updateHitChance: this.props.actions.updateHitChance }}
                />
            </section>
        );
    }
}

export default BeatPanel;
