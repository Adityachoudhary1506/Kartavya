// Dashboard V2 Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load User Data
    const name = localStorage.getItem('studentName') || 'Student';
    const branch = localStorage.getItem('studentBranch') || 'CS';
    const year = localStorage.getItem('studentYear') || '3';

    document.querySelectorAll('.user-name-display').forEach(el => el.textContent = name);

    // Update Header & Welcome Banner
    const yearSuffix = (year === '1') ? 'st' : (year === '2') ? 'nd' : (year === '3') ? 'rd' : 'th';
    const displayString = `${year}${yearSuffix} Year • ${branch}`;
    const fullString = `${year}${yearSuffix} Year, ${branch}`;

    const headerRole = document.getElementById('header-role-text');
    if (headerRole) headerRole.textContent = displayString;

    const welcomeRole = document.getElementById('welcome-role-text');
    if (welcomeRole) welcomeRole.textContent = fullString;

    // Update Profile Section
    const pName = document.getElementById('profile-name-input');
    const pYear = document.getElementById('profile-year-input');
    const pEmail = document.getElementById('profile-email-input');
    const pBranch = document.getElementById('profile-branch-input');
    const studentEmail = localStorage.getItem('studentEmail') || 'student@pathlynx.edu';

    if (pName) pName.value = name;
    if (pYear) pYear.value = displayString;
    if (pEmail) pEmail.value = studentEmail;
    if (pBranch) pBranch.value = branch;

    // 2. Navigation Logic
    const navLinks = document.querySelectorAll('.nav-item-v2');
    const sections = document.querySelectorAll('.dash-section');

    function switchSection(targetId) {
        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update Nav State
        navLinks.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Mobile: Close sidebar after click
        if (window.innerWidth <= 900) {
            document.getElementById('sidebar').classList.remove('show');
        }
    }

    // Attach Click Events to Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            switchSection(targetId);
        });
    });

    // Expose toggleSidebar to global scope for the button
    window.toggleSidebar = function () {
        document.getElementById('sidebar').classList.toggle('show');
    };

    window.switchSection = switchSection; // For internal links like "View All"

    window.logout = function () {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'index.html';
        }
    };
});

