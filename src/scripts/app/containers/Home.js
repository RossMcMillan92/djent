import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';

import BPMController from '../containers/BPMController';
import LoopController from '../containers/LoopController';
import FadeController from '../components/FadeController';
import BeatsController from '../components/BeatsController';
import { SoundController } from '../components/SoundController';
import { InstrumentList } from '../components/InstrumentList';
import BeatPanel from '../containers/BeatPanel';

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
    render() {
        const totalBeat = this.props.beats.find(beat => beat.id === 'total');
        const beats = this.props.beats.filter(beat => beat.id !== 'total')
            .map((beat, i) => (
                <div className="group-spacing-x group-spacing-y" key={i}>
                    <BeatPanel beat={ beat } />
                </div>
            ) );

        return (
            <section>
                <div className="group-capped-x group-centered">
                    <DocumentMeta {...metaData} />

                    <div className="group-spacing-y group-spacing-x">
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

                                <SoundController
                                    { ...this.props }
                                />
                            </div>
                        </div>
                    </div>

                    { beats }

                    <div className="group-spacing-y group-spacing-x">
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
            </section>
        );
    }
}

function mapStateToProps(state) {
  return {
    instruments      : state.instruments,
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
