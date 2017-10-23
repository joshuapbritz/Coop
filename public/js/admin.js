// Add some JavaScript
document.querySelector('.sidebar-btn').addEventListener('click', function() {
    var $this = this;
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
    $this.classList.toggle('open');
})