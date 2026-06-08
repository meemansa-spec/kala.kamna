# Kala Kamna - Premium Collection

A beautiful, modern e-commerce website built with HTML, CSS, and JavaScript.

## Project Structure

```
kala.kamna/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── images/             # Image folder (create this)
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## How to Add Files and Open the Project

### Step 1: Clone the Repository Locally

```bash
git clone https://github.com/meemansa-spec/kala.kamna.git
cd kala.kamna
```

### Step 2: Create the Images Folder

```bash
mkdir images
```

### Step 3: Add Your Image Files

Add the following images to the `images/` folder:

- **logo.png** - Your main logo (splash screen & navigation)
- **category1.jpg to category5.jpg** - Category images
- **product1.jpg to product4.jpg** - Product images
- **cart-icon.svg** - Shopping cart icon
- **account-icon.svg** - Account/profile icon

**Recommended Image Sizes:**
- Logo: 500x500px (square)
- Category images: 600x600px
- Product images: 400x400px
- Icons: 200x200px (SVG or PNG)

### Step 4: Update the Data

Edit `script.js` and update:

1. **Categories** - Modify the categories array:
```javascript
const categories = [
    {
        id: 1,
        name: "Your Category Name",
        image: "images/category1.jpg",
        description: "Your description"
    },
    // Add more...
];
```

2. **Products** - Add products for each category:
```javascript
const products = {
    1: [
        { id: 1, name: "Product Name", price: 49.99, image: "images/product1.jpg", size: "One Size", badge: "New" },
        // Add more...
    ],
    // Add more categories...
};
```

### Step 5: Open in Browser

Simply double-click `index.html` or:

1. Right-click `index.html`
2. Select "Open with" → Choose your browser
3. Or drag `index.html` into your browser

### Step 6: Push Changes to GitHub

```bash
git add .
git commit -m "Add images and update data"
git push origin main
```

## Features

✅ Static splash screen (5 seconds)
✅ Top navigation with logo, cart, and account
✅ Category showcase with hover effects
✅ Product grid with add to cart
✅ Functional shopping cart
✅ Account dropdown menu
✅ Responsive design (mobile, tablet, desktop)
✅ Smooth animations and transitions

## File Sizes Reference

For best performance, optimize images:
- **Logo**: 50-100 KB
- **Category/Product images**: 100-300 KB each
- **Icons**: 10-20 KB

## Customization

### Change Colors

Edit `:root` in `styles.css`:
```css
:root {
    --primary-color: #2F3B2F;      /* Dark green */
    --secondary-color: #C8A25A;    /* Gold */
}
```

### Change Fonts

Edit `font-family` in `body` selector in `styles.css`

### Modify Cart Functionality

Edit the account dropdown items in `script.js` `setupEventListeners()` function

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please create an issue in the GitHub repository.
