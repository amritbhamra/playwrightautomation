// helpers.js
exports.Search = async (page, MovieName) => {
  console.log(`Searching for movie from exported class: ${MovieName}`);
  await page.getByRole('textbox', { name: 'Search movies...' }).click();
  await page.getByRole('textbox', { name: 'Search movies...' }).fill(MovieName);
  await page.getByRole('button', { name: 'Search' }).click();
  await page.waitForTimeout(2000);
};