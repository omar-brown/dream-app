import './style.css'

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSpinner();
    // Provides a data structure that behaves like a map
    const data = new FormData(form);
    const response = await fetch('http://localhost:8080/dream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: data.get('prompt'),
        })
    })

    const { image } = await response.json();

    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512" />`;
    hideSpinner();
})

function showSpinner() {
    // Get the button ref
    const button = document.querySelector('button');
    // Disable the button
    button.disabled = true;
    // Add the spinner
    button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>'
}
function hideSpinner() {
    // Get the button ref
    const button = document.querySelector('button');
    // Enable the button
    button.disabled = false;
    // Reset the text
    button.innerHTML = 'Dream';
}