document.addEventListener('DOMContentLoaded', function () {
    const projectsGrid = document.querySelector('.projects-grid');

    loadProjects();

    function addProject(title, description, isNew = true) {
        const projectId = Date.now();
        const defaultTitle = title || `Project ${romanize(projectsGrid.children.length + 1)}`;
        const defaultDesc = description || 'Description of project';

        const projectItem = document.createElement('div');
        projectItem.className = 'projects-item';
        projectItem.dataset.id = projectId;

        const projectHTML = `
            <h3 contenteditable="true" class="editable-title">${defaultTitle}</h3>
            <p contenteditable="true" class="editable-desc">${defaultDesc}</p>
        `;

        projectItem.innerHTML = projectHTML;
        projectsGrid.appendChild(projectItem);

        projectItem.querySelector('.editable-title').addEventListener('input', saveProjects);
        projectItem.querySelector('.editable-desc').addEventListener('input', saveProjects);
    }

    function saveProjects() {
        const projects = [];
        document.querySelectorAll('.projects-item').forEach(item => {
            projects.push({
                id: item.dataset.id,
                title: item.querySelector('h3').textContent,
                description: item.querySelector('p').textContent
            });
        });
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    }

    function loadProjects() {
        const savedProjects = localStorage.getItem('portfolioProjects');

        if (savedProjects) {
            const projects = JSON.parse(savedProjects);
            projects.forEach(project => {
                addProject(project.title, project.description, false);
            });
        } else {
            loadDefaultProjects();
        }
    }

    function loadDefaultProjects() {
        const defaultProjects = [
            { title: 'Project I', description: 'Description of project 1.' },
            { title: 'Project II', description: 'Description of project 2.' },
            { title: 'Project III', description: 'Description of project 3.' },
            { title: 'Project IV', description: 'Description of project 4.' },
        ];

        defaultProjects.forEach(project => {
            addProject(project.title, project.description, false);
        });
    }
});