fetch('https://fakestoreapi.com/products/categories')
.then(response => response.json())
.then(categories => {
    const select = document.getElementById('categoryselect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
});

function fetchAndDisplayProducts() {
const category = document.getElementById('categoryselect').value;
const search = document.getElementById('searchinput').value;
const sort = document.getElementById('sortselect').value;

let url = 'https://fakestoreapi.com/products';
if (category !== 'all') {
    url += `/category/${category}`;
}

fetch(url)
    .then(response => response.json())
    .then(products => {
        if (search) {
            products = products.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (sort === 'asc') {
            products.sort((a, b) => a.price - b.price);
        } else {
            products.sort((a, b) => b.price - a.price);
        }

        const productsContainer = document.getElementById('productscontainer');
        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
            `;
            productsContainer.appendChild(productItem);
        });
    });
}

document.getElementById('categoryselect').addEventListener('change', fetchAndDisplayProducts);
document.getElementById('searchinput').addEventListener('input', fetchAndDisplayProducts);
document.getElementById('sortselect').addEventListener('change', fetchAndDisplayProducts);


fetchAndDisplayProducts();