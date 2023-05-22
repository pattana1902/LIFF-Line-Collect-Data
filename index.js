// index.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './style.css';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBb6lQOQS6rLSwxYnXTyL4c6zi1HYWRV94',
  authDomain: 'testdatabase-fc8ef.firebaseapp.com',
  projectId: 'testdatabase-fc8ef',
  storageBucket: 'testdatabase-fc8ef.appspot.com',
  messagingSenderId: '926552180775',
  appId: '1:926552180775:web:13b3d7a196b21edb306602',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const collectionRef = db.collection('Customer');

// LIFF initialization
liff
  .init({ liffId: '1661198134-jKzpyDgB' })
  .then(() => {
    // Enable the LIFF functionality you need
    initializeApp();
  })
  .catch((error) => {
    console.error('LIFF initialization failed', error);
  });

// Function to capture location using LIFF
function captureLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log('Location captured:', location);
      },

      (error) => {
        console.error('Error capturing location:', error);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Function to initialize the app
function initializeApp() {
  captureLocation();
  // Add your app initialization logic here
}

// Function to upload picture
async function uploadPicture(file) {
  // Implement your file upload logic here
  // You can use libraries like Axios or the Fetch API to handle the upload
  // Resolve with the uploaded picture's URL or unique identifier
}

// Function to submit data
async function submitData(event) {
  event.preventDefault(); // Prevent form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const description = document.getElementById('description').value;
  const pictureFile = document.getElementById('picture').files[0];
  const date = document.getElementById('date').value;

  try {
    captureLocation();
    const pictureUrl = await uploadPicture(pictureFile);
    const location = await liff.ready
      .then(() => liff.getGeolocation())
      .catch((error) => {
        console.error('Error capturing location:', error);
      });

    // Create a data object to send to Firebase
    const data = {
      name: name,
      email: email,
      phone: phone,
      description: description,
      pictureUrl: pictureUrl,
      location: JSON.stringify(location),
      date: date,
    };

    // Save the data to Firebase Firestore
    await collectionRef.add(data);

    console.log('Data submitted successfully');
    // Reset the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('description').value = '';
    document.getElementById('picture').value = '';
    document.getElementById('location').value = '';
    document.getElementById('date').value = '';
  } catch (error) {
    console.error('Error submitting data:', error);
    // Handle any errors that occur during the data submission
  }
}
