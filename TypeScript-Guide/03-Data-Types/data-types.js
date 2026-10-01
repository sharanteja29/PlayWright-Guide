let name = "Sharan";
let UserId = 1;
let isLoggedIn = true;
let age = 23;
/*
console.log(`Name: ${name}
UserID: ${UserId}
isLoggedIn: ${isLoggedIn}
Age: ${age}`)
 */
UserId = "Teja";
/*
console.log(`Name: ${name}
UserID: ${UserId}
isLoggedIn: ${isLoggedIn}
Age: ${age}`)
*/
let username = "Sharan";
let pass = 1234;
function login(username, pass) {
    if (username == "Sharan" && pass == 1234) {
        return "Login Successful";
    }
    return 404;
}
let result = login(username, pass);
let result1 = login("teja", 1234);
console.log(result);
console.log(result1);
export {};
