$(document).ready(function () {
    let productListHtml = "";
    for (x in products) {
        productListHtml += `<option value="${x}: ${products[x].name} (${products[x].size})">`;
    }
    $("#productList").html(productListHtml);

    $("#search").change(function (e) {
        //e.preventDefault();
        let id = $(this).val().split(':')[0];
        let product = products[id];
        let item = document.createElement('div');

        let itemHtml = `
        <div class="card-body">
           <h3>${product.name}</h3>
           <input type="hidden" name="productID" value="${id}">
            <div class="row">
                <div class="col-6">
                    <select name="cont[]" class="form-control py-0 px-2 selectCont">
                        <option value="pack">Pack</option>
                        <option value="box">Box</option>
                    </select>
                </div>
                <div class="col-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">¢</span>
                        </div>
                        <input type="number" class="form-control py-0 px-3" name="price[]" min="0"
                            step="0.01" value="${product.retail.pack}" readonly required>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-8">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Qty</span>
                        </div>
                        <input type="number" name="qty[]" class="form-control py-0 qty" value="1" required>
                        <div class="input-group-prepend">
                            <span class="input-group-text price">${product.retail.pack}</span>
                        </div>
                    </div>
                </div>
                <div class="col-4 text-right">
                    <button type="button" class="btn btn-danger">
                    &times;</button>
                </div>
            </div>
        </div>`;

        item.innerHTML = itemHtml;
        item.setAttribute('class', 'card p-0 mb-3 mx-2 orderCard shadow');
        document.getElementById('purchaseList').appendChild(item);
        setEvent();
        $(this).val('');
        calculateTotal();
    });

    let setEvent = () => {
        $('.selectCont').change(function (e) {
            let itemCard = $(this).parent().parent().parent().parent();
            let container = $(this).val();
            let product = products[itemCard.find('[name="productID"]').val()];
            itemCard.find('[name="price[]"]').val(product.retail[container]);
            itemCard.find('.price').html(product.retail[container]*itemCard.find('[name="qty[]"]').val())
            calculateTotal();
        });
        $(".qty").change(function (e) {
            let itemCard = $(this).parent().parent().parent().parent().parent();
            let container = itemCard.find('.selectCont').val();
            let product = products[itemCard.find('[name="productID"]').val()];
            itemCard.find('[name="price[]"]').val(product.retail[container]);
            itemCard.find('.price').html(product.retail[container]*itemCard.find('[name="qty[]"]').val())
            calculateTotal();
        });
        $('.btn-danger').click(function (e) {
            $(this).parent().parent().parent().parent().remove();
            calculateTotal();           
        });
    }

    let calculateTotal =()=>{
        let subTotals = $('.price');
        let total=0;
        $.each(subTotals,function(key,value){
            total+=parseFloat($(value).html());
        });
        $('[name="total"]').val(total);
    }

    $(".btn-info").click(function (e) { 
        e.preventDefault();
        document.location.reload();
    });
});