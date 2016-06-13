import React, { Component } from 'react';


class BPMTapper extends Component {
    taps = [];

    onTap = (event) => {
        this.taps.push(Date.now());
        this.taps = this.taps.slice(-4);

        const bpm = this.getAverageBPM(this.taps);
        this.props.actions.updateBPM(bpm);
    }

    getAverageBPM = (taps) => {
        const average = this.taps
            .slice(-4)
            // convert  to differences
            .reduce((result, next, i, arr) => {
                if (i == 0) return [ ...result ];

                const diff = next - arr[i-1];
                return [ ...result, diff ];
            }, [])
            // take average
            .reduce((total, val, i, arr) => (total + val) / (i+1 === arr.length ? arr.length : 1), 0);

        const bpm = average === 0 ? 100 : Math.round(1 / (average / 1000) * 60);
        return bpm;
    }

    render = () => {
        const props = {
            id: 'bpm',
            label: 'BPM',
            type: 'number',
            className: 'button-primary button-primary--small',
            defaultValue: this.props.bpm,
            onChange: this.onBPMChange
        }

        return (
            <button { ...props } onClick={this.onTap}>Tap</button>
        );
    }
}

export default BPMTapper;
