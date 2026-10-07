import assert from 'node:assert/strict';
import { getVisibleProgressSteps } from '../src/components/markdown/card-block/status/progressUtils.js';
assert.deepEqual(getVisibleProgressSteps(0,0),[]);
assert.deepEqual(getVisibleProgressSteps(0,3),[1,2,3]);
assert.deepEqual(getVisibleProgressSteps(0,100),[1,2,3,4,5,6]);
assert.deepEqual(getVisibleProgressSteps(50,100),[48,49,50,51,52,53]);
assert.deepEqual(getVisibleProgressSteps(100,100),[95,96,97,98,99,100]);
for(let current=0;current<=100;current++) {
 const nodes=getVisibleProgressSteps(current,100);
 assert.equal(nodes.length,6);
 assert.ok(nodes.every(n=>n>=1&&n<=100));
 if(current)assert.ok(nodes.includes(current));
}
console.log('Bounded progress checks passed');
