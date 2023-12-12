// jest.setup.js
import '@testing-library/jest-dom/extend-expect';
import fetch from 'node-fetch';
global.fetch = fetch;
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();
