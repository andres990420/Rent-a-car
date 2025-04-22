const startedAt = document.getElementById('startedAt');
const endedAt = document.getElementById('endedAt');
const totalPrice = document.getElementById('totalPrice');
const pricePerDay = document.getElementById('pricePerDay');
const car = document.getElementById('car');
const client = document.getElementById('client');


startedAt.min = new Date(Date.now()).toISOString().split('T')[0];

client.onchange = () =>{
    setClientData();
}

car.onchange = () =>{
    setCarData()
    pricePerDay.value = car[car.options.selectedIndex].dataset['price'];
    startedAt.removeAttribute('disabled');
}

startedAt.onchange = () => {
    console.log(startedAt.value)
    endedAt.removeAttribute('disabled');
    endedAt.min = startedAt.value;
}

endedAt.onchange = () => {
    totalPrice.value =  calculateTotalPrice(startedAt.value, endedAt.value, pricePerDay.value);
}


function calculateTotalPrice(startedDate, endedDate, pricePerDay){
    const rentalDays = (Date.parse(endedDate) - Date.parse(startedDate)) / (1000 * 60 * 60 * 24);
    return Math.round(rentalDays * pricePerDay);
}

function setClientData(){
    const clientData = client[client.options.selectedIndex];
    mostrarDatos();

    document.getElementById('input-phone-number').textContent = clientData.dataset['phoneNumber'];
    document.getElementById('input-email').textContent = clientData.dataset['email'];
    document.getElementById('input-document-number').textContent = clientData.dataset['documentNumber'];
    document.getElementById('input-document-type').textContent = clientData.dataset['documentType'];
    document.getElementById('input-nationality').textContent = clientData.dataset['nationality'];
}

function setCarData(){
    const carData=  car[car.options.selectedIndex];
    mostrarDatos();

    document.getElementById('input-model').innerText = carData.dataset['model'];
    document.getElementById('input-brand').innerText = carData.dataset['brand'];
    document.getElementById('input-year').innerText = carData.dataset['year'];
    document.getElementById('input-mileage').innerText = carData.dataset['mileage'].toLocaleString();
    document.getElementById('input-capacity').innerText = carData.dataset['capacity'];
    document.getElementById('input-transmission').innerText = (carData.dataset['transmission']);
}

function mostrarDatos(){
    document.querySelectorAll('.is-hidden').forEach(element => {
        element.classList.remove('is-hidden')
    });
}