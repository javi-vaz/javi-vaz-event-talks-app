document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const searchBar = document.getElementById('search-bar');
  let talks = [];

  // Fetch talks data from the API
  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  // Render the schedule
  function renderSchedule(filteredTalks) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0);

    filteredTalks.forEach((talk, index) => {
      // Add talk to schedule
      const talkElement = createTalkElement(talk, currentTime);
      scheduleContainer.appendChild(talkElement);
      currentTime.setMinutes(currentTime.getMinutes() + talk.duration);

      // Add break after talk, except for the last one
      if (index < filteredTalks.length - 1) {
        if (index === 2) { // Lunch break after the 3rd talk
          const breakElement = createBreakElement('Lunch Break', currentTime, 60);
          scheduleContainer.appendChild(breakElement);
          currentTime.setMinutes(currentTime.getMinutes() + 60);
        } else {
          const breakElement = createBreakElement('Break', currentTime, 10);
          scheduleContainer.appendChild(breakElement);
          currentTime.setMinutes(currentTime.getMinutes() + 10);
        }
      }
    });
  }

  // Create a talk element
  function createTalkElement(talk, time) {
    const item = document.createElement('div');
    item.classList.add('schedule-item');
    item.innerHTML = `
      <div class="time-slot">${formatTime(time)}</div>
      <div class="talk-details">
        <div class="talk-title">${talk.title}</div>
        <div class="speakers">By: ${talk.speakers.join(', ')}</div>
        <div>${talk.category.map(c => `<span class="category">${c}</span>`).join('')}</div>
        <p class="description">${talk.description}</p>
      </div>
    `;
    return item;
  }

  // Create a break element
  function createBreakElement(title, time, duration) {
    const item = document.createElement('div');
    item.classList.add('schedule-item', 'break');
    item.innerHTML = `
      <div class="time-slot">${formatTime(time)}</div>
      <div class="talk-details">${title} (${duration} minutes)</div>
    `;
    return item;
  }

  // Format time as HH:MM AM/PM
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Filter talks based on search input
  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.title.toLowerCase().includes(searchTerm) ||
      talk.speakers.some(speaker => speaker.toLowerCase().includes(searchTerm)) ||
      talk.category.some(category => category.toLowerCase().includes(searchTerm))
    );
    renderSchedule(filteredTalks);
  });
});
