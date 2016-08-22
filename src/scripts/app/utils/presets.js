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
    if (preset.settings.beats.length) {
        preset.settings.sequences = preset.settings.beats;
    }

    if (preset.settings.sequences.find(b => b.id === 'groove')) {
        preset.settings.sequences = preset.settings.sequences
            .map((b) => {
                if (b.id === 'groove') {
                    b.id = 'CUSTOM_SEQUENCE_1';
                    b.hitChance = preset.settings.config.hitChance;
                    b.allowedLengths = getAllowedLengthsFromSequence(preset.settings.instruments.find(i => i.id === 'g').predefinedSequence, allowedLengths);
                }

                return b;
            });
    }
    return preset;
};

export default presets;

export {
    backwardsCompatibility
};
