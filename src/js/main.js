import '../sass/style.scss';
import tabs from './modules/tabs';
import render from './modules/Render';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.right-wrapper__forms-box', '.steps__circle', '.next', '.prev');
    render(
        'standart',
        'premium',
        '.rates__items',
        'active',
        '.rates-box',
        '.total__box'
    );
});
