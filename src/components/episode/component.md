---
properties:
  +episode(episode):
    episode:
      type: Episode
      required: true

variants:
- file: episode.pug
  title: Darstellung auf Episodendetailseite
  context:
    episode: !data /episode/s01e08.yml
---
Eine Episode ist die Darstellung einer einzelnen Podcast-Episode.
Diese setzt sich aus Titel, Untertitel, Preview und Shownotes zusammen.
Eine Episode ist gemeinsam mit zusätzlichen Informationen der Baustein einer Detailansicht für einen Podcast.
