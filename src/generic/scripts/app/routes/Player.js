import React, { Component } from 'react';

import BeatsController from 'components/BeatsController';
import Panel from 'components/Panel';

import BPMController from 'containers/BPMController';
import BPMTapper from 'containers/BPMTapper';
import PlaylistEditor from 'containers/PlaylistEditor';
import PresetController from 'containers/PresetController';
import SoundController from 'containers/SoundController';
import Visualiser from 'containers/Visualiser';

export default class Player extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render = () => {
        const totalSequence = this.props.sequences.find(sequence => sequence.id === 'total');

        return (
            <div>
                <Panel theme="dark">
                    <div className="u-flex-row u-flex-center">
                        <h2 className="title-primary u-mr1 u-mb0">
                            Preset:
                        </h2>

                        <PresetController />
                    </div>
                </Panel>
                <Panel>
                    <div className="u-flex-row u-flex-wrap">
                        <div className="group-spacing-y-small u-flex-row u-flex-end u-mr2">
                            <div className="u-mr1">
                                <BPMController />
                            </div>
                            <div className="">
                                <BPMTapper />
                            </div>
                        </div>

                        <div className="group-spacing-y-small">
                            <BeatsController
                                sequence={ totalSequence }
                                actions={{ updateSequence: this.props.actions.updateSequence }}
                                labelPrefix='Total '
                            />
                        </div>

                    </div>
                </Panel>

                <Panel theme="alpha">
                    <div className={`visualiser-container ${this.props.hasAudioTemplate ? 'is-active' : ''} u-mb1`}>
                        <div className="visualiser-container__backdrop"></div>
                        <div className="u-mb1">
                            <Visualiser googleAPIHasLoaded={this.props.googleAPIHasLoaded} />
                        </div>

                        <div className="u-flex-row u-flex-justify-center u-flex-center u-flex-wrap">
                            <SoundController />
                        </div>
                    </div>
                    <PlaylistEditor />
                </Panel>
            </div>
        );
    }
}
