export function pageSwitch() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');

  const content = `
  <label class="switch">
  <input class="switch__input" type="checkbox" role="switch">
  <span class="switch__base-outer"></span>
  <span class="switch__base-inner"></span>
  <svg class="switch__base-neon" viewBox="0 0 40 24" width="40px" height="24px">
	  <defs>
		  <filter id="switch-glow">
			  <feGaussianBlur result="coloredBlur" stddeviation="1"></feGaussianBlur>
			  <feMerge>
				  <feMergeNode in="coloredBlur"></feMergeNode>
				  <feMergeNode in="SourceGraphic"></feMergeNode>
			  </feMerge>
		  </filter>
		  <linearGradient id="switch-gradient1" x1="0" y1="0" x2="1" y2="0">
			  <stop offset="0%" stop-color="hsl(var(--on-hue1),90%,70%)" />
			  <stop offset="100%" stop-color="hsl(var(--on-hue2),90%,70%)" />
		  </linearGradient>
		  <linearGradient id="switch-gradient2" x1="0.7" y1="0" x2="0.3" y2="1">
			  <stop offset="25%" stop-color="hsla(var(--on-hue1),90%,70%,0)" />
			  <stop offset="50%" stop-color="hsla(var(--on-hue1),90%,70%,0.3)" />
			  <stop offset="100%" stop-color="hsla(var(--on-hue2),90%,70%,0.3)" />
		  </linearGradient>
	  </defs>
	  <path fill="none" filter="url(#switch-glow)" stroke="url(#switch-gradient1)" stroke-width="1" stroke-dasharray="0 104.26 0" stroke-dashoffset="0.01" stroke-linecap="round" d="m.5,12C.5,5.649,5.649.5,12,.5h16c6.351,0,11.5,5.149,11.5,11.5s-5.149,11.5-11.5,11.5H12C5.649,23.5.5,18.351.5,12Z"/>
  </svg>
  <span class="switch__knob-shadow"></span>
  <span class="switch__knob-container">
	  <span class="switch__knob">
		  <svg class="switch__knob-neon" viewBox="0 0 48 48" width="48px" height="48px">
			  <circle fill="none" stroke="url(#switch-gradient2)" stroke-dasharray="0 90.32 0 54.19" stroke-linecap="round" stroke-width="1" r="23" cx="24" cy="24" transform="rotate(-112.5,24,24)" />
		  </svg>	
	  </span>
  </span>
  <span class="switch__led"></span>
  <span class="switch__text">Settings</span>
</label>
		`;
  page.innerHTML = content;
  return page;
}

export function pageProfile() {
  const page = document.createElement('div');
  page.setAttribute('class', 'full-screen');
  const content = `
		  <div class="side-bar"></div>
		  <div class="main-box">
			<div class="profile-box"></div>
			<h1>Profile</h1>
			<p>Welcome to the profile page.</p>
		  </div>
		`;
  page.innerHTML = content;
  return page;
}
