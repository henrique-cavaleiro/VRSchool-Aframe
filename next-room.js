AFRAME.registerComponent('next-room', {
  init: function () {
    // List your room photo URLs here, in the order you want to cycle through
    this.rooms = [
      'assets/room1.jpg',
      'assets/room2.jpg'
      // Add more rooms as needed, e.g. 'assets/room3.jpg'
    ];
    this.currentRoom = 0;
    this.sky = document.querySelector('#sky');
    this.el.addEventListener('click', () => {
      // Go to next room, loop back to first after last
      this.currentRoom = (this.currentRoom + 1) % this.rooms.length;
      this.sky.setAttribute('src', this.rooms[this.currentRoom]);
    });
  }
});