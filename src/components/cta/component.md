---
label: A2

schema:
  +cta(title, url):
    title:
      type: String
      description: Button-Titel
      required: true
    url:
      type: String
      description: Ziel-URL
      required: true

variants:
- file: cta.pug
  title: Call To Action
  label: A21
  description: Link, der als Call To Action Button dargestellt wird.
---
# Call To Action

Link, der als Call To Action Button dargestellt wird. Dieser kann z.B. für den XML-Feed des Podcast verwendet werden, oder alternativ auf ein Formular oder ähnliches verweisen.
