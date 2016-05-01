import React, { Component } from 'react';

import {
    arraySelector,
    repeatArray
} from '../utils/tools';

import {
    playSound
} from '../utils/audio';

import {
    generateSequence,
    getSequenceForInstrument,
} from '../utils/sequences';

import {
    generateRiff,
} from '../utils/riffs';


const init = () => {
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
}

const getSequences = (grooveBeats, allowedLengths) => {
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

    return sequences;
}

let currentSrc;
let currentBuffer;

const generateNewBuffer = ({ bpm, totalBeats, grooveBeats, allowedLengths }) => {
    const sequences = getSequences(grooveBeats, allowedLengths);

    return generateRiff({ bpm, totalBeats, grooveBeats, allowedLengths, sequences })
        .then((buffer) => {
            currentBuffer = buffer;
            return Promise.resolve(buffer)
        });
}

const context          = new AudioContext();
const stop             = (src) => { if (src) { src.onended = () => {}; src.stop(); } };
const play             = (buffer) => playSound(context, buffer, context.currentTime, buffer.duration, 1, true);
const playEvent = (buffer) => {
    if(!buffer) return;
    let nextBuffer;
    if(currentSrc) stop(currentSrc);
    currentSrc = play(buffer);

    return currentSrc;
}

class SoundController extends Component {
    componentWillMount = () => generateNewBuffer(this.props);

    playEvent = () => {
        console.log('play')
        currentSrc = playEvent(currentBuffer);
    }

    stopEvent = () => {
        console.log('stop')
        stop(currentSrc)
    }

    regenerateEvent = () => {
        console.log('Regenerate')
        stop(currentSrc);
        generateNewBuffer(this.props)
            .then((buffer) => {
                currentSrc = playEvent(buffer);
            })

    }

    render () {
        return (
            <div>
                <button onClick={this.playEvent}>Start</button>
                <button onClick={this.stopEvent}>Stop</button>
                <button onClick={this.regenerateEvent}>Regenerate</button>

                <AllowedLengthsController
                    allowedLengths={this.props.allowedLengths}
                />
            </div>
        );
    }
}

const names = {
    "0.25": 'One whole',
    "0.5": 'One Half',
    "1": 'One Quarter',
    "2": 'One Eighth',
    "4": 'One Sixteenth',
}

class AllowedLengthsController extends Component {
    render () {
        const { allowedLengths } = this.props;

        const allowedLengthsInputs = Object.keys(names)
            .reduce((newObj, id, index, arr) => {
                const name = isTriplet ? names[id / 1.5] : names[id];
                const isTriplet = !name;
                const amount = allowedLengths.reduce((prev, next) => {
                    if (next === parseInt(id)) {
                        return prev + 1;
                    }

                    return prev;
                }, 0);

                return [
                    ...newObj,
                    {
                        id,
                        name,
                        amount
                    }
                ]

            }, {})
            .sort((a, b) => parseInt(a.id) - parseInt(b.id))

        return (
            <div>
                {
                    Object.values(allowedLengthsInputs)
                        .map((length, i) => {
                            return (
                                <div key={i}>
                                    <span>{length.name}: </span>
                                    <span>{length.amount}</span>
                                </div>
                            );
                        })
                }
            </div>
        )


            console.log('ALLOWEDLENGTHSINPUTS', allowedLengthsInputs)

    }
}

export {
    SoundController,
};
