import ExcelJS from "exceljs";
import { test, page, browser, expect } from '@playwright/test';
import * as os from 'os';
import * as path from 'path';

function getDefaultDownloadPath() {
    const homeDir = os.homedir();

    switch (process.platform) {
        case 'win32':
            return path.join(homeDir, 'Downloads');
        case 'darwin':
            return path.join(homeDir, 'Downloads');
        case 'linux':
            return path.join(homeDir, 'Downloads');
        default:
            return path.join(homeDir, 'Downloads');
    }
}


async function writeExcell(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = await readExcell(worksheet, searchText, change);
    if (output.row !== -1) {
        const cell = worksheet.getCell(output.row, output.column);
        cell.value = replaceText;
        await workbook.xlsx.writeFile(filePath);
    }
}

async function readExcell(worksheet, searchText, change) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(rowNumber, colNumber);
                output.row = rowNumber;
                output.column = colNumber + change.colChange;
                // output = {row: rowNumber, column: colNumber};
            }
        });
    });
    return output;
}


// update Banana price to 350
/**
 * Scenario
 * --------
    Open the webpage
    Click download button
    Download the file and get the path - // const downloadedFilePath = await download.path(); 
    Modifiye the cell on the excell sheet
    Save the file
    Click the Choose File button
    Upload the file
    Verify the modification on browser
 */
test("Download and upload validation test by using excel utils", async ({ browser }) => {
    const textSearch = "Banana";
    const newPrice = 350;
    // for windows :
    const filePath = getDefaultDownloadPath() + "\\download.xlsx"; // C:\Users\ASUS\Downloads\download.xlsx
    // console.log("Browser default download path:", defaultDownloadPath);

    const context = await browser.newContext({
        acceptDownloads: true,
        // downloadsPath: path.join(__dirname, 'downloads') // custom download path
    });
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/upload-download-test/"); // open the webpage
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download" }).click(); // click download button

    const download = await downloadPromise; // const downloadedFilePath = await download.path(); 
    await download.saveAs(filePath);

    // modifiye excell document which is downloaded
    writeExcell(textSearch, newPrice, { rowChange: 0, colChange: 2 }, filePath); // filePath
    await page.locator("#fileinput").click(); // click "Choose file" button - require ?
    await page.locator("#fileinput").setInputFiles(filePath);

    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole("row").filter({has: textLocator});

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(String(newPrice));

    // await page.pause();

});


