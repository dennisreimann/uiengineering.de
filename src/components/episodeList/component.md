---
title: Episodenliste
schema:
  +episodeList(episodes, title, subtitle):
    episodes: 
      type: '[Episode]'
      required: true
    title: 
      type: 'String'
      description: Titel, bspw. der Staffelname
    subtitle: 
      type: 'String'
      description: Untertitel, nutzbar für Anzahl der Episoden
---
In dieser Liste werden die Teaser der Episoden dargestellt. 
Die Sortierung ist chronologisch und erfolgt nach Staffeln sortiert. 
Das Blättern ist pro Staffel möglich.
