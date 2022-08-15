$(document).ready(function () {
    let procductView = '';
    for(x in products){
        procductView+=`<div class="card p-0 mb-3 mx-2 bg-secondary productCard" data-id='${x}' data-name='${products[x].name}' data-toggle="modal" data-target="#editModal">
           <!--img class="card-img-top" src="img/img-04.jpg" alt="Card image"-->
           <!--div class="card-img-overlay text-center"-->
               <h1 class="text-capitalize text-center" style="background-color: rgba(255, 2255, 255, 0.8);">
                   ${products[x].name}<br>${products[x].size}
               </h1>
           <!--/div-->
       </div>`
    } 
    $('#products').html(procductView);
    
    let productCards = $(".productCard");

    $("#saveBtn").hide();

    $('.productCard').click(function (e) { 
        //e.preventDefault();
        let product = products[$(this).attr('data-id')];
        let form = document.forms['productEdit'];
        form['productId'].value = $(this).attr('data-id');
        form['name'].value = product.name;
        form['size'].value = product.size;
        form['packsInBox'].value = product.packsInBox;
        form['unitsInBox'].value = product.unitsInBox;
        form['boxPrice'].value = product.retail.box;
        form['packPrice'].value = product.retail.pack;
        form['wholesalePrice'].value = product.wholeSale;
    });

    $("#editBtn").click(function (e) { 
        //e.preventDefault();
        $('#productEdit input').removeAttr('readonly');
        $('#productEdit select').removeAttr('disabled');
        $("#editBtn").hide();
        $("#saveBtn").show();
        $('#name').focus();
    });

    $("#productEdit").submit(function (e) { 
        e.preventDefault();
        let form = document.forms['productEdit'];
        let productId = form['productId'].value;
        let storedProducts = getStoredProducts();
        storedProducts[productId] = {
            "name":form['name'].value,
            "size":form['size'].value,
            "packsInBox":form['packsInBox'].value,
            "unitsInBox":form['unitsInBox'].value,
            "retail":{
                "pack":form['packPrice'].value,
                "box":form['boxPrice'].value
            },
            "wholeSale":form['wholesalePrice'].value
        },
        updateStoredProducts(storedProducts);
        //toast product saved
        setTimeout(() => {
            document.location.reload();
        }, 1000);
    });


    $("#addProduct").submit(function (e) { 
        e.preventDefault();
        let form = document.forms['addProduct'];
        let productId = Date.now()%1000;
        let storedProducts = getStoredProducts();
        storedProducts[productId] = {
            "name":form['name'].value,
            "size":form['size'].value,
            "packsInBox":form['packsInBox'].value,
            "unitsInBox":form['unitsInBox'].value,
            "retail":{
                "pack":form['packPrice'].value,
                "box":form['boxPrice'].value
            },
            "wholeSale":form['wholesalePrice'].value
        },
        updateStoredProducts(storedProducts);
        //toast product saved
        setTimeout(() => {
            document.location.reload();
        }, 1000);
    });

    $("#search").keyup(function (e) { 
        let input = $(this).val();
        if(input.length<1){
            $.each(productCards,function(key,value){
                $(value).show();
            });
        };
        
        $.each(productCards,function(key,value){
            if($(value).attr('data-name').toLowerCase().indexOf(input)>-1){
                $(value).show();
            }
            else{
                $(value).hide();
            }
        });
    });


});



/**
 * <!-- Modal Header -->
    <div class="modal-header">
        <h1 class="modal-title">Parle-G Biscuit</h1>
        <button type="button" class="close" data-dismiss="modal">X</button>
    </div>

    <!-- Modal body -->
    <div class="modal-body">
        <h3>Size: M/S</h3>
        <li>4 packs in box</li>
        <li>42 units in box</li>
        <hr>
        <h3>Retail</h3>
        <li>Box: ¢20.00</li>
        <li>Pack: ¢5.00</li>
        <hr>
        <h3 class="text-center">Whole Sale: ¢51.00</h3>
    </div>

    <!-- Modal footer -->
    <div class="modal-footer">
        <button type="button" class="btn btn-success  ml-4" data-dismiss="modal" data-toggle="modal"
            data-target="#editModal">
            Edit</button>
        <button type="button" class="btn btn-danger  ml-4" data-dismiss="modal">Close</button>
    </div>
 */