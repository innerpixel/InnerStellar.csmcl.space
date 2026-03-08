# Steward: Files & Documents

Save, retrieve, organize, and work with files from within the space.

## What It Enables

- Save documents, notes, and outputs into organized locations
- Retrieve files by context ("that draft I was working on last week")
- Create and edit documents
- Move files between locations on request

## MCP Connection

**Tool needed:** Filesystem MCP server

**Ask Claude to set up:**
> "Wire up file access for The Stewards. My working directories are [paths]."

Claude will configure scoped filesystem access — only the directories you specify.

## Submission Examples

```
submitted_by: main_session
task: Save this draft as a document in my writing folder
output: file path confirmation
priority: now
```

```
submitted_by: auriosynth
task: Archive completed drops older than 30 days
output: confirmation, new archive location
priority: when_convenient
```

## Notes

File access should be scoped — The Stewards access only what's needed,
not the entire filesystem.
