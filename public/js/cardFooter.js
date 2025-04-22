const card = document.querySelector('.card');
const homeButton = document.getElementById('home');
const editButton = document.getElementById('edit');
const deleteButton = document.getElementById('delete');

homeButton.href = `/${card.dataset.type}`;
editButton.href = `/${card.dataset.type}/${card.dataset.id}/edit`;
deleteButton.href = `/${card.dataset.type}/${card.dataset.id}/delete`;
