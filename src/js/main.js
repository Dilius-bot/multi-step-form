import '../sass/style.scss';

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.right-wrapper__forms-box');
    const activeStep = document.querySelectorAll('.steps__circle');
    const nextBtn = document.querySelector('.buttons__next');
    console.log(tabs[0]);

    let currentTab = 0;

    function showTabs(n) {
        tabs.forEach((element) => {
            element.classList.add('hide');
            element.classList.remove('show');
        });

        activeStep.forEach((element) => {
            element.classList.remove('active');
        });

        tabs[n].classList.add('show');
        tabs[n].classList.remove('hide');
        activeStep[n].classList.add('active');
    }

    showTabs(currentTab);
});
