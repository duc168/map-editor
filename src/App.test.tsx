
import React from 'react';
import faker from 'faker';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import puppeteer from 'puppeteer'
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <div>
        duc168
      </div>
    </Provider>
  );

  expect(getByText(/duc168/i)).toBeInTheDocument();
});


const person = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};
let browser: puppeteer.Browser
let page: puppeteer.Page
beforeAll(async () => {
  // launch browser 
  browser = await puppeteer.launch(
    {
      headless: false, // headless mode set to false so browser opens up with visual feedback
      // slowMo: 250, // how slow actions should be
    }
  )
  // creates a new page in the opened browser   
  page = await browser.newPage()
})

describe('H1 Text', () => {
  test('h1 loads correctly', async () => {
    await page.goto('http://localhost:3000/')
    await page.waitForSelector('#title')
    await page.close()
  }, 30000)
})

afterAll(() => {
  browser.close()
})