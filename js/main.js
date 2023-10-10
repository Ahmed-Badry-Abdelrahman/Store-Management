
let menuIcon = document.querySelector('.menu-icon');
let rightColumn = document.querySelector('.right-column');
let rightColumnContent = document.querySelector('.right-column .content');
let arrayOfRightColumnContentChildren = Array.from(rightColumnContent.children)
let leftColumn = document.querySelector('.left-column')
let arrayOfLeftColumnChildren = Array.from(leftColumn.children)
let storeProducts = document.querySelector('#store');
// add product 
let productTitle = document.querySelector('#title')
let productCategory = document.querySelector('#category')
let productCount = document.querySelector('#count')
let productHeight = document.querySelector('#height')
let productWidth = document.querySelector('#width')
let multiplyHeightWidth = document.querySelector('#total-hw')
let totalQuantity = document.querySelector('#total-hw-count')
let productPrice = document.querySelector('#price')
let productTotalPrice = document.querySelector('#total-price')
let createBtnProduct = document.querySelector('#create')



menuIcon.addEventListener('click', function () {
    // Toggle the 'active' class on the rightColumn
    rightColumn.classList.toggle('active');
});


// show target left column div
function showTargetLeftColumn(div) {
    // attribute data-title of clicked div
    let targetAtt = div.getAttribute('data-title')

    // handel hover for clicked div
    arrayOfRightColumnContentChildren.forEach((targetDiv) => {
        if (div.id == targetDiv.id) {
            targetDiv.classList.add('active');
        } else {
            targetDiv.classList.remove('active');
        }
    })

    // show target div
    arrayOfLeftColumnChildren.forEach((targetDiv) => {
        if (targetAtt == targetDiv.getAttribute('data-title')) {
            targetDiv.classList.add('active')
        } else {
            targetDiv.classList.add('hidden')
            targetDiv.classList.remove('active')
        }
    })
}

function getTotal() {
    // Check if the values are valid numbers
    let heightValue = parseFloat(productHeight.value);
    let widthValue = parseFloat(productWidth.value);
    let priceValue = parseFloat(productPrice.value);
    let result;
    if (!isNaN(heightValue) && !isNaN(widthValue)) {
        // Perform the calculation
        result = heightValue * widthValue;

        // calc total quantity 
        if (productCount.value >= 1) {
            totalQuantity.value = result * productCount.value;
        } else {
            totalQuantity.value = result * 1;
        }
        // Display the result with two decimal places
        multiplyHeightWidth.value = result.toFixed(2);


        // Change the background and text color of multiplyHeightWidth
        multiplyHeightWidth.style.backgroundColor = "#15e012";
        multiplyHeightWidth.style.color = "#fff";
        totalQuantity.style.backgroundColor = "#15e012";
        totalQuantity.style.color = "#fff";
    } else {
        multiplyHeightWidth.style.backgroundColor = "#df310e";
        multiplyHeightWidth.style.color = "#fff";
        totalQuantity.style.backgroundColor = "#df310e";
        totalQuantity.style.color = "#fff";
        multiplyHeightWidth.value = '';
        totalQuantity.value = '';
    }

    if (!isNaN(priceValue)) {
        let result2 = totalQuantity.value * priceValue;
        productTotalPrice.value = result2;
        productTotalPrice.style.backgroundColor = "#15e012";
        productTotalPrice.style.color = "#fff";
    } else {
        productTotalPrice.style.backgroundColor = "#df310e";
        productTotalPrice.style.color = "#fff";
        productTotalPrice.value = '';
    }

}
let dataProduct;
// array of all data product
if (localStorage.data != null) {
    dataProduct = JSON.parse(localStorage.data)
} else {
    dataProduct = [];
}

// get data from inputs in div add product 
function createProduct() {
    let product = {
        title: productTitle.value,
        category: productCategory.value,
        count: productCount.value,
        height: productHeight.value,
        width: productWidth.value,
        hmw: multiplyHeightWidth.value,
        tQuantity: totalQuantity.value,
        price: productPrice.value,
        tPrice: productTotalPrice.value,
    }

    // Check for null properties
    let hasNullProperty = false;

    if (productTitle.value == '' ||
        productCategory.value == '' ||
        productCount.value == '' ||
        productHeight.value == '' ||
        productWidth.value == '' ||
        productPrice.value == '') {
        hasNullProperty = true;
    }

    if (hasNullProperty) {
        alert('لا يمكن اضافه المنتج وهناك بيانات فارغه')
    } else {
        dataProduct.push(product);
        localStorage.data = JSON.stringify(dataProduct);
        // add product to store 
        showProductINStore()
        // clear inputs filed
        clear()
        // handel total inputs style
        getTotal()
    }

}


function showProductINStore() {
    let product = '';
    for (let i = 0; i < dataProduct.length; i++) {
        product += `
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].height}</td>
                <td>${dataProduct[i].width}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].tQuantity} <span>متر</span></td>
                <td> ${dataProduct[i].price} <span>جنيه</span></td>
                <td> ${dataProduct[i].tPrice} <span>جنيه</span></td>
            </tr>
            `
    }
    storeProducts.innerHTML = product;
}

// to show data all tine 
showProductINStore()

function clear() {
    productTitle.value = '';
    productCategory.value = '';
    productCount.value = '';
    productHeight.value = '';
    productWidth.value = '';
    multiplyHeightWidth.value = '';
    totalQuantity.value = '';
    productPrice.value = '';
    productTotalPrice.value = '';
}