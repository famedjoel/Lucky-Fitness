function init() {
    document.querySelector('#settings').addEventListener('click', toggleSettings);
}
function toggleSettings() {
    const settingsContent = document.querySelector('#settings-content');
    settingsContent.style.display = (settingsContent.style.display === "block") ? "none" : "block";
}

init()

const settingsDropdown = document.querySelector('#settings-dropdown');
      
settingsDropdown.addEventListener('change', function() {
  const selectedOption = this.value;
  if (selectedOption !== "") {
    window.location.href = selectedOption;
  }
});