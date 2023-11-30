// "use strict";

// window.onload = () => {
//     let searchProductDrop = document.getElementById('searchProductDrop');

//     searchProductDrop.onchange = function () {
//         groceryDropdown(searchProductDrop);
//     };
// }

// async function groceryDropdown(searchProductDrop) {
//     let searchProductMenu = searchProductDrop.value;
//     let categoryDrop = document.getElementById('categoryDrop');

//     categoryDrop.style.display = (searchProductMenu === 'selectCategory') ? 'block' : 'none';

//     if (searchProductMenu === 'selectCategory') {
//         try {
//             const response = await fetch('http://localhost:8081/api/categories');
//             const data = await response.json();

//             categoryDrop.innerHTML = "";

//             for (const item of data) {
//                 const option = document.createElement('option');
//                 option.categoryId = item.categoryId;
//                 console.log(item.categoryId); 
//                 option.textContent = item.name;
//                 categoryDrop.appendChild(option);
//             }
            
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }
// }

// function 

window.onload = () => {
    let searchProductDrop = document.getElementById('searchProductDrop');
    let categoryDrop = document.getElementById('categoryDrop');


    searchProductDrop.onchange = function () {
        groceryDropdown(searchProductDrop, categoryDrop);
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

            categoryDrop.innerHTML = "";

            // Add a default option
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
}

// async function fetchCategoryData(categoryId) {
//     try {
//         const response = await fetch(`http://localhost:8081/api/categories/${categoryId}`);

//         if (!response.ok) {
//             throw new Error(`ITS NOT WORKING`);
//         }

//         const data = await response.json();

//         // Process the data as needed
//         console.log('Category Data:', data);

//         // You can update your UI or perform any other actions with the fetched data
//     } catch (error) {
//         console.error('Error fetching category data:', error);
//     }
// }

