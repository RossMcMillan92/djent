import React, { Component } from 'react'

import BeatsController from 'components/BeatsController'
import BPMTapper from 'components/BPMTapper'
import Panel from 'components/Panel'
import PresetController from 'components/PresetController'

import BPMController from 'containers/BPMController'
import PlaylistEditor from 'containers/PlaylistEditor'
import SoundController from 'containers/SoundController'
import Visualiser from 'containers/Visualiser'

import presets from 'utils/presets'

export default class Player extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render = () => {
        const { actions, activePresetID } = this.props
        const totalSequence = this.props.sequences.find(sequence => sequence.id === 'total')

        return (
            <div>
                <Panel sizeY="small">
                    <div className="u-flex-row u-flex-wrap u-flex-justify">
                        <div className="group-spacing-y-small u-mr2">
                            <PresetController
                                activePresetID={ activePresetID }
                                onUpdate={ actions.applyPreset }
                                presets={ presets }
                            />
                        </div>

                        <div className="group-spacing-y-small u-mr2">
                            <BeatsController
                                labelPrefix='Total '
                                onUpdate={ actions.updateSequence }
                                sequence={ totalSequence }
                            />
                        </div>

                        <div className="group-spacing-y-small u-flex-row u-flex-end">
                            <div className="u-mr1">
                                <BPMController />
                            </div>
                            <div className="">
                                <BPMTapper onUpdate={actions.updateBPM} />
                            </div>
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
        )
    }
}
