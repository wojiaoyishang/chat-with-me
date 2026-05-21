import React from 'react';

export const CARD_REPLACE_TOKEN_RE = /\{\{cardReplace\s+[^}]*\}\}/g;
export const PROGRESS_LINE_RE = /^\[PROGRESS\s+(\d+)\/(\d+)\]$/;
export const PROGRESS_LINE_GLOBAL_RE = /^[ \t]*\[PROGRESS\s+\d+\/\d+\][ \t]*$/gm;

export const defaultRenderMarkdown = (content) => {
    return <>{content}</>;
};
