const PRODUCT_LIST = {
    '0':{
        "name":"Product 1",
        "size":"S/S",
        "packsInBox":4,
        "unitsInBox":42,
        "retail":{
            "pack":5,
            "box":20
        },
        "wholeSale":51
    },
    '1':{
        "name":"The product 2",
        "size":"XL",
        "packsInBox":4,
        "unitsInBox":42,
        "retail":{
            "pack":5,
            "box":20
        },
        "wholeSale":51
    },
    '2':{
        "name":"Product P3",
        "size":"M/S",
        "packsInBox":4,
        "unitsInBox":42,
        "retail":{
            "pack":5,
            "box":20
        },
        "wholeSale":51
    },
    '3':{
        "name":"pGood P4",
        "size":"S/S",
        "packsInBox":4,
        "unitsInBox":42,
        "retail":{
            "pack":5,
            "box":20
        },
        "wholeSale":51
    },
};

let getStoredProducts = ()=>{
    const updatesString = window.localStorage.getItem('products');
    if(updatesString){
        return JSON.parse(updatesString);
    }
    return {};
}

let updateStoredProducts = (storedProducts)=>{
    window.localStorage.setItem('products',JSON.stringify(storedProducts));
}

let updatedProducts = ()=>{
    let updates = getStoredProducts();

    let products = PRODUCT_LIST;

    for(x in updates){
        products[x] = updates[x];
    }
    return products;
}

let products = updatedProducts();
