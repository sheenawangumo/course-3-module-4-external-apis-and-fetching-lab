// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

const statInput = document.getElementById('state-input'); 
const fetchButton = document.getElementById('fetch-alerts');
const alertsDisplay = document.getElementById('alerts-display');
const errorMessage = document.getElementById('error-message');

async function fetchWeatherAlerts(state) {
    resetUI()
    if (!state || state.length !== 2) {
        displayError("Please enter a valid 2-letter state abbreviation.");
        return;
    }

    try {
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state.toUpperCase()}`);
        
        if (!response.ok) {
            throw new Error('Invalid state code or network error.');
        }

        const data = await response.json();
        displayAlerts(data, state);
        stateInput.value = '';

    } catch (error) {displayError(error.message);
    }

}
function displayAlerts(data, state) {
    const features = data.features;
    const count = features.length;
    const upperState = state.toUpperCase();

    const title = document.createElement('p');
    title.textContent = `Current watches, warnings, and advisories for ${upperState}: ${count}`;
    alertsDisplay.appendChild(title);

    const list = document.createElement('ul');
    features.forEach(alert => {
        const listItem = document.createElement('li');
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
    });
    alertsDisplay.appendChild(list);
}
function resetUI() {
    alertsDisplay.innerHTML = '';
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden'); 
}

function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

fetchButton.addEventListener('click', () => {
    const stateValue = stateInput.value.trim();
    fetchWeatherAlerts(stateValue);
}
);