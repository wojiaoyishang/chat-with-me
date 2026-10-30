/** Display-only projection of backend-authored message provenance.
 *
 * Nothing in this projection selects a recipient or grants a model role. Only
 * the explicitly allowed public fields are rendered; transport data stays out
 * of the DOM even when an older snapshot contains additional properties.
 */
const record = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const text = (value, limit = 240) => typeof value === 'string' ? value.trim().slice(0, limit) : '';

export function normalizeMessageOrigin(value) {
    const origin = record(value);
    const source = record(origin.source);
    const sender = record(origin.sender);
    const group = origin.conversationType === 'group';
    const platform = text(source.platform || origin.platformLabel || origin.platform, 80);
    const type = text(source.type || origin.type || (group ? '群组' : origin.platform || origin.platformLabel || origin.contactName ? '联系人' : ''), 40);
    const name = text(source.name || origin.name || (group ? origin.groupName || origin.contactName : origin.contactName));
    const senderName = text(sender.name || origin.senderName);
    return {
        kind: text(origin.kind, 40) || 'automation',
        label: text(origin.label, 80) || '自动触发',
        platform,
        type,
        name,
        remark: text(typeof source.remark === 'string' ? source.remark : origin.remark, 2000),
        senderName,
        senderRemark: text(typeof sender.remark === 'string' ? sender.remark : origin.senderRemark, 2000),
        // Provider IDs and callback tokens are deliberately never a fallback.
        messageId: /^botmsg_[a-zA-Z0-9-]{1,80}$/.test(text(origin.messageId, 100)) ? text(origin.messageId, 100) : '',
        senderVisible: Boolean(senderName && senderName !== name && (group || type !== '联系人')),
    };
}

export function messageAutomationOrigin(message) {
    const extra = record(message?.extraInfo || message?.extra_info);
    const explicit = record(extra.messageOrigin);
    // This public field is written by the backend's message projection, not
    // inferred from role, body text or a provider-specific label. Generic
    // timers can have no contact details and still be automatic inputs.
    if (Object.hasOwn(record(message), 'messageSource')) {
        return message.messageSource === 'automation' ? normalizeMessageOrigin(explicit) : null;
    }
    if (explicit.kind === 'automation') {
        return explicit.direction === 'inbound' ? normalizeMessageOrigin(explicit) : null;
    }
    const automation = record(extra.automation);
    const origin = record(automation.origin);
    if (!automation.dispatchId || !Object.keys(origin).length || origin.direction === 'outbound') return null;
    if (origin.direction === 'inbound') return normalizeMessageOrigin(origin);
    // Historic ordinary input snapshots already carried automation metadata,
    // but generated assistant placeholders reused it. Do not label those as
    // incoming messages merely because they have an automation ancestor.
    const role = message?.role || (message?.position === 'right' ? 'user' : message?.position === 'mid' ? 'system' : 'assistant');
    if (role === 'assistant' || (automation.messageRole && role !== automation.messageRole)) return null;
    return normalizeMessageOrigin(origin);
}

export function messageOriginSummary(value) {
    const origin = normalizeMessageOrigin(value);
    return [origin.platform, origin.name && `${origin.type ? `${origin.type}：` : ''}${origin.name}`,
        origin.senderVisible && `发送者：${origin.senderName}`].filter(Boolean).join(' · ');
}
