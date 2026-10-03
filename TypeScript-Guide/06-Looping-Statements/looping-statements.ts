/*for(let i=1;i<=10;i++)
{
  console.log(i)
}
for(let i=1;i<=10;i++)
{
  if(i===7){
    break;
  }
  console.log(i)
}
for(let i=1;i<=10;i++)
{
    if(i===3||i===5||i===7){
      continue;
    }
  
    console.log(i);
    
  }
*/
let admin = "sharan"
let pass = "1234"

if(admin==="sharan" && pass === "1234"){
console.log("Correct Credentials")

}
else{
  if(admin!=="sharan" && pass !== "1234" )
  {
    console.log("Both Username and password are incorrect.")
  }
  
  else if(admin!=="sharan")
  {
    console.log("admin name is incorrect")
  }
  else if(pass!=="1234")
  {
    console.log("Password is wrong")
  }

}


export {}