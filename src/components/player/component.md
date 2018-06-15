---
properties:
  +player(episode):
    episode:
      type: Episode
      required: true

variants:
- file: single.pug
  title: Single
  context:
    episode: !data /episode/s01e08.yml
---
Der Audio-Player ist mit [Amplitude.js](https://521dimensions.com/open-source/amplitudejs/docs) realisiert.

Aktuell gibt es nur die Einzelvariante, die auf der Episodenseite eingesetzt wird.
In Zukunft soll es auch eine Variante zum Abspielen von Playlist geben.
Darüber lassen sich dann die Staffeln und Quick & Dirty Folgen gruppieren.
