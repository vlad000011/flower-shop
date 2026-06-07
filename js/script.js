// Данные товаров
const products = [
    {
        id: 1,
        name: "Букет «Нежность»",
        price: 2490,
        image: "https://source.unsplash.com/random/300x300/?bouquet"
    },
    {
        id: 2,
        name: "Монстера Делициоза",
        price: 1890,
        image: "https://source.unsplash.com/random/300x300/?monstera"
    },
    {
        id: 3,
        name: "Букет «Роза Эквадор»",
        price: 3290,
        image: "https://source.unsplash.com/random/300x300/?roses"
    },
    {
        id: 4,
        name: "Фикус Лировидный",
        price: 2790,
        image: "https://source.unsplash.com/random/300x300/?ficus"
    },
    {
        id: 5,
        name: "Букет «Полевые цветы»",
        price: 1590,
        image: "https://source.unsplash.com/random/300x300/?wildflowers"
    },
    {
        id: 6,
        name: "Орхидея Фаленопсис",
        price: 2190,
        image: "https://source.unsplash.com/random/300x300/?orchid"
    }
];

let cart = [];

// Функция добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    cart.push(product);
    updateCartCount();
    
    // Простое уведомление
    const notification = document.createElement('div');
    notification.style.cssText = 'position:fixed; bottom:20px; right:20px; background:#4caf50; color:white; padding:15px 25px; border-radius:8px; z-index:1000;';
    notification.textContent = `${product.name} добавлен в корзину`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2500);
}

// Обновление счётчика корзины
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.length;
}

// Рендер товаров
function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-card__image">
            <div class="product-card__content">
                <h3 class="product-card__title">${product.name}</h3>
                <p class="product-card__price">${product.price} ₽</p>
                <button class="product-card__btn" onclick="addToCart(${product.id})">В корзину</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Главная страница
    if (document.getElementById('featured-products')) {
        renderProducts('featured-products', products.slice(0, 3));
    }
    
    // Каталог
    if (document.getElementById('catalog-products')) {
        renderProducts('catalog-products', products);
    }
    
    // Кнопка корзины
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            alert(`В корзине ${cart.length} товаров. Сумма: ${cart.reduce((sum, p) => sum + p.price, 0)} ₽`);
        });
    }
});
