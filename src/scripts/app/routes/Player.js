import React, { Component } from 'react';

import BeatsController from '../components/BeatsController';
import Panel from '../components/Panel';

import BPMController from '../containers/BPMController';
import BPMTapper from '../containers/BPMTapper';
import PresetController from '../containers/PresetController';
import SoundController from '../containers/SoundController';
import Visualiser from '../containers/Visualiser';

export default class Player extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render = () => {
        const isShareRoute = this.props.route.id === 'share';
        const totalSequence = this.props.sequences.find(sequence => sequence.id === 'total');
        const usePredefinedSettings = isShareRoute;
        const generateButtonText = isShareRoute ? 'Load' : 'Generate';

        return (
            <div>
                {
                    isShareRoute
                    ? null
                    : (
                        <Panel theme="dark">
                            <h2 className="title-primary">
                                Preset
                            </h2>

                            <PresetController />
                        </Panel>
                    )
                }
                {
                    isShareRoute
                    ? null
                    : (
                        <Panel>
                            <h2 className="title-primary">Main Settings</h2>

                            <div className="grid grid--wide grid--middle">
                                <div className="grid__item one-half alpha--one-whole">
                                    <div className="group-spacing-y-small">
                                        <div className="u-flex-row u-flex-end">
                                            <div className="u-mr1">
                                                <BPMController />
                                            </div>
                                            <div className="">
                                                <BPMTapper />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    isShareRoute
                                    ? null
                                    : (
                                        <div className="grid__item one-half alpha--one-whole">
                                            <div className="group-spacing-y-small">
                                                <BeatsController
                                                    sequence={ totalSequence }
                                                    actions={{ updateSequence: this.props.actions.updateSequence }}
                                                />
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </Panel>
                    )
                }

                <Panel theme="alpha">
                    <div className={`visualiser-container ${this.props.currentAudioTemplate ? 'is-active' : ''}`}>
                        <div className="visualiser-container__backdrop"></div>
                        <div className="u-mb1">
                            <Visualiser />
                        </div>

                        <div className="u-flex-row u-flex-justify-center u-flex-center u-flex-wrap">
                            <SoundController
                                usePredefinedSettings={ usePredefinedSettings }
                                generateButtonText={ generateButtonText }
                                enableContinuousGenerationControl={ !isShareRoute }
                            />
                        </div>
                    </div>
                </Panel>

            </div>

        );
    }
}
