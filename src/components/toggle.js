export function createToggle() {
  const label = document.createElement('label');
  label.setAttribute('class', 'switch');

  const input = document.createElement('input');
  input.setAttribute('class', 'switch__input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('role', 'switch');
  label.appendChild(input);

  const baseOuter = document.createElement('span');
  baseOuter.setAttribute('class', 'switch__base-outer');
  label.appendChild(baseOuter);

  const baseInner = document.createElement('span');
  baseInner.setAttribute('class', 'switch__base-inner');
  label.appendChild(baseInner);

  const svgNeon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgNeon.setAttribute('class', 'switch__base-neon');
  svgNeon.setAttribute('viewBox', '0 0 40 24');
  svgNeon.setAttribute('width', '40px');
  svgNeon.setAttribute('height', '24px');

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'filter'
  );
  filter.setAttribute('id', 'switch-glow');
  const feGaussianBlur = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'feGaussianBlur'
  );
  feGaussianBlur.setAttribute('result', 'coloredBlur');
  feGaussianBlur.setAttribute('stdDeviation', '1');
  const feMerge = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'feMerge'
  );
  const feMergeNode1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'feMergeNode'
  );
  feMergeNode1.setAttribute('in', 'coloredBlur');
  const feMergeNode2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'feMergeNode'
  );
  feMergeNode2.setAttribute('in', 'SourceGraphic');
  feMerge.appendChild(feMergeNode1);
  feMerge.appendChild(feMergeNode2);
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feMerge);
  defs.appendChild(filter);
  svgNeon.appendChild(defs);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'none');
  path.setAttribute('filter', 'url(#switch-glow)');
  path.setAttribute('stroke', 'url(#switch-gradient1)');
  path.setAttribute('stroke-width', '1');
  path.setAttribute('stroke-dasharray', '0 104.26 0');
  path.setAttribute('stroke-dashoffset', '0.01');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute(
    'd',
    'M0.5,12C0.5,5.649,5.649,0.5,12,0.5h16c6.351,0,11.5,5.149,11.5,11.5s-5.149,11.5-11.5,11.5H12C5.649,23.5,0.5,18.351,0.5,12Z'
  );
  svgNeon.appendChild(path);
  label.appendChild(svgNeon);

  const knobShadow = document.createElement('span');
  knobShadow.setAttribute('class', 'switch__knob-shadow');
  label.appendChild(knobShadow);

  const knobContainer = document.createElement('span');
  knobContainer.setAttribute('class', 'switch__knob-container');
  label.appendChild(knobContainer);

  const knob = document.createElement('span');
  knob.setAttribute('class', 'switch__knob');
  knobContainer.appendChild(knob);

  const svgKnobNeon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  svgKnobNeon.setAttribute('class', 'switch__knob-neon');
  svgKnobNeon.setAttribute('viewBox', '0 0 48 48');
  svgKnobNeon.setAttribute('width', '48px');
  svgKnobNeon.setAttribute('height', '48px');
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttribute('fill', 'none');
  circle.setAttribute('stroke', 'url(#switch-gradient2)');
  circle.setAttribute('stroke-dasharray', '0 90.32 0 54.19');
  circle.setAttribute('stroke-linecap', 'round');
  circle.setAttribute('stroke-width', '1');
  circle.setAttribute('r', '23');
  circle.setAttribute('cx', '24');
  circle.setAttribute('cy', '24');
  circle.setAttribute('transform', 'rotate(-112.5 24 24)');
  svgKnobNeon.appendChild(circle);
  knob.appendChild(svgKnobNeon);

  const led = document.createElement('span');
  led.setAttribute('class', 'switch__led');
  label.appendChild(led);

  const text = document.createElement('span');
  text.setAttribute('class', 'switch__text');
  text.textContent = 'Power';
  label.appendChild(text);

  return label;
}
