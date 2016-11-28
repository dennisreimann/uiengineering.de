# UI engineering Website

## Setup

Zunächst müssen die Abhängigkeiten installiert werden:

```bash
$ yarn install
```

Vorraussetzung dafür ist der Paketmanager [Yarn](https://yarnpkg.com/en/docs/install):

```bash
$ brew install yarn
```

## Entwicklung

Mit folgendem Task genutzt werden Änderungen kontinuierlich gebaut:

```bash
$ npm start
```

Der Befehl startet außerdem einen lokalen Entwicklungs-Server unter [`http://localhost:3030/`](http://localhost:3030/)

## Deployment

Dieser Befehl erstellt einen neuen Production-Build und deployed diesen:

```bash
$ npm run build-and-deploy
```
