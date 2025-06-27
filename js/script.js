document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    // Hide all testimonials except the first one
    if (testimonials.length > 1) {
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }

        // Next button functionality
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
            });
        }

        // Previous button functionality
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
            });
        }
    }

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Load the EmailJS SDK
        const emailjsScript = document.createElement('script');
        emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        document.head.appendChild(emailjsScript);

        emailjsScript.onload = function() {
            emailjs.init("vMYnJAu6sKepgSRww");
        };

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(contactForm);
            let formValues = {};

            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }

            // Add current date for the template
            formValues.date = new Date().toLocaleDateString();

            console.log('Form submitted with values:', formValues);

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerText;
            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;

            // Send email using EmailJS
            emailjs.send(
                'gmail', // Use the Gmail service - must be set up in EmailJS dashboard
                'akashic_healing_template', // Replace with your template ID from EmailJS
                formValues
            ).then(function(response) {
                console.log('Email sent successfully:', response);
                // Display success message
                contactForm.innerHTML = '<div class="success-message"><h3>Thank You!</h3>' +
                    '<p>Your message has been sent successfully. I will get back to you soon.</p></div>';
            }).catch(function(error) {
                console.error('Email sending failed:', error);
                submitButton.innerText = originalButtonText;
                submitButton.disabled = false;

                // Show error message
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Failed to send message. Please try again later.';
                errorMessage.style.color = 'red';
                contactForm.appendChild(errorMessage);
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                console.log('Newsletter subscription for:', email);
                emailInput.value = '';

                // Show success message
                const successMsg = document.createElement('p');
                successMsg.textContent = 'Thank you for subscribing!';
                successMsg.className = 'success-text';
                successMsg.style.color = '#4a8c8c';
                successMsg.style.marginTop = '10px';

                // Remove any existing success message
                const existingMsg = newsletterForm.querySelector('.success-text');
                if (existingMsg) {
                    existingMsg.remove();
                }

                newsletterForm.appendChild(successMsg);
            }
        });
    }

    // Update current year in the footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

