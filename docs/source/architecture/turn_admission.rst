Turn Admission
================================================================================

The ChatBox no longer implements generic interrupt-and-send while a normal answer
is generating. Users may continue typing a draft, but must explicitly stop that
answer before starting another ordinary Turn.

An active durable ExecutionRun is the only normal composer state that accepts
additional requirements while generation continues. Plain text is sent as
``execution.guidance.add`` and applied at a safe execution boundary. The Execution
Window itself never owns a second composer.

Explicit structural actions may still request backend interrupt admission when
that action's semantics require superseding the active Run.
