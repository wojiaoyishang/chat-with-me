import { parse } from '@cwm/json-config-editor';

export const ARGV_SCHEMA = { type: 'array', minItems: 1, maxItems: 100, items: { type: 'string' } };
export const ARGV_UI = { itemLabel: (index) => index === 0 ? '程序' : `参数 ${index}` };
export const validateArgv = (argv) => argv[0]?.trim() ? [] : [{ path: '/0', message: '程序不能为空' }];

export function commandRows(profile) {
    return Object.entries(profile?.commands || {}).map(([id, spec]) => ({
        key: crypto.randomUUID(),
        id,
        argv: JSON.stringify(spec.argv || []),
        cwd: spec.cwd || '.',
        timeout: spec.timeoutSeconds || 300,
        extra: !!spec.allowExtraArgs,
    }));
}
export function commandProfileFromRows(rows, profile = {}, invalidMessage = 'Invalid command configuration') {
    const commands = {};
    for (const row of rows) {
        const id = row.id.trim();
        if (!id || Object.hasOwn(commands, id)) throw new Error(invalidMessage);
        let argv;
        try {
            const result = parse(row.argv, ARGV_SCHEMA);
            if (result.errors.length || validateArgv(result.value).length) throw new Error(invalidMessage);
            argv = result.value;
        } catch {
            throw new Error(invalidMessage);
        }
        commands[id] = {
            argv,
            cwd: row.cwd.trim() || '.',
            timeoutSeconds: Number(row.timeout),
            allowExtraArgs: row.extra,
        };
    }
    return { ...profile, commands };
}
