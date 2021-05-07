const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((response) => {
        if (response.error) {
            messageOne.textContent = response.error;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent = '';
            messageTwo.textContent = `Weather: ${response.weather_descriptions} Temprature: ${response.temperature}, Feelike: ${response.feelslike}`
        }
    })
});
});
