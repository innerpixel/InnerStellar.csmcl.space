# Steward: Social Media

Draft, schedule, monitor, and coordinate social media presence across platforms.

## What It Enables

- Draft posts — write, refine, and hold content before it goes out
- Schedule reminders — flag when to post, when to follow up, when to check response
- Monitor signal — track replies, engagement, or platform activity on request
- Cross-post coordination — adapt a piece for multiple platforms with appropriate voice
- Research support — gather platform notes, audience data, competitor signal

## MCP Connection

**Tool needed:** Varies by platform and action

- Drafting/research: Filesystem MCP (read/write to project content dirs)
- Scheduling reminders: Calendar MCP
- Monitoring: Platform APIs (Mastodon, Bluesky, LinkedIn — when connected)
- Publishing: Platform posting APIs (when authorized)

**Ask Claude to set up:**
> "Wire up social media for The Stewards. I want to [draft posts / monitor [platform] / publish to [platform]]."

## Project Queue

Active project tasks land at:
`space/projects/csmcl-sm-first-contact/queue/`

System-level steward tasks (cross-project, framework concerns) land at:
`stewards/queue/`

## Submission Examples

```
submitted_by: user
task: Draft a first post announcing CSMCL.Space — tone: curious-builder, ~200 words
output: draft saved to content/drafts/
priority: now
```

```
submitted_by: main_session
task: Research Bluesky posting norms — what works, what doesn't, for technical builders
output: notes saved to content/research/bluesky-norms.md
priority: when_convenient
```

```
submitted_by: user
task: Remind me to post the draft on Friday morning
output: calendar event or reminder created
priority: now
```

## Notes

Social media work is voice-first. The steward's job is to hold the content,
not to define the voice — that comes from the traveler. Drafts are drafts
until the traveler says otherwise. Nothing goes out without intent.
