// Reviews page functionality
const reviewsGrid = document.getElementById('reviewsGrid');
const searchInput = document.getElementById('searchInput');
const reviewsSort = document.getElementById('reviewsSort');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filterTabs = document.querySelectorAll('.filter-tab');
const loadingIndicator = document.getElementById('loadingIndicator');

// Sample reviews data
const reviewsData = [
    {
        id: 1,
        reviewer: {
            name: "User 1",
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 1"
        },
        service: {
            name: "Service 1",
            provider: "Provider 1",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 5,
        date: "2024-01-15",
        title: "Excellent experience",
        content: "The service was completed as expected. Very satisfied.",
        tags: ["Reliable", "Professional", "Fast"],
        photos: [],
        helpful: 24,
        verified: true,
        detailed: true,
        category: "category1"
    },
    {
        id: 2,
        reviewer: {
            name: "User 2",
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 2"
        },
        service: {
            name: "Service 2",
            provider: "Provider 2",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 5,
        date: "2024-01-12",
        title: "Great work",
        content: "Everything was delivered on time and matched the requirements.",
        tags: ["Efficient", "Organized", "Clear"],
        photos: [],
        helpful: 18,
        verified: true,
        detailed: true,
        category: "category2"
    },
    {
        id: 3,
        reviewer: {
            name: "User 3",
            avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 3"
        },
        service: {
            name: "Service 3",
            provider: "Provider 3",
            avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 4,
        date: "2024-01-10",
        title: "Good overall result",
        content: "The process went smoothly. Some small delays but nothing critical.",
        tags: ["Helpful", "Responsive"],
        photos: [],
        helpful: 15,
        verified: true,
        detailed: true,
        category: "category3"
    },
    {
        id: 4,
        reviewer: {
            name: "User 4",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 4"
        },
        service: {
            name: "Service 4",
            provider: "Provider 4",
            avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 5,
        date: "2024-01-08",
        title: "Very satisfied",
        content: "Clear communication and good quality.",
        tags: ["Clear", "Quality"],
        photos: [],
        helpful: 12,
        verified: true,
        detailed: false,
        category: "category4"
    },
    {
        id: 5,
        reviewer: {
            name: "User 5",
            avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 5"
        },
        service: {
            name: "Service 5",
            provider: "Provider 5",
            avatar: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 4,
        date: "2024-01-05",
        title: "Positive outcome",
        content: "The project met the goals set at the beginning.",
        tags: ["Professional", "Timely"],
        photos: [],
        helpful: 9,
        verified: true,
        detailed: true,
        category: "category5"
    },
    {
        id: 6,
        reviewer: {
            name: "User 6",
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 6"
        },
        service: {
            name: "Service 6",
            provider: "Provider 6",
            avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 5,
        date: "2024-01-03",
        title: "Excellent cooperation",
        content: "Supportive and professional approach throughout.",
        tags: ["Supportive", "Effective"],
        photos: [],
        helpful: 21,
        verified: true,
        detailed: true,
        category: "category6"
    },
    {
        id: 7,
        reviewer: {
            name: "User 7",
            avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 7"
        },
        service: {
            name: "Service 7",
            provider: "Provider 7",
            avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 4,
        date: "2024-01-01",
        title: "Solid experience",
        content: "The outcome matched expectations overall.",
        tags: ["Consistent"],
        photos: [],
        helpful: 7,
        verified: true,
        detailed: true,
        category: "category1"
    },
    {
        id: 8,
        reviewer: {
            name: "User 8",
            avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
            location: "Location 8"
        },
        service: {
            name: "Service 8",
            provider: "Provider 8",
            avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
        },
        rating: 5,
        date: "2023-12-28",
        title: "Very professional",
        content: "All steps were handled efficiently.",
        tags: ["Efficient", "Professional"],
        photos: [],
        helpful: 14,
        verified: true,
        detailed: false,
        category: "category2"
    }
];

let currentReviews = [...reviewsData];
let displayedReviews = 0;
const reviewsPerPage = 4;
let currentFilter = 'all';
let currentSort = 'newest';

// Initialize reviews page
function initReviews() {
    displayReviews();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Sort functionality
    reviewsSort.addEventListener('change', handleSort);
    
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => handleFilterTab(tab));
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreReviews);
    
    // Filter checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilters);
    });
    
    // Clear filters button
    document.querySelector('.filter-clear').addEventListener('click', clearAllFilters);
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    currentReviews = reviewsData.filter(review => {
        return review.title.toLowerCase().includes(searchTerm) ||
               review.content.toLowerCase().includes(searchTerm) ||
               review.reviewer.name.toLowerCase().includes(searchTerm) ||
               review.service.name.toLowerCase().includes(searchTerm) ||
               review.service.provider.toLowerCase().includes(searchTerm);
    });
    
    applyCurrentFilters();
    displayedReviews = 0;
    displayReviews();
}

// Handle sort
function handleSort() {
    currentSort = reviewsSort.value;
    sortReviews();
    displayedReviews = 0;
    displayReviews();
}

// Handle filter tabs
function handleFilterTab(clickedTab) {
    // Update active tab
    filterTabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');
    
    currentFilter = clickedTab.dataset.filter;
    applyCurrentFilters();
    displayedReviews = 0;
    displayReviews();
}

// Handle checkbox filters
function handleFilters() {
    applyCurrentFilters();
    displayedReviews = 0;
    displayReviews();
}

// Apply current filters
function applyCurrentFilters() {
    let filtered = [...reviewsData];
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(review => {
            return review.title.toLowerCase().includes(searchTerm) ||
                   review.content.toLowerCase().includes(searchTerm) ||
                   review.reviewer.name.toLowerCase().includes(searchTerm) ||
                   review.service.name.toLowerCase().includes(searchTerm) ||
                   review.service.provider.toLowerCase().includes(searchTerm);
        });
    }
    
    // Apply tab filter
    switch (currentFilter) {
        case 'recent':
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            filtered = filtered.filter(review => new Date(review.date) >= thirtyDaysAgo);
            break;
        case 'top-rated':
            filtered = filtered.filter(review => review.rating === 5);
            break;
        case 'verified':
            filtered = filtered.filter(review => review.verified);
            break;
    }
    
    // Apply checkbox filters
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseInt(cb.value));
    if (selectedRatings.length > 0) {
        filtered = filtered.filter(review => selectedRatings.includes(review.rating));
    }
    
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(review => selectedCategories.includes(review.category));
    }
    
    const selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    if (selectedTypes.length > 0) {
        filtered = filtered.filter(review => {
            return selectedTypes.every(type => {
                switch (type) {
                    case 'verified': return review.verified;
                    case 'photos': return review.photos.length > 0;
                    case 'detailed': return review.detailed;
                    case 'recent': 
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return new Date(review.date) >= thirtyDaysAgo;
                    default: return true;
                }
            });
        });
    }
    
    const selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked')).map(cb => cb.value);
    if (selectedCountries.length > 0) {
        filtered = filtered.filter(review => {
            const country = review.reviewer.location.split(', ')[1]?.toLowerCase();
            return selectedCountries.some(selected => {
                switch (selected) {
                    case 'usa': return country === 'usa';
                    case 'uk': return country === 'uk';
                    case 'canada': return country === 'canada';
                    case 'australia': return country === 'australia';
                    case 'germany': return country === 'germany';
                    case 'france': return country === 'france';
                    default: return false;
                }
            });
        });
    }
    
    currentReviews = filtered;
    sortReviews();
}

// Sort reviews
function sortReviews() {
    currentReviews.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'highest':
                return b.rating - a.rating;
            case 'lowest':
                return a.rating - b.rating;
            case 'helpful':
                return b.helpful - a.helpful;
            default:
                return 0;
        }
    });
}

// Display reviews
function displayReviews() {
    if (displayedReviews === 0) {
        reviewsGrid.innerHTML = '';
    }
    
    const reviewsToShow = currentReviews.slice(displayedReviews, displayedReviews + reviewsPerPage);
    
    reviewsToShow.forEach((review, index) => {
        const reviewCard = createReviewCard(review);
        reviewsGrid.appendChild(reviewCard);
        
        // Animate card appearance
        setTimeout(() => {
            reviewCard.classList.add('visible');
        }, index * 100);
    });
    
    displayedReviews += reviewsToShow.length;
    
    // Update load more button
    if (displayedReviews >= currentReviews.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
    
    // Update results count
    updateResultsCount();
}

// Create review card
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    const ratingStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const formattedDate = new Date(review.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const photosHtml = review.photos.length > 0 ? `
        <div class="review-photos">
            ${review.photos.map(photo => `
                <div class="review-photo">
                    <img src="${photo}" alt="Review photo" loading="lazy">
                </div>
            `).join('')}
        </div>
    ` : '';
    
    const tagsHtml = review.tags.length > 0 ? `
        <div class="review-tags">
            ${review.tags.map(tag => `<span class="review-tag">${tag}</span>`).join('')}
        </div>
    ` : '';
    
    const badges = [];
    if (review.verified) badges.push('<span class="review-badge verified">Verified</span>');
    if (review.detailed) badges.push('<span class="review-badge detailed">Detailed</span>');
    
    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">
                    <img src="${review.reviewer.avatar}" alt="${review.reviewer.name}" loading="lazy">
                </div>
                <div class="reviewer-details">
                    <h4>${review.reviewer.name}</h4>
                    <div class="reviewer-location">${review.reviewer.location}</div>
                </div>
            </div>
            <div class="review-meta">
                <div class="review-rating">
                    <span class="rating-stars">${ratingStars}</span>
                    <span class="rating-number">${review.rating}.0</span>
                </div>
                <div class="review-date">${formattedDate}</div>
            </div>
        </div>
        
        <div class="service-info">
            <div class="service-avatar">
                <img src="${review.service.avatar}" alt="${review.service.provider}" loading="lazy">
            </div>
            <div class="service-details">
                <h5>${review.service.name}</h5>
                <div class="service-provider">by ${review.service.provider}</div>
            </div>
        </div>
        
        <div class="review-content">
            <h3 class="review-title">${review.title}</h3>
            <p class="review-text">${review.content}</p>
            ${photosHtml}
            ${tagsHtml}
        </div>
        
        <div class="review-footer">
            <div class="review-actions">
                <button class="review-action">
                    <span>👍</span> Helpful (${review.helpful})
                </button>
                <button class="review-action">
                    <span>💬</span> Reply
                </button>
                <button class="review-action">
                    <span>🚩</span> Report
                </button>
            </div>
            <div class="review-badges">
                ${badges.join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Load more reviews
function loadMoreReviews() {
    loadingIndicator.style.display = 'block';
    
    setTimeout(() => {
        loadingIndicator.style.display = 'none';
        displayReviews();
    }, 500);
}

// Clear all filters
function clearAllFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    searchInput.value = '';
    
    // Reset to default filter
    filterTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    currentFilter = 'all';
    
    // Reset sort
    reviewsSort.value = 'newest';
    currentSort = 'newest';
    
    // Apply filters and display
    applyCurrentFilters();
    displayedReviews = 0;
    displayReviews();
}

// Update results count
function updateResultsCount() {
    const totalResults = currentReviews.length;
    const showing = Math.min(displayedReviews, totalResults);
    
    // You can add a results counter element if needed
    console.log(`Showing ${showing} of ${totalResults} reviews`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initReviews();
});

// Export functions for use in other scripts
window.reviewsPage = {
    initReviews,
    handleSearch,
    handleSort,
    clearAllFilters
};