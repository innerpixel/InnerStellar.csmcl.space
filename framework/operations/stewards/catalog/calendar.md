# Steward: Calendar

Read, schedule, and reflect on time from within the space.

## What It Enables

- Read upcoming events — what's coming this week
- Log what just passed — feed context to Theurgist
- Schedule new events (with confirmation)
- Surface calendar context when planning with Theurgist

## MCP Connection

**Tool needed:** Calendar MCP server (e.g. Google Calendar API, CalDAV)

**Ask Claude to set up:**
> "Wire up my calendar for The Stewards. I use [Google / Apple / other]."

## Submission Examples

```
submitted_by: main_session
task: What's on my calendar this week?
output: plain summary of upcoming events
priority: now
```

```
submitted_by: theurgist
task: What did last week look like? Feed context for weekly reflection.
output: brief of completed events
priority: when_convenient
```

## Notes

Calendar awareness makes the Theurgist fold richer — knowing what the user
actually spent time on is different from what they intended to do.
