import { createMediaDirective } from './remarkMediaDirective.js';

/** Render only the literal adjacent `![description](url){type=video}` marker. */
export default createMediaDirective('video');
