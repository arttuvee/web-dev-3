const createRestaurantRow = restaurantData => {
  const { name, company } = restaurantData;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${company}</td>
  `;
  return row;
}

const createRestaurantModal = (restaurantData, menuData) => {
  const { name, address, postalCode, city, phone, company } = restaurantData;
  const { courses } = menuData;

  let menuHtml = '';
  courses.forEach(course => {
    menuHtml += `<li>${course.name}: ${course.price}</li>`;
  });

  const modalContent = `
    <h2>${name}</h2>
    <p>Address: ${address}</p>
    <p>Postal Code: ${postalCode}</p>
    <p>City: ${city}</p>
    <p>Phone Number: ${phone}</p>
    <p>Company: ${company}</p>
    <h3>Daily Menu</h3>
    <ul>${menuHtml}</ul>
    <button>Close</button>
  `;

  return modalContent;
};

export { createRestaurantRow, createRestaurantModal };
