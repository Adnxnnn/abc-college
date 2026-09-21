// ABC College of Technology - Interactive Functionality

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');
  const admissionForm = document.getElementById('admissionForm');
  const formToast = document.getElementById('formToast');
  const toastMessage = document.getElementById('toastMessage');

  // 1. Scroll effect for Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting on scroll
    updateActiveNavLink();
  });

  // 2. Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking a link
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. Highlight current section in navigation
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // 4. Admission Form Submission Handling
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('studentName').value.trim();
      const email = document.getElementById('studentEmail').value.trim();
      const phone = document.getElementById('studentPhone').value.trim();
      const course = document.getElementById('courseSelect').value;
      const genderInput = document.querySelector('input[name="gender"]:checked');

      if (!studentName || !email || !phone || !course || !genderInput) {
        alert('Please fill in all required fields to proceed.');
        return;
      }

      const gender = genderInput.value;
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.innerHTML;

      // Button loading simulation
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Application...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Show pleasant confirmation message
        if (formToast && toastMessage) {
          toastMessage.innerHTML = `<strong>Congratulations, ${studentName}!</strong> Your application for <strong>${course}</strong> has been received. Our admissions team will contact you at <em>${email}</em> and <em>${phone}</em>.`;
          formToast.classList.add('active');

          // Smooth scroll to notification
          formToast.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Reset form
          admissionForm.reset();

          // Auto-hide alert after 8 seconds
          setTimeout(() => {
            formToast.classList.remove('active');
          }, 8000);
        }
      }, 700);
    });
  }
});
