import { validateJsonEditors } from '@/components/setting/jsonEditorValidation.js';

/** Field widgets report pending/invalid state without leaking business rules. */
export function validateSettingsScope(scope) {
    if (!scope) return;
    const pending = scope.querySelector('[data-settings-pending="true"]');
    if (pending) throw new Error(pending.dataset.settingsMessage || '请等待当前文件处理完成后再保存。');
    const invalid = scope.querySelector('[data-settings-invalid="true"]');
    if (invalid) throw new Error(invalid.dataset.settingsMessage || '请先修正无效字段。');
    validateJsonEditors(scope);
}
