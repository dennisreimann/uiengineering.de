---
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

context:
  episodes:
    - !data /episode/s01e07.yml
    - !data /episode/s01e06.yml

variants:
- file: list-with-title.pug
  title: Episodenliste mit Titelzeile
- file: list-without-title.pug
  title: Episodenliste ohne Titelzeile
---
# Episodenliste

In dieser Liste werden die Teaser der Episoden dargestellt.
Die Sortierung ist chronologisch und erfolgt nach Staffeln sortiert.
Das Blättern ist pro Staffel möglich.
