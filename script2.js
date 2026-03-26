import { CartItem } from "./cartitemsobj.js";

const products=document.getElementById("products");
const cartSection=document.getElementById("carts");
const incrementBtn=document.getElementsByClassName("increment");
const decrementBtn=document.getElementsByClassName("decrement");
const addtocartBtn=document.getElementsByClassName("outer")
let countItems=document.getElementsByClassName("countitems")
const cartList=document.getElementById("Cartlist")
const empty=document.getElementById("empty")

const {Name,Price}=CartItem;
let items=[{
    count:0
},
{
    count:0
},
{
    count:0

}
];
let cartItems=[]


function renderCount(count,index)
{
    countItems[index].innerHTML=count;

}
function deletefromCart(index)
{
    cartItems.splice(index,1);
}
function renderMycart()
{
    cartList.innerHTML="";
    
    if(cartItems.length===0){
        empty.style.display="block";
    }
    else{
        empty.style.display="none"
    }
    
    cartItems.forEach((value,index)=>{
        // console.log(value,index)
        const list=document.createElement("li");
        // list.style.listStyle="none";

        // let {Image,Name,Price}=CartItem;
        const mainCont=document.createElement("div");
        mainCont.className="prod"

        const image=document.createElement("img");
        image.src=value.Image;

        const left=document.createElement("div");
        left.className="leftdata";

        const h3=document.createElement("h3");
        const h4=document.createElement("h4");
        h3.textContent=value.Name;
        // console.log(h3,h4)
        h4.textContent=value.Price;
        left.append(h3,h4);

        const right=document.createElement("div");
        right.className="rightdata"
        const leftdata=document.createElement("div")
        leftdata.className="leftbuttons";

        const p1=document.createElement("p");
        const p2=document.createElement("p")
        p1.textContent="x"+items[index].count;
        p2.textContent=items[index].count*Number(value.Price.replace('$',""));
        leftdata.append(p1,p2);

        const delbutton=document.createElement("button");
        delbutton.textContent="Delete"
        right.append(leftdata,delbutton);

        mainCont.append(image,left,right)
        list.appendChild(mainCont);
        cartList.appendChild(list)

        delbutton.addEventListener('click',()=>{
            deletefromCart(index)
            renderMycart();
        })
    })
    
}

function increment(index){
    console.log(CartItem[index].Name);
    items[index].count++
    renderCount(items[index].count,index);
}

function decrement(index)
{
    
    items[index].count = Math.max(0, items[index].count - 1);
    renderCount(items[index].count,index);
}

Array.from(incrementBtn).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    increment(index);
  });
});
Array.from(decrementBtn).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    decrement(index);
  });
});
Array.from(addtocartBtn).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    cartItems.push(CartItem[index]);
    renderMycart(items[index].count,index)
  });
});

