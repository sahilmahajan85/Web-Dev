
  document.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.querySelector('.toggle-theme');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-theme');
      });
    }
  });