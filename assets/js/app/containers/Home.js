import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import ReactDOM from 'react-dom';

import BPMController from '../containers/BPMController';
import LoopController from '../containers/LoopController';
import { SoundController } from '../components/SoundController';
import { InstrumentList } from '../components/InstrumentList';
import { AllowedLengthsController } from '../components/AllowedLengthsController';

import * as configActions from '../actions/config';
import * as instrumentsActions from '../actions/instruments';

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
        return (
            <section>
                <DocumentMeta {...metaData} />
                <BPMController />
                <LoopController />
                <SoundController
                    { ...this.props }
                />
                <AllowedLengthsController
                    actions={{ updateAllowedLengths: this.props.actions.updateAllowedLengths }}
                    allowedLengths={this.props.allowedLengths}
                />
                <InstrumentList
                    actions={{ updateInstrumentSound: this.props.actions.updateInstrumentSound }}
                    instruments={this.props.instruments}
                />
            </section>
        );
    }
}

function mapStateToProps(state) {
  return {
    instruments    : state.instruments,
    allowedLengths : state.config.allowedLengths,
    bpm            : state.config.bpm,
    isLooping      : state.config.isLooping,
    totalBeats     : state.config.totalBeats,
    grooveBeats    : state.config.grooveBeats,
    hitChance      : state.config.hitChance,
  }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        ...configActions,
        ...instrumentsActions
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
