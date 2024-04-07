import { BASE_URL } from './variables.js';

const fetchRestaurantsData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/restaurants`);

    const message = response.ok ? `Fetch response status: ${response.status}` : 'Network response was not ok.';
    console.log(message);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const fetchDailyMenuData = async (id, lang) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/restaurants/daily/${id}/${lang}`);

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    console.log('Fetch response status: ', response.status);
    return data;
  } catch (error) {
    console.error('Error:  ', error);
  }
};

export { fetchRestaurantsData, fetchDailyMenuData };
