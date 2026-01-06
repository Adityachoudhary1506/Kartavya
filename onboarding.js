document.addEventListener('DOMContentLoaded', () => { 
    const totalSteps = 5;
    let currentStep = 1;

    const form = document.getElementById('onboarding-form');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressBar = document.getElementById('progress-bar');
    const stepNumDisplay = document.getElementById('current-step-num');

    // File inputs
    const photoInput = document.getElementById('profile-photo');
    const avatarPreview = document.getElementById('avatar-preview');
    const resumeInput = document.getElementById('resume-upload');
    const resumeName = document.getElementById('resume-name');

    // Initialize View
    updateUI();

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateUI();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    });

    // Profile Photo Preview
    photoInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarPreview.style.backgroundImage = `url('${e.target.result}')`;
                avatarPreview.style.backgroundSize = 'cover';
                avatarPreview.innerHTML = ''; // Remove icon
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Resume Name Display
    resumeInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            resumeName.textContent = this.files[0].name;
        }
    });

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate Password Match
        const p1 = document.getElementById('create-password').value;
        const p2 = document.getElementById('confirm-password').value;
        if (p1 !== p2) {
            alert('Passwords do not match!');
            return;
        }

        // Save Credentials & Profile for dashboard
        const name = document.getElementById('full-name').value;
        const email = document.getElementById('create-email').value;
        const pass = document.getElementById('create-password').value;
        const branch = document.getElementById('branch').options[document.getElementById('branch').selectedIndex].text;
        const year = document.getElementById('year').value;

        localStorage.setItem('studentName', name);
        localStorage.setItem('studentEmail', email);
        localStorage.setItem('studentPassword', pass); // In real app, never store plain text
        localStorage.setItem('studentBranch', branch);
        localStorage.setItem('studentYear', year);

        alert('Account Created Successfully!');
        window.location.href = 'dashboard.html';
    });

    function updateUI() {
        // Update Step visibility
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        // Update Progress Bar
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        stepNumDisplay.textContent = currentStep;

        // Button Visibility
        if (currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }

        // Specific Logic for Steps
        if (currentStep === 4) {
            populateReview();
            nextBtn.textContent = 'Next: Create Account';
        } else {
            nextBtn.textContent = 'Next Step';
        }

        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    function validateStep(step) {
        // Simple validation checks for required fields in current step
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredInputs = currentStepEl.querySelectorAll('input[required], select[required]');

        let isValid = true;
        requiredInputs.forEach(input => {
            let isFieldValid = true;

            if (input.type === 'checkbox') {
                if (!input.checked) isFieldValid = false;
            } else {
                if (!input.value.trim()) isFieldValid = false;
            }

            if (!isFieldValid) {
                isValid = false;
                // Highlight error
                if (input.type !== 'checkbox') {
                    input.style.borderColor = '#ea4335';
                    input.addEventListener('input', () => {
                        input.style.borderColor = '#ddd';
                    }, { once: true });
                } else {
                    // Start of checkbox specific error handling
                    input.parentElement.style.color = '#ea4335';
                    input.addEventListener('change', () => {
                        input.parentElement.style.color = '';
                    }, { once: true });
                }
            }
        });

        if (!isValid) {
            // Optional: Show toast or error message
            // alert('Please fill in all required fields.'); 
        }
        return isValid;
    }

    function populateReview() {
        document.getElementById('review-name').textContent = document.getElementById('full-name').value || 'Not provided';
        document.getElementById('review-college').textContent = document.getElementById('college-name').value || 'Not provided';
        document.getElementById('review-skills').textContent = document.getElementById('skills').value || 'Not provided';
        // Add projects to review if desired, or simpler just keep high level. 
        // Let's add it for completeness since requested.
        const projects = document.getElementById('projects').value;
        if (projects) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>Projects:</strong> ${projects}`;
            document.querySelector('.review-box').appendChild(p);
        }
    }
});

