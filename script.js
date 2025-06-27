/* script.js */
const servicesGrid = document.getElementById('servicesGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const themeToggle = document.getElementById('themeToggle');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const loadingIndicator = document.getElementById('loadingIndicator');

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

function filterServices() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
    const maxPrice = parseInt(priceRange.value);
    
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.service-title').textContent.toLowerCase();
        const description = card.querySelector('.service-description').textContent.toLowerCase();
        const providerName = card.querySelector('.provider-info h4').textContent.toLowerCase();
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
    priceValue.textContent = priceRange.value;
    filterServices();
}

function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    priceRange.value = 500;
    priceValue.textContent = '500';
    searchInput.value = '';
    filterServices();
}

themeToggle.addEventListener('click', toggleTheme);
searchInput.addEventListener('input', filterServices);
sortSelect.addEventListener('change', sortServices);
priceRange.addEventListener('input', updatePriceRange);

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterServices);
});

document.querySelector('.filter-clear').addEventListener('click', clearFilters);

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    filterServices();
    document.querySelectorAll('.service-card').forEach((card, index) => {
        setTimeout(() => card.classList.add('visible'), index * 50);
    });
});








function toggleFilters() {
    const filterContent = document.querySelector('.filter-content');
    const filterToggle = document.querySelector('.filter-toggle');
    
    filterContent.classList.toggle('open');
    filterToggle.classList.toggle('open');
}



function toggleAdvancedFilters() {
    const filterContent = document.querySelector('.advanced-filters .filter-content');
    const filterToggle = document.querySelector('.advanced-filters .filter-toggle-advanced');
    
    filterContent.classList.toggle('open');
    filterToggle.classList.toggle('open');
}

document.querySelector('.filter-toggle-advanced').addEventListener('click', toggleAdvancedFilters);



















