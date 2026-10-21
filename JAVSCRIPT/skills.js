document.addEventListener('DOMContentLoaded', function() {
  const skillsGrid = document.querySelector('.skills-grid');
  const skillsKey = 'userSkillsData'; 
  const saveInterval = 1000; 

  function saveSkillsToLocalStorage() {
      const skillsData = [];

      skillsGrid.querySelectorAll('.skills-item').forEach(item => {
          const nameElement = item.querySelector('h3');
          const descriptionElement = item.querySelector('.skill-description');
          const name = nameElement ? nameElement.textContent : '';
          const description = descriptionElement ? descriptionElement.textContent : '';
          skillsData.push({ name: name, description: description });
      });

      localStorage.setItem(skillsKey, JSON.stringify(skillsData));
  }

  function loadSkillsFromLocalStorage() {
      const storedSkills = localStorage.getItem(skillsKey);
      if (storedSkills) {
          const skillsData = JSON.parse(storedSkills);
          skillsData.forEach(skill => {
              skillsGrid.appendChild(createEditableSkillItem(skill.name, skill.description));
          });
      } else {
          const initialSkills = [
              { name: 'Skill I', description: 'Description for Skill I.' },
              { name: 'Skill II', description: 'Details about Skill II.' },
              { name: 'Skill III', description: 'More info on Skill III.' },
              { name: 'Skill IV', description: 'Explanation of Skill IV.' },
          ];
          initialSkills.forEach(skill => {
              skillsGrid.appendChild(createEditableSkillItem(skill.name, skill.description));
          });
      }
  }
  function createEditableSkillItem(skillName = 'New Skill', description = '') {
      const skillItem = document.createElement('div');
      skillItem.classList.add('skills-item');

      const nameHeading = document.createElement('h3');
      nameHeading.textContent = skillName;
      nameHeading.contentEditable = true;
      skillItem.appendChild(nameHeading);

      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.classList.add('skill-description');
      descriptionParagraph.textContent = description || 'Enter skill description here...';
      descriptionParagraph.contentEditable = true;
      skillItem.appendChild(descriptionParagraph);

      return skillItem;
  }

  skillsGrid.addEventListener('input', function(event) {
      if (event.target.matches('.skills-item h3') || event.target.matches('.skills-item .skill-description')) {
          clearTimeout(this.saveTimer);
          this.saveTimer = setTimeout(saveSkillsToLocalStorage, 500); 
      }
  });
  loadSkillsFromLocalStorage();
});