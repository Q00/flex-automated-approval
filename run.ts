// import { test, expect } from '@playwright/test';
import * as playwright from 'playwright'
import * as dotenv from 'dotenv'


dotenv.config()
if (!process.env.ID || !process.env.PW) {
  console.log("--------------------------------FILL THE ENV --------------------------------")
  process.exit(1)
}
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

(async () => {
  const browser = await playwright.chromium.launch({headless: false})
  const page = await browser.newPage()
  // await page.setViewportSize({width: 1366, height: 768})
  await page.goto('https://flex.team/');
  await page.getByRole('button', { name: '로그인' }).click();
  await page.getByPlaceholder('이메일 주소').fill(process.env.ID!);
  await page.getByPlaceholder('이메일 주소').press('Enter');
  await page.getByPlaceholder('비밀번호').fill(process.env.PW!);
  await page.getByPlaceholder('비밀번호').press('Enter');
  while(true){
    try {
    await page.locator("//*[@id=\"app-shell-root\"]/div/div/div/div/div/main/section/div[1]/div/div/div/ul/li[1]/div[2]/div").waitFor()
    const findRow = page.locator("")
    
    //*[@id="app-shell-root"]/div/div/div/div/div/main/section/div[1]/div/div/div/ul/li[1]/div[2]/div/div/ul/div[2]
    const rowsLength = await (await page.getByRole('button', {name: /.*근무' 승인 요청.*/}).all()).length
      for (let index = 0; index < rowsLength; index++) {
          const xpath = `//*[@id="app-shell-root"]/div/div/div/div/div/main/section/div[1]/div/div/div/ul/li[1]/div[2]/div/div/ul/div[${index+1}]`;
          const row = page.locator(xpath)
          const text = await row.textContent()
          if (!text?.includes("근무")) {
            continue
          }
          await row.hover()
          await page.getByRole('button', { name: '승인하기', exact: true }).click(); 
          await delay(1000);
      
      }

      await delay(5000)
    } catch (error) {
      console.log(error)
    }
  }
  // await browser.close()
  // await page.getByRole('button', { name: '승인하기', exact: true }).click();
  // await page.getByRole('button', { name: '승인하기', exact: true }).click();
})();
