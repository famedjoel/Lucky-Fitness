document.querySelector('#updateButton').addEventListener('click', updateInformation);

function updateInformation() {
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;
  const mobileNumber = document.querySelector('#mobileNumber').value;
  const bmi = document.querySelector('#bmi').value;
  const height = document.querySelector('#height').value;
  const weight = document.querySelector('#weight').value;
  const gender = document.querySelector('#gender').value;

  // Update the UI with the new information
  document.querySelector('#displayFirstName').innerText = firstName;
  document.querySelector('#displayLastName').innerText = lastName;
  document.querySelector('#displayEmail').innerText = email;
  document.querySelector('#displayMobileNumber').innerText = mobileNumber;
  document.querySelector('#displayBMI').innerText = bmi;
  document.querySelector('#displayHeight').innerText = height;
  document.querySelector('#displayWeight').innerText = weight;
  document.querySelector('#displayGender').innerText = gender;
}
