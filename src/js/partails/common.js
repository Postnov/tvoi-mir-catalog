
document.addEventListener('DOMContentLoaded', () => {

    //style select with nativejs-select
    renderSelects({ selector: '.js-custom_select'});

    // PRICE RANGE
    let priceRanges = document.querySelectorAll('.js-price-range');

    priceRanges.forEach(el => {
        let downPriceInput = el.closest('.filter-price').querySelector('.js-price-down'),
            upPriceInput   = el.closest('.filter-price').querySelector('.js-price-up'),
            inputs         = [downPriceInput, upPriceInput];


        //get maxPrice for slider price
        const maxPrice = +upPriceInput.getAttribute('data-max');
        upPriceInput.value = maxPrice.toLocaleString() + ' p.';

        //Init price range slider
        noUiSlider.create(el, {
            range: {
                'min': 0,
                'max': maxPrice
            },
            behaviour: 'drag',
            connect  : true,
            start    : [0, maxPrice],
            step     : 1
        });

        //Update value after scroll pointer in slider
        el.noUiSlider.on('update', values => {
            let [downPrice, upPrice] = values;

            downPrice = Number(downPrice).toLocaleString() + ' р.';
            upPrice   = Number(upPrice).toLocaleString() + ' р.';

            downPriceInput.value = downPrice;
            upPriceInput.value   = upPrice;
        });

        //Change slider value after inputs change
        inputs.forEach(function (input, handle) {
            input.addEventListener('change', function () {
                let value = this.value;
                value = value.replace(/\s+/g, '');
                value = parseInt(value);

                el.noUiSlider.setHandle(handle, value);
            });
        });

    });



    // Handle click on blocks in filter
    let headerSec = document.querySelectorAll('.js-section-trigger');

    headerSec.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            //If click on 'Сбросить' - reset all values in section
            if (e.target && e.target.classList.contains('filter__reset')) {
                let sectoin = e.target.closest('.js-section'),
                    inputs = sectoin.querySelectorAll('input');

                inputs.forEach(el => {el.checked = false;});

                return; // return, prevent show/hide section
            }

            // if click on header - hide/show section
            let sec = item.closest('.js-section');
            sec.classList.toggle('is-opened');
        })
    });


    // Change view products in catalog page
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

    // show/hide mobile window filter
    let mobileFilterTrigger = document.querySelectorAll('.js-filter-mobile-toggle'),
        mobileFilterTarget  = document.querySelector('.js-filter-mobile-target');

    mobileFilterTrigger.forEach(el => {
        el.addEventListener('click', () => {
            mobileFilterTarget.classList.toggle('is-show');
            document.querySelector('body').classList.toggle('no-scroll');
        });
    });

    // on/off all colors
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('js-colors-toggle-all')) {
            let listColors = e.target.closest('.f-colors__list'),
                colors = listColors.querySelectorAll('.f-colors__item'),
                input = e.target.querySelector('input');

            colors.forEach(el => {
                let inputEl = el.querySelector('input');

                inputEl.checked = input.checked ? false : true;
            });
        };
    });


    // Reset fields in mobile version

    let resetMobileFilter = document.querySelector('.js-filter-mobile-reset');

    resetMobileFilter.addEventListener('click', (e) => {
        let filter = e.target.closest('.js-filter-mobile-target'),
            inputs = filter.querySelectorAll('input'),
            price = filter.querySelector('.filter-price'),
            priceRange = filter.querySelector('.js-price-range'),
            priceRangeInputs = price.querySelectorAll('input'),
            sections  = filter.querySelectorAll('.js-section');

        //hidden sections
        sections.forEach(el => {
            el.classList.remove('is-opened');
        })

        //disable inputs
        inputs.forEach(el => {
           el.checked = false;
        });

        //set default price
        priceRangeInputs.forEach(function (input, handle) {
            let maxPrice;

            if (handle)  maxPrice = input.getAttribute('data-max');

            let value = handle ? maxPrice : 0;

            priceRange.noUiSlider.setHandle(handle, value);
        });

    });

});
