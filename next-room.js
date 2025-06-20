AFRAME.registerComponent('next-room', {
  init: function () {
    // (roomMap and questions are now loaded from rooms.js and questions.js)
    this.currentRoom = 'overdekte';
    this.sky = document.querySelector('#sky');
    this.buttonContainer = document.getElementById('roomButtons');
    this.updateRoom();
  },
  updateRoom: function () {
    const kamer = window.roomMap[this.currentRoom];
    this.sky.setAttribute('src', kamer.afbeelding);
    // Verwijder oude knoppen
    this.buttonContainer.innerHTML = '';
    // Voeg knoppen toe voor elke uitgang (nu links van de camera)
    kamer.uitgangen.forEach(exit => {
      const btn = document.createElement('a-entity');
      btn.setAttribute('geometry', 'primitive: plane; width: 2; height: 0.25');
      btn.setAttribute('material', 'color: #4CAF50; opacity: 0.8');
      btn.setAttribute('position', `-3 ${1.2 - 0.35 * kamer.uitgangen.indexOf(exit)} 0`); // Links van gebruiker
      btn.setAttribute('look-at', '#mainCamera');
      btn.setAttribute('text', `value: ${exit.label}; align: center; color: white; width: 3`);
      btn.setAttribute('class', 'gaze-interactive');
      btn.addEventListener('click', () => {
        this.currentRoom = exit.naar;
        this.updateRoom();
      });
      this.buttonContainer.appendChild(btn);
    });

    // Voeg een extra knop toe voor de vraag (rechts en kijkt naar gebruiker)
    const questionBtn = document.createElement('a-entity');
    questionBtn.setAttribute('geometry', 'primitive: plane; width: 2; height: 0.25');
    questionBtn.setAttribute('material', 'color: #FF9800; opacity: 0.9');
    questionBtn.setAttribute('position', `3 1 0`); // Rechts van gebruiker
    questionBtn.setAttribute('look-at', '#mainCamera'); // Kijkt altijd naar gebruiker
    questionBtn.setAttribute('text', 'value: Stel een vraag; align: center; color: white; width: 3');
    questionBtn.setAttribute('class', 'gaze-interactive');
    questionBtn.addEventListener('click', () => {
      // Vraag en antwoorden ophalen
      const q = window.questions[this.currentRoom];
      // Vraag tonen
      let vraagEntity = document.querySelector('#questionText');
      if (!vraagEntity) {
        vraagEntity = document.createElement('a-entity');
        vraagEntity.setAttribute('id', 'questionText');
        vraagEntity.setAttribute('geometry', 'primitive: plane; height: 0.15; width: 1.2');
        vraagEntity.setAttribute('material', 'color: #fffbe6; opacity: 0.95');
        vraagEntity.setAttribute('position', '0 1.25 -1.5');
        vraagEntity.setAttribute('look-at', '#mainCamera');
        vraagEntity.setAttribute('text', `value: ${q.vraag}; color: #222; align: center; width: 1.1`);
        document.querySelector('a-scene').appendChild(vraagEntity);
      } else {
        vraagEntity.setAttribute('position', '0 1.25 -1.5');
        vraagEntity.setAttribute('look-at', '#mainCamera');
        vraagEntity.setAttribute('text', `value: ${q.vraag}; color: #222; align: center; width: 1.1`);
        vraagEntity.setAttribute('visible', 'true');
      }
      // Keyboard tonen en antwoorden doorgeven
      const keyboard = document.querySelector('#keyboard');
      keyboard.setAttribute('visible', 'true');
      keyboard.setAttribute('keyboard', `inputEl: #textfield; answers: ${JSON.stringify(q.antwoorden)}`);
      document.querySelector('#textfield').setAttribute('visible', 'true');
      document.querySelector('#textfield').setAttribute('text', 'value', '');
      document.querySelector('#textfield').setAttribute('position', '0 0.95 -1.5');
      document.querySelector('#textfield').setAttribute('look-at', '#mainCamera');
      document.querySelector('#keyboard').setAttribute('position', '0 0.6 -1.2');
      document.querySelector('#keyboard').setAttribute('look-at', '#mainCamera');
      // Beantwoord-knop ook links onder keyboard
      let saveBtn = document.querySelector('#saveAnswerBtn');
      if (!saveBtn) {
        saveBtn = document.createElement('a-entity');
        saveBtn.setAttribute('id', 'saveAnswerBtn');
        saveBtn.setAttribute('geometry', 'primitive: plane; width: 1.2; height: 0.22');
        saveBtn.setAttribute('material', 'color: #4CAF50; opacity: 0.95');
        saveBtn.setAttribute('position', '0 -0.5 0'); // Relatief aan keyboard, so keyboard is at -3 0.6 0
        saveBtn.setAttribute('text', 'value: Beantwoord; align: center; color: white; width: 2');
        saveBtn.setAttribute('class', 'gaze-interactive');
        saveBtn.addEventListener('click', () => {
          // Sla antwoord op in localStorage
          const answer = document.querySelector('#textfield').getAttribute('text').value;
          const room = this.currentRoom;
          let allAnswers = {};
          try { allAnswers = JSON.parse(localStorage.getItem('vr_answers') || '{}'); } catch(e) {}
          allAnswers[room] = answer;
          localStorage.setItem('vr_answers', JSON.stringify(allAnswers));
          // Verberg alles
          if (vraagEntity) vraagEntity.setAttribute('visible', 'false');
          keyboard.setAttribute('visible', 'false');
          document.querySelector('#textfield').setAttribute('visible', 'false');
          saveBtn.setAttribute('visible', 'false');
        });
        keyboard.appendChild(saveBtn);
      } else {
        saveBtn.setAttribute('visible', 'true');
      }
    });
    this.buttonContainer.appendChild(questionBtn);

    // Verberg vraag, keyboard en textfield bij kamerwissel
    const vraagEntity = document.querySelector('#questionText');
    if (vraagEntity) vraagEntity.setAttribute('visible', 'false');
    document.querySelector('#keyboard').setAttribute('visible', 'false');
    document.querySelector('#textfield').setAttribute('visible', 'false');
  }
});
