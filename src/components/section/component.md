---
title: Section
properties:
  +block():
    block:
      type: Block
      description: Inhalt des Containers als Mixin-Block
      required: true
  +container():
    block:
      type: Block
      description: Inhalt des Containers als Mixin-Block
      required: true
  +section(single, angled):
    single:
      type: Boolean
      description: Einzelspaltige Section mit voller Breite
      default: 'false'
    angled:
      type: String
      description: !markdown Angewinkelte Darstellung, die Richtung ist mit `up` oder `down` als Wert anzugeben.
      default: 'false'
    block:
      type: Block
      description: Inhalt des Containers als Mixin-Block
      required: true
---
Einzelne Bereiche auf Seiten können durch Sektionen (Sections) in überschaubarere Einheiten zerlegt werden.
Eine farbliche Hinterlegung kann hierbei die einzelnen Zonen noch besser sichtbar machen und Struktur geben.
