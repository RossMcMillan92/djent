import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount, render } from 'enzyme';
import { BPMController } from 'containers/BPMController'

describe.only('<BPMController />', () => {
    it('renders the value passed as prop BPM', () => {
        const action = {
            type: 'ACTION',
            payload: { bpm: 90 }
        }
        const props = {
            bpm: 90,
            actions: {
                updateBPM: () => {}
            }
        }
        const wrapper = mount(<BPMController {...props} />);
        expect(wrapper.find('input')).to.have.value('90')
    });
    it('fires actions.updateBPM when onChange is fired ', () => {
        const updateBPM = sinon.spy();
        const action = {
            type: 'ACTION',
            payload: { bpm: 90 }
        }
        const props = {
            bpm: 90,
            actions: {
                updateBPM
            }
        }
        const wrapper = mount(<BPMController {...props} />)
            .find('input')
            .simulate('change')

        console.log('WRAPPER', wrapper)
        console.log('UPDATEBPM', updateBPM.called)

        expect(updateBPM.calledOnce).to.equal(true)
    });
});
