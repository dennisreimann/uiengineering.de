# UI engineering Website

## 📦 Wie setze ich das Projekt auf?

Vorraussetzung ist der Paketmanager [Yarn](https://yarnpkg.com/en/docs/install):

```bash
$ brew install yarn
```

Mit diesem werden die Abhängigkeiten installiert:

```bash
$ yarn install
```

## 👷 Wie baue ich das Projekt?

Mit folgendem Task genutzt werden Änderungen kontinuierlich gebaut:

```bash
$ npm start
```

Der Befehl startet einen lokalen Entwicklungs-Server unter [`http://localhost:3030/`](http://localhost:3030/)

## 🎙 Wie füge ich eine neue Episode hinzu?

- Die MP3-Datei wird unter `src/mp3s` abgelegt
- In `src/podcast` legt man auf Basis einer bestehenden Markdown Datei eine neue an (Datum und Name anpassen)
- Die Bilder der Episode werden in den Größen 144, 320 und 3000 unter `src/images/` in einem Ordner mit dem Episoden-Bezeichner abgelegt. Der Ordnername wird als `imageDir` in den Metadaten im Markdown referenziert.

## 🚀 Wie deploye ich das Projekt?

Dieser Befehl erstellt einen neuen Production-Build und deployed diesen:

```bash
$ npm run build-and-deploy
```
