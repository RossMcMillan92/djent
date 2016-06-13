import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import BeatPanel from '../containers/BeatPanel';
import BPMController from '../containers/BPMController';
import BPMTapper from '../containers/BPMTapper';
import ContinuousGenerationController from '../containers/ContinuousGenerationController';
import FadeController from '../containers/FadeController';
import LoopController from '../containers/LoopController';
import PresetController from '../containers/PresetController';
import SoundController from '../containers/SoundController';

import BeatsController from '../components/BeatsController';
import Expandable from '../components/Expandable';
import InstrumentList from '../components/InstrumentList';

const metaData = {
  title: 'Djeneration Station',
  description: 'A random metal riff generator. Thall.',
  canonical: 'http://djenerationstation.com',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'djeneration, station, react, redux, metal, riff, generator, thall, djent',
    },
  },
};

export default class Home extends Component {
    componentWillMount = () => {
        this.props.actions.applyPreset(this.props.activePresetID);
    }

    render = () => {
        const totalBeat = this.props.beats.find(beat => beat.id === 'total');
        const beats = this.props.beats
            .filter(beat => beat.id !== 'total')
            .map((beat, i) => (
                    <div className="group-spacing-y" key={i}>
                        <BeatPanel beat={ beat } />
                    </div>
                )
            );

        return (
            <section>
                <div className="group-capped-x group-centered">
                    <DocumentMeta {...metaData} />

                    <div className="group-spacing-x">
                        <div className="group-spacing-y">
                            <h1 className="title-primary">
                                Djenerator
                            </h1>
                        </div>
                    </div>

                    <div className="group-spacing-x">
                        <div className="group-spacing-y">
                            <div className="panel">
                                <div className="group-padding-x group-padding-y">
                                    <h2 className="title-primary">
                                        Preset
                                    </h2>

                                    <PresetController />
                                </div>
                            </div>
                        </div>

                        <div className="group-spacing-y">
                            <div className="panel">
                                <div className="group-padding-x group-padding-y-small">
                                    <h2 className="title-primary u-mt05">Main Settings</h2>

                                    <div className="grid grid--wide grid--middle">
                                        <div className="grid__item w-auto">
                                            <div className="group-spacing-y-small">
                                                <div className="grid grid--bottom">
                                                    <div className="grid__item w-auto">
                                                        <BPMController />
                                                    </div>
                                                    <div className="grid__item w-auto">
                                                        <BPMTapper />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid__item w-auto">
                                            <div className="group-spacing-y-small">
                                                <BeatsController
                                                    beat={ totalBeat }
                                                    actions={{ updateBeats: this.props.actions.updateBeats }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel panel--dark">
                                <div className="group-padding-x group-padding-y-small">
                                    <div className="grid grid--wide grid--middle">
                                        <div className="grid__item w-auto">
                                            <div className="group-spacing-y-small">
                                                <SoundController />
                                            </div>
                                        </div>

                                        <div className="grid__item w-auto">
                                            <div className="group-spacing-y-small">
                                                <LoopController />
                                            </div>
                                        </div>

                                        <div className="grid__item w-auto">
                                            <div className="group-spacing-y-small">
                                                <ContinuousGenerationController />
                                            </div>
                                        </div>

                                        <div className="grid__item w-auto">
                                            <div className="group-spacing-y-small">
                                                <FadeController />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Expandable
                            title="Advanced Settings"
                            titleClassName="u-curp u-mb1"
                            enableStateSave={true}
                        >
                            { beats }

                            <div className="group-spacing-y">
                                <div className="panel">
                                    <div className="group-padding-x group-padding-y">
                                        <h2 className="title-primary">Sounds</h2>

                                        <InstrumentList
                                            actions={{ updateInstrumentSound: this.props.actions.updateInstrumentSound }}
                                            instruments={this.props.instruments}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Expandable>

                    </div>

                </div>
            </section>
        );
    }
}
