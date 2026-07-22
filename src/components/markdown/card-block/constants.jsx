import React from 'react';

export const CARD_REPLACE_TOKEN_RE = /\{\{cardReplace\s+[^}]*\}\}/g;
export const PROGRESS_LINE_RE = /\[PROGRESS\s+(\d+)\/(\d+)\]/i;
export const PROGRESS_LINE_GLOBAL_RE = /[ \t]*\[PROGRESS\s+\d+\/\d+\][ \t]*(?:\r?\n)?/gi;

export const defaultRenderMarkdown = (content) => {
    return <>{content}</>;
};
