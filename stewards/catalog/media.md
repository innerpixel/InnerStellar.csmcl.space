# Steward: Media

Capture, hold, and file images, audio, links, and other media.

## What It Enables

- Capture links with context — save and summarize web content
- Hold images that arrive in the space — file with description
- Process audio notes — transcribe and drop into space
- Delegate media generation (images, audio) to external tools

## MCP Connection

**Tool needed:** Varies by media type

- Links/web: Web fetch MCP or browser tool
- Images: Filesystem MCP + image handling
- Audio: Transcription service (Whisper or similar)
- Generation: Image/audio generation API

**Ask Claude to set up:**
> "Wire up media handling for The Stewards. I want to capture [links / images / audio]."

## Submission Examples

```
submitted_by: user
task: Save this link with context — [URL] — this is about [topic]
output: drop created in space with summary
priority: now
```

```
submitted_by: main_session
task: Generate an image for [description] — save to media folder
output: file path, preview if possible
priority: when_convenient
```

## Notes

Media drops are first-class citizens in the space. An image, a link, a voice
note — all can land in drops/ and be tended like any other drop.
