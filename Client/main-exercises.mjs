document.addEventListener('DOMContentLoaded', function () {
    const expandableBox = document.getElementById('myExpandableBox');
    
    expandableBox.addEventListener('click', function () {
        const hiddenContent = expandableBox.querySelector('.hidden-content');
        hiddenContent.style.display = (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') ? 'block' : 'none';
    });
});


