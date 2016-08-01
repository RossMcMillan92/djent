import React, { Component } from 'react';

import BeatsController from '../components/BeatsController';
import ExportController from '../components/ExportController';
import Panel from '../components/Panel';

import BPMController from '../containers/BPMController';
import BPMTapper from '../containers/BPMTapper';
import ShareController from '../containers/ShareController';
import PresetController from '../containers/PresetController';
import SoundController from '../containers/SoundController';

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
                        <Panel>
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
                                            <div className="u-flex-grow-1 u-mr1">
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


                <Panel theme="dark" sizeY="small">
                    <div className="u-flex-row u-flex-justify u-flex-center u-flex-wrap">
                        <SoundController
                            usePredefinedSettings={ usePredefinedSettings }
                            generateButtonText={ generateButtonText }
                            enableContinuousGenerationControl={ !isShareRoute }
                        />

                        <div className={`u-flex-row u-flex-wrap u-flex-${isShareRoute ? 'center' : 'start'}`}>
                            <div className={`group-spacing-y-small u-mr05 ${isShareRoute ? '' : 'u-mb0'}`}>
                                <ExportController
                                    instruments={ this.props.instruments }
                                    bpm={ this.props.bpm }
                                    currentBuffer={ this.props.currentBuffer }
                                    actions={{
                                        disableModal: this.props.actions.disableModal,
                                        enableModal: this.props.actions.enableModal,
                                    }}
                                />
                            </div>

                            {
                                isShareRoute
                                ? (
                                    <div className="group-spacing-y-small">
                                        <span className="u-mr05">or</span>
                                        <a className="link-base" onClick={() => this.context.router.push('/')}>
                                            Generate new
                                        </a>
                                    </div>
                                )
                                : (
                                    <div className="group-spacing-y-small">
                                        <ShareController googleAPIHasLoaded={this.props.googleAPIHasLoaded} />
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </Panel>

            </div>

        );
    }
}
