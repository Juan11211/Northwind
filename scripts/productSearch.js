
window.onload = () => {
    let searchProductDrop = document.getElementById('searchProductDrop');
    let categoryDrop = document.getElementById('categoryDrop');

    searchProductDrop.onchange = function () {
        groceryDropdown(searchProductDrop, categoryDrop);
        viewAllProducts(searchProductDrop)
    };

    categoryDrop.style.display = "none";
}

async function groceryDropdown(searchProductDrop, categoryDrop) {
    let searchProductMenu = searchProductDrop.value;

    categoryDrop.style.display = (searchProductMenu === 'selectCategory') ? 'block' : 'none';

    if (searchProductMenu === 'selectCategory') {
        try {
            const response = await fetch('http://localhost:8081/api/categories');
            const data = await response.json();
            const displayData = await displayCategory(data);
            let defaultOption = new Option('Select One');
            categoryDrop.appendChild(defaultOption);

            for (const item of displayData) {
                const option = document.createElement('option');
                option.value = item.categoryId;
                option.textContent = item.name;
                categoryDrop.appendChild(option);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

async function viewAllProducts(searchProductDrop){
    let viewAllMenu = searchProductDrop.value;
    if(viewAllMenu === 'viewAll'){
        try {
            const response = await fetch('http://localhost:8081/api/products');
            const data = await response.json();
            displayAllProducts(data);
            } catch (error) {
                console.error('Error fetching all products data:', error);
            }
    }
}

function displayAllProducts(data){   
    console.log(`this is running`, data)
}


async function displayCategory(data) {
    console.log('Data passed to displayCategory:');
    for (const item of data) {
        console.log(`Category ID: ${item.categoryId}, Name: ${item.name}`);
    }

    return data;
}


