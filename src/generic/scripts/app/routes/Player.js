import React, { Component } from 'react'
import BeatsController from 'components/BeatsController'
import BPMTapper from 'components/BPMTapper'
import Panel from 'components/Panel'
import BPMController from 'containers/BPMController'
import PlaylistEditor from 'containers/PlaylistEditor'
import PresetManager from 'containers/PresetManager'
import SoundController from 'containers/SoundController'
import Visualiser from 'containers/Visualiser'
import isPhoneGap from 'modules/phonegap'

export default class Player extends Component {

    render = () => {
        const { actions } = this.props
        const totalSequence = this.props.sequences.find(sequence => sequence.id === 'total')

        return (
            <div>
                <Panel sizeY="small">
                    <div className="u-flex-row u-flex-wrap u-flex-justify">
                        <PresetManager />

                        <div className="u-flex-row u-flex-wrap">
                            <div className="group-spacing-y-small u-mr2@above-alpha">
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
                    </div>
                </Panel>

                <Panel theme="alpha">
                    <div className={`visualiser-container ${isPhoneGap ? 'visualiser-container--phonegap' : ''} ${this.props.hasAudioTemplate ? 'is-active' : ''} u-mb05`}>
                        <div className="visualiser-container__backdrop"></div>
                        <div className="u-mb1">
                            <Visualiser />
                        </div>

                        <div className="u-flex-row u-flex-justify-center u-flex-center u-flex-wrap">
                            <SoundController googleAPIHasLoaded={this.props.googleAPIHasLoaded} />
                        </div>
                    </div>
                    <PlaylistEditor />
                </Panel>
            </div>
        )
    }
}
