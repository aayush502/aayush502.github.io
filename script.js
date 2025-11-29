$(document).ready(function(){
    // Loading screen
    $(window).on('load', function(){
        $('.loader-wrapper').fadeOut(1000);
    });

    $(window).scroll(function(){
        // Sticky navbar on scroll
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // Scroll-up button show/hide
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }

        // Active menu item on scroll
        var sections = $('section');
        var nav = $('.navbar .menu li a');

        var current = '';
        sections.each(function(){
            var sectionTop = $(this).offset().top;
            if($(window).scrollTop() >= (sectionTop - 200)){
                current = $(this).attr('id');
            }
        });

        nav.each(function(){
            $(this).removeClass('active');
            if($(this).attr('href') == '#' + current){
                $(this).addClass('active');
            }
        });
    });

    // Smooth scroll for navigation links - OPTIMIZED FOR FASTER SCROLLING
    $('.navbar .menu li a, .scroll-up-btn').click(function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        
        if(target === '#home' || target === '' || this.classList.contains('fa-angle-up')){
            $('html, body').animate({scrollTop: 0}, 500); // Reduced from 800ms to 500ms
        } else {
            var targetSection = $(target);
            if(targetSection.length){
                $('html, body').animate({
                    scrollTop: targetSection.offset().top - 80
                }, 500); // Reduced from 800ms to 500ms
            }
        }
        
        // Close mobile menu if open
        $('.navbar .menu').removeClass("active");
        $('.menu-btn').removeClass("active");
    });

    // Toggle mobile menu
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn').toggleClass("active");
    });

    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass("active");
            $('.menu-btn').removeClass("active");
        }
    });

    // Typing animation
    if($('.typing').length){
        var typed = new Typed(".typing", {
            strings: ["Full Stack Developer", "Software Engineer", "Web Developer", "Problem Solver", "Tech Enthusiast"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    if($('.typing-2').length){
        var typed2 = new Typed(".typing-2", {
            strings: ["Full Stack Developer", "Software Engineer", "Backend Developer", "Web Developer"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Remove the statistics counter since we removed the stats section
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger skill item animations
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    $('.about .about-content, .experience .experience-card, .skill-item, .project-card, .contact .contact-content').each(function() {
        observer.observe(this);
    });

    // Parallax effect for home section
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var rate = scroll * -0.5;
        $('.particles-container').css('transform', 'translate3d(0, ' + rate + 'px, 0)');
    });

    // Form submission with validation
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        var name = $('input[type="text"]').first().val();
        var email = $('input[type="email"]').val();
        var subject = $('input[type="text"]').last().val();
        var message = $('textarea').val();
        
        if (name && email && subject && message) {
            // Simulate form submission
            var $button = $(this).find('button');
            var originalText = $button.html();
            
            $button.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
            $button.prop('disabled', true);
            
            setTimeout(function() {
                $button.html('<i class="fas fa-check"></i> Message Sent!');
                
                setTimeout(function() {
                    $button.html(originalText);
                    $button.prop('disabled', false);
                    $('.contact-form')[0].reset();
                }, 2000);
            }, 2000);
        } else {
            alert('Please fill in all fields');
        }
    });

    // Dynamic background particles
    function createParticle() {
        const particle = $('<div class="particle"></div>');
        particle.css({
            position: 'absolute',
            width: Math.random() * 5 + 'px',
            height: Math.random() * 5 + 'px',
            background: 'rgba(102, 126, 234, 0.5)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: '100%',
            animation: `float ${Math.random() * 6 + 4}s linear infinite`
        });
        
        $('.particles-container').append(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    // Create particles periodically
    setInterval(createParticle, 1000);

    // Add floating animation for particles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            @keyframes float {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');

    // Enhanced hover effects
    $('.project-card').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );

    $('.service-card, .card').hover(
        function() {
            $(this).css('transform', 'translateY(-10px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // EmailJS Configuration and Form Handler
    // Initialize EmailJS with your public key
    emailjs.init("FApUKtH3x4OD_IC8V"); // Replace with your actual EmailJS public key
    
    // Contact form submission
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const btn = $('#send-btn');
        const status = $('#form-status');
        
        // Show loading state
        btn.prop('disabled', true).html('Sending... <i class="fas fa-spinner fa-spin"></i>');
        status.removeClass('success error').addClass('loading').text('Sending your message...').show();
        
        // Get form data
        const formData = {
            from_name: $('input[name="from_name"]').val(),
            from_email: $('input[name="from_email"]').val(),
            subject: $('input[name="subject"]').val(),
            message: $('textarea[name="message"]').val(),
            to_name: 'Aayush Humagain' // Your name
        };
        
        // Send email using EmailJS
        emailjs.send('service_ilkh8si', 'template_ax0lxih', formData)
            .then(function(response) {
                // Success
                status.removeClass('loading error').addClass('success')
                      .text('Thank you! Your message has been sent successfully.');
                btn.prop('disabled', false).html('Send Message <i class="fas fa-paper-plane"></i>');
                
                // Reset form
                $('#contact-form')[0].reset();
                
                // Hide status after 5 seconds
                setTimeout(() => {
                    status.fadeOut();
                }, 5000);
                
            }, function(error) {
                // Error
                status.removeClass('loading success').addClass('error')
                      .text('Sorry, there was an error sending your message. Please try again.');
                btn.prop('disabled', false).html('Send Message <i class="fas fa-paper-plane"></i>');
                
                // Hide status after 5 seconds
                setTimeout(() => {
                    status.fadeOut();
                }, 5000);
            });
    });
});