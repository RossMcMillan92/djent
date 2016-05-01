import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';

import ReactDOM from 'react-dom';

import {
    getInstruments,
} from '../utils/instruments';

import { SoundController } from '../components/SoundController';
import { InstrumentList } from '../components/InstrumentList';

const metaData = {
  title: 'Djent',
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
            <SoundController
                { ...this.props }
            />
            <InstrumentList instruments={getInstruments()} />
        </section>
    );
    }
}

function mapStateToProps(state) {
  return {
    allowedLengths : state.config.allowedLengths,
    bpm            : state.config.bpm,
    totalBeats     : state.config.totalBeats,
    grooveBeats    : state.config.grooveBeats,
  }
}

function mapDispatchToProps(dispatch) {
    return {};
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export {
    Home
}
