
document.addEventListener('DOMContentLoaded', () => {
    const Form = document.getElementById('eventForm');
    const eventsContainer = document.getElementById('eventsContainer');
    const clearEventsBtn = document.getElementById('clearEventsBtn');
    const addSampleBtn = document.getElementById('addSampleBtn');
    const lastKeyDisplay = document.getElementById('lastKey');

    Form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('eventname').value;
        const date = document.getElementById('eventDate').value;
        const category = document.getElementById('eventCategory').value;
        const desc = document.getElementById('eventDesc').value;

        if (title && date) {
            createEventCard(title, date, category, desc);
            Form.reset();
        }
    });

    function createEventCard(title, date, category, desc) {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const card = document.createElement('div');
        card.classList.add('event-item');

        const dateObj = new Date(date);
        const dateString = dateObj.toISOString().split('T')[0];

        card.innerHTML = `
            <button class="delete-btn" title="Delete">×</button>
            <h3>${title}</h3>
            <div class="event-date">📅 ${dateString}</div>
            <span class="event-tag tag-${category}">${category}</span>
            <p class="event-desc">${desc}</p>
        `;

        card.querySelector('.delete-btn').addEventListener('click', () => {
            card.remove();
            checkEmptyState();
        });

        eventsContainer.appendChild(card);
    }

    function checkEmptyState() {
        if (eventsContainer.children.length === 0) {
            eventsContainer.innerHTML = `<p class="empty-state">No events yet. Add your first event!</p>`;
        }
    }

    clearEventsBtn.addEventListener('click', () => {
        if (eventsContainer.children.length > 0 && !eventsContainer.querySelector('.empty-state')) {
                eventsContainer.innerHTML = '';
                checkEmptyState();
            
        }
    });

    addSampleBtn.addEventListener('click', () => {
        createEventCard('Random Event', '2026-01-14', 'Workshop', 'This is a sample event description.');
        createEventCard('Another Random Event', '2026-01-15', 'Conference', 'sample event description.');

    });

    document.addEventListener('keydown', (e) => {
        lastKeyDisplay.textContent = e.key;
        
    });
});

