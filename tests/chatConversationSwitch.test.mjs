import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs
  .readFileSync("src/features/chat/ChatPage.jsx", "utf8")
  .replace(/\r\n/g, "\n");

const effectSource = (startMarker, endMarker) => {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1);
  const end = source.indexOf(endMarker, start);
  assert.notEqual(end, -1);
  return source.slice(start, end);
};

const runEffect = (body, scope) => {
  const names = Object.keys(scope);
  const evaluate = new Function(
    ...names,
    `const streamBatchRef = {current: null}; let cleanup; const useEffect = (callback) => { cleanup = callback(); };\n${body}\nreturn cleanup;`,
  );
  return evaluate(...Object.values(scope));
};

const resetEffect = effectSource(
  "    useEffect(() => {\n        const previousConversationId = previousConversationIdRef.current;",
  "\n    useEffect(() => {\n        if (!conversationId) return undefined;",
);
const bootstrapEffect = effectSource(
  "    useEffect(() => {\n        if (isNewConversationIdRef.current) {",
  "\n    const handleSidebarToggle",
);

test("switching an existing conversation clears its visible messages while adopting a new chat ID preserves its first turn", () => {
  const makeScope = (previousId, nextId, adopting = false) => {
    const state = {
      messages: { old: { content: "旧对话" } },
      order: ["old"],
      settings: { model: "draft" },
    };
    const errorToasts = new Map([["old-error", true]]);
    const dismissed = [];
    const scope = {
      previousConversationIdRef: { current: previousId },
      turnSubmissionRef: { current: null },
      setTurnSubmission() {},
      conversationId: nextId,
      isNewConversationIdRef: { current: adopting },
      liveStreamMessageIdsRef: { current: new Set(["old"]) },
      liveStreamRunMessagesRef: { current: new Map([["old", {}]]) },
      lastHydratedConversationIdRef: { current: previousId },
      realtimeVoiceOpenRef: { current: false },
      realtimeVoiceStopRef: { current: null },
      clearWorkspaceTransfers() {},
      setSettingsInstanceKey() {},
      setInitialSettingValues(value) {
        state.initialSettings = value;
      },
      setAdvancedSettingsValues(value) {
        state.settings = value;
      },
      setConversationMeta() {},
      applyContextCompactionState() {},
      setAdvancedSettings() {},
      setMessages(value) {
        state.messages = value;
      },
      messagesRef: { current: state.messages },
      setMessagesOrder(value) {
        state.order = value;
      },
      messagesOrderRef: { current: state.order },
      isMessageLoadedRef: { current: true },
      setIsLoadingError() {},
      errorToastsIds: { current: errorToasts },
      toast: {
        dismiss(id) {
          dismissed.push(id);
        },
      },
    };
    return { state, scope, dismissed };
  };

  const switched = makeScope("old", "next");
  runEffect(resetEffect, switched.scope);
  assert.deepEqual(switched.state.messages, {});
  assert.deepEqual(switched.state.order, []);
  assert.equal(switched.scope.messagesRef.current, switched.state.messages);
  assert.equal(switched.scope.messagesOrderRef.current, switched.state.order);
  assert.equal(switched.scope.lastHydratedConversationIdRef.current, null);
  assert.equal(switched.scope.isMessageLoadedRef.current, false);
  assert.deepEqual(switched.dismissed, ["old-error"]);

  const adopted = makeScope(null, "first-id", true);
  runEffect(resetEffect, adopted.scope);
  assert.deepEqual(adopted.state.order, ["old"]);
  assert.equal(adopted.state.messages.old.content, "旧对话");
  assert.deepEqual(adopted.state.settings, { model: "draft" });
  assert.equal(adopted.state.initialSettings, null);
});

test("rapid first → second → third navigation loads the latest conversation despite out-of-order responses", async () => {
  const pendingConversations = new Map();
  const pendingMessages = new Map();
  const calls = [];
  const state = {
    messages: {},
    order: [],
    meta: null,
    loading: false,
    stage: null,
  };
  const activeConversationIdRef = { current: "first" };
  const scope = {
    conversationId: "first",
    isNewConversationIdRef: { current: false },
    setIsNewConversationId() {},
    activeConversationIdRef,
    loadingStageRef: { current: "messages" },
    setLoadingStage(value) {
      state.stage = value;
    },
    apiClient: {
      get(url, options) {
        calls.push({ url, options });
        if (url.startsWith("/conversations/")) {
          return new Promise((resolve) =>
            pendingConversations.set(url.split("/").at(-1), resolve),
          );
        }
        if (url === "/messages") {
          const id = options.params.conversationId;
          if (id === "first") {
            return new Promise((resolve) => pendingMessages.set(id, resolve));
          }
          return Promise.resolve({
            messages: { [id]: { content: id } },
            messagesOrder: [id],
            haveMore: false,
          });
        }
        throw new Error(`Unexpected request: ${url}`);
      },
    },
    apiEndpoint: {
      CHAT_CONVERSATIONS_ENDPOINT: "/conversations",
      CHAT_MESSAGES_ENDPOINT: "/messages",
    },
    CHAT_BOOTSTRAP_TIMEOUT_MS: 30000,
    HISTORY_PAGE_SIZE: 20,
    setConversationMeta(value) {
      state.meta = value;
    },
    applyContextCompactionState() {},
    setSelectedModel() {},
    setAdvancedSettings() {},
    setAdvancedSettingsValues() {},
    setInitialSettingValues() {},
    toast: Object.assign(() => "toast-id", { error() {} }),
    t: (key) => key,
    loadAvailableModels: async ({ isCurrent }) => (isCurrent() ? [] : []),
    setHistoryAutoLoadReady() {},
    decorateMessages: (value) => value,
    lastHydratedConversationIdRef: { current: null },
    historyNavigationLockedRef: { current: false },
    liveStreamMessageIdsRef: { current: new Set() },
    reconcileHistorySnapshotWithLiveState() {
      throw new Error("No live stream expected");
    },
    messagesRef: { current: {} },
    messagesOrderRef: { current: [] },
    setMessages(value) {
      state.messages = value;
    },
    setMessagesOrder(value) {
      state.order = value;
    },
    userAutoScrollUnlockUntilRef: { current: 0 },
    isAutoScrollEnabledRef: { current: true },
    pendingScrollRef: { current: false },
    markProgrammaticScroll() {},
    checkScrollPosition() {},
    executePendingScroll() {},
    messagesContainerRef: { current: null },
    setShowScrollToBottomButton() {},
    emitMessagesLoaded(isCurrent) {
      if (isCurrent()) state.loadedFor = activeConversationIdRef.current;
    },
    errorToastsIds: { current: new Map() },
    setIsLoading(value) {
      state.loading = value;
    },
    setIsLoadingError() {},
    setIsFirstMessageSend() {},
    randomMark: null,
    setTimeout() {
      return 0;
    },
  };
  const flush = async () => {
    for (let index = 0; index < 8; index += 1) await Promise.resolve();
  };
  const navigate = (id) => {
    activeConversationIdRef.current = id;
    state.meta = null;
    state.messages = {};
    state.order = [];
    scope.messagesRef.current = state.messages;
    scope.messagesOrderRef.current = state.order;
  };

  const cleanupFirst = runEffect(bootstrapEffect, scope);
  await flush();
  assert.equal(pendingConversations.has("first"), true);
  pendingConversations.get("first")({ model: null, id: "first" });
  await flush();
  assert.equal(pendingMessages.has("first"), true);
  navigate("second");
  cleanupFirst();
  const cleanupSecond = runEffect(bootstrapEffect, {
    ...scope,
    conversationId: "second",
  });
  await flush();
  assert.equal(
    pendingConversations.has("second"),
    true,
    "second loading must not wait for first",
  );

  navigate("third");
  cleanupSecond();
  const cleanupThird = runEffect(bootstrapEffect, {
    ...scope,
    conversationId: "third",
  });
  await flush();
  assert.equal(
    pendingConversations.has("third"),
    true,
    "third loading must not wait for first or second",
  );

  pendingConversations.get("second")({ model: null, id: "second" });
  await flush();
  assert.deepEqual(state.order, []);
  assert.equal(state.meta, null);

  pendingConversations.get("third")({ model: null, id: "third" });
  await flush();
  assert.deepEqual(state.order, ["third"]);
  assert.equal(state.meta.id, "third");
  assert.equal(state.loading, false);

  pendingMessages.get("first")({
    messages: { first: { content: "first" } },
    messagesOrder: ["first"],
    haveMore: false,
  });
  await flush();
  assert.deepEqual(state.order, ["third"]);
  assert.equal(state.meta.id, "third");
  assert.equal(calls.filter((call) => call.url === "/messages").length, 2);
  assert.equal(state.loadedFor, "third");
  cleanupThird();
});
