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
    const desktopWidgetsShowcase = document.querySelector('.desktop-widgets-showcase');
    const projectsShowcase = document.querySelector('.projects-showcase');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const category = button.getAttribute('data-category');
            
            // Show/hide showcases
            if (category === 'comfyui') {
                comfyuiShowcase.style.display = 'block';
                desktopWidgetsShowcase.style.display = 'none';
                desktopWidgetsShowcase.classList.remove('active');
                projectsShowcase.style.display = 'none';
                setTimeout(() => {
                    comfyuiShowcase.classList.add('active');
                }, 10);
            } else if (category === 'desktop-widgets') {
                desktopWidgetsShowcase.style.display = 'block';
                comfyuiShowcase.style.display = 'none';
                comfyuiShowcase.classList.remove('active');
                projectsShowcase.style.display = 'none';
                setTimeout(() => {
                    desktopWidgetsShowcase.classList.add('active');
                }, 10);
            } else {
                comfyuiShowcase.style.display = 'none';
                comfyuiShowcase.classList.remove('active');
                desktopWidgetsShowcase.style.display = 'none';
                desktopWidgetsShowcase.classList.remove('active');
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
        },
        'ComfyUI-Repo-Eater': {
            title: 'Repo Eater Node',
            description: 'Consume and process repository content for AI analysis in ComfyUI. Extract code, documentation, and structure from git repositories for LLM processing and analysis workflows.',
            tech: ['Python', 'Git', 'Code Analysis', 'Repository Processing'],
            link: 'https://github.com/gabe-init/ComfyUI-Repo-Eater'
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

    // LLM Chat Functionality
    const apiKeyInput = document.getElementById('apiKeyInput');
    const saveKeyBtn = document.getElementById('saveKeyBtn');
    const apiKeySection = document.getElementById('apiKeySection');
    const chatInterface = document.getElementById('chatInterface');
    const customModelSelect = document.getElementById('customModelSelect');
    const modelSearch = document.getElementById('modelSearch');
    const modelDropdown = document.getElementById('modelDropdown');
    const modelDropdownContent = document.getElementById('modelDropdownContent');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const imageUploadBtn = document.getElementById('imageUploadBtn');
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const dropZone = document.getElementById('dropZone');
    
    let apiKey = localStorage.getItem('openrouter_api_key');
    let currentImage = null;
    let chatHistory = [];
    let selectedModel = 'openai/gpt-4o';
    let allModels = [];
    
    // Check if API key exists and show appropriate UI
    if (apiKey) {
        apiKeySection.style.display = 'none';
        chatInterface.style.display = 'flex';
        loadModels();
    }
    
    // Save API key
    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            apiKey = key;
            localStorage.setItem('openrouter_api_key', key);
            apiKeySection.style.display = 'none';
            chatInterface.style.display = 'flex';
            loadModels();
        }
    });
    
    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('openrouter_api_key');
        apiKey = null;
        apiKeySection.style.display = 'block';
        chatInterface.style.display = 'none';
        apiKeyInput.value = '';
        clearChat();
    });
    
    // Clear chat
    clearChatBtn.addEventListener('click', clearChat);
    
    function clearChat() {
        chatHistory = [];
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <p>Welcome to the LLM Chat Interface! 🚀</p>
                <p>You can chat with various AI models and even upload images.</p>
            </div>
        `;
    }
    
    // Load available models
    async function loadModels() {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/models');
            const data = await response.json();
            
            // Filter and sort models
            allModels = data.data.filter(model => {
                return model.architecture?.modality?.includes('text');
            });
            
            // Group models by provider
            const modelsByProvider = {};
            allModels.forEach(model => {
                const provider = model.id.split('/')[0];
                if (!modelsByProvider[provider]) {
                    modelsByProvider[provider] = [];
                }
                modelsByProvider[provider].push(model);
            });
            
            // Set default model in search box
            const defaultModel = allModels.find(m => m.id === selectedModel);
            if (defaultModel) {
                modelSearch.value = `${defaultModel.name} (${formatPrice(defaultModel.pricing)})`;
            }
            
            renderModelDropdown(modelsByProvider);
        } catch (error) {
            console.error('Error loading models:', error);
            modelSearch.value = 'GPT-4o (default)';
        }
    }
    
    // Render model dropdown with sections
    function renderModelDropdown(modelsByProvider, searchQuery = '') {
        modelDropdownContent.innerHTML = '';
        
        // Popular models section
        const popularProviders = ['openai', 'anthropic', 'google', 'meta-llama'];
        let hasResults = false;
        
        // Sort providers to show popular ones first
        const sortedProviders = Object.keys(modelsByProvider).sort((a, b) => {
            const aIndex = popularProviders.indexOf(a);
            const bIndex = popularProviders.indexOf(b);
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return a.localeCompare(b);
        });
        
        sortedProviders.forEach(provider => {
            const models = modelsByProvider[provider];
            const filteredModels = searchQuery 
                ? models.filter(model => 
                    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    model.id.toLowerCase().includes(searchQuery.toLowerCase())
                )
                : models;
            
            if (filteredModels.length > 0) {
                hasResults = true;
                
                // Create provider section
                const section = document.createElement('div');
                section.className = 'model-provider-section';
                
                // Provider header
                const header = document.createElement('div');
                header.className = 'model-provider-header';
                header.textContent = getProviderDisplayName(provider);
                section.appendChild(header);
                
                // Model options
                filteredModels.forEach(model => {
                    const option = document.createElement('div');
                    option.className = 'model-option';
                    if (model.id === selectedModel) {
                        option.classList.add('selected');
                    }
                    
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'model-name';
                    nameSpan.textContent = model.name;
                    
                    const priceSpan = document.createElement('span');
                    priceSpan.className = 'model-price';
                    priceSpan.textContent = formatPrice(model.pricing);
                    
                    option.appendChild(nameSpan);
                    option.appendChild(priceSpan);
                    
                    option.addEventListener('click', () => {
                        selectedModel = model.id;
                        modelSearch.value = `${model.name} (${formatPrice(model.pricing)})`;
                        customModelSelect.classList.remove('open');
                        
                        // Update selected state
                        document.querySelectorAll('.model-option').forEach(opt => {
                            opt.classList.remove('selected');
                        });
                        option.classList.add('selected');
                    });
                    
                    section.appendChild(option);
                });
                
                modelDropdownContent.appendChild(section);
            }
        });
        
        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No models found';
            modelDropdownContent.appendChild(noResults);
        }
    }
    
    function getProviderDisplayName(provider) {
        const displayNames = {
            'openai': 'OpenAI',
            'anthropic': 'Anthropic',
            'google': 'Google',
            'meta-llama': 'Meta Llama',
            'mistralai': 'Mistral AI',
            'cohere': 'Cohere',
            'perplexity': 'Perplexity',
            'deepseek': 'DeepSeek',
            'qwen': 'Qwen',
            'nvidia': 'NVIDIA'
        };
        return displayNames[provider] || provider.charAt(0).toUpperCase() + provider.slice(1);
    }
    
    function formatPrice(pricing) {
        if (!pricing) return 'Free';
        const promptPrice = parseFloat(pricing.prompt) * 1000000;
        const completionPrice = parseFloat(pricing.completion) * 1000000;
        return `$${promptPrice.toFixed(2)}/$${completionPrice.toFixed(2)} per 1M`;
    }
    
    // Handle model dropdown interactions
    modelSearch.addEventListener('click', (e) => {
        e.stopPropagation();
        customModelSelect.classList.toggle('open');
        if (customModelSelect.classList.contains('open')) {
            modelSearch.removeAttribute('readonly');
            modelSearch.focus();
            modelSearch.select();
        }
    });
    
    modelSearch.addEventListener('input', (e) => {
        const searchQuery = e.target.value;
        
        // Regroup models for search
        const modelsByProvider = {};
        allModels.forEach(model => {
            const provider = model.id.split('/')[0];
            if (!modelsByProvider[provider]) {
                modelsByProvider[provider] = [];
            }
            modelsByProvider[provider].push(model);
        });
        
        renderModelDropdown(modelsByProvider, searchQuery);
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!customModelSelect.contains(e.target)) {
            customModelSelect.classList.remove('open');
            modelSearch.setAttribute('readonly', 'readonly');
            
            // Restore selected model text if search was cleared
            const selectedModelData = allModels.find(m => m.id === selectedModel);
            if (selectedModelData) {
                modelSearch.value = `${selectedModelData.name} (${formatPrice(selectedModelData.pricing)})`;
            }
        }
    });
    
    // Prevent closing when clicking inside dropdown
    modelDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Handle text input
    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
        sendBtn.disabled = !chatInput.value.trim() && !currentImage;
    });
    
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Handle image upload
    imageUploadBtn.addEventListener('click', () => {
        imageInput.click();
    });
    
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });
    
    removeImageBtn.addEventListener('click', () => {
        currentImage = null;
        imagePreviewContainer.style.display = 'none';
        sendBtn.disabled = !chatInput.value.trim();
    });
    
    // Handle drag and drop
    let dragCounter = 0;
    
    document.addEventListener('dragenter', (e) => {
        e.preventDefault();
        dragCounter++;
        if (e.dataTransfer.types.includes('Files')) {
            dropZone.classList.add('active');
        }
    });
    
    document.addEventListener('dragleave', (e) => {
        dragCounter--;
        if (dragCounter === 0) {
            dropZone.classList.remove('active');
        }
    });
    
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    
    document.addEventListener('drop', (e) => {
        e.preventDefault();
        dragCounter = 0;
        dropZone.classList.remove('active');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageFile(file);
        }
    });
    
    function handleImageFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImage = e.target.result;
            imagePreview.innerHTML = `<img src="${currentImage}" alt="Preview">`;
            imagePreviewContainer.style.display = 'block';
            sendBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }
    
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message && !currentImage) return;
        
        // Disable input while sending
        chatInput.disabled = true;
        sendBtn.disabled = true;
        
        // Add user message to chat
        const userMessageEl = createMessageElement('user', message, currentImage);
        chatMessages.appendChild(userMessageEl);
        
        // Clear input and image
        chatInput.value = '';
        chatInput.style.height = 'auto';
        if (currentImage) {
            currentImage = null;
            imagePreviewContainer.style.display = 'none';
        }
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add thinking indicator
        const thinkingEl = createThinkingIndicator();
        chatMessages.appendChild(thinkingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        try {
            // Prepare messages for API
            const messages = prepareMessages(message, userMessageEl.dataset.image);
            
            // Make API request with streaming
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: messages,
                    stream: true,
                }),
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            // Remove thinking indicator
            thinkingEl.remove();
            
            // Create assistant message element
            const assistantMessageEl = createMessageElement('assistant', '');
            chatMessages.appendChild(assistantMessageEl);
            const contentEl = assistantMessageEl.querySelector('.message-content');
            
            // Process streaming response
            const reader = response.body?.getReader();
            if (!reader) throw new Error('Response body is not readable');
            
            const decoder = new TextDecoder();
            let buffer = '';
            let assistantMessage = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                buffer += decoder.decode(value, { stream: true });
                
                // Process complete lines
                while (true) {
                    const lineEnd = buffer.indexOf('\n');
                    if (lineEnd === -1) break;
                    
                    const line = buffer.slice(0, lineEnd).trim();
                    buffer = buffer.slice(lineEnd + 1);
                    
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content;
                            if (content) {
                                assistantMessage += content;
                                contentEl.textContent = assistantMessage;
                                chatMessages.scrollTop = chatMessages.scrollHeight;
                            }
                        } catch (e) {
                            // Ignore invalid JSON
                        }
                    }
                }
            }
            
            // Update chat history
            chatHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: assistantMessage }
            );
            
        } catch (error) {
            console.error('Error:', error);
            thinkingEl.remove();
            const errorEl = createMessageElement('assistant', `Error: ${error.message}`);
            chatMessages.appendChild(errorEl);
        }
        
        // Re-enable input
        chatInput.disabled = false;
        sendBtn.disabled = false;
        chatInput.focus();
    }
    
    function prepareMessages(message, imageData) {
        const messages = [...chatHistory];
        
        if (imageData) {
            messages.push({
                role: 'user',
                content: [
                    { type: 'text', text: message || 'What\'s in this image?' },
                    { type: 'image_url', image_url: { url: imageData } }
                ]
            });
        } else {
            messages.push({ role: 'user', content: message });
        }
        
        return messages;
    }
    
    function createMessageElement(role, content, image) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${role}`;
        
        const avatarEl = document.createElement('div');
        avatarEl.className = 'message-avatar';
        avatarEl.textContent = role === 'user' ? '👤' : '🤖';
        
        const contentEl = document.createElement('div');
        contentEl.className = 'message-content';
        
        if (image) {
            const imgEl = document.createElement('img');
            imgEl.src = image;
            contentEl.appendChild(imgEl);
            messageEl.dataset.image = image;
        }
        
        if (content) {
            const textEl = document.createElement('div');
            textEl.textContent = content;
            contentEl.appendChild(textEl);
        }
        
        messageEl.appendChild(avatarEl);
        messageEl.appendChild(contentEl);
        
        return messageEl;
    }
    
    function createThinkingIndicator() {
        const thinkingEl = document.createElement('div');
        thinkingEl.className = 'message assistant';
        thinkingEl.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="thinking-indicator">
                    <div class="thinking-dot"></div>
                    <div class="thinking-dot"></div>
                    <div class="thinking-dot"></div>
                </div>
            </div>
        `;
        return thinkingEl;
    }
});