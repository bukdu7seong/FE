export default class Obstacle {
  constructor(board, areaBounds) {
    this.board = board;
    this.areaBounds = areaBounds;
    this.element = document.createElement('div');
    this.element.className = 'obstacle';
    this.initPosition();
    this.board.appendChild(this.element);
    this.move();
  }

  initPosition() {
    const marginWidth = this.board.clientWidth * 0.1;
    const marginHeight = this.board.clientHeight * 0.1;
    const availableWidth = this.board.clientWidth * 0.8;
    const availableHeight = this.board.clientHeight * 0.8;

    this.element.style.top = (Math.random() * availableHeight + marginHeight) + 'px';
    this.element.style.left = (Math.random() * availableWidth + marginWidth) + 'px';
  }

  move() {
    const speed = 1;
    let dx = Math.random() < 0.5 ? speed : -speed;
    let dy = Math.random() < 0.5 ? speed : -speed;

    const animate = () => {
      let rect = this.element.getBoundingClientRect();

      if (rect.left <= this.areaBounds.left || rect.right >= this.areaBounds.right) {
        dx = -dx;
      }
      if (rect.top <= this.areaBounds.top || rect.bottom >= this.areaBounds.bottom) {
        dy = -dy;
      }

      this.element.style.left = this.element.offsetLeft + dx + 'px';
      this.element.style.top = this.element.offsetTop + dy + 'px';

      requestAnimationFrame(animate);
    };

    animate();
  }

  remove() {
    this.element.remove();
  }
}
