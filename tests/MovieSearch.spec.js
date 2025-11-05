// @ts-check
import { test, expect } from '@playwright/test';
const { Search } = require('./MovieSearch');

test.beforeEach(async ({ page }) => {
  console.log("Starting Movie Search Tests");
  await page.goto('http://localhost:3001/');
});

test.afterEach(async ({ page }) => {
   console.log("Finished Movie Search Tests");
  //add timeout for me to view screen
    await page.waitForTimeout(5000);
    await page.close();
});

test('Test if movie can be found if user enters a valid movie name', async ({ page }) => {
  var MovieName = 'Horizon Zero Dawn: The Frozen Wilds';
  await Search(page, MovieName);
  const images = page.locator('img');
  const count = await images.count();
  if (count == 1) {
    const heading = page.locator("//h3[normalize-space(.)='Horizon Zero Dawn: The Frozen Wilds']");
    await expect.soft(heading).toBeVisible();
  }
});

test('Test if movie can be found if user enters extra spaces in the beginning', async ({ page }) => {
  var MovieName = '    Horizon Zero Dawn: The Frozen Wilds';
  await Search(page, MovieName);
  const images = page.locator('img');
  const count = await images.count();
  expect.soft(count).toBeGreaterThan(0);
});


test('Test if movie can be found if user enters extra spaces in the middle', async ({ page }) => {
  var MovieName = 'Horizon      Zero Dawn: The Frozen Wilds';
  await Search(page, MovieName);
  const images = page.locator('img');
  const count = await images.count();
  expect.soft(count).toBeGreaterThan(0);
});


test('Test if movie can be found if user enters extra spaces at the end', async ({ page }) => {
  var MovieName = 'Horizon Zero Dawn: The Frozen Wilds    ';
  await Search(page, MovieName);
  const images = page.locator('img');
  const count = await images.count();
  expect.soft(count).toBeGreaterThan(0);
});

test('Test if "Load More" button is not visible when there is nothing more to load ', async ({ page }) => {
  var MovieName = 'Horizon Zero Dawn: The Frozen Wilds';
  await Search(page, MovieName);
  const images = page.locator('img');
  const count = await images.count();
  if (count > 10) {
    console.log("More than 10 movies found, there should be a Load More button.");
  } else {
    console.log("10 or fewer movies found, there should NOT be a Load More button.");
    
  const button = page.getByRole('button', { name: 'Load More' })
  const isVisible = await button.isVisible();
  
  console.log("Load more button visibility:", isVisible);
  await expect.soft(button).not.toBeVisible()
  }
});

test('Test if "Add to / Remove From Favorite" buttons click work as expected', async ({ page }) => {
  var MovieName = 'Horizon Zero Dawn: The Frozen Wilds';
  await Search(page, MovieName);
  const images = page.locator('img');
  const count = await images.count();
if (count == 1) {
  
  const addToFavoritesButton = await page.getByRole('button', { name: 'Add to Favorites' });
  const removeFromFavoritesButton = await page.getByRole('button', { name: 'Remove from Favorites' });

   if (await removeFromFavoritesButton.isVisible()) {
    //click remove from favorites button    
    await removeFromFavoritesButton.click();
    await expect.soft(page.getByRole('button', { name: 'Add to Favorites' })).toBeVisible();
   }
   else
    {
      //add to favorites visibility check
      await addToFavoritesButton.click();
      await expect.soft(page.getByRole('button', { name: 'Remove from Favorites' })).toBeVisible();
    }

} else {
  console.log("Movie not found");
}

});


 