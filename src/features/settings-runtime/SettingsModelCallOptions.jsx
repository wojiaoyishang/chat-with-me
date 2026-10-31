import { lazy, Suspense } from 'react';
import { getValue } from './model.js';
import { Spinner } from '@/components/ui/spinner';
import { workflowModelOptionErrors, workflowModelOptionsDraft } from '../workflows/workflowModelOptionsState.js';

const WorkflowModelOptions = lazy(() => import('../workflows/WorkflowModelOptions.jsx'));

/** One model's invocation options, using the backend's capability declaration. */
export default function SettingsModelCallOptions({ item, value, onChange, context = {} }) {
    const selected = getValue(context.values || {}, item.modelIdField || 'modelId') || item.followModelId;
    const modelId = selected == null ? '' : String(selected);
    const models = (item.models || []).map((model) => String(model.id) === modelId && item.schema
        ? { ...model, callOptionsSchema: item.schema } : model);
    const selectedModel = models.find((model) => String(model.id) === modelId);
    const errors = selectedModel?.callOptionsSchema
        ? workflowModelOptionErrors(workflowModelOptionsDraft(value || {}, selectedModel.callOptionsSchema), selectedModel.callOptionsSchema) : [];
    return <section className="min-w-0 space-y-2" data-settings-model-call-options="true"
        data-settings-invalid={errors.length ? 'true' : undefined} data-settings-message={errors[0]}>
        <div className="text-sm font-medium">{item.text || '模型调用参数'}</div>
        {modelId ? <Suspense fallback={<div role="status" className="flex items-center gap-2 py-2 text-xs text-muted-foreground"><Spinner />正在加载模型参数…</div>}><WorkflowModelOptions value={{ [modelId]: value || {} }} modelIds={[modelId]} models={models}
            disabled={context.disabled || item.disabled} label={item.text || '模型调用参数'}
            onChange={(next) => onChange(next[modelId] || {})} /></Suspense>
            : <p className="text-xs text-muted-foreground">{item.emptyLabel || '选择模型后可配置支持的调用参数。'}</p>}
        {item.description && <p className="text-xs leading-5 text-muted-foreground">{item.description}</p>}
        {errors.length > 0 && <p role="alert" className="text-xs text-destructive">{errors[0]}</p>}
    </section>;
}
