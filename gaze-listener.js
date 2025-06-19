// Component: Show keyboard and text field when gaze button is activated by fuse
AFRAME.registerComponent('gaze-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('click', function () {
      document.querySelector('#keyboard').setAttribute('visible', 'true');
      document.querySelector('#textfield').setAttribute('visible', 'true');
    });
  }
});