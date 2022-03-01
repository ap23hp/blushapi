
//storing state of toggle button(know more about product button)
// in this variable named as gameState
let gameState="OFF"
//creating header
const head=document.querySelector(".header")
head.innerHTML=`
  <div class="navbar">
<a class="active" href="#"><i class="fa fa-fw fa-home"></i> Home</a>
<a href="#"><i class="fa fa-fw fa-search"></i> Search</a>
<a href="#"><i class="fa fa-fw fa-envelope"></i> Contact</a>
<a href="#"><i class="fa fa-fw fa-user"></i> Login</a>
</div>`
//creating products
function createUser({name,brand,price,image_link,currency,product_link,id,description}){
    

    document.querySelector(".user-list").innerHTML+=`

    
    <div class="user-container">
   
    <img src="${image_link}" 
    alt="${name} "
    class="user-pic">
  <div>
    <h3 class="user-name">${name}</h3>
    <p class="user-brand">${brand}</p>
    <div class="pricy">
    <p class="user-price">${price +"$"}</p> 
 </div>

 <p ><a href="${product_link}"  target="_blank" class="user-product-link">Product Link</a></p>
 <div class="desp">
 </div>
 </div>
 <button class="btn btn-${id}" onclick="describe(${id})">Know More about product🤔</button>
 <div class="edit-user-container edit-user-container-${id}">
${description}
</div>
 </div>
   
    </div>`
    }

    

    //reading users from api
 async function getUsers(){
    try{
    const data= await fetch(
        "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush",
    
    {method:"GET"}
    );
    
     const userList=await data.json()
     //empty list 
     document.querySelector(".user-list").innerHTML=""
      //  userList.forEach((user)=>createUser(user))
      //  console.log(result)
    
    //pagination
      const pagination=document.querySelector(".pagination");
      //we should know number of pages
      const numofpages=Math.ceil(userList.length/10)
      //console.log(numofpages)
      //so number of pages should be 10, we can use math.ciel, it gives u higher round off number
     
       for(let i=1; i<=numofpages;i++){
      page=document.createElement("button")
     //now we need to give numebrs on buttons
     page.innerText=i
     pagination.append(page);
       page.onclick=()=>{
       
console.log(`button pressed  ${i}`)
 const pageUsers=userList.slice( (i-1)*10, i*10)
  document.querySelector(".user-list").innerHTML="";
pageUsers.forEach((user)=>createUser(user))
         //0-10
         //10-20
         //20-30
         //30-40
     
     }}
    
       
       //we want first ten users
       console.log(numofpages)
       const firstenUsers=userList.slice(0,10)
       firstenUsers.forEach((user)=>createUser(user))
        // userList.forEach((user)=>createUser(user))
       //  console.log(result)
    }
    
    catch(e){
    console.log(e)
    //for catching errors
    console.log("ohh no")
    }
    }
    
    getUsers();

    function describe(id){

        console.log("description.....",id)
       
 //document.querySelector(`.edit-user-container-${id}`).style.display="flex"
 //document.querySelector(`.btn-${id}`).style.display="none"
 //document.querySelector(`.btn-${id}`).innerHTML="🤔"  
 
 
 //storing state of description button in gamestate variable 
 //and changing it accordingly as per need to get toggle effect

  
      if(gameState=="OFF"){
        document.querySelector(`.edit-user-container-${id}`).style.display="flex"
        document.querySelector(`.btn-${id}`).innerText="🤔"
          gameState="ON"

  
          document.querySelector(`.edit-user-container-${id}`).style.fontSize="0.7rem"
          //document.querySelector(`.edit-user-container-${id}`).style.marginBottom="80px"
       
          console.log("on")
      }else if(gameState=="ON"){
       document.querySelector(`.edit-user-container-${id}`).style.display="none"
        //document.querySelector(`.user-container-${id}`).style.width="600px"
        //document.querySelector(`.user-container-${id}`).style.height="300px"
        document.querySelector(`.btn-${id}`).innerText="Know more about Product🤔"
   
        gameState="OFF"
         console.log("off")
      }
       
         }
      
      
//   function  findProduct(){
//       let input = document.getElementById('search').value
//         input=input.toLowerCase();
// console.log(input)
//         let x = document.getElementsByClassName('userList');
          
//         for (i = 0; i < x.length; i++) { 
//             if (!x[i].innerHTML.toLowerCase().includes(input)) {
//                 x[i].style.display="none";
//             }
//             else {
//                 x[i].style.display="list-item";                 
//             }
//         }
    
//     }

    
//     <form id="search-products">
//     <label for="search">Search:</label>
//     <input type="text" name="search" class="search" id="search">
//     <button class="search-btn" onclick="findProduct()">Search</button>
  
//   </form>