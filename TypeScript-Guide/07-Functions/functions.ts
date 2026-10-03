
function login(username:string,password:string):boolean{
  if(username==="sharan" && password==="1234"){  
  return true
  }
  return false
}

const calculatetime = (...nums:number[]):number =>{

  let value=0
  for(let i=0;i<=nums.length;i++){
      value+=nums[i]
  }
  return value
}
const formatTestname=(...values:string[]):string[] => {

let ans1 = values.map(value => {
return "Test-"+value

})
return ans1

}
const runTests=(values:string[]):void => {

let ans1 = values.forEach(value => {
console.log("Executing " + value)

})
}
/*
let ans = formatTestname("Login","Search","Checkout")

runTests(ans)
console.log(ans)*/
let username="sharan"
let pass="1234"
if(login(username,pass)){
  let ans = formatTestname("Login","Search","Checkout")
  console.log(ans)
  runTests(ans)
  
}
else{
  console.log("The Credentials are incorrect")
}

export  {}