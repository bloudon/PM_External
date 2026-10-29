# Homepage introduction video

- Owner-supplied spokesperson introduction, not a customer testimonial.
- Source: `attached_assets/PM_Guy_1793280594740.mp4`.
- Delivery: 16:9 VP9/Opus WebM (about 502 KB) with H.264/AAC MP4 fallback (about 971 KB), 1280 × 720. MP4 includes fast-start metadata. Media is only loaded after a play-button click; no autoplay on page load or looping.
- Poster: an actual presenter frame at 1 second, resized without cropping to 1280 × 720 and encoded as WebP.
- English WebVTT captions transcribed from the supplied audio and checked against a separate video transcription. Final cue ends at the actual 10.048-second clip duration.
- The spoken invitation is “Start your free 30-day trial today.” The owner approved a demo/trial-request funnel for now: the adjacent copy explicitly states that requesting a demo or trial does not start a trial. Application signup and automatic trial activation are future work.
- This small, deployment-ready media is checked in with the static website so Git-based VPS builds are self-contained; no Replit runtime storage or AI services are required in production.

## Measurement

The four allowlisted events are `hero_video_start`, `hero_video_half`, `hero_video_complete`, and `hero_trial_click`. The player emits each milestone once per component mount; replaying does not increase counts until the homepage is remounted. Half watched uses the video's merged played ranges: seeking past a section does not count it as watched, and replaying the same section does not double-count it. Completion records the native ended event. Events are indicative counts, not unique visitors or proof of attention.

The same-origin `/api/hero-events` endpoint validates the event name, rate-limits submissions independently from forms, and logs only a fixed measurement label and event name through the existing logger. No database, cookies, visitor IDs, or free-form properties are added. Ad blockers, dropped requests, rate limits, or a stopped API may undercount events.

After the VPS API is rebuilt and restarted, inspect events locally:

```bash
sudo journalctl -u permitsmanager-marketing-api --since "24 hours ago" --no-pager -o cat |
  grep '"measurement":"homepage_intro"'
```

Structured logs are subject to the VPS journal retention and access settings. This is not a hosted analytics dashboard.
