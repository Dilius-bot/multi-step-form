function render(
    standartCheckBoxId,
    premiumCheckBoxId,
    ratesSelector,
    activeSelector,
    ratesBoxSelector,
    totalBoxSelector
) {
    const standartCheckBox = document.getElementById(standartCheckBoxId);
    const premiumCheckBox = document.getElementById(premiumCheckBoxId);
    // 4 step
    function renderForOptions(
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

    function renderForRates(name, value, parentSelector, options) {
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

    function renderTotalOfRates(
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
                renderForRates(textOfParagraph, ratio, parentSelector, options);
            });
        });
    }

    renderTotalOfRates(
        ratesSelector,
        activeSelector,
        ratesBoxSelector,
        totalBoxSelector
    );

    function count() {
        let counter = 0;
        return function () {
            counter += 1;
            if (counter === 3) {
                counter = 1;
            }
            return counter;
        };
    }

    let counterForStandart = count();
    let counterForPremium = count();

    function renderTotalOfOptions(
        name,
        value,
        parentSelector,
        option,
        checkBoxSelector,
        counterFor
    ) {
        const render = document.querySelector('.' + checkBoxSelector);
        if (counterFor % 2 !== 0) {
            renderForOptions(
                name,
                value,
                parentSelector,
                option,
                checkBoxSelector
            );
        } else {
            render.remove();
        }
    }

    standartCheckBox.addEventListener('click', () => {
        let counterStandart = counterForStandart();
        renderTotalOfOptions(
            standartCheckBox.name,
            standartCheckBox.value,
            '.total__box',
            'options',
            'standart-check-box',
            counterStandart
        );
    });
    premiumCheckBox.addEventListener('click', () => {
        let counterPremium = counterForPremium();
        renderTotalOfOptions(
            premiumCheckBox.name,
            premiumCheckBox.value,
            '.total__box',
            'options',
            'premium-check-box',
            counterPremium
        );
    });
}

export default render;
