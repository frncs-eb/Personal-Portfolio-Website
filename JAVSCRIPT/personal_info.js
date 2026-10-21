document.addEventListener('DOMContentLoaded', function () {
    const aboutText = document.getElementById('aboutText');
    const profileImage = document.getElementById('profileImage');
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');

    loadSavedData();

    uploadBtn.addEventListener('click', function () {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                profileImage.src = event.target.result;
                saveData(); 
            }
            reader.readAsDataURL(file);
        }
    });

    let saveTimeout;
    aboutText.addEventListener('input', function () {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveData, 1500); 
    });

    function saveData() {
        const profileData = {
            text: aboutText.innerHTML,
            image: profileImage.src
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }

    function loadSavedData() {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
            const profileData = JSON.parse(savedData);
            aboutText.innerHTML = profileData.text;
            if (profileData.image) {
                profileImage.src = profileData.image;
            }
        }
    }
});