---
name: Video browser compatibility
description: Codec limitations observed in the automated browser used to verify the website.
---

Use multiple browser-compatible source encodings for supplied videos rather than relying only on a valid H.264 MP4.

**Why:** The automated browser could load the MP4 URL but could not play H.264: its codec capability check returned an empty string. VP9/Opus returned “probably” and subsequently passed actual playback, captions, and retry checks. A successful asset request or media probe alone does not establish browser playback support.

**How to apply:** Keep a WebM alternative and MP4 fallback for cross-browser delivery. Verify actual playback when changing source encodings or player behavior; do not treat this test-runner limitation as evidence that the original uploaded video is corrupt.
