"use strict";

let searchProductDrop = document.getElementById('searchProductDrop');
let categoryDrop = document.getElementById('categoryDrop');
let displayCategories = document.getElementById('displayCategories');

window.onload = () => {
    searchProductDrop.onchange = handleSearchProductChange;

    categoryDrop.style.display = "none";
}

function handleSearchProductChange(){
        const selectedValue = searchProductDrop.value;

        if (selectedValue === 'selectCategory') {
            handleGroceryDropDown(searchProductDrop, categoryDrop);
        } else if (selectedValue === 'viewAll') {
            viewAllProducts(searchProductDrop);
            categoryDrop.style.display = "none";
        }
};

async function handleGroceryDropDown(searchProductDrop, categoryDrop) {
    let searchProductMenu = searchProductDrop.value;

    categoryDrop.style.display = (searchProductMenu === 'selectCategory') ? 'block' : 'none';

    try {
        const response = await fetch('http://localhost:8081/api/categories');
        const data = await response.json();
        displayCategoryDropDown(data);

        let defaultOption = new Option('Select One');
        categoryDrop.appendChild(defaultOption);

        for (const item of data) {
            const option = document.createElement('option');
            option.value = item.categoryId;
            option.textContent = item.name;
            categoryDrop.appendChild(option);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }


}

function displayCategoryDropDown() {

    categoryDrop.onchange = async () => {
        const selectedCategoryId = categoryDrop.value;
        console.log(`Selected Category ID: ${selectedCategoryId}`);

        try {
            const productResponse = await fetch(`http://localhost:8081/api/products/bycategory/${selectedCategoryId}`);
            const productData = await productResponse.json();
            console.log(`Products for selected category ${selectedCategoryId}:`, productData);
            displayCategoriesItem(productData);
        } catch (error) {
            console.error('Error fetching products by category:', error);
        }
    };
}

async function viewAllProducts() {
    try {
        const response = await fetch('http://localhost:8081/api/products');
        const data = await response.json();
        const sortedData = sortViewAllProductsByName(data);
        displayAllProducts(sortedData);

    } catch (error) {
        console.error('Error fetching all products data:', error);
    }
}

function sortViewAllProductsByName(data) {
    return data.sort((a, b) => a.productName.toLowerCase().localeCompare(b.productName.toLowerCase()));
}

function displayCategoriesItem(productData) {
    displayCategories.innerHTML = productData.map(product => `
        <div class="card">
            <div class="card-body">
                <h4>${product.productName}</h4>
                <p>${Number(product.unitPrice).toFixed(2)}</p> 
                <p>${product.unitsInStock}</p>
                <p>${product.supplier}</p>
            </div>
        </div>
    `);
}

function displayAllProducts(data) {
    displayCategories.innerHTML = data.map(item => `
        <div class="card">
            <div class="card-body">
                <h4>${item.productName}</h4>
                <p>${Number(item.unitPrice).toFixed(2)}</p> 
                <p><a href="details.html?id=${item.productId}">View Details</a></p>
            </div>
        </div>
    `);
}
