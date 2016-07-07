import heavyGroove from './presets/heavy-groove';
import adtrBreakdown from './presets/adtr-breakdown';
import greenDay from './presets/greenday';
import swornIn from './presets/sworn-in';
import thallBuster from './presets/thall-buster';
import thallBuster2 from './presets/thall-buster-2';
import thallTriplets from './presets/thall-triplets';
import tesseract from './presets/tesseract';

const presets = [
    adtrBreakdown,
    // greenDay,
    heavyGroove,
    swornIn,
    thallBuster2,
    thallBuster,
    thallTriplets,
    tesseract,
];

if (window.location.href.includes('godmode=1')) presets.push(greenDay)

export default presets;
