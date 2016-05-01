import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import ReactDOM from 'react-dom';

import { App } from '../components/App';

import {
    playSound
} from '../utils/audio';

import {
    generateSequence,
    getSequenceForInstrument,
} from '../utils/sequences';

import {
    getInstruments,
} from '../utils/instruments';

import {
    generateRiff,
} from '../utils/riffs';

import {
    arraySelector,
    repeatArray
} from '../utils/tools';

import { InstrumentList } from '../components/InstrumentList';


const initiateBufferController = (buffer) => {
    const context          = new AudioContext();
    const playButton       = document.querySelector('.js-play');
    const stopButton       = document.querySelector('.js-stop');
    const regenerateButton = document.querySelector('.js-regenerate');
    const loopCheckbox     = document.querySelector('.js-loop');

    let src;

    const play             = () => playSound(context, buffer, context.currentTime, buffer.duration, 1, true);
    const stop             = () => { if (src) src.stop() };
    let isLooping          = loopCheckbox.checked;

    const playEvent = () => {
        stop();
        src = play();
        src.loop = isLooping;
    };

    const stopEvent = stop;

    const regenerateEvent = () => {
        stop();
        deactivate();
        init();
    };

    const loopEvent = (evt) => {
        isLooping = evt.target.checked;
    };

    const deactivate = () => {
        context.close();
        playButton.removeEventListener('click', playEvent);
        stopButton.removeEventListener('click', stopEvent);
        regenerateButton.removeEventListener('click', regenerateEvent);
        loopCheckbox.removeEventListener('change', loopEvent);
    }

    playButton.addEventListener('click', playEvent);
    stopButton.addEventListener('click', stopEvent);
    regenerateButton.addEventListener('click', regenerateEvent);
    loopCheckbox.addEventListener('change', loopEvent);
}

const init = () => {
    const bpm            = parseInt(document.querySelector('.js-bpm').value);
    const totalBeats     = parseInt(document.querySelector('.js-total-beats').value);
    const grooveBeats    = parseInt(document.querySelector('.js-groove-beats').value);
    const instruments    = getInstruments();

    const allowedLengths = arraySelector('.js-lengths')
        .reduce((lengths, cur, index, arr) => {
            const children = Array.from(cur.children);
            const isTriplet = cur.querySelector('.js-triplet').checked;
            const amount = parseInt(cur.querySelector('.js-amount').value);
            const length = parseFloat(cur.dataset.length) * (isTriplet ? 1.5 : 1);

            return [
                ...lengths,
                ...repeatArray([length], amount)
            ]
        }, []);

    if(!allowedLengths.length) return;

    const mainBeat      = generateSequence({ totalBeats: grooveBeats, allowedLengths, hitChance: 1 });
    const crashSequence = getSequenceForInstrument('crash');
    const hihatSequence = getSequenceForInstrument('hihat');
    const snareSequence = getSequenceForInstrument('snare');

    const sequences     = {
        crash  : crashSequence,
        hihat  : hihatSequence,
        kick   : mainBeat,
        guitar : mainBeat,
        snare  : snareSequence
    };

    return generateRiff({ bpm, totalBeats, grooveBeats, allowedLengths, sequences })
}


const metaData = {
  title: 'Redux Easy Boilerplate',
  description: 'Start you project easy and fast with modern tools',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class Home extends Component {

    componentDidMount = () => {
        init()
            .then((buffer) => initiateBufferController(buffer));
    }

    render() {
        return (
        <section>
            <DocumentMeta {...metaData} />
            <InstrumentList instruments={getInstruments()} />
        </section>
    );
    }
}
