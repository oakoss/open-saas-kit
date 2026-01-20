# Hook Creator Reference

Advanced patterns, JSON schemas, and detailed configuration.

## Hook Input Schemas

All hooks receive JSON via stdin with common fields:

```typescript
type HookInput = {
  session_id: string;
  transcript_path: string;
  cwd: string;
  permission_mode:
    | 'default'
    | 'plan'
    | 'acceptEdits'
    | 'dontAsk'
    | 'bypassPermissions';
  hook_event_name: string;
  // Event-specific fields below
};
```

### PreToolUse Input

```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/project/dir",
  "permission_mode": "default",
  "hook_event_name": "PreToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_use_id": "toolu_01ABC123..."
}
```

### PostToolUse Input

```json
{
  "session_id": "abc123",
  "hook_event_name": "PostToolUse",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  },
  "tool_use_id": "toolu_01ABC123..."
}
```

### Notification Input

```json
{
  "hook_event_name": "Notification",
  "message": "Claude needs your permission",
  "notification_type": "permission_prompt"
}
```

### UserPromptSubmit Input

```json
{
  "hook_event_name": "UserPromptSubmit",
  "prompt": "Write a function to calculate factorial"
}
```

### Stop/SubagentStop Input

```json
{
  "hook_event_name": "Stop",
  "stop_hook_active": true
}
```

Check `stop_hook_active` to prevent infinite loops.

### SessionStart Input

```json
{
  "hook_event_name": "SessionStart",
  "source": "startup"
}
```

### SessionEnd Input

```json
{
  "hook_event_name": "SessionEnd",
  "reason": "exit"
}
```

Reasons: `clear`, `logout`, `prompt_input_exit`, `other`

## Advanced JSON Output

Hooks can return structured JSON in stdout for sophisticated control.

### Common JSON Fields

```json
{
  "continue": true,
  "stopReason": "Message when continue is false",
  "suppressOutput": false,
  "systemMessage": "Warning shown to user"
}
```

### PreToolUse Decision Control

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "permissionDecisionReason": "Auto-approved documentation file",
    "updatedInput": {
      "file_path": "/modified/path.txt"
    }
  }
}
```

| Decision  | Effect                              |
| --------- | ----------------------------------- |
| `"allow"` | Bypasses permission, executes tool  |
| `"deny"`  | Blocks tool, shows reason to Claude |
| `"ask"`   | Shows confirmation dialog to user   |

### PermissionRequest Decision Control

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PermissionRequest",
    "decision": {
      "behavior": "allow",
      "updatedInput": {
        "command": "npm run lint"
      }
    }
  }
}
```

### PostToolUse Decision Control

```json
{
  "decision": "block",
  "reason": "Explanation shown to Claude",
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Additional information for Claude"
  }
}
```

### UserPromptSubmit Decision Control

```json
{
  "decision": "block",
  "reason": "Blocked due to policy violation",
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "Context added to conversation"
  }
}
```

For simple context injection, just print text to stdout with exit 0.

### Stop/SubagentStop Decision Control

```json
{
  "decision": "block",
  "reason": "Tasks not complete - please run tests"
}
```

### SessionStart Context

```json
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "Project context loaded here"
  }
}
```

## Prompt-Based Hooks

LLM-based evaluation for Stop/SubagentStop:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Evaluate if Claude should stop: $ARGUMENTS. Check if all tasks are complete.",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### Prompt Response Schema

```json
{
  "decision": "approve",
  "reason": "All tasks completed successfully",
  "continue": true,
  "stopReason": "Custom stop message",
  "systemMessage": "Warning message"
}
```

## MCP Tool Integration

MCP tools follow pattern `mcp__<server>__<tool>`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Memory operation' >> ~/mcp.log"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "command",
            "command": "/scripts/validate-mcp-write.py"
          }
        ]
      }
    ]
  }
}
```

## Plugin Hooks

Plugins define hooks in `hooks/hooks.json`:

```json
{
  "description": "Automatic code formatting",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

Plugin hooks run alongside user/project hooks in parallel.

## Hook Execution Details

| Property        | Value                                       |
| --------------- | ------------------------------------------- |
| Default timeout | 60 seconds                                  |
| Execution       | All matching hooks run in parallel          |
| Deduplication   | Identical commands deduplicated             |
| Environment     | Current directory with Claude's environment |

## Security Considerations

### Best Practices

1. **Validate inputs** - Never trust input data blindly
2. **Quote shell variables** - Use `"$VAR"` not `$VAR`
3. **Block path traversal** - Check for `..` in file paths
4. **Use absolute paths** - Specify full paths with `$CLAUDE_PROJECT_DIR`
5. **Skip sensitive files** - Avoid `.env`, `.git/`, keys

### Configuration Safety

- Hooks are snapshotted at startup
- External modifications require `/hooks` review
- Changes don't affect current session until reloaded

## Debugging

### Enable Debug Mode

```sh
claude --debug
```

### Debug Output

```text
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Hook command completed with status 0
```

### Test Hook Manually

```sh
echo '{"tool_input":{"file_path":"test.ts"}}' | your-command
echo $?  # Check exit code
```

### Log Hook Execution

```json
{
  "type": "command",
  "command": "bash -c 'input=$(cat); echo \"$input\" >> ~/.claude/hook-debug.log; your-actual-command'"
}
```

## Complete Examples

### Python PreToolUse Validator

```python
#!/usr/bin/env -S uv run --quiet --script
# /// script
# requires-python = ">=3.11"
# ///
import json
import re
import sys

BLOCKED_PATTERNS = [
    (r"\brm\s+-rf\b", "Blocked: rm -rf is dangerous"),
    (r"--force\b", "Blocked: --force operations disabled"),
]

try:
    data = json.load(sys.stdin)
except json.JSONDecodeError:
    sys.exit(1)

command = data.get("tool_input", {}).get("command", "")

for pattern, message in BLOCKED_PATTERNS:
    if re.search(pattern, command, re.I):
        print(message, file=sys.stderr)
        sys.exit(2)

sys.exit(0)
```

### Python UserPromptSubmit with Context

```python
#!/usr/bin/env -S uv run --quiet --script
# /// script
# requires-python = ">=3.11"
# ///
import json
import sys
import datetime

try:
    data = json.load(sys.stdin)
except json.JSONDecodeError:
    sys.exit(1)

# Add context to conversation
context = f"Current time: {datetime.datetime.now()}"
print(context)

sys.exit(0)
```

### Auto-Approve Documentation Files

```python
#!/usr/bin/env -S uv run --quiet --script
# /// script
# requires-python = ">=3.11"
# ///
import json
import sys

try:
    data = json.load(sys.stdin)
except json.JSONDecodeError:
    sys.exit(1)

tool_name = data.get("tool_name", "")
file_path = data.get("tool_input", {}).get("file_path", "")

if tool_name == "Read" and file_path.endswith((".md", ".txt", ".json")):
    output = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow",
            "permissionDecisionReason": "Documentation auto-approved"
        },
        "suppressOutput": True
    }
    print(json.dumps(output))

sys.exit(0)
```

## Exit Code Quick Reference

| Event             | Code 0                | Code 1     | Code 2          |
| ----------------- | --------------------- | ---------- | --------------- |
| PreToolUse        | Continue              | Show error | Block tool      |
| PermissionRequest | Continue              | Show error | Deny permission |
| PostToolUse       | Continue              | Show error | Show to Claude  |
| UserPromptSubmit  | Add stdout as context | Show error | Block prompt    |
| Stop              | Allow stop            | Show error | Prevent stop    |
| SessionStart      | Add stdout as context | Show error | N/A             |

## jq Quick Reference

```sh
# Extract file path
jq -r '.tool_input.file_path // empty'

# Extract command
jq -r '.tool_input.command // empty'

# Check pattern match
jq -e '.tool_input.command | test("pattern")'

# Safe extraction with fallback
jq -r '.field // "default"' 2>/dev/null
```
