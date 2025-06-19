AFRAME.registerComponent('gaze-listener', {
  init: function () {
    const el = this.el;
    el.addEventListener('click', function () {
      const keyboard = document.querySelector('#keyboard');
      const textfield = document.querySelector('#textfield');

      // Toon het toetsenbord en het tekstvlak
      keyboard.setAttribute('visible', true);
      textfield.setAttribute('visible', true);
    });
  }
});
