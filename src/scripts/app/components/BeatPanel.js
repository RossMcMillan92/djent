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
            <section className="panel">
                <div className="group-padding-x group-padding-y">
                    <h2 className="title-primary">Randomised beat: { this.props.beat.id }</h2>

                    <div className="group-spacing-y">
                        <AllowedLengthsController
                            actions={{ updateAllowedLengths: this.props.actions.updateAllowedLengths }}
                            allowedLengths={this.props.allowedLengths}
                        />
                    </div>

                    <div className="group-spacing-y">
                        <BeatsController
                            beat={ this.props.beat }
                            actions={{ updateBeats: this.props.actions.updateBeats }}
                        />
                    </div>

                    <div className="">
                        <HitChanceController
                            beatID={ this.props.beat.id }
                            hitChance={ this.props.hitChance }
                            actions={{ updateHitChance: this.props.actions.updateHitChance }}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export default BeatPanel;
