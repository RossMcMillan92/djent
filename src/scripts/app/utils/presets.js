import meshuggah from './presets/meshuggah';
import adtrBreakdown from './presets/adtr-breakdown';
import greenDay from './presets/greenday';
import swornIn from './presets/sworn-in';
import thallBuster from './presets/thall-buster';
import thallBuster2 from './presets/thall-buster-2';
import thallTriplets from './presets/thall-triplets';
import tesseract from './presets/tesseract';

import { getAllowedLengthsFromSequence } from './sequences';

const presets = [
    adtrBreakdown,
    // greenDay,
    meshuggah,
    swornIn,
    thallBuster2,
    thallBuster,
    thallTriplets,
    tesseract,
];

const backwardsCompatibility = (preset, allowedLengths) => {
    if (preset.settings.beats.find(b => b.id === 'groove')) {
        preset.settings.beats = preset.settings.beats
            .map((b, i) => {
                if (b.id === 'groove') {
                    b.id = 'RAND_BEAT_1';
                    b.hitChance = preset.settings.config.hitChance;
                    b.allowedLengths = getAllowedLengthsFromSequence(preset.settings.instruments.find(i => i.id === 'g').predefinedSequence, allowedLengths);
                }

                return b;
            });
    }
    return preset;
}

export default presets;

export {
    backwardsCompatibility
}
