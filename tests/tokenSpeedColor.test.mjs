import assert from 'node:assert/strict';
import { test } from 'node:test';
import { settledTokenSpeedColor, tokenSpeedColor } from '../src/features/chat/ui/message/utils/tokenSpeedColor.js';

test('acceleration is green, deceleration red, and no comparison neutral', () => {
    assert.match(tokenSpeedColor(0.5).color, /hsl\(135 /);
    assert.match(tokenSpeedColor(-0.5).color, /hsl\(6 /);
    assert.match(tokenSpeedColor(0).color, /hsl\(215 /);
});

test('intensity follows normalized increment and clamps invalid input', () => {
    assert.notEqual(tokenSpeedColor(0.1).color, tokenSpeedColor(1).color);
    assert.deepEqual(tokenSpeedColor(100), tokenSpeedColor(1));
    assert.deepEqual(tokenSpeedColor(-100), tokenSpeedColor(-1));
    assert.deepEqual(tokenSpeedColor(undefined), tokenSpeedColor(0));
    assert.deepEqual(tokenSpeedColor(NaN), tokenSpeedColor(0));
});

test('settled speed color compares final speed with peak, independent of last trend', () => {
    assert.match(settledTokenSpeedColor(1).color, /hsl\(135 /);
    assert.match(settledTokenSpeedColor(0).color, /hsl\(6 /);
    assert.notEqual(settledTokenSpeedColor(0.5).color, settledTokenSpeedColor(1).color);
    assert.deepEqual(settledTokenSpeedColor(5), settledTokenSpeedColor(1));
});
