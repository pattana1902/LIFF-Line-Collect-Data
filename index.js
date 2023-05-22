import './style.css';
// Picture upload functionality
function uploadPicture(file) {
  // Implement your file upload logic here
  // You can use libraries like Axios or the Fetch API to handle the upload
  // Resolve with the uploaded picture's URL or unique identifier
}

// Location capture functionality
function captureLocation() {
  // Same as before
}

function initializeApp() {
  // Same as before
}

async function submitData() {
  const description = document.getElementById('description').value;
  const pictureFile = document.getElementById('picture').files[0];
  const date = document.getElementById('date').value;

  try {
    const pictureUrl = await uploadPicture(pictureFile);
    const location = await liff.getGeolocation();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('description', description);
    formData.append('pictureUrl', pictureUrl);
    formData.append('location', JSON.stringify(location));
    formData.append('date', date);

    // Send the data to the server
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log('Data submitted successfully');
          // Reset the form
          document.getElementById('description').value = '';
          document.getElementById('picture').value = '';
          document.getElementById('location').value = '';
          document.getElementById('date').value = '';
        } else {
          console.error('Error submitting data:', xhr.status);
        }
      }
    };
    xhr.send(formData);
  } catch (error) {
    console.error(error);
    // Handle any errors that occur during the data submission
  }
}

// LIFF initialization
liff
  .init({ liffId: '1661198134-jKzpyDgB' })
  .then(() => {
    captureLocation();
    initializeApp();
  })
  .catch((error) => {
    console.error('LIFF initialization failed', error);
  });
