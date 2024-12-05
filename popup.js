document.addEventListener('DOMContentLoaded', function() {
  // Function to call the API
  function checkPhishingStatus() {
      fetch('https://127.0.0.1:5000/predict', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: document.documentElement.outerHTML })
      })
        .then(response => response.json())
        .then(data => {
              if (data.result === 0.0) {
                  document.getElementById('safe').style.display = 'block';
                  document.getElementById('loading').style.display = 'none';
                  document.getElementById('cheat').style.display = 'none';
              } else if (data.result === 1.0) {
                  document.getElementById('safe').style.display = 'none';
                  document.getElementById('cheat').style.display = 'block';
                  document.getElementById('loading').style.display = 'none';
              }
          })
          .catch(error => {
              console.error('Error fetching the API:', error);
              document.getElementById('loading').textContent = 'Error loading data: ' + error;
          });
  }

  checkPhishingStatus();
});