import { createMediaDirective } from './remarkMediaDirective.js';

/** Render only the literal adjacent `![description](url){type=audio}` marker. */
export default createMediaDirective('audio');
