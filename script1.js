// Navbar toggle
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth <= 768){
      menuIcon.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Form submit
const form = document.getElementById('addAlumniForm');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();

  const alumni = {
    name: document.getElementById('name').value,
    age: parseInt(document.getElementById('age').value),
    city: document.getElementById('city').value,
    branch: document.getElementById('branch').value,
    year: parseInt(document.getElementById('year').value),
    currentJob: document.getElementById('currentJob').value,
    company: document.getElementById('company').value,
    mobile: document.getElementById('mobile').value,
    email: document.getElementById('email').value,
    linkedin: document.getElementById('linkedin').value
  };

  try {
    const res = await fetch('https://ba-2-x511.onrender.com/alumni', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(alumni)
    });

    if(res.ok){
      alert('Alumni added successfully!');
      form.reset();
    } else {
      alert('Failed to add alumni.');
    }
  } catch(err){
    console.error('Error:', err);
    alert('Error adding alumni.');
  }
});