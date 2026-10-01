let age = 2;
if (age >= 18) {
    console.log("You are eligible to vote.");
}
else {
    console.log("You are not eligible to vote.");
}
let value = "chrome";
let value2 = "edge";
switch (value) {
    case "chrome":
        console.log("You are using chrome browser.");
        break;
    case "firefox":
        console.log("You are using firefox browser.");
        break;
    case "edge":
        console.log("You are using edge browser.");
        break;
    default:
        console.log("You are using an unknown browser.");
        break;
}
let admin = "Sharan";
let pass = "1235";
let result = (admin === "Sharan" && pass === "1235") ? (true) : (false);
console.log(result);
export {};
