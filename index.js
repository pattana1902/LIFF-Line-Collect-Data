import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBb6lQOQS6rLSwxYnXTyL4c6zi1HYWRV94',
  authDomain: 'testdatabase-fc8ef.firebaseapp.com',
  projectId: 'testdatabase-fc8ef',
  storageBucket: 'testdatabase-fc8ef.appspot.com',
  messagingSenderId: '926552180775',
  appId: '1:926552180775:web:13b3d7a196b21edb306602',
};

firebase.initializeApp(firebaseConfig);

// Picture upload functionality
function uploadPicture(file) {
  // Implement your file upload logic here
  // You can use libraries like Axios or the Fetch API to handle the upload
  // Resolve with the uploaded picture's URL or unique identifier
}

// Location capture functionality
function captureLocation() {
  if (!liff.isApiAvailable('geolocation')) {
    console.error('Geolocation API is not available.');
    return;
  }

  const locationButton = document.getElementById('captureLocationBtn');

  locationButton.addEventListener('click', function () {
    liff
      .getGeolocation()
      .then((location) => {
        console.log('Location:', location);
      })
      .catch((error) => {
        console.error('Failed to get location', error);
      });
  });
}

function initializeApp() {
  document
    .getElementById('dataForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      submitData();
    });
}

async function submitData() {
  const description = document.getElementById('description').value;
  const pictureFile = document.getElementById('picture').files[0];
  const date = document.getElementById('date').value;

  try {
    const pictureUrl = await uploadPicture(pictureFile);
    const location = await liff.getGeolocation();

    // Send the data to your backend server or cloud-based service
    // along with the picture URL, location, and date

    // Reset the form
    document.getElementById('description').value = '';
    document.getElementById('picture').value = '';
    document.getElementById('location').value = '';
    document.getElementById('date').value = '';
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
