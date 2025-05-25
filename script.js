let leads = [];
let idCounter = 1;

// Load from localStorage
window.onload = () => {
  const storedLeads = localStorage.getItem('leads');
  if (storedLeads) {
    leads = JSON.parse(storedLeads);
    idCounter = Math.max(...leads.map(l => l.id), 0) + 1;
    renderLeads();
  }
};

const leadForm = document.getElementById('leadForm');

leadForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const type = document.getElementById('type').value;

  if (!name) return;

  const newLead = {
    id: idCounter++,
    name,
    email,
    phone,
    type,
    stage: 'New'
  };

  leads.push(newLead);
  saveLeads();
  leadForm.reset();
  renderLeads();
});

function renderLeads() {
  const stages = ['New', 'Contacted', 'Showing', 'Offer', 'Closed'];
  stages.forEach(stage => {
    const stageDiv = document.querySelector(`#${stage} .stage-content`);
    stageDiv.innerHTML = '';

    leads.filter(l => l.stage === stage).forEach(lead => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = `lead-${lead.id}`;
      card.draggable = true;
      card.ondragstart = drag;

      card.innerHTML = `
        <strong>${lead.name}</strong><br>
        <small>${lead.type}</small><br>
        <small>${lead.email}</small><br>
        <small>${lead.phone}</small>
      `;

      stageDiv.appendChild(card);
    });
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const leadId = ev.dataTransfer.getData("text");
  const targetStage = ev.currentTarget.id;

  const leadIndex = leads.findIndex(l => `lead-${l.id}` === leadId);
  if (leadIndex !== -1) {
    leads[leadIndex].stage = targetStage;
    saveLeads();
    renderLeads();
  }
}

function saveLeads() {
  localStorage.setItem('leads', JSON.stringify(leads));
}
let leads = [];
let idCounter = 1;

// Load from localStorage on page load
window.onload = () => {
  const storedLeads = localStorage.getItem('leads');
  if (storedLeads) {
    leads = JSON.parse(storedLeads);
    idCounter = Math.max(...leads.map(l => l.id), 0) + 1;
    renderLeads();
  }
};

const leadForm = document.getElementById('leadForm');

leadForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const type = document.getElementById('type').value;

  if (!name) return;

  const newLead = {
    id: idCounter++,
    name,
    email,
    phone,
    type,
    stage: 'New'
  };

  leads.push(newLead);
  saveLeads();
  leadForm.reset();
  renderLeads();
});

function renderLeads() {
  const stages = ['New', 'Contacted', 'Showing', 'Offer', 'Closed'];
  stages.forEach(stage => {
    const stageDiv = document.querySelector(`#${stage} .stage-content`);
    stageDiv.innerHTML = '';

    leads.filter(l => l.stage === stage).forEach(lead => {
      const card = document.createElement('div');
      card.className = 'card';
      card.id = `lead-${lead.id}`;
      card.draggable = true;
      card.ondragstart = drag;

      card.innerHTML = `
        <button class="delete-btn" onclick="deleteLead(${lead.id})">×</button>
        <strong>${lead.name}</strong><br>
        <small>${lead.type}</small><br>
        <small>${lead.phone}</small>
      `;

      stageDiv.appendChild(card);
    });
  });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const leadId = ev.dataTransfer.getData("text");
  const targetStage = ev.currentTarget.id;

  const leadIndex = leads.findIndex(l => `lead-${l.id}` === leadId);
  if (leadIndex !== -1) {
    leads[leadIndex].stage = targetStage;
    saveLeads();
    renderLeads();
  }
}

function deleteLead(id) {
  leads = leads.filter(lead => lead.id !== id);
  saveLeads();
  renderLeads();
}

function saveLeads() {
  localStorage.setItem('leads', JSON.stringify(leads));
}
