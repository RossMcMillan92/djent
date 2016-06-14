import React, { Component } from 'react';

import AllowedLengthsController from './AllowedLengthsController';
import BeatsController          from './BeatsController';
import HitChanceController      from './HitChanceController';

class BeatPanel extends Component {
    componentWillUpdate = (nextProps) => {
        console.log('lmao1 nextProps  :', nextProps.allowedLengths.map(a => a.amount).toJS())
        console.log('lmao2 this.props :', this.props.allowedLengths.map(a => a.amount).toJS())
        console.log('rofl1 nextProps  :', nextProps.beat)
        console.log('rofl2 this.props :', this.props.beat)
    }

    onHitChanceChange = (event) => {
        const hitChance = parseInt(event.target.value);
        this.props.beat.actions.updateHitChance(hitChance);
    }

    render = () => {
        return (
            <section className="panel">
                <div className="group-padding-x group-padding-y">
                    <h2 className="title-primary">Randomised beat settings</h2>

                    <div className="group-spacing-y u-mb0">
                        <AllowedLengthsController
                            actions={{ updateAllowedLengths: this.props.actions.updateAllowedLengths }}
                            allowedLengths={this.props.allowedLengths}
                        />
                    </div>

                    <div className="grid grid--wide grid--middle">
                        <div className="grid__item w-auto">
                            <BeatsController
                                beat={ this.props.beat }
                                actions={{ updateBeats: this.props.actions.updateBeats }}
                            />
                        </div>

                        <div className="grid__item w-auto">
                            <div className="">
                                <HitChanceController
                                    beatID={ this.props.beat.id }
                                    hitChance={ this.props.hitChance }
                                    actions={{ updateHitChance: this.props.actions.updateHitChance }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default BeatPanel;
