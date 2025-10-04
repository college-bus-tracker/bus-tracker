/* Grid Background Styles */
.grid-background {
  position: relative;
  background-size: var(--grid-size) var(--grid-size);
  background-image: linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
                    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
}

/* Dot Background Styles */
.dot-background {
  position: relative;
  background-size: var(--dot-spacing) var(--dot-spacing);
  background-image: radial-gradient(var(--dot-color) var(--dot-size), transparent var(--dot-size));
}

/* Fade Overlay Styles */
.fade-overlay {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  mask-image: radial-gradient(ellipse at center, transparent var(--fade-intensity), black);
  -webkit-mask-image: radial-gradient(ellipse at center, transparent var(--fade-intensity), black);
}

.dark .fade-overlay {
  background-color: black;
}

/* Container for backgrounds */
.background-container {
  position: relative;
  display: flex;
  height: 50rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.dot-background-container {
  background-color: white;
}

.dark .dot-background-container {
  background-color: black;
}

.content {
  position: relative;
  z-index: 20;
}
