# Steward: Email

Send, receive, summarize, and file emails from within the space.

## What It Enables

- Send emails on behalf of the user (with confirmation)
- Summarize incoming mail on request
- File important threads into the space as drops
- Draft responses for review

## MCP Connection

**Tool needed:** An email MCP server (e.g. via SMTP/IMAP or Gmail API)

**Ask Claude to set up:**
> "Wire up email for The Stewards. I use [Gmail / Fastmail / other]."

Claude will guide the MCP configuration based on your provider.

## Submission Examples

```
submitted_by: user
task: Send email to [person] — subject: [x], body: [y]
output: confirmation sent
priority: now
```

```
submitted_by: theurgist
task: Summarize unread emails from today
output: brief summary dropped into space
priority: when_convenient
```

## Safety

All send actions require explicit confirmation unless pre-authorized.
The Stewards never send silently.
