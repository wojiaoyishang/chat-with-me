import { StreamLanguage } from '@codemirror/language';

const KEYWORDS = new Set(['if', 'elif', 'else', 'endif', 'and', 'or', 'not', 'in', 'is', 'true', 'false', 'none']);

/** Presentation-only tokenization. It never evaluates a template or authorizes syntax. */
export const jinjaLanguage = StreamLanguage.define({
    startState: () => ({ mode: null, quote: null, property: false, filter: false }),
    token(stream, state) {
        if (state.mode === 'comment') {
            if (stream.match(/.*?#\}/)) state.mode = null;
            else stream.skipToEnd();
            return 'comment';
        }
        if (!state.mode) {
            if (stream.match('{#')) { state.mode = 'comment'; return 'comment'; }
            if (stream.match('{{')) { state.mode = 'expression'; return 'bracket'; }
            if (stream.match('{%')) { state.mode = 'statement'; return 'bracket'; }
            stream.next();
            while (!stream.eol() && !stream.match(/\{[{%#]/, false)) stream.next();
            return null;
        }
        if (state.quote) {
            let escaped = false;
            while (!stream.eol()) {
                const character = stream.next();
                if (!escaped && character === state.quote) { state.quote = null; break; }
                escaped = !escaped && character === '\\';
            }
            return 'string';
        }
        if (stream.match(state.mode === 'expression' ? /^-?\}\}/ : /^-?%\}/)) {
            state.mode = null;
            state.property = state.filter = false;
            return 'bracket';
        }
        if (stream.eatSpace()) return null;
        if (stream.match(/^["']/)) { state.quote = stream.current(); return 'string'; }
        if (stream.match(/^\d+(?:\.\d+)?/)) return 'number';
        if (stream.match(/^[A-Za-z_][\w]*/)) {
            const word = stream.current();
            const token = state.filter ? 'variableName.function' : state.property ? 'propertyName' : KEYWORDS.has(word) ? 'keyword' : 'variableName';
            state.property = state.filter = false;
            return token;
        }
        const character = stream.next();
        state.property = character === '.';
        state.filter = character === '|';
        return '()[]'.includes(character) ? 'bracket' : 'operator';
    },
    languageData: { commentTokens: { block: { open: '{#', close: '#}' } } },
});

/** Unknown display languages stay plain text rather than loading executable extensions. */
export function codeEditorLanguage(language) {
    return language === 'jinja2' ? jinjaLanguage : [];
}
