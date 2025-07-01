/* script.js */
const servicesGrid = document.getElementById('servicesGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const themeToggle = document.getElementById('themeToggle');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const loadingIndicator = document.getElementById('loadingIndicator');

// Video-specific elements
const videoGrid = document.getElementById('videoGrid');
const videoSearchInput = document.getElementById('videoSearchInput');
const videoSort = document.getElementById('videoSort');
const videoCount = document.getElementById('videoCount');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const modalVideoDescription = document.getElementById('modalVideoDescription');
const modalVideoViews = document.getElementById('modalVideoViews');
const modalVideoDate = document.getElementById('modalVideoDate');

// Video data array
const videoData = [
    {
        title: "Professional Excellence Showcase",
        description: "Our team will handle any of your tasks with excellence, delivering outstanding results tailored to your goals.",
        views: "1.2K",
        date: "2 days ago",
        duration: "5:24",
        category: "tutorials",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Trusted Service Review",
        description: "Experience the dedication and expertise our professionals bring to every project, ensuring your complete satisfaction.",
        views: "856",
        date: "5 days ago",
        duration: "8:45",
        category: "reviews",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Complete Platform Walkthrough",
        description: "Discover how our team can seamlessly execute any task, combining skill and innovation for maximum impact.",
        views: "2.3K",
        date: "1 week ago",
        duration: "12:30",
        category: "demos",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Client Success Story",
        description: "See how our experts transformed challenges into success stories, proving our commitment to excellence.",
        views: "945",
        date: "1 week ago",
        duration: "3:18",
        category: "testimonials",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Advanced Capabilities",
        description: "Unlock the full potential of your projects with our team’s advanced techniques and proven strategies.",
        views: "1.8K",
        date: "2 weeks ago",
        duration: "15:42",
        category: "tutorials",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Feature Highlights",
        description: "Explore the ways our services can elevate your workflow and deliver exceptional value every time.",
        views: "1.1K",
        date: "2 weeks ago",
        duration: "7:22",
        category: "demos",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Service Comparison Insights",
        description: "Compare your options and discover why our team is the right choice to handle any of your projects with excellence.",
        views: "2.7K",
        date: "3 weeks ago",
        duration: "11:15",
        category: "reviews",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Customer Interview",
        description: "Hear firsthand how our team’s expertise and commitment have made a real difference for our clients.",
        views: "892",
        date: "3 weeks ago",
        duration: "6:33",
        category: "testimonials",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Quick Productivity Tips",
        description: "Short insights to help you see how easily our professionals can bring your vision to life with precision.",
        views: "1.5K",
        date: "1 month ago",
        duration: "4:12",
        category: "tutorials",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Integration Essentials",
        description: "Learn how our team connects tools and processes to deliver smooth, reliable outcomes for any challenge.",
        views: "723",
        date: "1 month ago",
        duration: "9:18",
        category: "demos",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Annual Achievements Recap",
        description: "A look back at how our team has consistently delivered excellence and innovation throughout the year.",
        views: "3.2K",
        date: "1 month ago",
        duration: "13:45",
        category: "reviews",
        videoUrl: "./test-vertical-video.mp4"
    },
    {
        title: "Success Story Collection",
        description: "Multiple examples of how our professionals have helped clients achieve outstanding results in any domain.",
        views: "1.9K",
        date: "1 month ago",
        duration: "8:57",
        category: "testimonials",
        videoUrl: "./test-vertical-video.mp4"
    }
];


function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (themeToggle) {
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Service functionality (existing)
function filterServices() {
    if (!searchInput || !servicesGrid) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const maxPrice = priceRange ? parseInt(priceRange.value) : 1000;
    
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.service-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.service-description')?.textContent.toLowerCase() || '';
        const providerName = card.querySelector('.provider-info h4')?.textContent.toLowerCase() || '';
        const country = card.dataset.country;
        const category = card.dataset.category;
        const price = parseInt(card.dataset.price);
        
        const matchesSearch = title.includes(searchTerm) || 
                            description.includes(searchTerm) || 
                            providerName.includes(searchTerm);
        const matchesCountry = selectedCountries.length === 0 || selectedCountries.includes(country);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
        const matchesPrice = price <= maxPrice;
        
        if (matchesSearch && matchesCountry && matchesCategory && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortServices() {
    if (!sortSelect || !servicesGrid) return;
    
    const sortBy = sortSelect.value;
    const cards = Array.from(document.querySelectorAll('.service-card'));
    
    const sortedCards = cards.sort((a, b) => {
        const aValue = parseFloat(a.dataset[sortBy]);
        const bValue = parseFloat(b.dataset[sortBy]);
        
        return sortBy === 'rating' || sortBy === 'reviews' ? bValue - aValue : aValue - bValue;
    });
    
    servicesGrid.innerHTML = '';
    sortedCards.forEach(card => servicesGrid.appendChild(card));
}

function openServiceDetails(serviceId) {
    window.location.href = `product.html?id=${serviceId}`;
}

function updatePriceRange() {
    if (!priceRange || !priceValue) return;
    priceValue.textContent = priceRange.value;
    filterServices();
}

function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    if (priceRange) priceRange.value = 500;
    if (priceValue) priceValue.textContent = '500';
    if (searchInput) searchInput.value = '';
    filterServices();
}

// Video functionality
function filterVideos() {
    if (!videoGrid || !videoSearchInput) return;
    
    const searchTerm = videoSearchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-tab.active')?.dataset.category || 'all';
    
    const cards = document.querySelectorAll('.video-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const title = card.querySelector('.video-info h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.video-info p')?.textContent.toLowerCase() || '';
        const category = card.dataset.category;
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (videoCount) {
        videoCount.textContent = `${visibleCount} videos found`;
    }
}

function sortVideos() {
    if (!videoSort || !videoGrid) return;
    
    const sortBy = videoSort.value;
    const cards = Array.from(document.querySelectorAll('.video-card'));
    
    const sortedCards = cards.sort((a, b) => {
        const aDate = new Date(a.dataset.date);
        const bDate = new Date(b.dataset.date);
        
        switch (sortBy) {
            case 'newest':
                return bDate - aDate;
            case 'oldest':
                return aDate - bDate;
            case 'popular':
                const aViews = parseInt(a.querySelector('.video-views').textContent.replace(/[^\d]/g, ''));
                const bViews = parseInt(b.querySelector('.video-views').textContent.replace(/[^\d]/g, ''));
                return bViews - aViews;
            case 'duration':
                const aDuration = a.querySelector('.video-duration').textContent;
                const bDuration = b.querySelector('.video-duration').textContent;
                return aDuration.localeCompare(bDuration);
            default:
                return 0;
        }
    });
    
    videoGrid.innerHTML = '';
    sortedCards.forEach(card => videoGrid.appendChild(card));
}

function openVideoModal(index) {
    if (!videoModal || !modalVideo || !videoData[index]) return;
    
    const video = videoData[index];
    
    modalVideoTitle.textContent = video.title;
    modalVideoDescription.textContent = video.description;
    modalVideoViews.textContent = `${video.views} views`;
    modalVideoDate.textContent = video.date;
    
    modalVideo.src = video.videoUrl;
    videoModal.style.display = 'flex';
    
    // Auto play video
    modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
}

function closeVideoModal() {
    if (!videoModal || !modalVideo) return;
    
    videoModal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

function loadMoreVideos() {
    // Simulate loading more videos
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        
        setTimeout(() => {
            loadMoreBtn.textContent = 'Load More Videos';
            // In a real application, this would fetch more videos from an API
        }, 1000);
    }
}

// Filter tabs functionality
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Filter videos
            filterVideos();
        });
    });
}

function toggleFilters() {
    const filterContent = document.querySelector('.filter-content');
    const filterToggle = document.querySelector('.filter-toggle');
    
    if (filterContent && filterToggle) {
        filterContent.classList.toggle('open');
        filterToggle.classList.toggle('open');
    }
}

function toggleAdvancedFilters() {
    const filterContent = document.querySelector('.advanced-filters .filter-content');
    const filterToggle = document.querySelector('.advanced-filters .filter-toggle-advanced');
    
    if (filterContent && filterToggle) {
        filterContent.classList.toggle('open');
        filterToggle.classList.toggle('open');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initFilterTabs();
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Service functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterServices);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortServices);
    }
    
    if (priceRange) {
        priceRange.addEventListener('input', updatePriceRange);
    }
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterServices);
    });
    
    const filterClearBtn = document.querySelector('.filter-clear');
    if (filterClearBtn) {
        filterClearBtn.addEventListener('click', clearFilters);
    }
    
    // Video functionality
    if (videoSearchInput) {
        videoSearchInput.addEventListener('input', filterVideos);
    }
    
    if (videoSort) {
        videoSort.addEventListener('change', sortVideos);
    }
    
    // Advanced filters toggle
    const advancedFilterToggle = document.querySelector('.filter-toggle-advanced');
    if (advancedFilterToggle) {
        advancedFilterToggle.addEventListener('click', toggleAdvancedFilters);
    }
    
    // Modal close on background click
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Keyboard shortcuts for video modal
    document.addEventListener('keydown', (e) => {
        if (videoModal && videoModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeVideoModal();
            } else if (e.key === ' ' && modalVideo) {
                e.preventDefault();
                if (modalVideo.paused) {
                    modalVideo.play();
                } else {
                    modalVideo.pause();
                }
            }
        }
    });
    
    // Initialize filters
    filterServices();
    filterVideos();
    
    // Animate service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => card.classList.add('visible'), index * 50);
    });
});

// Make functions globally available
window.openServiceDetails = openServiceDetails;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.loadMoreVideos = loadMoreVideos;
window.toggleFilters = toggleFilters;


















// === Modal video swipe navigation ===
let currentVideoIndex = 0;

// Переопределим openVideoModal, чтобы сохранять индекс
window.openVideoModal = function(index) {
  if (!videoModal || !modalVideo || !videoData[index]) return;

  currentVideoIndex = index;
  const video = videoData[index];

  modalVideoTitle.textContent = video.title;
  modalVideoDescription.textContent = video.description;
  modalVideoViews.textContent = `${video.views} views`;
  modalVideoDate.textContent = video.date;

  modalVideo.src = video.videoUrl;
  videoModal.style.display = 'flex';

  modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
};

// Функции листания
function showNextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoData.length;
  window.openVideoModal(currentVideoIndex);
}

function showPrevVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videoData.length) % videoData.length;
  window.openVideoModal(currentVideoIndex);
}

// Свайп для мобильного (Y координата)
let touchStartY = 0;
modalVideo.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
});
modalVideo.addEventListener('touchend', e => {
  const deltaY = touchStartY - e.changedTouches[0].clientY;
  if (deltaY > 50) {
    showNextVideo();
  } else if (deltaY < -50) {
    showPrevVideo();
  }
});

// Свайп для десктопа (X координата)
let mouseStartX = 0;
modalVideo.addEventListener('mousedown', e => {
  mouseStartX = e.clientX;
});
modalVideo.addEventListener('mouseup', e => {
  const deltaX = mouseStartX - e.clientX;
  if (deltaX > 50) {
    showNextVideo();
  } else if (deltaX < -50) {
    showPrevVideo();
  }
});