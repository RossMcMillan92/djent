import React, { Component } from 'react';

import BeatsController from '../components/BeatsController';
import Panel from '../components/Panel';

import BPMController from '../containers/BPMController';
import BPMTapper from '../containers/BPMTapper';
import PlaylistEditor from '../containers/PlaylistEditor';
import PresetController from '../containers/PresetController';
import SoundController from '../containers/SoundController';
import Visualiser from '../containers/Visualiser';

export default class Player extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render = () => {
        const isShareRoute = false;
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
                            <div className="u-flex-row u-flex-center">
                                <h2 className="title-primary u-mr1 u-mb0">
                                    Preset:
                                </h2>

                                <PresetController />
                            </div>
                        </Panel>
                    )
                }
                {
                    isShareRoute
                    ? null
                    : (
                        <Panel>
                            <div className="u-flex-row u-flex-wrap">
                                <div className="group-spacing-y-small u-flex-row u-flex-end u-mr1">
                                    <div className="u-mr1">
                                        <BPMController />
                                    </div>
                                    <div className="">
                                        <BPMTapper />
                                    </div>
                                </div>

                                {
                                    isShareRoute
                                    ? null
                                    : (
                                        <div className="group-spacing-y-small">
                                            <BeatsController
                                                sequence={ totalSequence }
                                                actions={{ updateSequence: this.props.actions.updateSequence }}
                                                labelPrefix='Total '
                                            />
                                        </div>
                                    )
                                }

                            </div>
                        </Panel>
                    )
                }

                <Panel theme="alpha">
                    <div className={`visualiser-container ${this.props.hasAudioTemplate ? 'is-active' : ''} u-mb1`}>
                        <div className="visualiser-container__backdrop"></div>
                        <div className="u-mb1">
                            <Visualiser googleAPIHasLoaded={this.props.googleAPIHasLoaded} />
                        </div>

                        <div className="u-flex-row u-flex-justify-center u-flex-center u-flex-wrap">
                            <SoundController
                                usePredefinedSettings={ usePredefinedSettings }
                                generateButtonText={ generateButtonText }
                                enableContinuousGenerationControl={ !isShareRoute }
                            />
                        </div>
                    </div>
                    <PlaylistEditor />
                </Panel>

                {
                    isShareRoute
                    ? (
                        <div className="group-padding-y u-tac">
                            <p>or</p>
                            <p className="u-mt1">
                                <a className="button-primary button-primary--gamma" onClick={() => this.context.router.push('/')}>Generate new</a>
                            </p>
                        </div>
                    )
                    : null
                }

            </div>

        );
    }
}
