# UIengineering Website

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## 📦 Wie setze ich das Projekt auf?

Abhängigkeiten installieren:

```bash
$ npm install
```

## 👷 Wie baue ich das Projekt?

Mit folgendem Task genutzt werden Änderungen kontinuierlich gebaut:

```bash
$ npm start
```

Der Befehl startet einen lokalen Entwicklungs-Server unter [`http://localhost:3000/`](http://localhost:3000/)

## 🎙 Wie füge ich eine neue Episode hinzu?

- Die MP3-Datei wird unter `src/mp3s` abgelegt
- In `src/podcast` legt man auf Basis einer bestehenden Markdown Datei eine neue an (Datum und Name anpassen)
- Das Bild der Episode wird in der Größe 3000 bereits optimiert unter `src/images/podcast` in einem Ordner mit dem Episoden-Bezeichner abgelegt. Der Ordnername wird als `imageDir` in den Metadaten im Markdown referenziert.
- Der Bild-Generierungstask (siehe nächster Punkt) wird gestartet.

## 🖼 Wie generiere ich die passenden Bildgrößen für die Episoden?

Für das Skalieren der Bilder werden ImageMagick und GraphicsMagick benötigt:

```bash
$ brew install imagemagick
$ brew install graphicsmagick
```

Damit kann man nun mit folgendem Task aus einem 3000er-Vorlagebild alle entsprechenden Größen generieren:

```bash
$ npm run images
```

Dieser Task muss manuell ausgeführt werden und ist nicht Bestandteil des normalen Buildprozess, da die generierten Bilder im `src`-Verzeichnis abgelegt werden und dieser Schritt nur einmal erfolgen sollte.

## 🖼 Wie exportiere ich die Komponenten für Sketch?

Der Sketch Library Export kann mit foilgendem Befehl generiert werden:

```bash
$ npm run sketch
```

Daraufhin liegen im Ordner `sketch` die Dateien, die in Sketch über das [asketch-Plugin](https://github.com/brainly/html-sketchapp#create-asketch-files) importiert werden können.

## 🚀 Wie deploye ich das Projekt?

Einfach zu GitHub pushen :)
