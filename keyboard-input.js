// Component: Update text field with virtual keyboard input
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