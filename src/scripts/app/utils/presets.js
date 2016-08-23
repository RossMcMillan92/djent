import adtrBreakdown from './presets/adtr-breakdown';
import blackDahlia from './presets/black-dahlia';
// import deftones from './presets/deftones'; // not ready for prime time
// import greenDay from './presets/greenday';
import meshuggah from './presets/meshuggah';
import swornIn from './presets/sworn-in';
import thallBuster from './presets/thall-buster';
import thallBuster2 from './presets/thall-buster-2';
import thallTriplets from './presets/thall-triplets';
import polyrythms from './presets/polyrythms';

import { getAllowedLengthsFromSequence } from './sequences';

const presets = [
    adtrBreakdown,
    blackDahlia,
    // deftones,
    // greenDay,
    meshuggah,
    swornIn,
    thallBuster2,
    thallBuster,
    thallTriplets,
    polyrythms,
];

const backwardsCompatibility = (preset, allowedLengths) => {
    if (preset.settings.beats && preset.settings.beats.length) {
        preset.settings.sequences = preset.settings.beats;
    }

    if (preset.settings.sequences.find(seq => seq.id === 'groove')) {
        preset.settings.sequences = preset.settings.sequences
            .map((seq) => {
                if (seq.id === 'groove') {
                    seq.id = 'CUSTOM_SEQUENCE_1';
                    seq.hitChance = preset.settings.config.hitChance;
                    seq.allowedLengths = getAllowedLengthsFromSequence(preset.settings.instruments.find(i => i.id === 'g').predefinedSequence, allowedLengths);
                }

                return seq;
            });
    }
    return preset;
};

export default presets;

export {
    backwardsCompatibility
};
