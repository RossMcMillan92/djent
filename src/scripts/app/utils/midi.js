import {
    NoteEvent,
    ProgramChangeEvent,
    Track,
    Writer,
} from '../libraries/MidiWriter';

import { initialState as configInitialState } from '../reducers/config';

import { roundToXPlaces } from './tools';

const convertBPMtoMidi = (bpm) => (bpm / 60) * 250;

const getMidiDataFromHitTypes = (sounds, hitTypes) => hitTypes.map((hitType, i) => sounds.find(s => s.id === hitType).midi );

const convertBeatLengthToMidiDuration = (beatLength) => 4 / (beatLength * 4);

const removeXDecimalPlaceWithoutRounding = (value, x) => value.toString().split('.')[1] ? parseFloat(value.toString().slice(0, -x)) : value;

const getTrackFromInstrument = (instrument, channel) => {
    if (!instrument.hitTypes) throw Error('No hitTypes were given');
    const midiData = getMidiDataFromHitTypes(instrument.sounds, instrument.hitTypes);
    const durations = instrument.sequence.map((beat, i) => convertBeatLengthToMidiDuration(beat.beat));

    let tripletCount = {};
    let currentWaitTime = 0;
    const midiNotes = durations.reduce((newArr, duration, i) => {
        const durationName = duration.toString();
        const isTriplet = duration % 0.25 !== 0;
        const volume = instrument.sequence[i].volume * (midiData[i].muted ? .75 : 1);

        if (volume === 0) {
            currentWaitTime += duration;
            return newArr;
        }

        // this section evens out every third triplet
        // if (isTriplet) {
        //     tripletCount[durationName] = tripletCount[durationName] ? tripletCount[durationName] + 1 : 1;
        //     duration = duration;
        //     if (tripletCount[durationName] === 3) {
        //         tripletCount[durationName] = 0;
        //         const targetAmount = duration * 3;
        //         duration = duration + targetAmount;
        //     }
        //
        //     // duration -= .0001;
        // }

        const result = {
            pitch: midiData[i].pitch,
            velocity: volume * 100,
            channel,
            duration
        };

        if (currentWaitTime !== 0) {
            result.wait = currentWaitTime;
            currentWaitTime = 0;
        }

        if (midiData[i].duration && midiData[i].duration < result.duration) {
            currentWaitTime = result.duration - midiData[i].duration;
            result.duration = midiData[i].duration;
        }

        return [
            ...newArr,
            result
        ];
    }, []);

    return midiNotes
}

const getTimemapFromTrack = track => {
    let accumulatedTime = 0;
    return track
        .reduce((newArr, note, i, notes) => {
            const previousNote = notes[i-1];
            // tNeed to do a lot of rounding so timing isn't off when using triplets
            let newAccumulatedTime = accumulatedTime + (note.wait || 0) + (previousNote ? previousNote.duration : 0);
            // switch (roundToXPlaces(newAccumulatedTime - Math.floor(newAccumulatedTime), 4)) {
            //     case 0.001:
            //     case 0.668:
            //     case 0.334:
            //         newAccumulatedTime -= 0.001
            //         break;
            //     case 0.666:
            //     case 0.999:
            //         newAccumulatedTime += 0.001
            //         break;
            // }
            //
            // console.log('roundToXPlaces(newAccumulatedTime, 4)', roundToXPlaces(newAccumulatedTime, 4))
            accumulatedTime = newAccumulatedTime;
            let timestamp = accumulatedTime;
            // if (Math.abs(roundToXPlaces(timestamp, 1) - timestamp) < 0.001) timestamp = roundToXPlaces(timestamp, 1)
            console.log('ACCUMULATEDTIME', accumulatedTime, timestamp)
            accumulatedTime = timestamp;
            return [
                ...newArr,
                { ...note, timestamp }
            ]
        }, [])
}

const combineMultipleTracks = (...tracks) => {
    const newTracks = tracks
        .map(getTimemapFromTrack)

    return newTracks
        .reduce((newArr, track) => [ ...newArr, ...track ], [])
        .sort((a, b) => a.timestamp - b.timestamp)
        .reduce((newArr, note, i, notes) => {
            const previousNote = notes[i-1];
            const nextNote = notes[i+1];
            const wait = i === 0 && note.wait ? note.wait : 0;

            if (previousNote && note.timestamp === previousNote.timestamp) {
                const prevNote = newArr[newArr.length-1];
                return [
                    ...newArr.slice(0, -1),
                    {
                        ...prevNote,
                        duration: nextNote ? nextNote.timestamp - note.timestamp : note.duration,
                        pitch: [ ...prevNote.pitch, ...note.pitch ].sort(),
                    }
                ]
            }

            return [
                ...newArr,
                {
                    ...note,
                    duration: nextNote ? nextNote.timestamp - note.timestamp : note.duration,
                    pitch: note.pitch,
                    wait,
                }
            ]
        }, []);
}

const getMidiTrack = (name, bpm, track, instrumentNumber) => {
    return new Track()
        .setTempo(bpm)
        .addInstrumentName(name)
        .addEvent(
            [
                new ProgramChangeEvent({instrument : instrumentNumber}),
                ...track.map(note => new NoteEvent(note)),
            ]
        );
}

const getBase64FromTracks = (tracks) => {
    return new Writer(tracks).base64();
}

export {
    combineMultipleTracks,
    convertBeatLengthToMidiDuration,
    convertBPMtoMidi,
    getBase64FromTracks,
    getMidiTrack,
    getMidiDataFromHitTypes,
    getTimemapFromTrack,
    getTrackFromInstrument,
}
