import {executionErrorPresentation} from './executionErrorPresentation.js';

export default function ExecutionErrorMessage({error}) {
    const {message, details} = executionErrorPresentation(error);
    return (
        <div className="min-w-0 max-w-full [overflow-wrap:anywhere]">
            <div className="whitespace-pre-wrap">{message}</div>
            {details && (
                <details className="mt-2 min-w-0 text-xs">
                    <summary className="cursor-pointer select-none opacity-80">错误详情</summary>
                    <pre className="mt-2 max-h-48 max-w-full overflow-y-auto whitespace-pre-wrap rounded-md bg-black/[0.03] p-2 font-mono leading-5 [overflow-wrap:anywhere]">
                        {details}
                    </pre>
                </details>
            )}
        </div>
    );
}
