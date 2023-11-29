"use strict";

window.onload = () => {
    let searchProductDrop = document.getElementById('searchProductDrop');

    // Use a function reference without calling it
    searchProductDrop.onchange = function () {
        groceryDropdown(searchProductDrop);
    };
}

function groceryDropdown(searchProductDrop) {
    let searchProductMenu = searchProductDrop.value;
    let categoryDrop = document.getElementById('categoryDrop');

    if (searchProductMenu === 'selectCategory') {
        categoryDrop.style.display = 'block';
    } else {
        categoryDrop.style.display = 'none';
    }

    // Add more logic or fetch data based on other selected options
}
