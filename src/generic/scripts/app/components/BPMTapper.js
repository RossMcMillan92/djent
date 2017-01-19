import React, { Component } from 'react'
import { append, compose, flip, slice } from 'ramda'

//    getNewTaps :: [timestamp] -> [timestamp]
const getNewTaps = oldTaps =>
    compose(
        slice(-4, Infinity),
        flip(append)(oldTaps),
        Date.now,
    )(0)

//    getAverageBPM :: [timestamp] -> BPM
const getAverageBPM = (taps) => {
    const average = taps
        // convert  to differences
        .reduce((result, next, i, arr) => {
            if (i === 0) return [ ...result ]
            const diff = next - arr[i - 1]
            return [ ...result, diff ]
        }, [])
        // take average
        .reduce((total, val, i, arr) => (total + val) / (i + 1 === arr.length ? arr.length : 1), 0)

    return average === 0 ? 100 : Math.round((1 / (average / 1000)) * 60)
}

class BPMTapper extends Component {
    taps = []

    shouldComponentUpdate = () => false

    getBPMAndUpdate = compose(
        this.props.onUpdate,
        getAverageBPM,
    )

    onTap = () => {
        this.taps = getNewTaps(this.taps)
        this.getBPMAndUpdate(this.taps)
    }

    render = () => {
        const props = {
            id: 'bpm',
            label: 'BPM',
            type: 'number',
            className: 'button-primary button-primary--small',
        }

        return (
            <button { ...props } onClick={this.onTap}>Tap</button>
        )
    }
}

export default BPMTapper
