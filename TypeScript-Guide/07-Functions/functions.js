function login(username, password) {
    if (username === "sharan" && password === "1234") {
        return true;
    }
    return false;
}
const calculatetime = (...nums) => {
    let value = 0;
    for (let i = 0; i <= nums.length; i++) {
        value += nums[i];
    }
    return value;
};
const formatTestname = (...values) => {
    let ans1 = values.map(value => {
        return "Test-" + value;
    });
    return ans1;
};
const runTests = (values) => {
    let ans1 = values.forEach(value => {
        console.log("Executing " + value);
    });
};
/*
let ans = formatTestname("Login","Search","Checkout")

runTests(ans)
console.log(ans)*/
if (login("sharan", "1234")) {
    let ans = formatTestname("Login", "Search", "Checkout");
    console.log(ans);
    runTests(ans);
}
export {};
