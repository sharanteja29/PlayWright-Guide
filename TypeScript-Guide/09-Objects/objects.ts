type User = {
username:string,
password:string,
role:string,
isActive:boolean,
email?:string
readonly id:number
}

let obj1:User={
username:"Sharan",
password:"1234",
role:"CE",
isActive:true,
email:"email.com",
id:34
}
console.log(obj1.username)
console.log(obj1.role)
console.log(obj1["email"])
//obj1.id = 45

let obj2:User={

username:"Sharan Teja",
password:"123454",
role:"Tester",
isActive:true,
email:"gstemail.com",
id:35

}

let arr=[obj1,obj2]
let count =0
for(let ob of arr)
{
  if(ob.isActive===true){
    count+=1
    }

  console.log(ob.username)
  console.log(ob.role)
  if(ob.role === "Tester"){
    console.log("Tester found " + ob.username)
  }
  else {
    console.log("Tester Not Found")
  }
}
console.log(count)


let test = {
testname: "Login-Test",
status : "Failed",
browser : "Chrome",
getdetails(){
  return `The test name is ${this.testname} and status code is ${this.status} and browser
  code is ${this.browser}`
}


}
test.status = "Passed"
console.log(test.getdetails())


type LoginData = {
username: string,
password: string,
expectedMessage: string,
testType: "Valid" | "Invalid Password" | "Empty Username"
}

let new1: LoginData = {
  username:"Sharan",
  password:"1234",
  expectedMessage:"Login Successful",
  testType:"Valid"
}

let new2: LoginData = {
  username:"Teja",
  password:"123445",
  expectedMessage:"Login Successful",
  testType:"Invalid Password"
}


let new3: LoginData = {
  username:"Tejas",
  password:"12344565",
  expectedMessage:"Login Unsuccessful",
  testType:"Empty Username"
}



function runLoginTest(para : LoginData){
console.log(`Testing user: ${para.username}` )
console.log(`Expected Message: ${para.expectedMessage}`)
}


let newarr= [new1,new2,new3]
for(let n in newarr){
  runLoginTest(newarr[n])
}



export {}