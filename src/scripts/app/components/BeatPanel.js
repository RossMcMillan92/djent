import React, { Component } from 'react';

import AllowedLengthsController from './AllowedLengthsController';
import BeatsController          from './BeatsController';
import HitChanceController      from './HitChanceController';

class BeatPanel extends Component {
    onHitChanceChange = (hitChance) => {
        this.props.actions.updateBeats(this.props.beat.id, 'hitChance', hitChance);
    }

    onAllowedLengthsChange = (allowedLengths) => {
        this.props.actions.updateBeats(this.props.beat.id, 'allowedLengths', allowedLengths);
    }

    render = () => {
        return (
            <div>
                <h2 className="title-primary">Randomised beat settings</h2>

                <div className="group-spacing-y u-mb0">
                    <AllowedLengthsController
                        actions={{ updateAllowedLengths: this.onAllowedLengthsChange }}
                        allowedLengths={this.props.beat.allowedLengths}
                    />
                </div>

                <div className="grid grid--wide grid--middle">
                    <div className="grid__item one-half alpha--one-whole u-mb1@alpha">
                        <HitChanceController
                            beatID={ this.props.beat.id }
                            hitChance={ this.props.beat.hitChance }
                            actions={{ updateHitChance: this.onHitChanceChange }}
                        />
                    </div>

                    <div className="grid__item one-half alpha--one-whole">
                        <BeatsController
                            beat={ this.props.beat }
                            actions={{ updateBeats: this.props.actions.updateBeats }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BeatPanel;
