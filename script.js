// console.log("hello")

// const form= document.querySelector('form');
// const cards= document.querySelector('.cards');

// form.addEventListener('submit', function() {
//     event.preventDefault();
//     const card=document.createElement('div');
//     card.classList.add('card');
//     cards.innerHTML=`
//     <h3>${eventname.value}</h3>
//     <p>${eventdate.value}</p>
//     <p>${category.value}</p>
//     <p>${description.value}</p>
//     <button class="dltcard">X</button>
// `;
// });
// document.querySelector('#dlt').addEventListener('click', function() {
//     cards.innerHTML='';
// })

// document.querySelector('#smp').addEventListener('click', function() {
//     const card=document.createElement('div');
//     card.classList.add('card');
//     cards.innerHTML=`
//     <h3>${"random event"}</h3>
//     <p>${"17-2-2026"}</p>
//     <p>${"Workshop"}</p>
//     <p>${"This is a sample event description."}</p>
//     <button class="dltcard">X</button>`;
// })
// document.querySelectorAll('.dltcard').forEach(button => {
//     button.addEventListener('click', function(event) {
//         event.target.parentElement.remove();
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const eventsContainer = document.getElementById('eventsContainer');
    const clearEventsBtn = document.getElementById('clearEventsBtn');
    const addSampleBtn = document.getElementById('addSampleBtn');
    const lastKeyDisplay = document.getElementById('lastKey');

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('eventname').value;
        const date = document.getElementById('eventDate').value;
        const category = document.getElementById('eventCategory').value;
        const desc = document.getElementById('eventDesc').value;

        if (title && date) {
            createEventCard(title, date, category, desc);
            eventForm.reset();
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
            if(confirm('Are you sure you want to remove all events?')) {
                eventsContainer.innerHTML = '';
                checkEmptyState();
            }
        }
    });

    addSampleBtn.addEventListener('click', () => {
        createEventCard('Emifest', '2026-01-14', 'Social', 'lorem ipsum');
    });

    document.addEventListener('keydown', (e) => {
        lastKeyDisplay.textContent = e.key;
        
        if(e.key === 'Shift') {
            lastKeyDisplay.style.color = 'blue';
        } else {
            lastKeyDisplay.style.color = '#333';
        }
    });
});

