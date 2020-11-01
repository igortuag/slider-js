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
    const moveType = event.type === 'mousedown' ? 'mousemove' : 'touchmove';
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
    }

    this.wrapper.addEventListener(moveType, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatedPosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movement;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides config

  slidePosition(slide) {
    return (
      slide.offsetLeft - (this.wrapper.offsetWidth - slide.offsetWidth) / 2
    );
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;

    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index < last ? index + 1 : undefined,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((el) => {
      const position = this.slidePosition(el);
      return {
        position,
        el,
      };
    });
    console.log(this.slideArray);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }
}
