// UI policy is configurable; every backend adapter must enforce its own rules too.
export function isUploadAllowed(file, policy = {}) {
    if (policy.maxBytes && file.size > policy.maxBytes) return false;
    const types =
        policy.types ||
        policy.accept
            ?.split(',')
            .map((type) => type.trim())
            .filter(Boolean);
    if (
        types?.length &&
        !types.some((type) =>
            type.startsWith('.')
                ? file.name.toLowerCase().endsWith(type.toLowerCase())
                : type.endsWith('/*')
                  ? file.type.startsWith(type.slice(0, -1))
                  : file.type === type,
        )
    )
        return false;
    return !policy.validate || policy.validate(file);
}
