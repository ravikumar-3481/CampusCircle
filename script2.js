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

let alumniData = [];
let selectedAlumniIndex = null;

const tableBody = document.querySelector("#alumniTable tbody");
const modal = document.getElementById("alumniModal");
const viewDetails = document.getElementById("viewDetails");
const editForm = document.getElementById("editForm");

async function fetchAlumni() {
  try {
    const res = await fetch("https://ba-2-x511.onrender.com/alumni");
    alumniData = await res.json();
    renderTable(alumniData);
  } catch(err) { console.error(err); }
}

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((a, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.name}</td>
      <td>${a.age}</td>
      <td>${a.city}</td>
      <td>${a.branch}</td>
      <td>${a.year}</td>
    `;
    tr.addEventListener("click", () => showDetails(index));
    tableBody.appendChild(tr);
  });
}

function showDetails(index) {
  selectedAlumniIndex = index;
  const a = alumniData[index];
  document.getElementById("modalName").innerText = a.name;
  document.getElementById("modalAge").innerText = a.age;
  document.getElementById("modalCity").innerText = a.city;
  document.getElementById("modalBranch").innerText = a.branch;
  document.getElementById("modalYear").innerText = a.year;
  document.getElementById("modalJob").innerText = a.currentJob || "N/A";
  document.getElementById("modalCompany").innerText = a.company || "N/A";
  document.getElementById("modalMobile").innerText = a.mobile || "N/A";
  document.getElementById("modalEmail").innerText = a.email || "N/A";
  document.getElementById("modalLinkedin").innerText = a.linkedin || "N/A";

  viewDetails.style.display = "block";
  editForm.style.display = "none";
  modal.style.display = "flex";
}

document.getElementById("closeModal").addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", (e) => { if(e.target === modal) modal.style.display = "none"; });

// Edit button
document.getElementById("editBtn").addEventListener("click", () => {
  if(selectedAlumniIndex === null) return;
  const a = alumniData[selectedAlumniIndex];

  document.getElementById("editName").value = a.name;
  document.getElementById("editAge").value = a.age;
  document.getElementById("editCity").value = a.city;
  document.getElementById("editBranch").value = a.branch;
  document.getElementById("editYear").value = a.year;
  document.getElementById("editJob").value = a.currentJob || "";
  document.getElementById("editCompany").value = a.company || "";
  document.getElementById("editMobile").value = a.mobile || "";
  document.getElementById("editEmail").value = a.email || "";
  document.getElementById("editLinkedin").value = a.linkedin || "";

  viewDetails.style.display = "none";
  editForm.style.display = "flex";
});

document.getElementById("cancelEditBtn").addEventListener("click", () => {
  editForm.style.display = "none";
  viewDetails.style.display = "block";
});

document.getElementById("saveEditBtn").addEventListener("click", () => {
  const a = alumniData[selectedAlumniIndex];
  const updatedData = {
    ...a,
    name: document.getElementById("editName").value,
    age: parseInt(document.getElementById("editAge").value),
    city: document.getElementById("editCity").value,
    branch: document.getElementById("editBranch").value,
    year: parseInt(document.getElementById("editYear").value),
    currentJob: document.getElementById("editJob").value,
    company: document.getElementById("editCompany").value,
    mobile: document.getElementById("editMobile").value,
    email: document.getElementById("editEmail").value,
    linkedin: document.getElementById("editLinkedin").value
  };

  fetch(`https://ba-2-x511.onrender.com/alumni/${a.id}`, {
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(updatedData)
  })
  .then(res => res.json())
  .then(result => {
    alert(result.message || "Alumni updated");
    fetchAlumni();
    modal.style.display="none";
  })
  .catch(err => console.error(err));
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  if(selectedAlumniIndex === null) return;
  const a = alumniData[selectedAlumniIndex];
  if(confirm(`Are you sure you want to delete ${a.name}?`)){
    fetch(`https://ba-2-x511.onrender.com/alumni/${a.id}`, { method:'DELETE' })
    .then(res => res.json())
    .then(result => { alert(result.message || "Alumni deleted"); fetchAlumni(); modal.style.display="none"; })
    .catch(err => console.error(err));
  }
});

// Filter & Sort
document.getElementById("filterInput").addEventListener("input", (e)=>{
  const query = e.target.value.toLowerCase();
  const filtered = alumniData.filter(a =>
    a.name.toLowerCase().includes(query) ||
    a.city.toLowerCase().includes(query) ||
    a.branch.toLowerCase().includes(query)
  );
  renderTable(filtered);
});

document.getElementById("sortSelect").addEventListener("change",(e)=>{
  let sorted = [...alumniData];
  const value = e.target.value;
  if(value==="name-asc") sorted.sort((a,b)=> a.name.localeCompare(b.name));
  if(value==="name-desc") sorted.sort((a,b)=> b.name.localeCompare(a.name));
  if(value==="year-asc") sorted.sort((a,b)=> a.year - b.year);
  if(value==="year-desc") sorted.sort((a,b)=> b.year - a.year);
  renderTable(sorted);
});

function resetFilter(){
  document.getElementById("filterInput").value="";
  document.getElementById("sortSelect").value="";
  renderTable(alumniData);
}

fetchAlumni();