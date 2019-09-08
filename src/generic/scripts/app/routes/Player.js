import React from 'react'
import BeatsController from 'components/BeatsController'
import BPMTapper from 'components/BPMTapper'
import Panel from 'components/Panel'
import MasterBPM from 'containers/MasterBPM'
import PlaylistEditor from 'containers/PlaylistEditor'
import PresetManager from 'containers/PresetManager'
import SoundController from 'containers/SoundController'
import Visualiser from 'containers/Visualiser'

const Player = ({ actions, googleAPIHasLoaded, sequences }) => {
  const totalSequence = sequences.find(sequence => sequence.id === 'total')

  return (
    <div>
      <Panel theme="alpha">
        <div className="u-flex-row u-flex-wrap u-flex-justify">
          <div className="group-spacing-y u-flex-grow-1 u-mr2@above-alpha">
            <PresetManager />
          </div>

          <div className="group-spacing-y-small u-flex-row u-flex-wrap">
            <div className="group-spacing-y-small u-mr2@above-alpha">
              <BeatsController
                labelPrefix="Total "
                onUpdate={actions.updateSequence}
                sequence={totalSequence}
                theme="light"
              />
            </div>

            <div className="group-spacing-y-small u-flex-row u-flex-end">
              <div className="u-mr1">
                <MasterBPM />
              </div>
              <div className="">
                <BPMTapper onUpdate={actions.updateBPM} />
              </div>
            </div>
          </div>
        </div>

        <div className="u-mb1">
          <Visualiser />
        </div>

        <div className="u-flex-row u-flex-justify-center u-flex-center u-flex-wrap">
          <SoundController googleAPIHasLoaded={googleAPIHasLoaded} />
        </div>
        <PlaylistEditor />
      </Panel>
    </div>
  )
}

export default Player
