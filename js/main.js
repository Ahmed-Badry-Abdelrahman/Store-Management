
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
let sectionOne = document.querySelector('.sec-1')

// create invoice
let invCustomerName = document.querySelector('#customer-name')
let invCustomerNumber = document.querySelector('#customer-number')
let invProductName = document.querySelector('#product-name')
let invProductHeight = document.querySelector('#product-height')
let invProductWidth = document.querySelector('#product-width')
let invProductQuantity = document.querySelector('#inv-product-quantity')
let invProductCount = document.querySelector('#product-count')
let invUnitPrice = document.querySelector('#unit-price')
let invTotalPrice = document.querySelector('#product-total-price')
let invBtn = document.querySelector('#other-product-to-invoice')
let invAmountPaid = document.querySelector('#amount-paid')
let invRemainingPaid = document.querySelector('#remaining-amount')
let invoiceSaveBtn = document.querySelector('#invoice-save')
let sectionFore = document.querySelector('.sec-4')

// display invoice
let tbodyInvDisplay = document.querySelector('#dis-invoice');
let InvDisplay = document.querySelector('.container-invoices');

// flags
let handelOneInvoice = false;


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
    let totalQuantityValue = parseFloat(totalQuantity.value);
    let result;
    if (!isNaN(heightValue) && !isNaN(widthValue)) {
        // Perform the calculation
        result = (heightValue * widthValue).toFixed(2);

        // calc total quantity 
        if (productCount.value >= 1) {
            totalQuantity.value = (result * productCount.value).toFixed(2);
        } else {
            totalQuantity.value = result * 1;
        }
        // Display the result with two decimal places
        multiplyHeightWidth.value = result;


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

    if (!isNaN(priceValue) && !isNaN(totalQuantityValue)) {
        let result2 = totalQuantity.value * priceValue;
        productTotalPrice.value = result2;
        productTotalPrice.style.backgroundColor = "#15e012";
        productTotalPrice.style.color = "#fff";
    } else {
        productTotalPrice.style.backgroundColor = "#df310e";
        productTotalPrice.style.color = "#fff";
        productTotalPrice.value = '';
    }

    // handle invoice inputs
    let unitPriceValue = parseFloat(invUnitPrice.value);
    let productCountValue = parseFloat(invProductCount.value);
    let invProductHeightValue = parseFloat(invProductHeight.value);
    let invProductWidthValue = parseFloat(invProductWidth.value);
    let invProductQuantityValue = parseFloat(invProductQuantity.value);

    if (!isNaN(invProductHeightValue) && !isNaN(invProductWidthValue)) {
        let result = (invProductHeightValue * invProductWidthValue).toFixed(2)
        // calc total quantity 
        if (productCountValue >= 1) {
            invProductQuantity.value = (result * productCountValue).toFixed(2);
        } else {
            invProductQuantity.value = result * 1;
        }
        invProductQuantity.style.backgroundColor = "#15e012";
        invProductQuantity.style.color = "#fff";
    } else {
        invProductQuantity.style.backgroundColor = "#df310e";
        invProductQuantity.style.color = "#fff";
        invProductQuantity.value= "";
    }

    if (!isNaN(unitPriceValue) && !isNaN(invProductQuantityValue)) {
        invTotalPrice.value = unitPriceValue * invProductQuantity.value;
        invTotalPrice.style.backgroundColor = "#15e012";
        invTotalPrice.style.color = "#fff";
    } else {
        invTotalPrice.style.backgroundColor = "#df310e";
        invTotalPrice.style.color = "#fff";
        invTotalPrice.value= "";
        
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
        clear_1()
        // handel total inputs style
        getTotal()
        // show product after created
        showProductInSite()
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

function clear_1() {
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

function showProductInSite() {
    let x = '';
    console.log(dataProduct)
    for (let i = 0; i < dataProduct.length; i++) {
        // let proContent = document.createElement('div');
        // let proName = document.createElement('div');
        // let proCount = document.createElement('div');

        // proContent.classList.add('product-content')
        // proName.classList.add('pro-name')
        // proCount.classList.add('pro-count')

        // proContent.setAttribute("proNum", `${i}`);
        // proName.append(document.createTextNode(`${dataProduct[i].title}`));
        // proCount.append(document.createTextNode(`${dataProduct[i].tQuantity} م`));

        // proContent.append(proName, proCount);

        // sectionOne.append(proContent)

        x+= `
            <div class="product-content" id="${i}">
                <div class="pro-name">
                    ${dataProduct[i].title}
                </div>
                <div class="pro-count">
                ${dataProduct[i].tQuantity} م
                </div>
            </div>
        `
    }
    sectionOne.innerHTML= x;
}
showProductInSite()


let storeChilled = Array.from(storeProducts.children)

function goTOStore() {
    let products = Array.from(sectionOne.children);
    products.forEach((product, index) => {
        product.addEventListener('click', function () {
            // got to store
            arrayOfLeftColumnChildren.forEach((targetDiv) => {
                if (targetDiv.getAttribute('data-title') == 'storage') {
                    targetDiv.classList.add('active')
                } else {
                    targetDiv.classList.add('hidden')
                    targetDiv.classList.remove('active')
                }
            })

            // handle hover
            arrayOfRightColumnContentChildren.forEach((targetDiv) => {
                if (targetDiv.getAttribute('data-title') == 'storage') {
                    targetDiv.classList.add('active');
                } else {
                    targetDiv.classList.remove('active');
                }
            })
        


            let proId = this.getAttribute('proNum');
            for (let i = 0; i < dataProduct.length; i++) {
                if (proId == i) {
                    console.log()
                }
            }

            for (let i = 0; i < storeChilled.length; i++) {
                let td = Array.from(storeChilled[i].children);
                if (index == storeChilled[i].id) {
                    window.scroll(0,((storeChilled[i].getBoundingClientRect().top) - 100))
                    td.forEach((td) => {
                        td.style.cssText = 'background-color: #00A6FB;'
                    })
                } else {
                    td.forEach((td) => {
                        td.style.backgroundColor = '#003554'
                    })
                }
            }
        })
    })
}

goTOStore()

function addId() {
    for (let i = 0; i < storeChilled.length; i++) {
        storeChilled[i].setAttribute('id', `${i}`)
    }

}

addId()

// inv code

// create main array and check if local storage != null

let invoicesData;
// array of all data invoices
if (localStorage.invData != null) {
    invoicesData = JSON.parse(localStorage.invData)
} else {
    invoicesData = [];
}

// let data for one product
let oneProduct = [];
// get data product invoice
function getInvData () {
    let inv = {
        cusName: invCustomerName.value,
        cusNumber: invCustomerNumber.value,
        invProName: invProductName.value,
        invProHeight: invProductHeight.value,
        invProWidth: invProductWidth.value,
        invProCount: invProductCount.value,
        invUnitPrice: invUnitPrice.value,
        productQuantity: invProductQuantity.value,
        invTotalPrice: (invUnitPrice.value * invProductQuantity.value),
    }
        // Check for null properties
        let hasNullProperty = false;

        if (invCustomerName.value == '' ||
            invCustomerNumber.value == '' ||
            invProductName.value == '' ||
            invProductHeight.value == '' ||
            invProductWidth.value == '' ||
            invProductCount.value == '' || 
            invUnitPrice.value == '') {
            hasNullProperty = true;
        }

        if (hasNullProperty) {
            alert('لا يمكن اضافه المنتج وهناك بيانات فارغه')
        } else {
            oneProduct.push(inv);
            handelOneInvoice = true;
            clear_2();
            getTotal();
        }
}


invoiceSaveBtn.addEventListener('click', function () {
    // // call getInvData when wont make inv for one product by click on save button
    // if (handelOneInvoice == false) {
    //     getInvData();
    // }

    // push amount paid info
    oneProduct.push({amountPaid : invAmountPaid.value , remainingPaid: invRemainingPaid.value})
    // push all obj for one invoice to invoicesData
    invoicesData.push(oneProduct)
    localStorage.invData = JSON.stringify(invoicesData)
    // show invoice in display invoice section
    showInvoice();
    // after save one invoice in local storage clear oneProduct array to be ready to next invoice
    oneProduct = [];
    handelOneInvoice = false;
    // clear inputs 
    invAmountPaid.value = '';
    invRemainingPaid.value = '';
}) 


// calc invoice Remaining Paid
function remainingPaid() {
    let totalSum = 0;
    // call getInvData when wont make inv for one product by click on save button
    if (handelOneInvoice == false) {
        getInvData();
        console.log(oneProduct)
        for (let i = 0; i < oneProduct.length; i++) {
            totalSum += oneProduct[i]['invTotalPrice']
        }
        console.log(totalSum)
    } else {
        console.log(oneProduct)
        for (let i = 0; i < oneProduct.length; i++) {
            totalSum += oneProduct[i]['invTotalPrice']
        }
        console.log(totalSum)
    }

    let AmountPaidValue = parseFloat(invAmountPaid.value);
    if (AmountPaidValue < totalSum || AmountPaidValue == totalSum) {
        invRemainingPaid.value = (totalSum - AmountPaidValue) || 0
    } else {
        invRemainingPaid.value = 0
    }
}

// display invoice 


// let inv = {
//     cusName: invCustomerName.value,
//     cusNumber: invCustomerNumber.value,
//     invProName: invProductName.value,
//     invProHeight: invProductHeight.value,
//     invProWidth: invProductWidth.value,
//     invProCount: invProductCount.value,
//     invUnitPrice: invUnitPrice.value,
//     productQuantity: invProductQuantity.value,
//     invTotalPrice: (invUnitPrice.value * invProductQuantity.value),
// }

function showInvoice() {

    let invoicesData = JSON.parse(localStorage.invData);
    // console.log(invoicesData);

    for (let i = 0; i < invoicesData.length; i++) {
        let invoiceDiv = document.createElement('div');
        invoiceDiv.classList.add('invoice');
        let inv = '';
        for (let j = 0; j < invoicesData[i].length; j++) {
            inv += 
            `
                <table>
                <caption>اسم العميل</caption>
                <thead>
                    <tr>
                        <th>المنتج</th>
                        <th>الطول</th>
                        <th>العرض</th>
                        <th>العدد</th>
                        <th>سعر المتر</th>
                        <th>اجمالي الكميه</th>
                        <th>اجمالي السعر</th>
                    </tr>
                </thead>
                <tbody>
                    <td>${invoicesData[i][j].invProName} </td>
                    <td>${invoicesData[i][j].invProHeight} <span>متر</span></td>
                    <td>${invoicesData[i][j].invProWidth} <span>متر</span></td>
                    <td>${invoicesData[i][j].invProCount}</td>
                    <td>${invoicesData[i][j].invUnitPrice} <span>جنيه</span></td>
                    <td>${invoicesData[i][j].productQuantity} <span>متر</span></td>
                    <td>${invoicesData[i][j].invTotalPrice} <span>جنيه</span></td>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5">المبلغ المدفوع</td>
                        <td colspan="2">2000 <span>جنيه</span></td>
                    </tr>
                    <tr>
                        <td colspan="5">المبلغ المتبقي</td>
                        <td colspan="2">0 <span>جنيه</span></td>
                    </tr>
                </tfoot>
            </table>
            `
        }
        invoiceDiv.innerHTML = inv;
        InvDisplay.append(invoiceDiv)
    }
}
showInvoice();

function clear_2() {
        invCustomerName.value = '';
        invCustomerNumber.value = '';
        invProductName.value = '';
        invProductHeight.value = '';
        invProductWidth.value = '';
        invProductCount.value = '';
        invUnitPrice.value = '';
        invProductQuantity.value = '';
        invTotalPrice.value = '';
}

