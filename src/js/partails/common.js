
document.addEventListener('DOMContentLoaded', () => {

    //style select
    renderSelects({ selector: '.js-custom_select'});

    // PRICE RANGE
    let priceRange = document.getElementById('price-range');
    let downPriceInput = document.getElementById('price-down');
    let upPriceInput = document.getElementById('price-up');

    noUiSlider.create(priceRange, {
            range: {
                'min': 0,
                'max': 100000
            },
            behaviour: 'drag',
            connect: true,
            start: [0, 100000],
            step: 1
        }
    );


    priceRange.noUiSlider.on('update', values => {
        let [downPrice, upPrice] = values;

        downPrice = Number(downPrice).toLocaleString() + ' р.';
        upPrice = Number(upPrice).toLocaleString() + ' р.';

        downPriceInput.value = downPrice;
        upPriceInput.value = upPrice;
    })


    // Клики по блокам слева в фильтре
    let headerSec = document.querySelectorAll('.js-section-trigger');

    headerSec.forEach((item) => {
        item.addEventListener('click', (e) => {
            let sec = item.closest('.js-section');
            sec.classList.toggle('is-opened');
        })
    });


});
