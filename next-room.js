AFRAME.registerComponent('next-room', {
  init: function () {
    // Kamerstructuur volgens de nieuwe specificaties
    this.roomMap = {
      'overdekte': {
        naam: 'Overdekte',
        afbeelding: 'assets/Overdekte.jpg',
        uitgangen: [
          { label: 'Naar Lockers', naar: 'lockers_et' }
        ]
      },
      'lockers_et': {
        naam: 'Lockers',
        afbeelding: 'assets/Lockers_ET.jpg',
        uitgangen: [
          { label: 'Terug naar Overdekte', naar: 'overdekte' },
          { label: 'Naar Praktijkgang (begin)', naar: 'praktijk_gang_begin' }
        ]
      },
      'praktijk_gang_begin': {
        naam: 'Praktijkgang (begin)',
        afbeelding: 'assets/Praktijk_gang_begin.jpg',
        uitgangen: [
          { label: 'Naar Praktijkgang (midden)', naar: 'praktijk_gang_midden' },
          { label: 'Naar Lokaal 011 (elektriciteit)', naar: 'lokaal_011_elektriciteit' },
          { label: 'Naar Hout 2', naar: 'hout_2' }
        ]
      },
      'praktijk_gang_midden': {
        naam: 'Praktijkgang (midden)',
        afbeelding: 'assets/Praktijk_gang_midden.jpg',
        uitgangen: [
          { label: 'Terug naar Praktijkgang (begin)', naar: 'praktijk_gang_begin' },
          { label: 'Naar Hout 1', naar: 'hout_1' }
        ]
      },
      'lokaal_011_elektriciteit': {
        naam: 'Lokaal 011 (elektriciteit)',
        afbeelding: 'assets/Lokaal_Mr-Desoppere.jpg',
        uitgangen: [
          { label: 'Terug naar Praktijkgang (begin)', naar: 'praktijk_gang_begin' }
        ]
      },
      'hout_1': {
        naam: 'Hout 1',
        afbeelding: 'assets/Hout_1.jpg',
        uitgangen: [
          { label: 'Naar Hout 2', naar: 'hout_2' },
          { label: 'Naar Hout 3', naar: 'hout_3' },
          { label: 'Terug naar Praktijkgang (midden)', naar: 'praktijk_gang_midden' }
        ]
      },
      'hout_2': {
        naam: 'Hout 2',
        afbeelding: 'assets/Hout_2.jpg',
        uitgangen: [
          { label: 'Naar Hout 1', naar: 'hout_1' },
          { label: 'Naar Hout 3', naar: 'hout_3' },
          { label: 'Terug naar Praktijkgang (begin)', naar: 'praktijk_gang_begin' }
        ]
      },
      'hout_3': {
        naam: 'Hout 3',
        afbeelding: 'assets/Hout_3.jpg',
        uitgangen: [
          { label: 'Naar Hout 1', naar: 'hout_1' },
          { label: 'Naar Hout 2', naar: 'hout_2' }
        ]
      }
    };
    this.currentRoom = 'overdekte';
    this.sky = document.querySelector('#sky');
    this.buttonContainer = document.getElementById('roomButtons');
    this.updateRoom();
  },
  updateRoom: function () {
    const kamer = this.roomMap[this.currentRoom];
    this.sky.setAttribute('src', kamer.afbeelding);
    // Verwijder oude knoppen
    this.buttonContainer.innerHTML = '';
    // Voeg knoppen toe voor elke uitgang
    kamer.uitgangen.forEach(exit => {
      const btn = document.createElement('a-entity');
      btn.setAttribute('geometry', 'primitive: plane; width: 2; height: 0.25'); // Vergroot de breedte en hoogte
      btn.setAttribute('material', 'color: #4CAF50; opacity: 0.8');
      btn.setAttribute('position', `0 ${1.2 - 0.35 * kamer.uitgangen.indexOf(exit)} -2`); // Iets meer ruimte tussen knoppen
      btn.setAttribute('text', `value: ${exit.label}; align: center; color: white; width: 3`); // Grotere tekstbreedte
      btn.setAttribute('class', 'gaze-interactive');
      btn.addEventListener('click', () => {
        this.currentRoom = exit.naar;
        this.updateRoom();
      });
      this.buttonContainer.appendChild(btn);
    });
  }
});
