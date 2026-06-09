// Cart array to store items
let cart = [];
let allProducts = [];

// Your 5 Categories with exact image names
const categories = [
    {
        id: 1,
        name: "Bharat Kala",
        image: "images/bharat-kala.jpg",
        description: "Traditional Indian Art Collection"
    },
    {
        id: 2,
        name: "Beyond Canvas",
        image: "images/beyond-canvas.jpg",
        description: "Contemporary Art Expressions"
    },
    {
        id: 3,
        name: "Scenic Escapes",
        image: "images/scenic-escapes.jpg",
        description: "Nature & Landscape Collection"
    },
    {
        id: 4,
        name: "Crystal Resin",
        image: "images/crystal-resin.jpg",
        description: "Resin Art & Crafts"
    },
    {
        id: 5,
        name: "Dev Kala",
        image: "images/dev-kala.jpg",
        description: "Divine & Spiritual Art"
    }
];

// Sample products for each category with filter attributes
const products = {
    1: [
        { id: 1, name: "Bharatnatyam Sculpture", price: 49.99, image: "images/product1.jpg", size: "Medium", badge: "Popular", color: "Warm", type: "Sculpture", description: "Beautiful traditional sculpture" },
        { id: 2, name: "Mughal Painting", price: 59.99, image: "images/product2.jpg", size: "Large", badge: "New", color: "Vibrant", type: "Painting", description: "Intricate Mughal design" }
    ],
    2: [
        { id: 3, name: "Modern Canvas", price: 79.99, image: "images/product3.jpg", size: "Large", badge: "Sale", color: "Cool", type: "Painting", description: "Contemporary art piece" },
        { id: 4, name: "Abstract Art", price: 89.99, image: "images/product4.jpg", size: "Extra Large", badge: "Hot", color: "Vibrant", type: "Painting", description: "Bold abstract expressionism" }
    ],
    3: [
        { id: 5, name: "Mountain View", price: 69.99, image: "images/product5.jpg", size: "Large", badge: "New", color: "Cool", type: "Painting", description: "Serene mountain landscape" },
        { id: 6, name: "Forest Landscape", price: 75.99, image: "images/product6.jpg", size: "Medium", badge: "Popular", color: "Neutral", type: "Digital Print", description: "Nature in perfect harmony" }
    ],
    4: [
        { id: 7, name: "Resin Pendant", price: 39.99, image: "images/product7.jpg", size: "Small", badge: "Trending", color: "Warm", type: "Resin Art", description: "Elegant resin jewelry" },
        { id: 8, name: "Crystal Bowl", price: 55.99, image: "images/product8.jpg", size: "Medium", badge: "New", color: "Cool", type: "Resin Art", description: "Artistic resin vessel" }
    ],
    5: [
        { id: 9, name: "Krishna Idol", price: 99.99, image: "images/product9.jpg", size: "Large", badge: "Premium", color: "Warm", type: "Sculpture", description: "Divine spiritual art" },
        { id: 10, name: "Meditation Art", price: 85.99, image: "images/product10.jpg", size: "Medium", badge: "Popular", color: "Neutral", type: "Painting", description: "Peaceful contemplative piece" }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    setupEventListeners();
});

// Load categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = '';

    categories.forEach((category, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-inner">
                <img src="${category.image}" alt="${category.name}" class="category-image">
                <div class="category-overlay">
                    <div class="category-number">${index + 1}</div>
                    <h2>${category.name}</h2>
                    <p>${category.description}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => loadProducts(category.id, category.name));
        categoriesGrid.appendChild(card);
    });
}

// Load products for selected category
function loadProducts(categoryId, categoryName) {
    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = categoryName;

    allProducts = products[categoryId] || [];
    displayProducts(allProducts);

    // Switch to products page
    document.getElementById('categoriesPage').classList.add('hidden');
    document.getElementById('productsPage').classList.remove('hidden');
}

// Display products in grid
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: rgba(200, 162, 90, 0.6); padding: 40px; font-size: 1.1rem;">No products match your filters</div>';
        return;
    }

    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-details">
                    <span class="product-size">${product.size}</span>
                    <span class="product-price">$${product.price}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Add to cart function
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: Date.now(),
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    updateCart();
}

// Update cart display
function updateCart() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotalSection = document.getElementById('cartTotalSection');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        cartTotalSection.style.display = 'none';
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
    }

    cartTotalSection.style.display = 'block';
    document.getElementById('checkoutBtn').style.display = 'block';

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = '$' + total.toFixed(2);
}

// Increase quantity
function increaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Decrease quantity
function decreaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Remove from cart
function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

// Toggle filter group
function toggleFilter(element) {
    const filterGroup = element.closest('.filter-group');
    const filterOptions = filterGroup.querySelector('.filter-options');
    
    filterGroup.classList.toggle('collapsed');
    filterOptions.classList.toggle('hidden');
}

// Apply filters
function applyFilters() {
    const selectedFilters = {
        size: [],
        price: [],
        color: [],
        type: []
    };

    // Collect all checked filters
    document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
        const filterType = checkbox.getAttribute('data-filter');
        const value = checkbox.value;
        selectedFilters[filterType].push(value);
    });

    // Filter products
    let filteredProducts = allProducts.filter(product => {
        let matches = true;

        // Check size filter
        if (selectedFilters.size.length > 0) {
            matches = matches && selectedFilters.size.includes(product.size);
        }

        // Check price filter
        if (selectedFilters.price.length > 0) {
            let priceMatch = false;
            selectedFilters.price.forEach(range => {
                if (range === '0-30' && product.price < 30) priceMatch = true;
                if (range === '30-60' && product.price >= 30 && product.price < 60) priceMatch = true;
                if (range === '60-100' && product.price >= 60 && product.price < 100) priceMatch = true;
                if (range === '100+' && product.price >= 100) priceMatch = true;
            });
            matches = matches && priceMatch;
        }

        // Check color filter
        if (selectedFilters.color.length > 0) {
            matches = matches && selectedFilters.color.includes(product.color);
        }

        // Check type filter
        if (selectedFilters.type.length > 0) {
            matches = matches && selectedFilters.type.includes(product.type);
        }

        return matches;
    });

    displayProducts(filteredProducts);
}

// Clear all filters
function clearFilters() {
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });
    displayProducts(allProducts);
}

// Setup event listeners
function setupEventListeners() {
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', () => {
        document.getElementById('cartPanel').classList.toggle('active');
    });

    // Close cart
    document.getElementById('closeCart').addEventListener('click', () => {
        document.getElementById('cartPanel').classList.remove('active');
    });

    // Account button
    document.getElementById('accountBtn').addEventListener('click', () => {
        document.getElementById('accountDropdown').classList.toggle('active');
    });

    // Back button
    document.getElementById('backBtn').addEventListener('click', () => {
        document.getElementById('productsPage').classList.add('hidden');
        document.getElementById('categoriesPage').classList.remove('hidden');
    });

    // Logo home button
    document.getElementById('logoHome').addEventListener('click', () => {
        document.getElementById('productsPage').classList.add('hidden');
        document.getElementById('categoriesPage').classList.remove('hidden');
        document.getElementById('cartPanel').classList.remove('active');
        document.getElementById('accountDropdown').classList.remove('active');
    });

    // Filter checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Account dropdown items
    document.querySelectorAll('.account-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemText = this.textContent;
            handleAccountOption(itemText);
            document.getElementById('accountDropdown').classList.remove('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#accountBtn') && !e.target.closest('.account-dropdown')) {
            document.getElementById('accountDropdown').classList.remove('active');
        }
        
        if (!e.target.closest('#cartBtn') && !e.target.closest('.cart-panel')) {
            document.getElementById('cartPanel').classList.remove('active');
        }
    });
}

// Handle account dropdown options
function handleAccountOption(option) {
    switch(option) {
        case 'Orders':
            alert('📦 Your Orders');
            break;
        case 'Contact Us':
            alert('📧 Contact Us at: support@kalakamna.com');
            break;
        case 'Terms of Service':
            alert('📋 Terms of Service');
            break;
        case 'Privacy Policy':
            alert('🔒 Privacy Policy');
            break;
        case 'FAQ':
            alert('❓ Frequently Asked Questions');
            break;
    }
}
