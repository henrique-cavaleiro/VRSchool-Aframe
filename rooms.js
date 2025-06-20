// Room definitions for the VR website
window.roomMap = {
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
