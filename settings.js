document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('settingsForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const name = document.getElementById('name').value;
        const APIKEY = document.getElementById('APIKEY').value;
        const prompt = document.getElementById('prompt').value;
        const modelType = document.getElementById('model-type').value;

        // Store the settings in Local Storage
        localStorage.setItem('config', JSON.stringify({ name, APIKEY, prompt, modelType }));

        alert('Settings saved!');

        // Clear the form
        form.reset();

        window.location.href = 'index.html';
    });
});