/* untuk menghandle form-contact */
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const target = e.target;
  const name = target.querySelector('#name').value;
  const from = target.querySelector('#email').value; // Tetap menggunakan 'from' sebagai id
  const subject = target.querySelector('#subject').value;
  const message = target.querySelector('#message').value;

  // Validasi alamat email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(from)) {
    alert('Invalid email address. Please enter a valid email.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/email', {
      method: 'POST',
      body: JSON.stringify({
        name,
        from,
        subject,
        message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      alert(data.message);
      contactForm.reset();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong with the request.');
  }
});
