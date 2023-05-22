window.onload = function () {
  initializeLIFF();
};

async function initializeLIFF() {
  try {
    await liff.init({ liffId: '1661198134-jKzpyDgB' });
    document.getElementById('dataForm').addEventListener('submit', submitData);
  } catch (error) {
    console.error('LIFF initialization failed:', error);
  }
}

function submitData(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  // Send the data to your backend server or perform any desired actions
  sendDataToServer(data)
    .then((response) => {
      console.log('Data submitted successfully');
      console.log('Server response:', response);
      liff.closeWindow();
    })
    .catch((error) => {
      console.error('Error submitting data:', error);
    });
}

function sendDataToServer(data) {
  // Modify the URL and request method as per your backend server's API endpoint
  const url = 'https://your-backend-server.com/api/data';
  const method = 'POST';

  // Modify the headers and body payload based on your backend server's requirements
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);

  // Send the HTTP request using fetch API
  return fetch(url, {
    method: method,
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error('Failed to send data to server');
    });
}
