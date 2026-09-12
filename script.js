// 1. JSON වෙනුවට ඔබේ අලුත් Data ටික Direct Array එකක් ලෙස මෙතැනට එකතු කර ඇත
let products = [
  {
    "productId": "P001",
    "name": "Fresh Red Apples 1kg",
    "category": "Fruits",
    "price": 450.00,
    "stock": 50,
    "image": "apple.jpg"
  },
  {
    "productId": "P002",
    "name": "Fresh Milk 1L",
    "category": "Dairy",
    "price": 320.00,
    "stock": 35,
    "image": "milk.jpg"
  },
  {
    "productId": "P003",
    "name": "White Bread 400g",
    "category": "Bakery",
    "price": 160.00,
    "stock": 20,
    "image": "bread.jpg"
  },
  {
    "productId": "P004",
    "name": "Samba Rice 5kg",
    "category": "Grains",
    "price": 1150.00,
    "stock": 40,
    "image": "rice.jpg"
  },
  {
    "productId": "P005",
    "name": "Cheese 200g",
    "category": "Dairy",
    "price": 850.00,
    "stock": 15,
    "image": "cheese.jpg"
  },
  {
    "productId": "P006",
    "name": "Bananas 1kg",
    "category": "Fruits",
    "price": 280.00,
    "stock": 60,
    "image": "banana.jpg"
  },
  {
    "productId": "P007",
    "name": "White Sugar 1kg",
    "category": "Groceries",
    "price": 240.00,
    "stock": 100,
    "image": "sugar.jpg"
  },
  {
    "productId": "P008",
    "name": "Ceylon Black Tea 250g",
    "category": "Beverages",
    "price": 420.00,
    "stock": 25,
    "image": "tea.jpg"
  },
  {
    "productId": "P009",
    "name": "Eggs Pack of 10",
    "category": "Dairy",
    "price": 380.00,
    "stock": 30,
    "image": "eggs.jpg"
  },
  {
    "productId": "P010",
    "name": "Fresh Tomatoes 500g",
    "category": "Vegetables",
    "price": 190.00,
    "stock": 45,
    "image": "tomatoes.jpg"
  },
  {
    "productId": "P011",
    "name": "Carrots 500g",
    "category": "Vegetables",
    "price": 210.00,
    "stock": 50,
    "image": "carrot.jpg"
  },
  {
    "productId": "P012",
    "name": "Chocolate Biscuits",
    "category": "Snacks",
    "price": 150.00,
    "stock": 80,
    "image": "biscute.jpg"
  },
  {
    "productId": "P013",
    "name": "Orange Juice 1L",
    "category": "Beverages",
    "price": 650.00,
    "stock": 18,
    "image": "orange.jpg"
  },
  {
    "productId": "P014",
    "name": "Sunflower Oil 1L",
    "category": "Groceries",
    "price": 980.00,
    "stock": 22,
    "image": "oil.jpg"
  },
  {
    "productId": "P015",
    "name": "Yoghurt 80g",
    "category": "Dairy",
    "price": 70.00,
    "stock": 75,
    "image": "yoghurt.jpg"
  }
];

let displayedProducts = []; 
let cart = [];
let currentRole = "user";
let currentCategory = "All";

// Admin සඳහා Password එක
const ADMIN_PASSWORD = "admin123";

// Page එක Load වෙද්දීම Data පෙන්වීම
window.onload = function() {
    displayedProducts = [...products];
    generateCategoryButtons();
    displayProducts(displayedProducts);
};


// 2. Dynamic Category Buttons නිර්මාණය කිරීම
function generateCategoryButtons() {
    const container = document.getElementById('categoryButtons');
    const categories = ['All', ...new Set(products.map(p => p.category))];

    container.innerHTML = '';
    categories.forEach(cat => {
        const activeClass = cat === currentCategory ? 'active' : '';
        container.innerHTML += `
            <button class="btn-category ${activeClass}" onclick="filterCategory('${cat}', this)">${cat}</button>
        `;
    });
}


// 3. Category Filter Logic
function filterCategory(category, btnElement) {
    currentCategory = category;

    document.querySelectorAll('.btn-category').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    if (category === 'All') {
        displayedProducts = [...products];
    } else {
        displayedProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    displayProducts(displayedProducts);
}


// 4. Switch Role (Password Protection සහිතව)
function switchRole() {
    const roleSelect = document.getElementById('userRole');
    const selectedRole = roleSelect.value;
    const adminPanel = document.getElementById('adminPanel');

    if (selectedRole === 'admin') {
        const passwordInput = prompt("කරුණාකර Admin මුරපදය (Password) ඇතුළත් කරන්න:");

        if (passwordInput === ADMIN_PASSWORD) {
            currentRole = 'admin';
            adminPanel.style.display = 'block';
            alert("Admin ලෙස සාර්ථකව Log විය!");
        } else {
            alert("වැරදි මුරපදයකි! ඔබට Admin Panel එකට පිවිසිය නොහැක.");
            roleSelect.value = 'user';
            currentRole = 'user';
            adminPanel.style.display = 'none';
        }
    } else {
        currentRole = 'user';
        adminPanel.style.display = 'none';
    }

    displayProducts(displayedProducts);
}


// 5. Product Grid Display Logic
function displayProducts(items) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    if (items.length === 0) {
        container.innerHTML = '<p style="color:white; font-size:18px;">මෙම කාණ්ඩය යටතේ භාණ්ඩ නොමැත.</p>';
        return;
    }

    items.forEach((product) => {
        const originalIndex = products.findIndex(p => p.productId === product.productId || p.name === product.name);

        let actionButtonsHTML = '';
        if (currentRole === 'user') {
            actionButtonsHTML = `<button class="btn-cart" onclick="addToCart(${originalIndex})">Add to Cart</button>`;
        } else if (currentRole === 'admin') {
            actionButtonsHTML = `<button class="btn-delete" onclick="deleteProduct(${originalIndex})">Remove Product</button>`;
        }

        const card = `
            <div class="card">
                <div>
                    <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p class="price">Rs. ${parseFloat(product.price).toFixed(2)}</p>
                </div>
                ${actionButtonsHTML}
            </div>
        `;
        container.innerHTML += card;
    });
}


// 6. Cart Logic (Add/Remove/Update)
function addToCart(index) {
    const selectedProduct = products[index];
    cart.push(selectedProduct);
    updateCartUI();
}

function removeFromCart(cartIndex) {
    cart.splice(cartIndex, 1);
    updateCartUI();
    renderCartModal();
}

function updateCartUI() {
    document.getElementById('cartCount').innerText = cart.length;
}

function openCartModal() {
    renderCartModal();
    document.getElementById('cartModal').style.display = 'block';
}

function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

function renderCartModal() {
    const container = document.getElementById('cartItemsContainer');
    const totalElement = document.getElementById('cartTotal');

    if (cart.length === 0) {
        container.innerHTML = '<p style="color:#7f8c8d;">Your cart is empty.</p>';
        totalElement.innerText = "0.00";
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Rs. ${parseFloat(item.price).toFixed(2)}</small>
                </div>
                <button class="btn-remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = total.toFixed(2);
}


// 7. Add Product (Admin Only)
function addProduct() {
    if (currentRole !== 'admin') return;

    const name = document.getElementById('prodName').value;
    const category = document.getElementById('prodCategory').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const image = document.getElementById('prodImage').value;

    if (!name || !category || isNaN(price)) {
        alert("සියලු විස්තර නිවැරදිව ඇතුළත් කරන්න!");
        return;
    }

    const newProduct = {
        productId: "P0" + (products.length + 1),
        name: name,
        category: category,
        price: price,
        stock: 10,
        image: image || "https://via.placeholder.com/150"
    };

    products.push(newProduct);
    generateCategoryButtons();
    filterCategory(currentCategory);

    document.getElementById('prodName').value = '';
    document.getElementById('prodCategory').value = '';
    document.getElementById('prodPrice').value = '';
    document.getElementById('prodImage').value = '';
}


// 8. Delete Product (Admin Only)
function deleteProduct(index) {
    if (currentRole !== 'admin') return;
    products.splice(index, 1);
    generateCategoryButtons();
    filterCategory(currentCategory);
}


// 9. Merge Sort Algorithm
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].price < right[rightIndex].price) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function sortProductsByPrice() {
    displayedProducts = mergeSort(displayedProducts);
    displayProducts(displayedProducts);
}