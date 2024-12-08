// Data
const categories = [
    {
      id: 1,
      name: "Cerámica",
      icon: "fa-vase",
      count: 15
    },
    {
      id: 2,
      name: "Tejidos",
      icon: "fa-socks",
      count: 25
    },
    {
      id: 3,
      name: "Joyería",
      icon: "fa-gem",
      count: 30
    }
  ];
  
  const products = [
    {
      id: 1,
      name: "Vasija de Barro Pintada a Mano",
      price: 89.99,
      image: "https://s2.qwant.com/thumbr/474x632/5/3/3f48b4238801d6ef350471d6dbeb24c037e86f31b6c40bf2dba66bd3ca6df5/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.ChneU5kQZDsOMA2F997WhgHaJ4%26pid%3DApi&q=0&b=1&p=0&a=0",
      description: "Hermosa vasija tradicional pintada a mano",
      category: "Cerámica"
    },
    {
      id: 2,
      name: "Tejido Wayuu",
      price: 129.99,
      image: "https://s2.qwant.com/thumbr/474x377/d/8/9d7cd7e420fbae44d6a1bec78bb68d7615b2e06297329de6611160dcb48721/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.XpenDrxX8ENbeIrD7Ldj8gHaF5%26pid%3DApi&q=0&b=1&p=0&a=0",
      description: "Mochila tejida a mano por artesanos Wayuu",
      category: "Tejidos"
    },
    {
      id: 3,
      name: "Collar de Piedras Naturales",
      price: 45.99,
      image: "https://s2.qwant.com/thumbr/474x711/6/4/62288585595324cc173bb23062ce5a15e1894cfb1a1ce8781dccb9db8b7532/th.jpg?u=https%3A%2F%2Ftse.mm.bing.net%2Fth%3Fid%3DOIP.gWSkW9brBKL0HvijLlIo4gHaLH%26pid%3DApi&q=0&b=1&p=0&a=0",
      description: "Collar artesanal con piedras semipreciosas",
      category: "Joyería"
    }
  ];
  
  // Shopping cart
  let cart = [];
  
  // Display functions
  function displayCategories() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';
  
    categories.forEach(category => {
      const categoryCard = `
        <div class="col-md-4">
          <div class="category-card text-center">
            <i class="fas ${category.icon} fa-3x mb-3"></i>
            <h4>${category.name}</h4>
            <p>${category.count} productos</p>
          </div>
        </div>
      `;
      container.innerHTML += categoryCard;
    });
  }
  
  function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
  
    products.forEach(product => {
      const productCard = `
        <div class="col-md-4">
          <div class="card product-card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <span class="badge bg-secondary mb-2">${product.category}</span>
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>$${product.price}</strong></p>
              <button class="btn btn-primary" onclick="addToCart(${product.id})">
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += productCard;
    });
  }
  
  function displayCart() {
    const container = document.getElementById('cartItems');
    container.innerHTML = '';
    let total = 0;
  
    cart.forEach(item => {
      total += item.price;
      const cartItem = `
        <div class="cart-item">
          <h6>${item.name}</h6>
          <p>$${item.price}</p>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
      `;
      container.innerHTML += cartItem;
    });
  
    document.getElementById('cartTotal').textContent = total.toFixed(2);
  }
  
  // Cart functions
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push(product);
      updateCartCount();
      displayCart();
      // Show notification
      alert('Producto añadido al carrito');
    }
  }
  
  function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
      updateCartCount();
      displayCart();
    }
  }
  
  function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
  }
  
  function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
  }
  
  function checkout() {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    alert('¡Gracias por tu compra! Total: $' + document.getElementById('cartTotal').textContent);
    cart = [];
    updateCartCount();
    displayCart();
    toggleCart();
  }
  
  function scrollToProducts() {
    document.querySelector('#productsContainer').scrollIntoView({ behavior: 'smooth' });
  }
  
  function showSection(section) {
    // Hide all sections first
    document.querySelectorAll('.main-section').forEach(s => s.style.display = 'none');
  
    // Show the requested section
    document.getElementById(section + 'Section').style.display = 'block';
  }
  
  // Initialize page
  document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayProducts();
    updateCartCount();
  
    // Show productos section by default
    showSection('productos');
  
    // Add click handlers to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        if (section) {
          showSection(section);
        }
      });
    });
  });
  