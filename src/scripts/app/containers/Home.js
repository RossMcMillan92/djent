import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';

import BPMController from '../containers/BPMController';
import LoopController from '../containers/LoopController';
import BeatsController from '../components/BeatsController';
import { SoundController } from '../components/SoundController';
import { InstrumentList } from '../components/InstrumentList';
import BeatPanel from '../containers/BeatPanel';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';
import { updateBeats } from '../actions/beats';

const metaData = {
  title: 'DjenerationStation',
  description: 'Start you project easy and fast with modern tools',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
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
                    <BPMController />
                    <LoopController />

                    <h2>Main Beats</h2>

                    <BeatsController
                        beat={ totalBeat }
                        actions={{ updateBeats: this.props.actions.updateBeats }}
                    />

                    <SoundController
                        { ...this.props }
                    />

                    { beats }

                    <InstrumentList
                        actions={{ updateInstrumentSound: this.props.actions.updateInstrumentSound }}
                        instruments={this.props.instruments}
                    />
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
    beats            : state.beats,
    hitChance        : state.config.hitChance,
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
