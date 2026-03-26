import { CartItem } from "./cartitemsobj.js";

const products=document.getElementById("products");
const carts=document.getElementById("carts");
const incrementBtn=document.getElementById("increment");
const decremetnBtn=document.getElementById("decrement");
const addtocartBtn=document.getElementById("outer")
let countItems=document.getElementById("countitems")

let items=[];

function allProducts(CartItem)
{
    return CartItem.map(data=>{
        let {Image,Name,Price,Discription}=data;
        return `
        <div class="prod">
            <img id="image" src=${Image}>
            <div class="leftdata">
                <h3>${Name}</h3><br>
                <h4>${Price}</h4></br>
                <p>${Discription}</p>
            </div>
            <div class="rightdata">
                <div class="leftbuttons">
                    <button class="increment">+<button>
                    <p class="countitems">0</p>
                    <button class="decrement">-</button>
                </div>
                
                <button class="outer">Add to Cart</button>
            </div>
        </div>
        `
    })
}
products.innerHTML=allProducts(CartItem).join("");

