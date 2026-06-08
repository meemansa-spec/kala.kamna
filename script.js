// Cart array to store items
let cart = [];

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

// Sample products for each category
const products = {
    1: [
        { id: 1, name: "Bharatnatyam Sculpture", price: 49.99, image: "images/product1.jpg", size: "One Size", badge: "Popular" },
        { id: 2, name: "Mughal Painting", price: 59.99, image: "images/product2.jpg", size: "One Size", badge: "New" }
    ],
    2: [
        { id: 3, name: "Modern Canvas", price: 79.99, image: "images/product3.jpg", size: "One Size", badge: "Sale" },
        { id: 4, name: "Abstract Art", price: 89.99, image: "images/product4.jpg", size: "One Size", badge: "Hot" }
    ],
    3: [
        { id: 5, name: "Mountain View", price: 69.99, image: "images/product5.jpg", size: "One Size", badge: "New" },
        { id: 6, name: "Forest Landscape", price: 75.99, image: "images/product6.jpg", size: "One Size", badge: "Popular" }
    ],
    4: [
        { id: 7, name: "Resin Pendant", price: 39.99, image: "images/product7.jpg", size: "One Size", badge: "Trending" },
        { id: 8, name: "Crystal Bowl", price: 55.99, image: "images/product8.jpg", size: "One Size", badge: "New" }
    ],
    5: [
        { id: 9, name: "Krishna Idol", price: 99.99, image: "images/product9.jpg", size: "One Size", badge: "Premium" },
        { id: 10, name: "Meditation Art", price: 85.99, image: "images/product10.jpg", size: "One Size", badge: "Popular" }
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
    const productsGrid = document.getElementById('productsGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    
    categoryTitle.textContent = categoryName;
    productsGrid.innerHTML = '';

    const categoryProducts = products[categoryId] || [];
    
    categoryProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">High quality premium product with exceptional craftsmanship and attention to detail</p>
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

    // Switch to products page
    document.getElementById('categoriesPage').classList.add('hidden');
    document.getElementById('productsPage').classList.remove('hidden');
}

// Add to cart function
function addToCart(name, price, image) {
    // Check if item already exists in cart
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
    
    // Count total items (including quantities)
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

    // Logo home button - goes back to categories
    document.getElementById('logoHome').addEventListener('click', () => {
        document.getElementById('productsPage').classList.add('hidden');
        document.getElementById('categoriesPage').classList.remove('hidden');
        document.getElementById('cartPanel').classList.remove('active');
        document.getElementById('accountDropdown').classList.remove('active');
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
        // Close account dropdown
        if (!e.target.closest('#accountBtn') && !e.target.closest('.account-dropdown')) {
            document.getElementById('accountDropdown').classList.remove('active');
        }
        
        // Keep cart panel open when clicking inside it
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
