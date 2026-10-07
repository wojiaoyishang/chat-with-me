import assert from 'node:assert/strict';
import { getVisibleProgressSteps, getProgressNodeCapacity } from '../src/components/markdown/card-block/status/progressUtils.js';
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

assert.equal(getProgressNodeCapacity(0),0);
assert.equal(getProgressNodeCapacity(35),0);
assert.equal(getProgressNodeCapacity(36),1);
assert.equal(getProgressNodeCapacity(164),5);
assert.equal(getProgressNodeCapacity(324),10);
for(let width=0;width<=600;width++) {
 const count=getProgressNodeCapacity(width);
 if(count)assert.ok(count*28+(count-1)*4+8<=width);
}

for(let limit=1;limit<=20;limit++) for(let current=1;current<=100;current++) {
 const nodes=getVisibleProgressSteps(current,100,limit);
 assert.equal(nodes.length,limit);
 assert.ok(nodes.includes(current));
}
