//Login/Register Form

const loginBtn = document.getElementById('login_btn');
const loginForm = document.getElementById('login_form');
const closeBtn = document.getElementById('login_close_btn');
const loginLink = document.getElementById('login_link');
const RegisterForm = document.getElementById('register_form');
const RegisterLink = document.getElementById('register_link');
const RegisterClose = document.getElementById('register_form_close');

// Show Login Form
loginBtn.addEventListener('click', () => {
  loginForm.classList.add('active');
});

// Close Login Form
closeBtn.addEventListener('click', () => {
  loginForm.classList.remove('active');
});

// Switch to login
loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.add('active');
  RegisterForm.classList.remove('active');
});

// switch to register
RegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  RegisterForm.classList.add('active');
  loginForm.classList.remove('active');
});

// Close Register Form
RegisterClose.addEventListener('click', () => {
  RegisterForm.classList.remove('active');
});

//Registration Validation
RegisterForm.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = RegisterForm.querySelectorAll('input');
  const user = {
    firstName: inputs[0].value,
    lastName: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    dob: inputs[4].value
  };

  if (!user.email || !user.password) {
    alert('Please fill out all fields.');
    return;
  }

  localStorage.setItem('userData', JSON.stringify(user));
  alert('Registration successful! You can now log in.');
  RegisterForm.classList.remove('active');
  loginForm.classList.add('active');
});

//Form Validation
loginForm.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;
  const storedUser = JSON.parse(localStorage.getItem('userData'));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert(`Welcome back, ${storedUser.firstName}!`);
    loginForm.classList.remove('active');
  } else {
    alert('Invalid email or password.');
  }
});

//Product
const products = [
  {id:1, name:"Bloodborne", price:49.99, image:"Assets/bloodborne.jpg"},
  {id:2, name:"Call of Duty", price:59.99, image:"Assets/cod.jpg"},
  {id:3, name:"Elden Ring", price:69.99, image:"Assets/elden.jpg"},
  {id:4, name:"Fortnite", price:39.99, image:"Assets/fortnite.jpg"},
  {id:5, name:"Forza Horizon", price:44.99, image:"Assets/forza.jpg"},
  {id:6, name:"Genshin Impact", price:29.99, image:"Assets/genshin.jpg"},
  {id:7, name:"Gran Turismo 7", price:59.99, image:"Assets/gt7.jpg"},
  {id:8, name:"GTA V", price:39.99, image:"Assets/gta.png"},
  {id:9, name:"Minecraft", price:19.99, image:"Assets/minecraft.jpg"},
  {id:10, name:"Persona 5", price:49.99, image:"Assets/persona.jpg"},
  {id:11, name:"Spider-Man 2", price:69.99, image:"Assets/spider.jpg"},
  {id:12, name:"Chaos ZeroNightmare", price:29.99, image:"Assets/czn.jpg"},
];

const container = document.getElementById('productsContainer');
function displayProducts(list) {
  container.innerHTML = "";
  list.forEach(prod => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <h4>${prod.name}</h4>
      <p>$${prod.price.toFixed(2)}</p>
      <button onclick="addToCart(${prod.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}
displayProducts(products);

//Cart page
let cart = [];

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" style="width:50px;height:50px;">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    `;
    cartItems.appendChild(div);
  });

  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  totalEl.innerHTML = `
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Tax (15%): $${tax.toFixed(2)}</p>
    <h3>Total: $${total.toFixed(2)}</h3>
  `;

 
}

//Cart Toggle
const cartBtn = document.getElementById('cart_btn');
const cartEl = document.getElementById('cart');
const cart_close = document.getElementById('cart_close_btn');

cartBtn.addEventListener('click', () => {
  cartEl.classList.add('active');
});

cart_close.addEventListener('click', () => {
  cartEl.classList.remove('active');
});

//Checkout
const CheckPage = document.getElementById('Checkout_page');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const fullName = document.getElementById('fullName');
const address = document.getElementById('address');
const amountPaid = document.getElementById('amountPaid');
const confirmBtn = document.getElementById('confirmCheckout');
const cancelBtn = document.getElementById('cancelCheckout');
const clearBtn = document.getElementById('clearCart');

// Open Checkout Page
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  CheckPage.classList.add('active');
  cartEl.classList.remove('active');

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  checkoutItems.textContent = `Total Items: ${cart.length}`;
  checkoutTotal.innerHTML = `
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Tax (15%): $${tax.toFixed(2)}</p>
    <h3>Total Price: $${total.toFixed(2)}</h3>
  `;
});

// Close Checkout Page
document.getElementById('checkout_close_btn').addEventListener('click', () => {
  CheckPage.classList.remove('active');
});

// Confirm Checkout
confirmBtn.addEventListener('click', () => {
  if (!fullName.value.trim() || !address.value.trim() || !amountPaid.value.trim()) {
    alert("Please fill out all fields!");
    return;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  if (Number(amountPaid.value) < total) {
    alert(`Amount paid should be at least $${total.toFixed(2)}`);
    return;
  }

  alert(`Thank you, ${fullName.value}! Your order of $${total.toFixed(2)} will be shipped to ${address.value}.`);
  cart = [];
  updateCart();
  CheckPage.classList.remove('active');
  fullName.value = '';
  address.value = '';
  amountPaid.value = '';
});

// Cancel Checkout
cancelBtn.addEventListener('click', () => {
  CheckPage.classList.remove('active');
});

// Clear All Cart Items
clearBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  if (confirm("Are you sure you want to clear all items from the cart?")) {
    cart = [];
    updateCart();
    CheckPage.classList.remove('active');
  }
});



