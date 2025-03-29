// ==============================================
// MAIN PORTFOLIO SCRIPT - HANDLES ALL FUNCTIONALITY
// ==============================================

// Dark theme as default
document.documentElement.classList.add('dark')
localStorage.setItem('theme', 'dark')

// ======================
// 1. THEME TOGGLE SYSTEM
// ======================
const themeToggle = document.getElementById('theme-toggle')

function updateThemeIcon() {
  if (!themeToggle) return

  if (document.documentElement.classList.contains('dark')) {
    themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        `
  } else {
    themeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        `
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
    document.documentElement.classList.toggle('light')

    const currentTheme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
    localStorage.setItem('theme', currentTheme)

    updateThemeIcon()
  })

  // Initialize icon
  updateThemeIcon()
}

// ======================
// 2. MOBILE MENU SYSTEM
// ======================
const mobileMenuButton = document.getElementById('mobile-menu-button')
const mobileMenu = document.getElementById('mobile-menu')

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll('#mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
    })
  })
}

// ======================
// 3. SMOOTH SCROLLING
// ======================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href')
    if (targetId === '#') return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      })
    }
  })
})

// ======================
// 4. BACK TO TOP BUTTON
// ======================
const backToTopButtons = document.querySelectorAll('a[href="#"]')
backToTopButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  })
})

// ======================
// 5. PROJECTS FILTERING
// ======================
if (document.querySelector('.project-card')) {
  const filterButtons = document.querySelectorAll('.filter-btn')
  const projectCards = document.querySelectorAll('.project-card')

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) =>
        btn.classList.remove('bg-purple-600', 'text-white')
      )

      // Add active class to clicked button
      this.classList.add('bg-purple-600', 'text-white')

      const filterValue = this.getAttribute('data-filter')

      projectCards.forEach((card) => {
        if (filterValue === 'all') {
          card.classList.remove('hidden')
        } else {
          if (card.getAttribute('data-tags').includes(filterValue)) {
            card.classList.remove('hidden')
          } else {
            card.classList.add('hidden')
          }
        }
      })
    })
  })
}

// ======================
// 6. CONTACT FORM HANDLING
// ======================
if (document.getElementById('contact-form')) {
  const contactForm = document.getElementById('contact-form')

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault()

    // Get form values
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    }

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.')
      return
    }

    // Here you would typically send the data to a server
    console.log('Form submitted:', formData)

    // Show success message
    const successMessage = document.createElement('div')
    successMessage.className = 'bg-green-500 text-white p-4 rounded-lg mb-4'
    successMessage.textContent =
      'Thank you for your message! I will get back to you soon.'

    const formContainer = contactForm.parentElement
    formContainer.insertBefore(successMessage, contactForm)

    // Reset the form
    contactForm.reset()

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove()
    }, 5000)
  })
}

// ======================
// 7. RESUME DOWNLOAD
// ======================
if (document.getElementById('download-resume')) {
  const downloadBtn = document.getElementById('download-resume')

  downloadBtn.addEventListener('click', function (e) {
    e.preventDefault()

    // Simulate download
    console.log('Downloading resume...')

    // Create a temporary link
    const link = document.createElement('a')
    link.href = '/assets/resume.pdf' // Update with actual path
    link.download = 'student-resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show download confirmation
    alert(
      "Your download will begin shortly. If it doesn't, check your pop-up blocker settings."
    )
  })
}

// ======================
// 8. CERTIFICATION VIEWER
// ======================
if (document.querySelector('.certification-card')) {
  const certificationCards = document.querySelectorAll('.certification-card')
  const modal = document.createElement('div')
  modal.id = 'certification-modal'
  modal.className =
    'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden'
  modal.innerHTML = `
        <div class="relative max-w-4xl w-full">
            <button id="close-modal" class="absolute -top-10 right-0 text-white hover:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <img id="modal-image" class="w-full h-auto max-h-screen" src="" alt="Certification">
        </div>
    `
  document.body.appendChild(modal)

  const modalImg = document.getElementById('modal-image')
  const closeModal = document.getElementById('close-modal')

  certificationCards.forEach((card) => {
    card.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').src
      modalImg.src = imgSrc
      modal.classList.remove('hidden')
      document.body.classList.add('overflow-hidden')
    })
  })

  closeModal.addEventListener('click', function () {
    modal.classList.add('hidden')
    document.body.classList.remove('overflow-hidden')
  })

  // Close modal when clicking outside the image
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.add('hidden')
      document.body.classList.remove('overflow-hidden')
    }
  })
}

// ======================
// 9. SKILLS ANIMATION
// ======================
if (document.querySelector('.skill-bar')) {
  const skillBars = document.querySelectorAll('.skill-bar')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const width = bar.getAttribute('data-width')
            bar.style.width = width
          })
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  const skillsSection = document.querySelector('.skills-section')
  if (skillsSection) {
    observer.observe(skillsSection)
  }
}

// ======================
// 10. ACTIVE NAV LINK HIGHLIGHTING
// ======================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  const navLinks = document.querySelectorAll('nav a')

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop()
    if (linkPage === currentPage) {
      link.classList.add('text-purple-400', 'font-semibold')
      link.classList.remove('hover:text-purple-300')
    }
  })
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  setActiveNavLink()
  updateThemeIcon()

  // Set dark theme as default if no preference exists
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
})
