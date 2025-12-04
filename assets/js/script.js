'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


/****Testing code */

 // --- Firebase Configuration (Required for environment) ---
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

        // --- Canvas Setup ---
        const canvas = document.getElementById('firecrackerCanvas');
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Resize handler
        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });

        // Mouse position tracker
        const mouse = { x: width / 2, y: height / 2 };
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        // --- Neon Line Drawing Logic ---
        const points = [];
        const MAX_POINTS = 50; 
        let globalHue = 0; 

        // --- Firecracker Particle Class ---
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                // Generate a random angle for straight line movement
                const angle = Math.random() * Math.PI * 2;
                // Moderate speed for the burst (slower than the initial version)
                const speed = Math.random() * 4 + 2; 

                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;

                this.life = 45; // Short life for a quick burst
                this.maxLife = this.life;
                this.size = Math.random() * 2 + 1; 
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Rapidly slow down (friction)
                this.vx *= 0.93; 
                this.vy *= 0.93;

                this.life--;
            }

            draw() {
                const opacity = this.life / this.maxLife;

                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                
                // Pure white color with fading opacity
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; 
                ctx.shadowColor = 'rgba(255, 255, 255, 1)';
                ctx.shadowBlur = 5; 
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }
        }
        
        // Array to hold the firecracker particles
        const sparkParticles = [];

        /**
         * Triggers a burst of white particles at the given coordinates.
         */
        function triggerFirecrackerBurst(x, y) {
            const burstCount = Math.floor(Math.random() * 15) + 20; 
            for (let i = 0; i < burstCount; i++) {
                sparkParticles.push(new Particle(x, y));
            }
        }
        
        // Attach the burst function to the click event
        document.addEventListener('click', () => {
            triggerFirecrackerBurst(mouse.x, mouse.y);
        });

        /**
         * Draws the continuous, glowing neon line.
         */
        function drawNeonLine() {
            if (points.length < 2) return;

            ctx.save();
            
            for (let i = 1; i < points.length; i++) {
                const p1 = points[i - 1];
                const p2 = points[i];

                const ageRatio = i / points.length;
                const opacity = ageRatio * 0.9; 
                const lineWidth = 3 + 4 * ageRatio; 

                const hue = p1.hue; 
                const color = `hsla(${hue}, 100%, 70%, ${opacity})`;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                
                ctx.strokeStyle = color;
                ctx.lineWidth = lineWidth;
                
                ctx.shadowColor = `hsla(${hue}, 100%, 50%, 1)`;
                ctx.shadowBlur = 18; 
                
                ctx.stroke();
                ctx.closePath();
            }
            
            ctx.restore(); 
        }

        /**
         * Updates and draws all white spark particles.
         */
        function updateAndDrawSparks() {
            for (let i = sparkParticles.length - 1; i >= 0; i--) {
                const p = sparkParticles[i];
                p.update();
                p.draw();

                if (p.life <= 0) {
                    sparkParticles.splice(i, 1);
                }
            }
        }


        // --- Main Animation Loop ---
        function animate() {
            requestAnimationFrame(animate);

            // 1. Clear the canvas with low opacity black for the trailing/fading effect
            // A higher opacity here prevents the white sparks from leaving too long a trail.
            ctx.fillStyle = 'rgba(13, 13, 26, 0.2)'; 
            ctx.fillRect(0, 0, width, height);

            // 2. Neon Line Logic
            points.push({ 
                x: mouse.x, 
                y: mouse.y, 
                hue: globalHue 
            });
            globalHue = (globalHue + 2) % 360;
            if (points.length > MAX_POINTS) {
                points.shift(); 
            }
            
            // 3. Draw the neon line
            drawNeonLine();
            
            // 4. Update and Draw the white firecracker sparks
            updateAndDrawSparks();
        }

        // Start the animation loop when the window is loaded
        window.onload = function () {
            animate();
        }