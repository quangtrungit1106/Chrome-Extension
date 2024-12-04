window.addEventListener('load', function () {
    // Tạo một div thông báo
    const notification = document.createElement('div');
    notification.innerHTML = `
       <div style="position: fixed; top: 0; left: 50%; transform: translateX(-50%); background: white; border: 1px solid #ccc; border-radius: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 10000; text-align: center; display: flex; align-items: center; padding: 10px;">
        <p style="margin: 0; flex-grow: 1;">Loading...</p>
        <button style="display: none; margin-left: 10px; background: transparent; border: none; font-size: 16px; cursor: pointer;">✖</button>
      </div>
    `;
    document.body.appendChild(notification);

    fetch("https://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: document.documentElement.outerHTML })
    })
      .then(response => response.json())
      .then(data => {
        const message = notification.querySelector('p');
        const closeButton = notification.querySelector('button');
        const notificationBox = notification.firstElementChild;
        if(data.result === 1){
          message.textContent = 'Website không có dấu hiệu lừa đảo!';
          notificationBox.style.backgroundColor = '#d4edda'; // Màu xanh lá cây nhạt
          notificationBox.style.borderColor = '#c3e6cb'; // Màu viền xanh lá cây nhạt
           setTimeout(() => {
            notification.style.display = 'none';
          }, 3000);
        } else {
          message.textContent = 'Website không an toàn, có dấu hiệu lừa đảo!';
          notificationBox.style.backgroundColor = '#f8d7da'; // Màu đỏ nhạt
          notificationBox.style.borderColor = '#f5c6cb'; // Màu viền đỏ nhạt
          closeButton.style.display = 'block';
          closeButton.addEventListener('click', () => {
            notification.style.display = 'none';
          });
        }
      })
      .catch(error => {
        notification.querySelector('p').textContent = 'Error analyzing page.';
        console.error(error);
      });
});





  