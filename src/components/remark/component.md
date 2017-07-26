---
title: Bemerkungstext
label: M2
schema:
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
---
Hervorgehobener Text.
