export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movement = distX;
    this.slide.style.transform = `translate3d(${-distX}px, 0, 0)`;
  }

  updatedPosition(clienteX) {
    this.dist.movement = (this.dist.startX - clienteX) * 1.6;
    return this.dist.finalPosition + this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;

    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatedPosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movement;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
