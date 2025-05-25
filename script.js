document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    
                    // FIX: Scroll to top when changing sections
                    // This ensures the content starts at the top
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'instant' // Use 'instant' instead of 'smooth' for immediate scroll
                    });
                }
            });
        });
    });
    
    // Typing effect for hero description
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 80);
            }
        }
        
        setTimeout(type, 500);
    }
    
    // Observer options for animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    // Animate skill bars when skills section is visible
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('skills-section')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        const level = item.getAttribute('data-level');
                        const progress = item.querySelector('.skill-progress');
                        progress.style.width = level + '%';
                    }, index * 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Explore button functionality
    const exploreButton = document.querySelector('.cyber-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            const projectsNav = document.querySelector('[data-section="projects"]');
            if (projectsNav) {
                projectsNav.click();
            }
        });
    }
    
    // Add floating particles
    const particleContainer = document.querySelector('.floating-particles');
    if (particleContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${['var(--primary)', 'var(--secondary)', 'var(--accent)'][Math.floor(Math.random() * 3)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${10 + Math.random() * 20}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
            `;
            particleContainer.appendChild(particle);
        }
    }
    
    // Glitch effect on hover for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Project category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectCardsWithCategory = document.querySelectorAll('.project-card[data-category]');
    const comfyuiShowcase = document.querySelector('.comfyui-showcase');
    const projectsShowcase = document.querySelector('.projects-showcase');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const category = button.getAttribute('data-category');
            
            // Show/hide ComfyUI showcase
            if (category === 'comfyui') {
                comfyuiShowcase.style.display = 'block';
                projectsShowcase.style.display = 'none';
                setTimeout(() => {
                    comfyuiShowcase.classList.add('active');
                }, 10);
            } else {
                comfyuiShowcase.style.display = 'none';
                comfyuiShowcase.classList.remove('active');
                projectsShowcase.style.display = 'grid';
                
                projectCardsWithCategory.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 300);
                    }
                });
            }
        });
    });
    
    // ComfyUI node interactions
    const floatingNodes = document.querySelectorAll('.floating-node');
    const nodeDetails = document.getElementById('node-details');
    const detailsTitle = nodeDetails?.querySelector('.details-title');
    const detailsDescription = nodeDetails?.querySelector('.details-description');
    const detailsTech = nodeDetails?.querySelector('.details-tech');
    const detailsLink = nodeDetails?.querySelector('.details-link');
    
    const nodeData = {
        'ComfyUI-11labs': {
            title: 'ElevenLabs TTS Node',
            description: 'A powerful text-to-speech integration for ComfyUI that provides access to ElevenLabs\' advanced voice synthesis technology. Features include multiple voice selection, emotion control, and high-quality audio output.',
            tech: ['Python', 'ElevenLabs API', 'Audio Processing', 'ComfyUI'],
            link: 'https://github.com/gabe-init/ComfyUI-11labs'
        },
        'ComfyUI-Google-Image-Search': {
            title: 'Google Image Search Node',
            description: 'Seamlessly search and retrieve images from Google directly within your ComfyUI workflows. Perfect for reference gathering, dataset building, and creative inspiration.',
            tech: ['Python', 'Google API', 'Image Processing', 'Web Scraping'],
            link: 'https://github.com/gabe-init/ComfyUI-Google-Image-Search'
        },
        'ComfyUI-Openrouter_node': {
            title: 'OpenRouter LLM Node',
            description: 'Multi-modal LLM integration supporting various AI models including GPT-4, Claude, and more. Features text generation, image understanding, and PDF processing capabilities.',
            tech: ['Python', 'OpenRouter API', 'LLMs', 'Multi-modal AI'],
            link: 'https://github.com/gabe-init/ComfyUI-Openrouter_node'
        },
        'ComfyUI-String-Similarity': {
            title: 'String Similarity Node',
            description: 'Advanced text comparison node with multiple algorithms including Levenshtein distance, semantic similarity, and more. Perfect for OCR validation and text analysis workflows.',
            tech: ['Python', 'NLP', 'Machine Learning', 'Text Analysis'],
            link: 'https://github.com/gabe-init/ComfyUI-String-Similarity'
        },
        'comfyui_ui_render': {
            title: 'HTML Renderer Node',
            description: 'Display rich HTML content directly within ComfyUI nodes. Enables custom UI elements, data visualization, and interactive components in your workflows.',
            tech: ['JavaScript', 'HTML/CSS', 'Web Components', 'UI/UX'],
            link: 'https://github.com/gabe-init/comfyui_ui_render'
        }
    };
    
    floatingNodes.forEach(node => {
        node.addEventListener('click', function() {
            const repo = this.getAttribute('data-repo');
            const data = nodeData[repo];
            
            if (data && nodeDetails) {
                // Update active state
                floatingNodes.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                
                // Update details
                detailsTitle.textContent = data.title;
                detailsDescription.textContent = data.description;
                detailsTech.innerHTML = data.tech.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('');
                detailsLink.href = data.link;
                
                // Show details with animation
                nodeDetails.style.display = 'block';
                setTimeout(() => {
                    nodeDetails.classList.add('show');
                }, 10);
            }
        });
    });
    
    // Center node click - show all nodes
    const centerNode = document.querySelector('.center-node');
    if (centerNode) {
        centerNode.addEventListener('click', () => {
            floatingNodes.forEach(node => {
                node.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    node.style.animation = '';
                }, 500);
            });
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1001;
        background: var(--primary);
        color: var(--dark);
        border: none;
        padding: 10px 15px;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    document.body.appendChild(mobileMenuToggle);
    
    const sidebar = document.querySelector('.sidebar');
    
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        mobileMenuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
    });
    
    // Show mobile menu toggle on smaller screens
    const checkMobileMenu = () => {
        if (window.innerWidth <= 1024) {
            mobileMenuToggle.style.display = 'block';
        } else {
            mobileMenuToggle.style.display = 'none';
            sidebar.classList.remove('open');
        }
    };
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
    
    // FIX: Reset skill bars when navigating away from skills section
    // This ensures they animate again when revisiting
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            if (targetSection !== 'skills') {
                // Reset all skill progress bars
                document.querySelectorAll('.skill-progress').forEach(progress => {
                    progress.style.width = '0';
                });
                // Re-observe the skills section for next visit
                if (skillsSection) {
                    skillObserver.observe(skillsSection);
                }
            }
        });
    });
    
    // Add cyber sound effects (optional - commented out)
    /*
    const addSound = (frequency, duration) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    };
    
    // Add sound on button clicks
    document.querySelectorAll('button, .nav-item').forEach(element => {
        element.addEventListener('click', () => addSound(400, 0.1));
    });
    */
});