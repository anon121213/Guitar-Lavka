document.getElementById('send-event').addEventListener('click', () => {
    const id = 1; // Пример ID

    fetch(`http://localhost:5144/api/eventservice/handle-event/${id}`, {
        method: 'GET', // Поскольку мы используем GET-запрос
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text()) // Если сервер возвращает строку
        .then(data => {
            document.getElementById('response').textContent = data; // Отображаем строку
        })
        .catch(error => console.error('Error:', error));
});