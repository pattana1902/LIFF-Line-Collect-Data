import './style.css';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCVbV7T7_KIPg5SXdS8w6OEVAsFFHoq3_c',
  authDomain: 'liff-db.firebaseapp.com',
  databaseURL:
    'https://liff-db-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'liff-db',
  storageBucket: 'liff-db.appspot.com',
  messagingSenderId: '762947850725',
  appId: '1:762947850725:web:e46cb7da49ad802eb85f0c',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Handle form submission
document
  .getElementById('dataEntryForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the input values
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var tel = document.getElementById('telInput').value;
    var detail = document.getElementById('detailInput').value;
    var picture = document.getElementById('pictureInput').value; // Note: Currently, you can only get the file name, not the file itself
    var latitude = document.getElementById('latitudeInput').value;
    var longitude = document.getElementById('longitudeInput').value;

    // Save the data to Firebase
    database.ref('entries').push({
      name: name,
      email: email,
      tel: tel,
      detail: detail,
      picture: picture,
      latitude: latitude,
      longitude: longitude,
    });

    // Clear the form
    document.getElementById('dataEntryForm').reset();
  });

// Handle "Get Location" button click
document
  .getElementById('getLocationBtn')
  .addEventListener('click', function () {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          // Format the location as text
          var locationText =
            'Latitude: ' + latitude + ', Longitude: ' + longitude;

          // Display the location
          document.getElementById('locationDisplay').textContent = locationText;

          // Update the input fields with the location values
          document.getElementById('latitudeInput').value = latitude;
          document.getElementById('longitudeInput').value = longitude;
        },
        function (error) {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  });
