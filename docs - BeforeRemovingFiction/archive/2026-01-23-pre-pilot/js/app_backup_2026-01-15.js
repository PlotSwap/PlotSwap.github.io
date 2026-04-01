document.addEventListener('DOMContentLoaded', () => {
    // === VIEW SWITCHING ===
    const btnPheromones = document.getElementById('btn-pheromones');
    const btnHairBae = document.getElementById('btn-hairbae');
    const viewPheromones = document.getElementById('view-pheromones');
    const viewHairBae = document.getElementById('view-hairbae');

    // Default Map Data (Updated for v2 Floorplan)
    const zoneData = {
        'waiting-main': {
            title: 'The Queue',
            desc: 'Six seats. Six stories. The waiting is the hardest part.',
            link: 'https://www.tixtree.com/e/plot-swap-theater-pheromones-8e4cd507a13f'
        },
        'waiting-corner': {
            title: 'The Corner',
            desc: 'A secluded spot for those who prefer to watch from the shadows.',
            link: 'https://www.tixtree.com/e/plot-swap-theater-pheromones-8e4cd507a13f'
        },
        'barber': {
            title: 'The Cut',
            desc: 'Four chairs. One destiny. Sharp blades and even sharper wits.',
            link: 'https://www.tixtree.com/e/plot-swap-theater-pheromones-8e4cd507a13f'
        },
        'wash': {
            title: 'The Rinse',
            desc: 'Wash away the old you. Prepare for the transformation.',
            link: 'https://www.tixtree.com/e/plot-swap-theater-pheromones-8e4cd507a13f'
        }
    };

    if (btnPheromones && btnHairBae) {
        btnPheromones.addEventListener('click', () => {
            switchView('pheromones');
        });
        btnHairBae.addEventListener('click', () => {
            switchView('hairbae');
        });
    }

    function switchView(viewName) {
        if (viewName === 'pheromones') {
            viewPheromones.style.display = 'block';
            viewHairBae.style.display = 'none';
            btnPheromones.classList.add('active-adventure');
            btnPheromones.classList.remove('btn-outline');
            btnHairBae.classList.remove('active-adventure');
            btnHairBae.classList.add('btn-outline');
        } else {
            viewPheromones.style.display = 'none';
            viewHairBae.style.display = 'block';
            btnHairBae.classList.add('active-adventure');
            btnHairBae.classList.remove('btn-outline');
            btnPheromones.classList.remove('active-adventure');
            btnPheromones.classList.add('btn-outline');
        }

        // Scroll to content for feedback
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // === FLOORPLAN ZONES (Side Panel) ===
    const zones = document.querySelectorAll('.zone');
    const detailsPanel = document.getElementById('detailsPanel');

    zones.forEach(zone => {
        zone.addEventListener('click', (e) => {
            const zType = zone.dataset.zone;
            if (zoneData[zType]) {
                const data = zoneData[zType];
                // Update Panel Content
                detailsPanel.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                    <a href="${data.link}" target="_blank" class="btn">Select Seats</a>
                `;
                // Highlight active zone? (Optional, maybe later)
            }
        });
    });

    // Remove old modal logic if present (cleaned up)


    // === VIP EMAIL LOGIC ===
    const vipBtn = document.getElementById('vipBtn');
    if (vipBtn) {
        vipBtn.addEventListener('click', sendVipEmail);
    }

    // === MOBILE MENU LOGIC ===
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
            });
        });
    }
});

function sendVipEmail() {
    const addr = 'russell@plotswap.org';
    const subj = encodeURIComponent('One VIP show, please!');
    const body = encodeURIComponent(
        `Hi Russell,

Are there any available Thursday's coming up?

Thanks!`
    );
    window.location.href = `mailto:${addr}?subject=${subj}&body=${body}`;
}
