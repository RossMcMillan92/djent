import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';

import BeatPanel from '../containers/BeatPanel';
import BPMController from '../containers/BPMController';
import LoopController from '../containers/LoopController';
import PresetController from '../containers/PresetController';
import SoundController from '../containers/SoundController';

import BeatsController from '../components/BeatsController';
import FadeController from '../components/FadeController';
import { InstrumentList } from '../components/InstrumentList';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import { updateBeats } from '../actions/beats';

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

class HomeComponent extends Component {
    componentWillMount = () => {
        this.props.actions.applyPreset(this.props.activePresetID);
    }

    render() {
        const totalBeat = this.props.beats.find(beat => beat.id === 'total');
        const beats = this.props.beats
            .filter(beat => beat.id !== 'total')
            .map((beat, i) => (
                <div className="group-spacing-y" key={i}>
                    <BeatPanel beat={ beat } />
                </div>
            ) );

        return (
            <section>
                <div className="group-capped-x group-centered">
                    <DocumentMeta {...metaData} />

                    <div className="group-spacing-x">
                        <div className="group-spacing-y">
                            <div className="panel">
                                <div className="group-padding-x group-padding-y">
                                    <h2 className="title-primary">
                                        Preset
                                    </h2>

                                    <div className="group-spacing-y">
                                        <PresetController />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group-spacing-y">
                            <div className="panel">
                                <div className="group-padding-x group-padding-y">
                                    <h2 className="title-primary">Main Settings</h2>

                                    <div className="group-spacing-y">
                                        <BPMController />
                                    </div>

                                    <div className="group-spacing-y">
                                        <BeatsController
                                            beat={ totalBeat }
                                            actions={{ updateBeats: this.props.actions.updateBeats }}
                                        />
                                    </div>

                                    <div className="group-spacing-y">
                                        <LoopController />
                                    </div>

                                    <div className="group-spacing-y">
                                        <FadeController
                                            fadeIn={this.props.fadeIn}
                                            fadeOut={this.props.fadeOut}
                                            actions={{ updateFadeIn: this.props.actions.updateFadeIn }}
                                        />
                                    </div>

                                    <SoundController />
                                </div>
                            </div>
                        </div>

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
                    </div>

                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        instruments      : state.instruments,
        activePresetID   : state.config.activePresetID,
        allowedLengths   : state.config.allowedLengths,
        bpm              : state.config.bpm,
        isLooping        : state.config.isLooping,
        hitChance        : state.config.hitChance,
        fadeIn           : state.config.fadeIn,
        fadeOut          : state.config.fadeOut,
        beats            : state.beats,
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions,
        updateBeats
    }

    return {
        actions: {
            ...bindActionCreators(actions, dispatch)
        }
    };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export {
    Home
}
