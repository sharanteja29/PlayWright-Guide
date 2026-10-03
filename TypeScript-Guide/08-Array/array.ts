let tests = ["Login","Search","Checkout","Profile"]

tests.push("Logout")
tests.unshift("Signup")
let val:boolean = false
let pay:boolean = false

for(let test of tests){
  if(test.includes("Checkout")){
    val=true
    
}
if(test.includes("Payment")){
    pay=true
    
}

}


if(val){
console.log("Checkout test found")
}
else{
  console.log("Checkout test not found")
}

if(pay){
console.log(`Payment test exists: ${pay}`)
}
else{
  console.log(`Payment test exists: ${pay}`)
}

let index = tests.indexOf("Profile")
console.log(index)
let new_test=[]
for(let test of tests)
{
  new_test.push("Test-"+ test)
}
console.log(new_test)

let map_test= tests.map(test =>{
  return "Test-"+test
}
)
console.log(map_test)

let removed_pop=tests.pop()
console.log(removed_pop)
console.log(tests)
export {}