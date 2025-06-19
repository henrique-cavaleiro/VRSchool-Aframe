AFRAME.registerComponent('keyboard-input', {
  init: function () {
    const textfield = document.querySelector('#textfield');
    const inputEl = document.querySelector('#textfield');
    
    inputEl.addEventListener('keyboardinput', function (event) {
      const currentValue = textfield.getAttribute('text').value;
      textfield.setAttribute('text', 'value', currentValue + event.detail.value);
    });

    inputEl.addEventListener('keyboardbackspace', function () {
      const currentValue = textfield.getAttribute('text').value;
      textfield.setAttribute('text', 'value', currentValue.slice(0, -1));
    });

    inputEl.addEventListener('keyboardenter', function () {
      console.log("Ingevoerde tekst:", textfield.getAttribute('text').value);
    });
  }
});
