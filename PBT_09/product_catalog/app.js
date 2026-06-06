const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/400?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/400?text=S24+Ultra", rating: 4.7, inStock: true },
    { id: 3, name: "Google Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/400?text=Pixel+9", rating: 4.5, inStock: false },
    { id: 4, name: "MacBook Pro 14", price: 45990000, category: "laptop", image: "https://placehold.co/400?text=MacBook+Pro", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 39990000, category: "laptop", image: "https://placehold.co/400?text=XPS+15", rating: 4.6, inStock: true },
    { id: 6, name: "ThinkPad X1 Carbon", price: 35990000, category: "laptop", image: "https://placehold.co/400?text=ThinkPad", rating: 4.7, inStock: true },
    { id: 7, name: "iPad Pro 11", price: 22990000, category: "tablet", image: "https://placehold.co/400?text=iPad+Pro", rating: 4.8, inStock: true },
    { id: 8, name: "Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/400?text=Tab+S9", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/400?text=Pad+6", rating: 4.2, inStock: false },
    { id: 10, name: "AirPods Pro 2", price: 5990000, category: "accessory", image: "https://placehold.co/400?text=AirPods", rating: 4.8, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 7990000, category: "accessory", image: "https://placehold.co/400?text=Sony+WH", rating: 4.7, inStock: true },
    { id: 12, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://placehold.co/400?text=MX+Master", rating: 4.9, inStock: true }
];

const productGrid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const categoryFilters = document.querySelector("#categoryFilters");
const cartBadge = document.querySelector("#cartBadge");
const themeToggle = document.querySelector("#themeToggle");
const modalOverlay = document.querySelector("#modalOverlay");

let cartCount = 0;
let currentCategory = "all";
let searchQuery = "";
let currentSort = "default";

function renderProducts() {
    productGrid.innerHTML = "";

    let filtered = products.filter(p => {
        const matchCategory = currentCategory === "all" || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (currentSort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === "rating-desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.className = "product-image";
        img.src = product.image;
        img.alt = product.name;
        
        const info = document.createElement("div");
        info.className = "product-info";

        const title = document.createElement("h3");
        title.className = "product-title";
        title.textContent = product.name;

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = product.price.toLocaleString("vi-VN") + "đ";

        const meta = document.createElement("div");
        meta.className = "product-meta";
        
        const rating = document.createElement("span");
        rating.textContent = "⭐ " + product.rating;
        
        const stock = document.createElement("span");
        stock.textContent = product.inStock ? "In Stock" : "Out of Stock";
        stock.style.color = product.inStock ? "#10b981" : "#ef4444";

        meta.appendChild(rating);
        meta.appendChild(stock);

        const btn = document.createElement("button");
        btn.className = "add-to-cart";
        btn.textContent = "Thêm vào giỏ";
        btn.disabled = !product.inStock;

        info.appendChild(title);
        info.appendChild(price);
        info.appendChild(meta);

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(btn);

        card.addEventListener("click", e => {
            if (e.target !== btn) {
                openModal(product);
            }
        });

        btn.addEventListener("click", () => {
            cartCount++;
            cartBadge.textContent = cartCount;
        });

        productGrid.appendChild(card);
    });
}

function openModal(product) {
    modalOverlay.innerHTML = "";
    
    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
    });

    const body = document.createElement("div");
    body.className = "modal-body";

    const img = document.createElement("img");
    img.className = "modal-image";
    img.src = product.image;

    const title = document.createElement("h2");
    title.textContent = product.name;

    const desc = document.createElement("p");
    desc.textContent = `Category: ${product.category.toUpperCase()} | Rating: ${product.rating}`;

    const price = document.createElement("h3");
    price.textContent = product.price.toLocaleString("vi-VN") + "đ";

    body.appendChild(img);
    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(price);

    content.appendChild(closeBtn);
    content.appendChild(body);
    modalOverlay.appendChild(content);

    modalOverlay.classList.add("active");
}

modalOverlay.addEventListener("click", e => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
    }
});

searchInput.addEventListener("input", e => {
    searchQuery = e.target.value;
    renderProducts();
});

sortSelect.addEventListener("change", e => {
    currentSort = e.target.value;
    renderProducts();
});

categoryFilters.addEventListener("click", e => {
    if (e.target.classList.contains("cat-btn")) {
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        currentCategory = e.target.dataset.category;
        renderProducts();
    }
});

let isDark = false;
themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    if (isDark) {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
    }
});

renderProducts();
