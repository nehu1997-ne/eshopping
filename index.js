var data = []
function loadpets(){
    var http=new XMLHttpRequest()
    http.open("GET","product.json")
    http.send()
    http.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200)
        {
        var result= JSON.parse(this.response)
        data = result.products
        }
        BindItem(data)
    }
}
loadpets()
function BindItem(arr){
    var temp=``
    arr.forEach((e)=>{
        temp +=`<div class="col-4">
        <div class="card">
        <div class="card-body">
            <h2 class="card-text">Title : ${e.title}</h2>
            <h4 class="card-title">Id : ${e.id}</h4>
            <p class="card-text">Price : ${e.price} Rs.</p>
            <div class="img"><img src="${e.image}"></div>
            <p class="card-text">Description : ${e.discription}</p>
            <button class="btn btn-info" onclick="addToCart(${e.id},${e.price})"><i class="fas fa-cart-plus"></i>  Add to Cart</button>
             <button class="btn btn-danger" onclick="removeToCart(${e.id},${e.price})">
            <i class="fas fa-cart-plus" ></i>  Remove to Cart</button>
         
        </div>
    </div>
    </div>`   
    })
document.querySelector(".post").innerHTML=temp;
}
function addToCart(pid,price){
    let cart = localStorage.getItem("cart");
    if(cart == null)
    {
        let products = [];
        let product = {"productId":pid,"productQuantity":1,"productPrice":price}
        products.push(product);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    else{
        let pcart = JSON.parse(cart);
        let oldProduct = pcart.find((item)=>item.productId == pid)
        if(oldProduct)
        {
            oldProduct.productQuantity = oldProduct.productQuantity + 1
            pcart.map((item) => {
                if(item.productId == oldProduct.productId)
                {
                    item.productQuantity = oldProduct.productQuantity;
                }
            })
        localStorage.setItem("cart", JSON.stringify(pcart));
        }
        else{
            let product = {"productId":pid,"productQuantity":1,"productPrice":price}
            pcart.push(product) 
            localStorage.setItem("cart", JSON.stringify(pcart));
        }}updateCart();}


        function removeToCart(pid,price){
            let cart = localStorage.getItem("cart");
            if(cart == null)
            {
                let products = [];
                let product = {"productId":pid,"productQuantity":1,"productPrice":price}
                products.splice(product);
                localStorage.setItem("cart", JSON.stringify(products));
            }
            else{
                let pcart = JSON.parse(cart);
                let oldProduct = pcart.find((item)=>item.productId == pid)
                if(oldProduct)
                {
                    oldProduct.productQuantity = oldProduct.productQuantity  -1
                    pcart.map((item) => {
                        if(item.productId == oldProduct.productId)
                        {
                            item.productQuantity = oldProduct.productQuantity;
                        }
                    })
                localStorage.setItem("cart", JSON.stringify(pcart));
                }
                else{
                    let product = {"productId":pid,"productQuantity":1,"productPrice":price}
                    pcart.splice(product) 
                    localStorage.setItem("cart", JSON.stringify(pcart));
                }}updateCart();}


 function updateCart(){
     let cart = JSON.parse(localStorage.getItem("cart"))
        $(".cart-items").html(`(${cart.length})`)
        let table = `<table class="table">
                <thead >
                <tr>
                <th>Item Id</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                </tr>
                </thead>`;
        cart.map((item) => {
            table += `<tr>
                    <td>${item.productId}</td>
                    <td>${item.productPrice}</td>
                    <td>${item.productQuantity}</td>
                    <td>${item.productQuantity*item.productPrice}</td></tr>`
        })
            table = table +`</table>`
            $(".cart-body").html(table)

            $('#product').on('click','.remove-item',function(){
                $(this).closest('li').remove();// remove the closest li item row
            });
}