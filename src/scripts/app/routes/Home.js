import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { compress, decompress } from 'lzutf8';

import BeatsController from '../components/BeatsController';
import Expandable from '../components/Expandable';
import InstrumentList from '../components/InstrumentList';
import Panel from '../components/Panel';
import Spinner from '../components/Spinner';

import BeatPanel from '../containers/BeatPanel';
import BPMController from '../containers/BPMController';
import BPMTapper from '../containers/BPMTapper';
import ContinuousGenerationController from '../containers/ContinuousGenerationController';
import FadeController from '../containers/FadeController';
import LoopController from '../containers/LoopController';
import Modal from '../containers/Modal';
import ShareController from '../containers/ShareController';
import PresetController from '../containers/PresetController';
import SoundController from '../containers/SoundController';

import presets from '../utils/presets';
import { getAllowedLengthsFromSequence } from '../utils/sequences';
import { getActiveSoundsFromHitTypes } from '../utils/instruments';
import { getHashQueryParam, loadScript } from '../utils/tools';

const googleAPIKey = 'AIzaSyCUN26hzVNf0P_ED_oALvsVx3ffmyzliOI';
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

export default class Home extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    state = {
        googleAPIHasLoaded: false
    }

    componentWillMount = () => {
        this.handleGoogleAPI();

        if (!this.props.params.shareID) return this.props.actions.applyPreset({ ...presets.find(preset => preset.id === this.props.activePresetID) });

        this.props.actions.enableModal({
            content: (<Spinner subtext="Loading riff" />)
        });
    }

    handleGoogleAPI = () => {
        loadScript('https://apis.google.com/js/client.js?onload=handleClientLoad')
        const handleClientLoad = () => {
            gapi.client.setApiKey(googleAPIKey);
            gapi.client.load('urlshortener', 'v1')
                .then(() => {
                    if (this.props.params.shareID) {
                        this.getPresetData(this.props.params.shareID)
                            .then(this.handlePreset);
                    }
                    this.setState({ googleAPIHasLoaded: true })
                });
        }
        window.handleClientLoad = handleClientLoad
    }

    getPresetData = (shareID) => {
        return gapi.client.urlshortener.url.get({
              'shortUrl': `http://goo.gl/${shareID}`
            })
            .then((response) => {
                return getHashQueryParam('share',response.result.longUrl)
            }, (reason) => {
                console.log('Error: ' + reason.result.error.message);
            })
    }

    handlePreset = (data) => {
        if (!data) return;

        const decompressedData = data
                              && data.length % 4 === 0
                              && decompress(data, {inputEncoding: 'Base64'});
        const preset = /[A-Za-z0-9+/=]/.test(decompressedData) ? JSON.parse(decompressedData) : false;

        if (!preset) {
            this.props.actions.applyPreset({ ...presets.find(preset => preset.id === this.props.activePresetID) });
            this.props.actions.disableModal();
            return;
        }

        preset.settings.config.allowedLengths = getAllowedLengthsFromSequence(preset.settings.instruments.find(i => i.id === 'g').predefinedSequence, this.props.allowedLengths)
        preset.settings.instruments = preset.settings.instruments
            .map(i => ({ ...i, sounds: getActiveSoundsFromHitTypes(i.predefinedHitTypes) }))

        this.props.actions.applyPreset(preset);
        this.props.actions.disableModal();
        return
    }

    render = () => {
        const totalBeat = this.props.beats.find(beat => beat.id === 'total');
        const beats = this.props.beats
            .filter(beat => beat.id !== 'total')
            .map((beat, i) => (
                    <div className="group-spacing-y" key={i}>
                        <BeatPanel beat={ beat } />
                    </div>
                )
            );
            console.log('props', this.props)
console.log('context', this.context)
        return (
            <section>
                <DocumentMeta {...metaData} />
                <Modal />
                <div className="group-capped-x group-centered">

                    <div className="group-spacing-x">
                        <div className="group-spacing-y-large">
                            <h1 className="title-primary u-txt-light">
                                Djenerator
                            </h1>
                        </div>
                    </div>

                    <div className="group-spacing-x">
                        <div className="group-spacing-y">
                            <Panel>
                                <h2 className="title-primary">
                                    Preset
                                </h2>

                                <PresetController />
                            </Panel>
                        </div>

                        <div className="group-spacing-y">
                            <Panel>
                                <h2 className="title-primary u-mt05">Main Settings</h2>

                                <div className="grid grid--wide grid--middle">
                                    <div className="grid__item one-half alpha--one-whole">
                                        <div className="group-spacing-y-small">
                                            <div className="u-flex-row u-flex-end">
                                                <div className="u-flex-grow-1 u-mr1">
                                                    <BPMController />
                                                </div>
                                                <div className="">
                                                    <BPMTapper />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid__item one-half alpha--one-whole">
                                        <div className="group-spacing-y-small">
                                            <BeatsController
                                                beat={ totalBeat }
                                                actions={{ updateBeats: this.props.actions.updateBeats }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Panel>

                            <Panel theme="dark" sizeY="small">
                                <div className="grid grid--wide grid--middle">
                                    <div className="grid__item w-auto">
                                        <div className="group-spacing-y-small">
                                            <SoundController />
                                        </div>
                                    </div>

                                    {
                                        this.props.route.id === 'share'
                                        ? (
                                            <a href="javascript:void(0)" onClick={() => this.context.router.push('/')}>
                                                Generate new riff
                                            </a>
                                        )
                                        : (
                                            <div>
                                                <div className="grid__item w-auto">
                                                    <div className="group-spacing-y-small">
                                                        <LoopController />
                                                    </div>
                                                </div>

                                                <div className="grid__item w-auto u-self-end">
                                                    <div className="group-spacing-y-small">
                                                        <ShareController googleAPIHasLoaded={this.state.googleAPIHasLoaded} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {/*<div className="grid__item w-auto">
                                        <div className="group-spacing-y-small">
                                            <ContinuousGenerationController />
                                        </div>
                                    </div>

                                    <div className="grid__item w-auto">
                                        <div className="group-spacing-y-small">
                                            <FadeController />
                                        </div>
                                    </div>*/}
                                </div>
                            </Panel>
                        </div>

                        <Expandable
                            title="Advanced Settings"
                            titleClassName="u-curp u-mb1 u-txt-light"
                            enableStateSave={true}
                        >
                            <Panel>
                                { beats }
                            </Panel>

                            <div className="group-spacing-y">
                                <Panel>
                                    <h2 className="title-primary">Sounds</h2>

                                    <InstrumentList
                                        actions={{ updateInstrumentSound: this.props.actions.updateInstrumentSound }}
                                        instruments={this.props.instruments}
                                    />
                                </Panel>
                            </div>
                        </Expandable>

                    </div>

                </div>
            </section>
        );
    }
}
