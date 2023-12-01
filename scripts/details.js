"use strict"

window.onload = () => { 
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetchProductApi(productId);
}

function fetchProductApi(productId){
    fetch(`http://localhost:8081/api/products/${productId}`)
        .then(response => response.json())
        .then(productData => {
            console.log(productData)
            displayProduct(productData)
        })
        .catch(error => console.error(`Not fetching`, error));
}

// function displayProduct(productData){
//     const productDetails = document.getElementById("productDetails")
    
//     productData.forEach(product => {
//     productDetails.innerHTML = `
//     <div>
//     <h4>${product.productName}</h4>
//     </div>
//     `

//     })
   
// }

