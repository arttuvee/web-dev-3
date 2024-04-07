import { fetchRestaurantsData, fetchDailyMenuData } from "./utils.js";
import { createRestaurantRow, createRestaurantModal } from './components.js';

const tableElement = document.querySelector('table');
const tableBody = document.querySelector('tbody');
const modalWindow = document.querySelector('dialog');
let selectedCell = null;
const allRadio = document.querySelector('#all');
const sodexoRadio = document.querySelector('#sodexo');
const compassRadio = document.querySelector('#compass');

const fetchAndDisplayRestaurants = () => {
  fetchRestaurantsData()
    .then((restaurants) => {
      tableBody.innerHTML = '';

      let filteredRestaurants = restaurants;
      if (!allRadio.checked) {
        if (sodexoRadio.checked) {
          filteredRestaurants = restaurants.filter(r => r.company === 'Sodexo');
        } else if (compassRadio.checked) {
          filteredRestaurants = restaurants.filter(r => r.company === 'Compass Group');
        }
      }

      filteredRestaurants.forEach((restaurant) => {
        const row = createRestaurantRow(restaurant);
        tableBody.appendChild(row);

        row.querySelector('td').addEventListener('click', () => {
          if (selectedCell) {
            selectedCell.classList.remove('highlight');
          }
          row.querySelector('td').classList.add('highlight');
          selectedCell = row.querySelector('td');

          fetchDailyMenuData(restaurant._id, restaurant.lang)
            .then((menu) => {
              modalWindow.innerHTML = createRestaurantModal(restaurant, menu);
              modalWindow.querySelector('button').addEventListener('click', () => {
                modalWindow.close();
              });
              modalWindow.showModal();
            })
            .catch((error) => {
              console.error('Error fetching daily menu:', error);
              alert('Failed to fetch daily menu. Please try again later.');
            });
        });
      });
      tableElement.appendChild(tableBody);
    })
    .catch((error) => {
      console.error('Error fetching restaurants:', error);
      alert('Failed to fetch restaurants. Please try again later.');
    });
}

fetchAndDisplayRestaurants();

allRadio.addEventListener('change', fetchAndDisplayRestaurants);
sodexoRadio.addEventListener('change', fetchAndDisplayRestaurants);
compassRadio.addEventListener('change', fetchAndDisplayRestaurants);
