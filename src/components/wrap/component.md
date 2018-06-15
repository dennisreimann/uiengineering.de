---
title: Wrap

properties:
  +wrap(single):
    single:
      type: Boolean
      description: Einspaltige Variante
      default: 'false'

variants:
- file: single.pug
  title: Einspaltig
  description: Diese Variante ist für einspaltigen Inhalt und hat daher eine Beschränkung der Maximalbreite.
- file: wrap.pug
  title: Mehrspaltig
  description: Für mehrspaltigen oder potentiell breiteren Inhalt.
---
Beschränkt die Breite des Inhalts und wird meistens in Verbindung mit der Section genutzt.
Findet auch in der Navigation, dem Header und Footer Verwendung.
