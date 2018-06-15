---
title: Bemerkungstext
label: M2

properties:
  +remark():
    block:
      type: Block
      description: Text als Mixin-Block
      required: true
  +quote(author):
    author:
      type: String
      description: Name des Autoren
      required: true
    block:
      type: Block
      description: Text als Mixin-Block
      required: true

variants:
- file: intro.pug
  title: Intro
  label: M21
  description:  Großer Preflight-Text auf der Startseite.
- file: quote.pug
  title: Zitat
  label: M22
  description: !markdown |
    Zitate von Personen können mit dieser Komponente abgebildet werden.
    Aussage und Absender (evtl. mit Titel etc.) sind die Kernbausteine.
    Eine Verlinkung, z.B. zu einer Podcast-Episode, kann den Nutzen erhöhen.
---
Hervorgehobener Text.
