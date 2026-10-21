//ACHIEVEMENTS TAB
document.addEventListener('DOMContentLoaded', function () {
    const achievementsGrid = document.querySelector('.achievements-grid');

    loadachievements();

function addproject(title, description, isNew = true) {
    const projectId = Date.now(); 
    const defaultTitle = title || `Project ${romanize(achievementsGrid.children.length + 1)}`;
    const defaultDesc = description || 'Description of project';

    const projectItem = document.createElement('div');
    projectItem.className = 'achievements-item';
    projectItem.dataset.id = projectId;

    const projectHTML = `
        <h3 contenteditable="true" class="editable-title">${defaultTitle}</h3>
        <p contenteditable="true" class="editable-desc">${defaultDesc}</p>
    `;

    projectItem.innerHTML = projectHTML;
    achievementsGrid.appendChild(projectItem);

    projectItem.querySelector('.editable-title').addEventListener('input', saveachievements);
    projectItem.querySelector('.editable-desc').addEventListener('input', saveachievements);
    }

    function setupprojectEvents(projectItem) {
        const editBtn = projectItem.querySelector('.edit-btn');
        const editForm = projectItem.querySelector('.edit-form');
        const saveBtn = projectItem.querySelector('.save-btn');
        const cancelBtn = projectItem.querySelector('.cancel-btn');
        const titleElement = projectItem.querySelector('h3');
        const descElement = projectItem.querySelector('p');

        editBtn.addEventListener('click', function () {
            editForm.style.display = 'block';
            titleElement.style.display = 'none';
            descElement.style.display = 'none';
            editBtn.style.display = 'none';
        });

        saveBtn.addEventListener('click', function () {
            const newTitle = projectItem.querySelector('.edit-title').value;
            const newDesc = projectItem.querySelector('.edit-desc').value;

            titleElement.textContent = newTitle;
            descElement.textContent = newDesc;

            editForm.style.display = 'none';
            titleElement.style.display = 'block';
            descElement.style.display = 'block';
            editBtn.style.display = 'block';

            saveachievements();
        });

        cancelBtn.addEventListener('click', function () {
            editForm.style.display = 'none';
            titleElement.style.display = 'block';
            descElement.style.display = 'block';
            editBtn.style.display = 'block';
        });
    }

    function saveachievements() {
        const achievements = [];

        document.querySelectorAll('.achievements-item').forEach(item => {
            achievements.push({
                id: item.dataset.id,
                title: item.querySelector('h3').textContent,
                description: item.querySelector('p').textContent
            });
        });

        localStorage.setItem('portfolioachievements', JSON.stringify(achievements));
    }

    function loadachievements() {
        const savedachievements = localStorage.getItem('portfolioachievements');

        if (savedachievements) {
            const achievements = JSON.parse(savedachievements);

            achievements.forEach(project => {
                addproject(project.title, project.description, false);
            });
        } else {
            const defaultachievements = [
                { title: 'Achievement I', description: 'Description of achievement 1.' },
                { title: 'Achievement II', description: 'Description of achievement 2.' },
                { title: 'Achievement III', description: 'Description of achievement 3.' },
                { title: 'Achievement IV', description: 'Description of achievement 4.' },
            ];

            defaultachievements.forEach(project => {
                addproject(project.title, project.description, false);
            });
        }
    }
});
