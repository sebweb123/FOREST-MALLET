/* ==========================================================================
   FOREST & MALLET STUDIOS — TACTILE MINIMALISM INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. CUSTOM TACTILE CURSOR TRACKING
     ========================================== */
  const customCursor = document.getElementById('customCursor');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp (Linear Interpolation) loop for cursor movement lag
  function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    customCursor.style.left = `${cursorX}px`;
    customCursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Active cursor states on hover
  const hoverElements = document.querySelectorAll('.hover-zoom-wrapper, .btn, .radio-card, .finish-option, .pill-option, .monogram');
  hoverElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      customCursor.classList.add('active');
      if (elem.classList.contains('hover-zoom-wrapper')) {
        customCursor.querySelector('.cursor-text').textContent = 'DETAIL';
      } else {
        customCursor.querySelector('.cursor-text').textContent = 'SELECT';
      }
    });
    
    elem.addEventListener('mouseleave', () => {
      customCursor.classList.remove('active');
    });
  });

  // Hide custom cursor on mobile
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    customCursor.style.display = 'none';
  }


  /* ==========================================
     2. HEADER SCROLL EFFECT
     ========================================== */
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* ==========================================
     3. INTERSECTION OBSERVER FOR SCROLL REVEALS
     ========================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once triggered to lock animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });


  /* ==========================================
     4. INTERACTIVE TABLE CONFIGURATOR STUDIO
     ========================================== */
  const configForm = document.getElementById('configForm');
  const slabVisual = document.getElementById('slabVisual');
  const ironVisual = document.getElementById('ironVisual');
  const legsVisual = document.getElementById('legsVisual');

  // Spec indicators
  const specLength = document.getElementById('specLength');
  const specFinish = document.getElementById('specFinish');
  const specJoinery = document.getElementById('specJoinery');
  const specSeating = document.getElementById('specSeating');
  const specWeight = document.getElementById('specWeight');
  const specHours = document.getElementById('specHours');
  const specPrice = document.getElementById('specPrice');

  // Specs Configuration Parameters Database
  const sizeMap = {
    '6': { label: '6 Feet (72")', seating: '6 People', weight: '295 lbs (134 kg)', hours: '60 Craft Hours', basePrice: 7800, scale: 0.75, pad: '30%' },
    '8': { label: '8 Feet (96")', seating: '8 to 10 People', weight: '380 lbs (172 kg)', hours: '75 Craft Hours', basePrice: 9400, scale: 0.85, pad: '22%' },
    '10': { label: '10 Feet (120")', seating: '10 to 12 People', weight: '475 lbs (215 kg)', hours: '90 Craft Hours', basePrice: 11600, scale: 0.95, pad: '15%' },
    '12': { label: '12 Feet (144")', seating: '12 to 14 People', weight: '580 lbs (263 kg)', hours: '110 Craft Hours', basePrice: 14200, scale: 1.05, pad: '8%' }
  };

  const finishMap = {
    'natural': { label: 'Natural Virgin Oil', hex: 'var(--color-oak-natural)', price: 0 },
    'smoked': { label: 'Smoked Warm Bronze', hex: 'var(--color-oak-smoked)', price: 350 },
    'charred': { label: 'Shou Sugi Ban (Charred Black)', hex: 'var(--color-oak-charred)', price: 700 }
  };

  const joineryMap = {
    'black-iron': { label: 'Coal-Forged Black Iron', hex: 'var(--color-iron-black)', price: 0 },
    'rusted-patina': { label: 'Acid-Etched Oxide Patina', hex: 'var(--color-iron-rusted)', price: 250 },
    'brass-bronze': { label: 'Polished Solid Bronze', hex: 'var(--color-iron-bronze)', price: 1200 }
  };

  function updateTablePreview() {
    const selectedLengthVal = configForm.elements['table_length'].value;
    const selectedFinishVal = configForm.elements['table_finish'].value;
    const selectedJoineryVal = configForm.elements['table_joinery'].value;

    const sizeData = sizeMap[selectedLengthVal];
    const finishData = finishMap[selectedFinishVal];
    const joineryData = joineryMap[selectedJoineryVal];

    // 1. Update text fields in Spec Sheet
    specLength.textContent = sizeData.label;
    specFinish.textContent = finishData.label;
    specJoinery.textContent = joineryData.label;
    specSeating.textContent = sizeData.seating;
    specWeight.textContent = sizeData.weight;
    specHours.textContent = sizeData.hours;

    // Calc Price
    const totalPrice = sizeData.basePrice + finishData.price + joineryData.price;
    specPrice.textContent = `$${totalPrice.toLocaleString()}`;

    // 2. Animate 2.5D visual model representation
    // Slab width and position changes based on length selection
    slabVisual.style.width = `${sizeData.scale * 80}%`;
    slabVisual.style.left = `${(100 - (sizeData.scale * 80)) / 2}%`;
    slabVisual.style.backgroundColor = finishData.hex;

    // Iron truss adjusts to slab length
    ironVisual.style.width = `${sizeData.scale * 70}%`;
    ironVisual.style.left = `${(100 - (sizeData.scale * 70)) / 2}%`;
    ironVisual.style.backgroundColor = joineryData.hex;

    // Legs spacing expands or contracts
    legsVisual.style.padding = `0 ${sizeData.pad}`;
    
    // Set custom leg and truss color
    document.documentElement.style.setProperty('--color-iron-black', joineryData.hex);
    
    // Smooth pulse animation on price update
    specPrice.style.transform = 'scale(1.08)';
    setTimeout(() => {
      specPrice.style.transform = 'scale(1)';
    }, 150);
  }

  // Bind change events to all configurator selectors
  configForm.addEventListener('change', updateTablePreview);
  
  // Initial run
  updateTablePreview();


  /* ==========================================
     5. SYNC CONFIGURATOR WITH COMMISSION REGISTRY
     ========================================== */
  const applyConfigBtn = document.getElementById('applyConfigBtn');
  const inquiryLength = document.getElementById('inquiryLength');
  const inquiryFinish = document.getElementById('inquiryFinish');
  const inquiryJoinery = document.getElementById('inquiryJoinery');

  applyConfigBtn.addEventListener('click', () => {
    // Read current configuration
    const lenVal = configForm.elements['table_length'].value;
    const finVal = configForm.elements['table_finish'].value;
    const joiVal = configForm.elements['table_joinery'].value;

    // Inject into form step 1 selectors
    inquiryLength.value = lenVal;
    inquiryFinish.value = finVal;
    inquiryJoinery.value = joiVal;

    // Visual notification on applying
    applyConfigBtn.textContent = 'Design Applied ✓';
    applyConfigBtn.classList.remove('btn-solid');
    applyConfigBtn.classList.add('btn-outline');

    setTimeout(() => {
      applyConfigBtn.textContent = 'Apply Design to Commission';
      applyConfigBtn.classList.remove('btn-outline');
      applyConfigBtn.classList.add('btn-solid');
    }, 2000);

    // Scroll smoothly to commission form
    document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' });
  });


  /* ==========================================
     6. BESPOKE MULTI-STEP COMMISSION INQUIRY FORM
     ========================================== */
  const inquiryForm = document.getElementById('inquiryForm');
  const formSteps = document.querySelectorAll('.form-step-content');
  const stepIndicators = document.querySelectorAll('.step-indicator .step');
  const successCard = document.getElementById('inquirySuccess');
  const successEmail = document.getElementById('successEmail');
  const successRegistryId = document.getElementById('successRegistryId');

  let currentStep = 1;

  // Next Buttons click handler
  const nextButtons = document.querySelectorAll('.btn-next');
  nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateCurrentStep(currentStep)) {
        changeStep(currentStep + 1);
      }
    });
  });

  // Prev Buttons click handler
  const prevButtons = document.querySelectorAll('.btn-prev');
  prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      changeStep(currentStep - 1);
    });
  });

  function changeStep(targetStep) {
    // Hide all steps
    formSteps.forEach(step => step.classList.remove('active'));
    stepIndicators.forEach(ind => ind.classList.remove('active'));

    // Show target step
    const targetStepEl = document.querySelector(`.form-step-content[data-step="${targetStep}"]`);
    const targetIndicatorEl = document.querySelector(`.step-indicator .step[data-step="${targetStep}"]`);
    
    targetStepEl.classList.add('active');
    targetIndicatorEl.classList.add('active');
    
    currentStep = targetStep;
  }

  function validateCurrentStep(step) {
    if (step === 1) {
      return true; // Selects are always valid
    }
    if (step === 2) {
      const name = document.getElementById('clientName');
      const email = document.getElementById('clientEmail');
      
      if (!name.value.trim()) {
        name.focus();
        name.classList.add('error');
        return false;
      } else {
        name.classList.remove('error');
      }
      
      if (!email.value.trim() || !validateEmail(email.value)) {
        email.focus();
        email.classList.add('error');
        return false;
      } else {
        email.classList.remove('error');
      }
      
      return true;
    }
    return true;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Handle Form Submit
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const zip = document.getElementById('deliveryZip');
    if (!zip.value.trim()) {
      zip.focus();
      return;
    }

    const emailVal = document.getElementById('clientEmail').value;
    const registryNum = `FM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update receipt values
    successEmail.textContent = emailVal;
    successRegistryId.textContent = registryNum;

    // Lock and submit simulation
    const submitBtn = document.getElementById('submitCommissionBtn');
    submitBtn.textContent = 'Verifying Log Queue...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Hide multi step forms completely
      inquiryForm.style.display = 'none';
      document.querySelector('.step-indicator').style.display = 'none';
      
      // Show success screen
      successCard.classList.add('active');
      
      // Scroll success card into viewport center
      successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  });

  // Restart configurator button from Success state
  const restartConfigBtn = document.getElementById('restartConfigBtn');
  restartConfigBtn.addEventListener('click', () => {
    // Reset Form
    inquiryForm.reset();
    currentStep = 1;
    
    // Restore elements visibility
    inquiryForm.style.display = 'block';
    document.querySelector('.step-indicator').style.display = 'flex';
    successCard.classList.remove('active');
    
    // Enable submit buttons
    const submitBtn = document.getElementById('submitCommissionBtn');
    submitBtn.textContent = 'Submit Commission Request';
    submitBtn.disabled = false;
    
    changeStep(1);

    // Scroll to top of configurator
    document.getElementById('configurator').scrollIntoView({ behavior: 'smooth' });
  });

});
