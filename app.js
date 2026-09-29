/* ==========================================================================
   INDUKURU NAVEEN KUMAR REDDY - PORTFOLIO LOGIC
   Role Cycler, Pupil HRV Simulator, Modal Controller, Theme System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRoleCycler();
  initSkillsFilter();
  initModals();
  initCopyButtons();
  initContactForm();
  initPupilHrvSimulator();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ==========================================================================
   2. DYNAMIC ROLE CYCLER
   ========================================================================== */
function initRoleCycler() {
  const roleEl = document.getElementById('role-cycler');
  if (!roleEl) return;

  const roles = [
    'Python & Software Testing',
    'Manual Testing & STLC Methodologies',
    'Pupil HRV & Computer Vision AI',
    'Python Scripting & Test Validation',
    'SQL Databases & Defect Tracking'
  ];

  let currentIndex = 0;
  setInterval(() => {
    roleEl.style.opacity = '0';
    roleEl.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % roles.length;
      roleEl.textContent = roles[currentIndex];
      roleEl.style.opacity = '1';
      roleEl.style.transform = 'translateY(0)';
    }, 280);
  }, 3200);

  roleEl.style.transition = 'all 0.28s ease';
}

/* ==========================================================================
   3. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('#skill-filters .filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. MODALS & LIGHT DISMISS
   ========================================================================== */
function initModals() {
  const hrvModal = document.getElementById('hrv-modal');
  const resumeModal = document.getElementById('resume-modal');
  const detailModal = document.getElementById('project-detail-modal');

  // Launch HRV Lab triggers
  const launchLabBtns = [
    document.getElementById('launch-hrv-lab-btn'),
    document.querySelector('.open-hrv-modal-btn')
  ];

  launchLabBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (hrvModal) {
          hrvModal.showModal();
          startHrvSimulation();
        }
      });
    }
  });

  // Resume triggers
  const resumeBtns = [
    document.getElementById('open-resume-btn'),
    ...document.querySelectorAll('.open-resume-trigger')
  ];

  resumeBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (resumeModal) resumeModal.showModal();
      });
    }
  });

  // Print Resume action
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Project Detail triggers
  const detailBtns = document.querySelectorAll('.open-project-detail-btn');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      renderProjectDetail(projectKey);
      if (detailModal) detailModal.showModal();
    });
  });

  // Generic close buttons
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) targetModal.close();
    });
  });

  // Light dismiss: clicking on dialog backdrop closes it
  const allModals = [hrvModal, resumeModal, detailModal];
  allModals.forEach(dialog => {
    if (dialog) {
      dialog.addEventListener('click', (event) => {
        // If clicked on backdrop (target is the dialog itself)
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });
    }
  });
}

/* ==========================================================================
   5. PROJECT ARCHITECTURE CONTENT RENDERER
   ========================================================================== */
function renderProjectDetail(projectKey) {
  const titleEl = document.getElementById('detail-modal-title');
  const bodyEl = document.getElementById('detail-modal-body');
  if (!bodyEl || !titleEl) return;

  if (projectKey === 'pupil-hrv') {
    titleEl.textContent = 'Biomedical Architecture: Pupil Heart Rate Variability Monitoring';
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border-left:4px solid var(--accent-cyan);">
          <h4 style="color:var(--accent-cyan); margin-bottom:6px;">Scientific & Technical Objective</h4>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            Heart Rate Variability (HRV) is universally recognized as the clinical gold standard for quantifying Autonomic Nervous System (ANS) balance. 
            Traditional monitoring requires ECG leads or contact PPG sensors. 
            This research project demonstrates non-invasive autonomic assessment by quantifying continuous pupillary micro-fluctuations (hippus) captured via high-framerate computer vision.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">1. Video Acquisition</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">60 FPS eye-region capture; adaptive contrast histogram equalization (CLAHE) to handle variable ambient luminescences.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">2. Pupil Segmentation</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">OpenCV Canny edge detection, morphologic closing, and Starburst elliptical contour fitting for sub-pixel pupil diameter extraction.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">3. Signal Denoising</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">4th-order Butterworth bandpass filter (0.04 Hz - 0.4 Hz) isolating autonomic sympathetic and parasympathetic rhythms from blink artifacts.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">4. Spectral Analytics</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Welch's PSD method computing Low Frequency (LF: 0.04-0.15Hz) and High Frequency (HF: 0.15-0.40Hz) powers to yield sympathetic tone ratio.</p>
          </div>
        </div>

        <div style="background:var(--bg-card); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-glow);">
          <h4 style="margin-bottom:10px;">Engineering Stack & Methodologies</h4>
          <ul style="padding-left:20px; font-size:0.88rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li><strong>Core Languages:</strong> Python 3.10+, NumPy, SciPy (Signal), OpenCV (cv2)</li>
            <li><strong>Web Visualization Service:</strong> Python Flask REST API with WebSocket streaming</li>
            <li><strong>Frontend Dashboard:</strong> Real-time Canvas 2D rendering, responsive metrics telemetry</li>
            <li><strong>Testing & Quality Assurance:</strong> Synthetic waveform validation, ground-truth pulse sensor correlation testing</li>
          </ul>
        </div>
      </div>
    `;
  } else if (projectKey === 'ecommerce') {
    titleEl.textContent = 'System Architecture: Online Shopping Management System';
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border-left:4px solid var(--accent-blue);">
          <h4 style="color:var(--accent-blue); margin-bottom:6px;">Enterprise Full-Stack Architecture</h4>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            A production-ready e-commerce management platform built with high-throughput Spring Boot microservices, stateless JWT security, Redis cart acceleration, and interactive admin telemetry.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Authentication & RBAC</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Spring Security filter chain with cryptographically signed JSON Web Tokens (JWT) handling Customer, Vendor, and Admin privileges.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Caching & Low Latency</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">In-memory Redis layer for transient shopping cart sessions and hot catalog items, slashing database read queries by 65%.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Database & Integrity</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">PostgreSQL / MySQL relational schema with transactional rollback on inventory depletion during concurrent user checkouts.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">QA & Testing Suite</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Rigorous JUnit 5 integration tests, Mockito service mocks, Postman automated test collections, and Swagger/OpenAPI interactive documentation.</p>
          </div>
        </div>

        <div style="background:var(--bg-card); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-glow);">
          <h4 style="margin-bottom:10px;">Tech Stack Breakdown</h4>
          <ul style="padding-left:20px; font-size:0.88rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li><strong>Backend:</strong> Java 17, Spring Boot 3, Spring Data JPA, Hibernate, Spring Security</li>
            <li><strong>Frontend:</strong> React 18, TypeScript, Tailwind CSS, Axios, Lucide Icons</li>
            <li><strong>DevOps & Quality:</strong> Docker, Docker Compose, Postman, JUnit, Swagger UI</li>
          </ul>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   6. PUPIL HRV SIMULATION LAB (INTERACTIVE CANVAS & SIGNAL PROCESSING)
   ========================================================================== */
let isHrvSimRunning = false;
let hrvAnimationId = null;

function initPupilHrvSimulator() {
  const lightSlider = document.getElementById('light-slider');
  const triggerStressBtn = document.getElementById('trigger-stress-btn');
  const toggleFilterBtn = document.getElementById('toggle-filter-btn');

  if (lightSlider) {
    lightSlider.addEventListener('input', (e) => {
      simState.ambientLight = parseInt(e.target.value, 10);
    });
  }

  if (triggerStressBtn) {
    triggerStressBtn.addEventListener('click', () => {
      simState.cognitiveStress = true;
      triggerStressBtn.textContent = '⚡ Cognitive Load Active (High Stress)';
      triggerStressBtn.style.borderColor = '#ef4444';
      triggerStressBtn.style.color = '#ef4444';

      setTimeout(() => {
        simState.cognitiveStress = false;
        triggerStressBtn.textContent = 'Trigger Cognitive Load';
        triggerStressBtn.style.borderColor = '';
        triggerStressBtn.style.color = '';
      }, 5000);
    });
  }

  if (toggleFilterBtn) {
    toggleFilterBtn.addEventListener('click', () => {
      simState.filterActive = !simState.filterActive;
      toggleFilterBtn.textContent = simState.filterActive ? 'Filter: Butterworth ON' : 'Filter: Raw Unfiltered';
      showToast(`Denoising filter ${simState.filterActive ? 'enabled' : 'disabled'}`);
    });
  }
}

const simState = {
  ambientLight: 50,
  cognitiveStress: false,
  filterActive: true,
  time: 0,
  waveformHistory: new Array(180).fill(0),
  pupilDiameter: 3.74,
  currentBpm: 72,
  lfHfRatio: 1.24
};

function startHrvSimulation() {
  if (isHrvSimRunning) return;
  isHrvSimRunning = true;

  const eyeCanvas = document.getElementById('eyeSimulationCanvas');
  const waveCanvas = document.getElementById('waveformCanvas');
  if (!eyeCanvas || !waveCanvas) return;

  const eyeCtx = eyeCanvas.getContext('2d');
  const waveCtx = waveCanvas.getContext('2d');

  function renderLoop() {
    if (!document.getElementById('hrv-modal')?.open) {
      isHrvSimRunning = false;
      return;
    }

    simState.time += 0.05;

    // Calculate simulated pupil dynamics
    // Base diameter inversely proportional to light
    const baseDiameter = 5.2 - (simState.ambientLight / 100) * 2.4; 
    
    // Autonomic oscillations (hippus 0.1 - 0.3 Hz + RSA respiration ~0.25 Hz)
    const hippusOscillation = Math.sin(simState.time * 0.8) * 0.18 + Math.cos(simState.time * 1.5) * 0.12;
    const stressAddition = simState.cognitiveStress ? 0.75 + Math.sin(simState.time * 2.8) * 0.25 : 0;
    
    simState.pupilDiameter = Math.max(2.0, baseDiameter + hippusOscillation + stressAddition);

    // Update Telemetry metrics
    const targetBpm = simState.cognitiveStress ? 96 : 72;
    simState.currentBpm += (targetBpm - simState.currentBpm) * 0.05 + (Math.random() - 0.5) * 0.5;

    const targetLfHf = simState.cognitiveStress ? 2.65 : 1.25;
    simState.lfHfRatio += (targetLfHf - simState.lfHfRatio) * 0.05 + (Math.random() - 0.5) * 0.04;

    // Push waveform value
    let waveVal = hippusOscillation * 1.5;
    if (!simState.filterActive) {
      // Add high frequency jitter if filter off
      waveVal += (Math.random() - 0.5) * 0.9;
    }
    simState.waveformHistory.push(waveVal);
    simState.waveformHistory.shift();

    // Render Canvas Views
    drawEyeSimulation(eyeCtx, eyeCanvas.width, eyeCanvas.height);
    drawWaveform(waveCtx, waveCanvas.width, waveCanvas.height);

    // Update DOM indicators
    updateHudText();

    hrvAnimationId = requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

function drawEyeSimulation(ctx, w, h) {
  ctx.fillStyle = '#050a14';
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  // Sclera (Eye White background)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, 140, 75, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#e2e8f0';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#38bdf8';
  ctx.stroke();

  // Iris
  const irisRadius = 52;
  const irisGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, irisRadius);
  irisGrad.addColorStop(0, '#0284c7');
  irisGrad.addColorStop(0.7, '#0369a1');
  irisGrad.addColorStop(1, '#082f49');

  ctx.beginPath();
  ctx.arc(cx, cy, irisRadius, 0, Math.PI * 2);
  ctx.fillStyle = irisGrad;
  ctx.fill();

  // Iris striations
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 16, cy + Math.sin(angle) * 16);
    ctx.lineTo(cx + Math.cos(angle) * irisRadius, cy + Math.sin(angle) * irisRadius);
    ctx.stroke();
  }

  // Pupil (Contracting and Dilating according to simulation)
  const pupilPixelRadius = simState.pupilDiameter * 6.5;
  ctx.beginPath();
  ctx.arc(cx, cy, pupilPixelRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Corneal Light Reflection
  ctx.beginPath();
  ctx.arc(cx - pupilPixelRadius * 0.4, cy - pupilPixelRadius * 0.4, 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fill();

  // Computer Vision HUD tracking bounding box & crosshair
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cx - pupilPixelRadius - 6, cy - pupilPixelRadius - 6, (pupilPixelRadius + 6) * 2, (pupilPixelRadius + 6) * 2);

  // Tracking crosshairs
  ctx.strokeStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy);
  ctx.lineTo(cx + 15, cy);
  ctx.moveTo(cx, cy - 15);
  ctx.lineTo(cx, cy + 15);
  ctx.stroke();

  ctx.restore();
}

function drawWaveform(ctx, w, h) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Waveform line
  const midY = h / 2;
  const history = simState.waveformHistory;
  const step = w / (history.length - 1);

  ctx.beginPath();
  ctx.strokeStyle = simState.cognitiveStress ? '#ef4444' : '#38bdf8';
  ctx.lineWidth = 2;

  for (let i = 0; i < history.length; i++) {
    const x = i * step;
    const y = midY - history[i] * 35;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Glow under waveform
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fillStyle = simState.cognitiveStress ? 'rgba(239, 68, 68, 0.1)' : 'rgba(56, 189, 248, 0.1)';
  ctx.fill();
}

function updateHudText() {
  const diaEl = document.getElementById('sim-pupil-dia');
  const bpmEl = document.getElementById('live-bpm');
  const lfhfEl = document.getElementById('live-lfhf');
  const stressEl = document.getElementById('live-stress');

  if (diaEl) diaEl.textContent = `DIA: ${simState.pupilDiameter.toFixed(2)} mm`;
  if (bpmEl) bpmEl.textContent = Math.round(simState.currentBpm);
  if (lfhfEl) lfhfEl.textContent = simState.lfHfRatio.toFixed(2);
  if (stressEl) {
    if (simState.cognitiveStress) {
      stressEl.textContent = 'High';
      stressEl.style.color = '#ef4444';
    } else {
      stressEl.textContent = 'Normal';
      stressEl.style.color = '#34d399';
    }
  }
}

/* ==========================================================================
   7. COPY TO CLIPBOARD HELPER
   ========================================================================== */
function initCopyButtons() {
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+918639866865').then(() => {
        showToast('Phone number copied: +91-8639866865');
      }).catch(() => {
        showToast('Contact: +91-8639866865');
      });
    });
  }
}

/* ==========================================================================
   8. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    const mailtoUrl = `mailto:indukurun@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    showToast(`Thank you, ${name}! Opening mail client...`);
    form.reset();
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION & ACTIVE LINK SPY
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:#38bdf8;">✦</span>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 320);
  }, 3500);
}
