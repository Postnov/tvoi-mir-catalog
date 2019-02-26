
document.addEventListener('DOMContentLoaded', () => {

    //style select
    renderSelects({ selector: '.js-custom_select'});

    // PRICE RANGE
    let priceRange     = document.getElementById('price-range');
    let downPriceInput = document.getElementById('price-down');
    let upPriceInput   = document.getElementById('price-up');

    noUiSlider.create(priceRange, {
            range: {
                'min': 0,
                'max': 100000
            },
            behaviour: 'drag',
            connect  : true,
            start    : [0, 100000],
            step     : 1
        }
    );


    priceRange.noUiSlider.on('update', values => {
        let [downPrice, upPrice] = values;

        downPrice = Number(downPrice).toLocaleString() + ' р.';
        upPrice   = Number(upPrice).toLocaleString() + ' р.';

        downPriceInput.value = downPrice;
        upPriceInput.value   = upPrice;
    })


    // Клики по блокам слева в фильтре
    let headerSec = document.querySelectorAll('.js-section-trigger');

    headerSec.forEach((item) => {
        item.addEventListener('click', (e) => {
            let sec = item.closest('.js-section');
            sec.classList.toggle('is-opened');
        })
    });


    // Смена вида в каталоге
    let viewsButtons = document.querySelectorAll('.js-view-change');

    viewsButtons.forEach(el => {
        el.addEventListener('click', function() {
            let view          = this.getAttribute('data-view'),
                currentView   = document.querySelector('.js-view-change.is-active'),
                target        = document.querySelector('.js-products-tab[data-view="'+view+'"]'),
                currentActive = document.querySelector('.js-products-tab.is-show');

            currentActive.classList.remove('is-show');
            currentView.classList.remove('is-active');

            target.classList.add('is-show');
            this.classList.add('is-active');
        })
    });



    // Показ/Скрытие мобильного окна фильтрации
    let mobileFilterTrigger = document.querySelectorAll('.js-filter-mobile-toggle'),
        mobileFilterTarget  = document.querySelector('.js-filter-mobile-target');


    mobileFilterTrigger.forEach(el => {
        el.addEventListener('click', () => {
            mobileFilterTarget.classList.toggle('is-show');
            document.querySelector('body').classList.toggle('no-scroll');
        })
    })

});
