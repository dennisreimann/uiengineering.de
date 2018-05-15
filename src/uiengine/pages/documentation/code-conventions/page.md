# Code Conventions

## CSS

Das CSS wird mit Stylus als Präprozessor geschrieben. Über den Einsatz von PostCSS mit Autoprefixer wird sichergestellt, dass das CSS die gewünschte Abwärtskompatibilität (aktuell IE 11 und aufwärts) grundsätzlich unterstützt.

### BEM-Methodik

Zur Strukturierung der Styles verwenden wir die [BEM-Notation](http://getbem.com/introduction/) (Block, Element, Modifier):

```css
.block {}
.block__element {}
.block--modifier {}
```

Weitere Informationen dazu finden sich auch auf [bem.info](http://bem.info/).

### Namespaces

Wir verwenden für alle Komponenten Namespaces/Prefixes, die sich auf die Zugehörigkeit der Komponente zu ihrer jeweiligen Vertikale beziehen. Basiselemente, die über die Vertikalen hinweg definiert und benutzt werden, tragen das Prefix `uie-` (bspw. `uie-button`). Diese Prefixes werden sowohl für IDs als auch für Klassen verwendet.

## JavaScript

Unser JavaScript-Code wird als ES in der jeweils aktuellsten Version (ES next) geschrieben und mit Babel in eine Browser-kompatible Version (aktuell ES 5 kompiliert).

## Modul-System und Gremlin.js

Zur Einbindung von Abhängigkeiten und Nachladen eigener Module verwenden wir AMD mit require.js.

Um neben den Styles auch Funktionalitäten für die Komponenten zu definieren, verwenden wir [Gremlin.js](http://grml.in/).

```html
<uie-expander data-module="uie/components/expander/expander" class="uie-expander">
  ...
</uie-expander>
```

Das DOM wird nach dem Laden auf per `data-module` referenzierte JavaScript-Module hin abgesucht, um sie
dann via require.js zu laden und zu instanziieren. Das Gerüst eines Gremlin-Moduls sieht dabei bspw. so aus:

```javascript
import gremlins from 'uie/vendor/gremlins';
import gremlinsJquery from 'uie/vendor/gremlins-jquery';
import gremlinsDispatcher from 'uie/vendor/gremlins-dispatcher';
import gremlinsData from 'uie/vendor/gremlins-data';

export default gremlins.create('my-component-name', {
  mixins: [gremlinsJquery, gremlinsDispatcher, gremlinsData],
  elements: {
    // define element references that should be available as variables:
    '.my-component__button': '$button', // -> gives you `this.$button`
  },
  events: {
    // define event handlers that should be available as variables:
    'click .my-component__button': 'handleButtonClick',
  },

  initialize() {
    // executed when component is found in the DOM:
    // add event handlers you might need
  },

  handleButtonClick(event) {
    // do stuff
  }

  destroy() {
    // executed when component is removed from the DOM:
    // unbind all event handlers and references that were previously established.
    this.$el.off();
  },
});
```

Im Zusammenspiel mit Gremlin.js verwenden wir folgende Plugins, um verschiedene Anwendungsfälle zu erleichtern:

- [gremlins-jquery](https://github.com/grmlin/gremlins-jquery): Integriert jQuery-Events und Variablendefinition direkt in die Moduldefinition und führt diese beim Initialisieren des Gremlin aus.
- [gremlins-data](https://github.com/grmlin/gremlins-data): Macht HTML Properties und data-Attribute einfach im Gremlin über `this.props.PROPERTY` und `this.data.ATTRIBUTE` verfügbar. Nützlich um Daten in das Modul zu überreichen.
- [gremlins-dispatcher](https://github.com/grmlin/gremlins-dispatcher): Komponenten-Kommunikation über gemeinsamen Message Bus (bspw. Artikel-Bereich informiert Minicart über einen in den Warenkorb gelegten Artikel)

**WICHTIG:** Das Gremlin-Modul definiert _immer_ ein HTML Custom Element, dessen Name dem Format `NAMESPACE-COMPONENT_NAME` entsprechen muss (bspw. `uie-expander`). Die Anwesenheit von mindestens einem Dash (`-`) im Namen ist Vorraussetzung für ein HTML Custom Element und wir nutzen dies, um der Komponenten-Definition den Namespace voranzustellen.
