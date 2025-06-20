// Component: Custom keyboard for multiple choice answers (A, B, C)
AFRAME.registerComponent('keyboard', {
  schema: {
    inputEl: { type: 'selector' },
    answers: { type: 'string', default: '' } // JSON string with {A:..., B:..., C:...}
  },
  update: function () {
    // Remove any existing keys
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
    // Parse answers
    let answers = {A: 'A', B: 'B', C: 'C'};
    if (this.data.answers) {
      try {
        answers = JSON.parse(this.data.answers);
      } catch (e) {}
    }
    // Key labels
    const keys = ['A', 'B', 'C'];
    keys.forEach((key, i) => {
      const keyEntity = document.createElement('a-entity');
      keyEntity.setAttribute('geometry', 'primitive: plane; width: 1.2; height: 0.5'); // Bigger buttons
      keyEntity.setAttribute('material', 'color: #333; opacity: 0.95');
      keyEntity.setAttribute('position', `${(i - 1) * 1.5} 0 0`); // Further apart
      keyEntity.setAttribute('text', `value: ${key}: ${answers[key]}; align: center; color: white; width: 4`);
      keyEntity.setAttribute('class', 'gaze-interactive');
      keyEntity.addEventListener('click', () => {
        // Set the answer in the text field
        if (this.data.inputEl) {
          this.data.inputEl.setAttribute('text', 'value', key);
        }
      });
      this.el.appendChild(keyEntity);
    });
  }
});
