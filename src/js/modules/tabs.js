function tabs(tabsSelector, activeSelector, nextBtnSelector, prevBtnSelector) {
    //    Tabs
    const tabs = document.querySelectorAll(tabsSelector);
    const activeStep = document.querySelectorAll(activeSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    let currentTab = 0;
    function showTabs(currentTab) {
        tabs[currentTab].classList.add('show');
        tabs[currentTab].classList.remove('hide');
        activeStep[currentTab].classList.add('active');

        if (currentTab === 0) {
            prevBtn.classList.add('hide');
            prevBtn.classList.remove('show');
        } else {
            prevBtn.classList.remove('hide');
            prevBtn.classList.add('show');
        }

        if (currentTab == tabs.length - 1) {
            nextBtn.innerHTML = 'Подтверить';
        } else {
            nextBtn.innerHTML = 'Далее';
        }
    }
    function hideTabs() {
        tabs.forEach((element) => {
            element.classList.add('hide');
            element.classList.remove('show');
        });

        activeStep.forEach((element) => {
            element.classList.remove('active');
        });
    }

    hideTabs();
    showTabs(currentTab);

    function nextTab(n) {
        hideTabs();
        currentTab += n;
        console.log(currentTab);
        if (currentTab >= tabs.length) {
            openModal();
            currentTab = 0;
            setTimeout(() => {
                closeModal();
                showTabs(currentTab);
            }, 2000);
        }
        showTabs(currentTab);
    }

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextTab(1);
        if (currentTab >= tabs.length) {
            document.getElementById('regForm').submit();
        }
    });
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextTab(-1);
    });

    const modal = document.querySelector('.modal');

    function closeModal() {
        modal.classList.add('close-modal');
    }

    closeModal();
    function openModal() {
        modal.classList.remove('close-modal');
    }
}

export default tabs;
