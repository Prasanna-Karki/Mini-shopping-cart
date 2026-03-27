import { CartItem } from "./cartitemsobj.js";

const products=document.getElementById("products");
let cartSection=document.getElementById("cart");
const incrementBtn=document.getElementsByClassName("increment");
const decrementBtn=document.getElementsByClassName("decrement");
const addtocartBtn=document.getElementsByClassName("outer")
let countItems=document.getElementsByClassName("countitems")
const cartList=document.getElementById("Cartlist")
const empty=document.getElementById("empty")
let finalAmount=document.getElementById("finalwrapper");

let items=[];
for(let data in CartItem)
{
    items.push({count:0});
}
let cartItems=[];

function deletefromCart(index)
{
    const cindex=cartItems[index].prodindex;
    items[cindex].count=0;
    cartItems.splice(index,1);

}
function renderMycart()
{
    let sum=0;
    cartList.innerHTML="";
    finalAmount.innerHTML=""

    if(cartItems.length===0){
        empty.style.display="block";
        finalAmount.style.display="none"
    }
    else{
        empty.style.display="none"
        finalAmount.style.display="block"

    }
    cartItems.forEach((value,index)=>{

        const list=document.createElement("li");
        list.style.listStyle="none";

        const mainCont=document.createElement("div");
        mainCont.className="prod"

        const image=document.createElement("img");
        image.src=value.Cartdata.Image;

        const left=document.createElement("div");
        left.className="leftdata";

        const h3=document.createElement("h3");
        const h4=document.createElement("h4");
        h3.textContent=value.Cartdata.Name;
        // console.log(h3,h4)
        h4.textContent=value.Cartdata.Price;
        left.append(h3,h4);

        const right=document.createElement("div");
        right.className="rightdata"
        const leftdata=document.createElement("div")
        leftdata.className="leftbuttons";

        const p1=document.createElement("p");
        const p2=document.createElement("p")
        p1.textContent="x"+value.itemindex;
        p2.textContent="$"+value.itemindex*Number(value.Cartdata.Price.replace('$',""));
        leftdata.append(p1,p2);
        sum=Number((sum+value.itemindex*Number(value.Cartdata.Price.replace('$',""))).toFixed(2))

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
        cartSection.innerHTML=cartSection.innerHTML.replace(/\d+/g,cartItems.length)
    })
    const Subtotal=document.createElement("span")
    Subtotal.className="final";
    const lefttotal=document.createElement("p");
    const subtotal=document.createElement("p");
    lefttotal.textContent="SubTotal";
    subtotal.textContent="$"+sum;
    Subtotal.append(lefttotal,subtotal);

    const Delivery=document.createElement("span")
    Delivery.className="final";
    const leftdelivery=document.createElement("p");
    const charge=document.createElement("p");
    leftdelivery.textContent="Delivery Charge";
    charge.textContent="$4.99";
    Delivery.append(leftdelivery,charge);

    const Totalamount=document.createElement("span")
    Totalamount.className="Totalfinal";
    const Total=document.createElement("p");
    const totalsum=document.createElement("p");
    Total.textContent="Total";
    totalsum.textContent="$"+(sum+4.99).toFixed(2);

    Totalamount.append(Total,totalsum);

    finalAmount.append(Subtotal,Delivery,Totalamount);
    
    
}

function renderCount(count,index)
{
    countItems[index].innerHTML=count;

}
function increment(cartIndex){
    items[cartIndex].count=items[cartIndex].count+1;
    renderCount(items[cartIndex].count,cartIndex);
}

function decrement(itemIndex)
{
    
    items[itemIndex].count = Math.max(0, items[itemIndex].count - 1);
    renderCount(items[itemIndex].count,itemIndex);
}

Array.from(incrementBtn).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    increment(index);//to know the index of count in item array
  });
});
Array.from(decrementBtn).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    decrement(index);
  });
});
Array.from(addtocartBtn).forEach((btn, index) => {
  btn.addEventListener('click', () => {
    let loopcheck=0;
    let Namevariable=CartItem[index].Name;
        cartItems.forEach((value,cindex)=>{
            if(value.Cartdata.Name==Namevariable){
        cartItems.push({
            Cartdata:CartItem[value.prodindex],
            itemindex:value.itemindex + items[value.prodindex].count,
            prodindex:value.prodindex
        })
        deletefromCart(cindex)
        renderMycart()
        loopcheck=1;
    }
})
        if(loopcheck!=1){
        cartItems.push({
                Cartdata:CartItem[index],
                itemindex:items[index].count,
                prodindex:index
            })
            renderMycart()
            renderCount(0,index)
       
    }
})
    
    
  });


