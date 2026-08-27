# Story media

This directory owns presentation-only media behavior for Story parts.

- `storyMediaLayout.js` is a pure layout resolver. It converts persisted Story
  media metadata plus viewport/runtime aspect ratios into a render plan. Keep it
  free of API calls so the same plan can later be reused by browser-side Story
  exporters.
- `StoryMediaDeck.jsx` renders the default image+video `auto` composition.
- `StoryVideo.jsx` owns the video element surface. Story autoplay orchestration
  remains in `StoryReader.jsx` because it coordinates video with TTS and part
  navigation.

Persisted layout intent stays in the Story resource (`layoutHint`,
`videoPosition`, `videoLoop`, etc.). Runtime-only measurements such as the
video metadata aspect ratio are never written back to the server.
