import { assoc, map } from "ramda";
import { Maybe, Future as Task } from "ramda-fantasy";
import { PRESETS } from "constants/localStorage";
import { safeGetLocalStorageIO } from "modules/localStorageIO";
import promiseToTask from "modules/promiseToTask";

const initialPresets = [
  {
    id: "meshuggah",
    description: "Meshuggah",
    group: "Artists",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.meshuggah" */ "utils/presets/meshuggah")
    )
  },
  {
    id: "sworn-in",
    description: "Sworn In",
    group: "Artists",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.sworn-in" */ "utils/presets/sworn-in")
    )
  },
  {
    id: "kmac",
    description: "Kmac2021",
    group: "Artists",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.kmac" */ "utils/presets/kmac")
    )
  },
  {
    id: "thall-buster",
    description: "Scratchy heavy",
    group: "Djent",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.thall-buster" */ "utils/presets/thall-buster")
    )
  },
  {
    id: "thall-chicken",
    description: "Scratchy groovy",
    group: "Djent",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.thall-chicken" */ "utils/presets/thall-chicken")
    )
  },
  {
    id: "thall",
    description: "Thall",
    group: "Djent",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.thall" */ "utils/presets/thall")
    )
  },
  {
    id: "thall-triplets",
    description: "Thall (triplets)",
    group: "Djent",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.thall-triplets" */ "utils/presets/thall-triplets")
    )
  },
  {
    id: "black-dahlia",
    description: "Blast Beats",
    group: "Heavy",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.black-dahlia" */ "utils/presets/black-dahlia")
    )
  },
  {
    id: "doom",
    description: "Doom",
    group: "Heavy",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.doom" */ "utils/presets/doom")
    )
  },
  {
    id: "adtr",
    description: "Breakdown",
    group: "Pop Punk",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.adtr-breakdown" */ "utils/presets/adtr-breakdown")
    )
  },
  {
    id: "pop-punk-chorus",
    description: "Chorus",
    group: "Pop Punk",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.pop-punk-chorus" */ "utils/presets/pop-punk-chorus")
    )
  },
  {
    id: "contortionist",
    description: "Poly Chords & Melody",
    group: "Progressive",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.contortionist" */ "utils/presets/contortionist")
    )
  },
  {
    id: "polyrhythms",
    description: "Polyrhythms",
    group: "Progressive",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.polyrhythms" */ "utils/presets/polyrhythms")
    )
  },
  {
    id: "high-tremolo",
    description: "High Tremolo",
    group: "Rock",
    load: promiseToTask(() =>
      import(/* webpackChunkName: "presets.high-tremolo" */ "utils/presets/high-tremolo")
    )
  }
];

const initialState = safeGetLocalStorageIO(PRESETS)
  .map(Maybe.maybe([], JSON.parse))
  .map(map(assoc("group", "Custom")))
  .map(map(preset => assoc("load", Task.of({ default: preset }), preset)))
  .map(ps => initialPresets.concat(ps))
  .runIO();

export default initialState;
