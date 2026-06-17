const themeBtn = document.getElementById('theme-btn');
const themeDropDown = document.getElementById('theme-dropdown');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const htmlElement = document.documentElement;
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const allsections = document.querySelectorAll('section[id]')

themeBtn.addEventListener('click',(e)=>{
    e.stopPropagation();
    themeDropDown.classList.toggle('show');
});
document.addEventListener('click',()=>{
    themeDropDown.classList.remove('show');
});

function applyTheme(theme){
    if(theme === 'auto'){
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.setAttribute('data-theme', isSystemDark ? 'dark' : 'light');
    }else{
        htmlElement.setAttribute('data-theme',theme);
    }
}
dropdownItems.forEach(item => {
    item.addEventListener('click',function(){
        const selectedTheme = this.getAttribute('data-theme-value');
        localStorage.setItem('portfolio-theme',selectedTheme);
        document.querySelector('.dropdown-item.active-mode').classList.remove('active-mode');
        this.classList.add('active-mode');
        applyTheme(selectedTheme);
    });
});
const currentTheme = localStorage.getItem('portfolio-theme') || 'auto';
applyTheme(currentTheme);
document.querySelector('.dropdown-item.active-mode').classList.remove('active-mode');
document.querySelector(`[data-theme-value="${currentTheme}"]`).classList.add('active-mode');
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('portfolio-theme') === 'auto' || !localStorage.getItem('portfolio-theme')) {
        applyTheme('auto');
    }
});


hamburger.addEventListener('click',()=>{
    navMenu.classList.toggle('active');
})
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        document.querySelector('.nav-link.active').classList.remove('active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        this.classList.add('active');
    });
});


window.addEventListener('scroll',()=>{
    const scrollY = window.scrollY;

    if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 5) {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            activeLink.classList.remove('active');
        }
        const contactLink = document.querySelector('.nav-link[href="#contact"]');
        if (contactLink) {
            contactLink.classList.add('active');
        }
        return;
    }
    allsections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 80; 
        const sectionId = current.getAttribute('id');
        if(scrollY>sectionTop && scrollY<=sectionTop+sectionHeight){
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) {
                activeLink.classList.remove('active');
            }
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    })
})

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});