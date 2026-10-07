import assert from 'node:assert/strict';
import {parseTimestamp,formatLocalTimestamp,resolveClientText} from '../src/lib/clientText.js';
assert.equal(parseTimestamp('2026-10-07T11:00:00'),null);
assert.equal(parseTimestamp('2026-02-30T11:00:00Z'),null);
assert.equal(parseTimestamp('2026-10-07T24:00:00Z'),null);
assert.equal(parseTimestamp('2026-10-07T11:00:00Z').toISOString(),'2026-10-07T11:00:00.000Z');
const marker='{{datetime:2026-10-07T11:00:00Z}}';
assert.equal(resolveClientText(marker),marker);
assert.equal(resolveClientText(marker,{useTextFormat:true,locale:'en-GB',timeZone:'Asia/Shanghai'}),formatLocalTimestamp('2026-10-07T11:00:00Z',{useTextFormat:true,locale:'en-GB',timeZone:'Asia/Shanghai'}));
assert.match(resolveClientText(marker,{useTextFormat:true,locale:'en-GB',timeZone:'Asia/Shanghai'}),/19:00:00/);
assert.match(resolveClientText(marker,{useTextFormat:true,locale:'en-GB',timeZone:'UTC'}),/11:00:00/);
assert.equal(resolveClientText('{{datetime:invalid}}',{useTextFormat:true}),'{{datetime:invalid}}');
assert.equal(resolveClientText('<b>正文</b>'),'<b>正文</b>');
console.log('Client text and UTC timestamp checks passed');

assert.equal(resolveClientText(marker,{useTextFormat:false}),marker);
assert.equal(resolveClientText(marker,{useTextFormat:'true'}),marker);
