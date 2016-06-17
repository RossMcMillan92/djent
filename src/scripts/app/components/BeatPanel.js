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
            <div>
                <h2 className="title-primary">Randomised beat settings</h2>

                <div className="group-spacing-y u-mb0">
                    <AllowedLengthsController
                        actions={{ updateAllowedLengths: this.props.actions.updateAllowedLengths }}
                        allowedLengths={this.props.allowedLengths}
                    />
                </div>

                <div className="grid grid--wide grid--middle">
                    <div className="grid__item one-half alpha--one-whole">
                        <HitChanceController
                            beatID={ this.props.beat.id }
                            hitChance={ this.props.hitChance }
                            actions={{ updateHitChance: this.props.actions.updateHitChance }}
                        />
                    </div>

                    <div className="grid__item one-half alpha--one-whole">
                        <div className="">
                            <BeatsController
                                beat={ this.props.beat }
                                actions={{ updateBeats: this.props.actions.updateBeats }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BeatPanel;
