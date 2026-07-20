import assert from "node:assert/strict";
import { paginate } from "./teamLanyards.js";

assert.deepEqual(paginate([1, 2, 3, 4, 5], 4), [[1, 2, 3, 4], [5]]);
assert.deepEqual(paginate([], 4), []);

console.log("teamLanyards checks passed");
