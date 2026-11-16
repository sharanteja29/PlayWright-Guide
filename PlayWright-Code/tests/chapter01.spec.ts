import {test,expect} from '@playwright/test';
test("Test the title of the page",async({page})=>{


await page.goto("https://playwright.dev/");
let titlename:string = await page.title();
console.log('title:',titlename) 
await expect(page).toHaveTitle(titlename);


})

test("Page URl",async ({page})=>{

await page.goto("https://www.natwest.com")
let url:string=await page.url()
console.log(url)
await expect(page).toHaveURL("https://www.natwest.com/")


})