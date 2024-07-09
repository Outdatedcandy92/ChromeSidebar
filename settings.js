document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Retrieve the current config from Local Storage
        const currentConfig = JSON.parse(localStorage.getItem('config')) || {};

        // Update the config with new values if they have been provided
        const updatedConfig = {
            ...currentConfig,
            ...(document.getElementById('name').value && {name: document.getElementById('name').value}),
            ...(document.getElementById('APIKEY').value && {APIKEY: document.getElementById('APIKEY').value}),
            ...(document.getElementById('prompt').value && {prompt: document.getElementById('prompt').value}),
            ...(document.getElementById('model-type').value && {modelType: document.getElementById('model-type').value})
        };

        // Store the updated settings in Local Storage
        localStorage.setItem('config', JSON.stringify(updatedConfig));

        alert('Settings saved!');

        // Clear the form
        form.reset();

        window.location.href = 'index.html';
    });
});