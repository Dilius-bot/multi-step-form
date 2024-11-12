import '../sass/style.scss';

window.addEventListener('DOMContentLoaded', () => {
    //    Tabs
    const tabs = document.querySelectorAll('.right-wrapper__forms-box');
    const activeStep = document.querySelectorAll('.steps__circle');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let currentTab = 3;

    function showTabs(currentTab, tabs, activeStep, nextBtn, prevBtn) {
        tabs.forEach((element) => {
            element.classList.add('hide');
            element.classList.remove('show');
        });

        activeStep.forEach((element) => {
            element.classList.remove('active');
        });

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

    // showTabs(currentTab, tabs, activeStep, nextBtn, prevBtn);

    const total = document.querySelector('.items__rates-price');
    const price = document.querySelector('.items__options-price');
    function get() {
        if (price) {
            return true;
        } else {
            return false;
        }
    }

    // 4 step
    function renderTotal(
        name,
        value,
        parentSelector,
        options,
        checkBoxSelector
    ) {
        const element = document.createElement('div');
        const parent = document.querySelector(parentSelector);
        element.classList.add('total-box-items');
        element.classList.add(checkBoxSelector);
        element.innerHTML = `
            <div class="total__items items">
                <div class="items__${options}">${name}</div>
                <div class="items__${options}-price">+${value}₽ в месяц</div>
            </div>
        `;
        parent.append(element);
    }

    function renderTotalStep2(name, value, parentSelector, options) {
        const element = document.createElement('div');
        const parent = document.querySelector(parentSelector);
        element.classList.add('total-box-items');
        element.innerHTML = `
            <div class="total__items items">
                <div class="items__${options}">${name}</div>
                <div class="items__${options}-price">+${value}₽ в месяц</div>
            </div>  
            <div class="hr-div">
                <div class="hr-div__line"></div>
            </div>
        `;
        parent.append(element);
    }

    function getStaticInformation(
        selector,
        active,
        textSelector,
        parentSelector
    ) {
        const elements = document.querySelectorAll(selector);
        const rates = document.querySelectorAll(textSelector);
        const options = 'rates';
        let ratio;
        let textOfParagraph;

        rates.forEach((rate) => {
            rate.classList.remove('show');
            rate.classList.add('hide');
        });

        elements.forEach((element) => {
            element.addEventListener('click', (e) => {
                if (e.currentTarget.getAttribute('data-ratio')) {
                    ratio = +e.currentTarget.getAttribute('data-ratio');
                    console.log(+e.currentTarget.getAttribute('data-ratio'));
                }
                elements.forEach((element) => element.classList.remove(active));
                if (ratio === 199) {
                    rates[0].classList.remove('hide');
                    rates[0].classList.add('show');
                    rates[1].classList.add('hide');
                    textOfParagraph = 'Стандарт';
                } else {
                    rates[1].classList.remove('hide');
                    rates[1].classList.add('show');
                    rates[0].classList.add('hide');
                    textOfParagraph = 'Премиум';
                }

                e.currentTarget.classList.add(active);
                const totalBoxItems =
                    document.querySelectorAll('.total-box-items');
                totalBoxItems.forEach((element) => element.remove());
                renderTotalStep2(
                    textOfParagraph,
                    ratio,
                    parentSelector,
                    options
                );
            });
        });
    }

    getStaticInformation(
        '.rates__items',
        'active',
        '.rates-box',
        '.total__box'
    );

    const standartCheckBox = document.getElementById('standart');
    const premiumCheckBox = document.getElementById('premium');

    standartCheckBox.addEventListener('click', () => {
        abrakadabra(
            standartCheckBox.name,
            standartCheckBox.value,
            '.total__box',
            'options',
            'standart-check-box'
        );
    });
    premiumCheckBox.addEventListener('click', () => {
        abrakadabra(
            premiumCheckBox.name,
            premiumCheckBox.value,
            '.total__box',
            'options',
            'premium-check-box'
        );
    });

    function count() {
        let counter = 0;
        return function () {
            return (counter += 1);
        };
    }

    let counter = count();
    function abrakadabra(
        name,
        value,
        parentSelector,
        option,
        checkBoxSelector
    ) {
        let b = counter();
        const gold = document.querySelector('.' + checkBoxSelector);
        if (b % 2 !== 0) {
            renderTotal(name, value, parentSelector, option, checkBoxSelector);
        } else {
            gold.remove();
        }
    }
});
