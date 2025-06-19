# VRSchool-Aframe

## **link to page**

https://henrique-cavaleiro.github.io/VRSchool-Aframe/

# VR website with A-Frame

**Leerlingen:** Mathis Dewulf, Henrique Cavaleiro  
**Klas:** 6DATA  
**Datum:** 19/06/2025

## **Wat is A-Frame?**
**A-Frame** is een **open-source webframework waarmee je eenvoudig Virtual Reality (VR) ervaringen kunt maken** die werken in de webbrowser.  
Het is gebouwd op HTML en JavaScript, waardoor het toegankelijk is voor zowel beginners als gevorderde ontwikkelaars.

### **Waarom A-Frame gebruiken?**

- **Eenvoudig te leren:** Je kunt 3D-werelden maken met simpele HTML-tags, net zoals je een gewone webpagina bouwt.
- **Werkt in de browser:** Je hebt geen speciale software nodig, alleen een moderne webbrowser.
- **Ondersteunt VR-brillen:** Werkt met VR-brillen zoals Oculus Quest, maar ook gewoon op je computer of smartphone.

### **Voorbeeld**

Hier is een eenvoudig voorbeeld van een A-Frame scène:

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="0 1 -3" color="tomato"></a-box>
      <a-sphere position="2 1 -5" color="skyblue"></a-sphere>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="8" height="8" color="#7BC8A4"></a-plane>
    </a-scene>
  </body>
</html>
```

### **Samenvatting**

Met A-Frame kun je **snel en makkelijk VR-werelden maken met HTML.**  
Het is ideaal voor beginners die willen experimenteren met 3D en VR op het web.

## **Stappenplan: Wat hebben we gemaakt in dit A-Frame project?**

### 1. **Basisopzet van de VR-website**
- We hebben een HTML-pagina gemaakt met A-Frame als basis.
- De `<a-scene>` bevat een 360° achtergrondafbeelding van de school (`<a-sky>`).
- Alle assets (foto’s van lokalen, gangen, enz.) staan in de map `assets/`.

**Voorbeeld uit `index.html`:**
```html
<a-scene vr-mode-ui="enabled: true" embedded>
  <a-sky id="sky" src="assets/Overdekte.jpg" rotation="0 -90 0"></a-sky>
  <!-- ... -->
</a-scene>
```

### 2. **Navigatie tussen ruimtes**
- Met het script `next-room.js` maakten we een systeem waarbij je via knoppen naar verschillende ruimtes kunt gaan.
- Elke ruimte heeft een eigen afbeelding en uitgangen (knoppen) naar andere ruimtes.
- De knoppen worden dynamisch aangemaakt en aangepast op basis van de kamer waar je bent.

**Voorbeeld uit `next-room.js`:**
```javascript
this.roomMap = {
  'overdekte': {
    naam: 'Overdekte',
    afbeelding: 'assets/Overdekte.jpg',
    uitgangen: [
      { label: 'Naar Lockers', naar: 'lockers_et' }
    ]
  },
  // ... andere kamers ...
};
```

### 3. **Gaze-interactie (kijken om te selecteren)**
- We gebruiken een “gaze cursor” (reticle) in het midden van het beeld.
- Door 2 seconden naar een knop te kijken (“fuse”) wordt deze geactiveerd.
- Dit werkt op desktop, mobiel én in VR-brillen.

**Voorbeeld uit `index.html`:**
```html
<a-entity 
  cursor="fuse: true; fuseTimeout: 2000" 
  position="0 0 -1"
  geometry="primitive: ring; radiusInner: 0.015; radiusOuter: 0.025"
  material="color: cyan; shader: flat"
  gaze
  raycaster="objects: .gaze-interactive"
></a-entity>
```

### 4. **Virtueel toetsenbord**
- Met het script `keyboard-input.js` voegden we een virtueel toetsenbord toe.
- Het toetsenbord verschijnt als je op een bepaalde knop kijkt (geregistreerd via `gaze-listener.js`).
- Ingevoerde tekst wordt direct getoond in een tekstveld in de VR-omgeving.

**Voorbeeld uit `keyboard-input.js`:**
```javascript
AFRAME.registerComponent('keyboard', {
  schema: {
    inputEl: { type: 'selector' }
  },
  init: function () {
    this.el.addEventListener('keyboardinput', (e) => {
      this.data.inputEl.setAttribute('text', 'value', e.detail.value);
    });
  }
});
```

### 5. **Gebruik van componenten**
- We hebben eigen A-Frame componenten geschreven:
  - `gaze-listener`: toont het toetsenbord en tekstveld bij activatie.
  - `keyboard`: verwerkt invoer van het virtuele toetsenbord.
  - `next-room`: regelt de navigatie en het wisselen van ruimtes.

**Voorbeeld uit `gaze-listener.js`:**
```javascript
AFRAME.registerComponent('gaze-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('click', function () {
      document.querySelector('#keyboard').setAttribute('visible', 'true');
      document.querySelector('#textfield').setAttribute('visible', 'true');
    });
  }
});
```

### 6. **Styling en gebruiksvriendelijkheid**
- De knoppen zijn duidelijk zichtbaar en groot genoeg voor VR-gebruik.
- Het toetsenbord draait altijd naar de gebruiker toe.
- Alles werkt zonder extra plugins, enkel met een webbrowser.

**Voorbeeld uit `index.html`:**
```html
<a-entity 
  id="keyboard"
  visible="false"
  position="0 0.6 -1.2"
  keyboard="inputEl: #textfield"
  look-at="#mainCamera"
></a-entity>
```
