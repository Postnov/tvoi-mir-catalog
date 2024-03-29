// API: https://github.com/FrontendMetis/nativejs-select
function renderSelects({selector}) {
  const prefix = '_select';
  const selects = document.querySelectorAll(selector);
  let indexSelectedItem = 0;

  for (let i = 0; i < selects.length; i++) {
    let isCustom = selects[i].nextElementSibling;
    if (!isCustom) {
      const options = selects[i].querySelectorAll('option');
      options[0].selected = true;

      selects[i].classList.add('hide_select');
      let selectClassByName = selects[i].getAttribute('name');
      let takePlaceholder = selects[i].getAttribute('data-placeholder');
      let placeholder = '';
      if (takePlaceholder) placeholder = takePlaceholder;
      selects[i].insertAdjacentHTML('afterend', '\n <div class="select_common ' + selectClassByName + prefix + '">\n <div class="placeholder_select">' + placeholder + '</div>\n <ul class="select_items"></ul>\n </div>');
      let checkTextPlaceholder = selects[i].nextElementSibling.querySelector('.placeholder_select');
      if (!checkTextPlaceholder.textContent) {
        for (let o = 0; o < selects[i].children.length; o++) {
          if (selects[i].children[o].selected) {
            checkTextPlaceholder.insertAdjacentHTML('afterbegin', selects[i].children[o].textContent)
          }
        }
      }
      let fixedPlaholder = selects[i].getAttribute('data-fixed-placeholder');
      if (fixedPlaholder) {
        selects[i].nextElementSibling.querySelector('.placeholder_select').insertAdjacentHTML('afterbegin', '\n <span class="fixed_placeholder">' + fixedPlaholder + '</span>')
      }
      let selectOptions = selects[i].querySelectorAll('option');
      let checkOptionText = selects[i].nextElementSibling.querySelector('.select_items');
      if (!checkOptionText.textContent) {
        for (let j = 0; j < selectOptions.length; j++) {
          checkOptionText.insertAdjacentHTML('beforeend', '\n  <li>' + selectOptions[j].textContent + '</li>')
        }
      }
    }
  }
  document.addEventListener('click', function () {
    for (let i = 0; i < selects.length; i++) {
      let getSelectName = selects[i].getAttribute('name');
      let customSelect = document.querySelectorAll('.' + getSelectName + prefix);
      for (let j = 0; j < customSelect.length; j++) {
        customSelect[j].classList.remove('select_active')
      }
    }
  });

  function loop(i) {
    if (!selects[i].nextElementSibling.getAttribute('data-event')) {
      selects[i].nextElementSibling.setAttribute('data-event', true);
      selects[i].nextElementSibling.querySelector('.placeholder_select').addEventListener('click', function (e) {
        let takeCurrentEl = e.currentTarget.parentNode;
        for (let o = 0; o < selects.length; o++) {
          if (takeCurrentEl !== selects[o].nextElementSibling) {
            selects[o].nextElementSibling.classList.remove('select_active')
          }
        }
        e.currentTarget.parentNode.classList.toggle('select_active')
      });
      selects[i].nextElementSibling.addEventListener('click', function (e) {
        e.stopPropagation()
      });
      let addEventToLi = selects[i].nextElementSibling.querySelector('.select_items');
      let itemsLi = addEventToLi.querySelectorAll('li');

      function loopInner(l) {
        itemsLi[0].classList.add('active');

        itemsLi[l].addEventListener('click', function (e) {
          itemsLi.forEach(item => {
            item.classList.remove('active');
          });
          this.classList.add('active');
          let optionVal = e.currentTarget.textContent;
          let takePlaceholder = selects[i].getAttribute('data-fixed-placeholder');
          if (takePlaceholder) {
            selects[i].nextElementSibling.querySelector('.placeholder_select').childNodes[2].textContent = optionVal
          } else {
            selects[i].nextElementSibling.querySelector('.placeholder_select').textContent = optionVal
          }
          selects[i].nextElementSibling.classList.remove('select_active');
          let optionsNative = selects[i].querySelectorAll('option');
          for (let j = 0; j < optionsNative.length; j++) {
            optionsNative[j].removeAttribute('selected')
          }
          optionsNative[l].setAttribute('selected', 'selected')
        })
      }
      for (let l = 0; l < itemsLi.length; l++) {
        loopInner(l)
      }
    }
  }
  for (let i = 0; i < selects.length; i++) {
    loop(i)
  }
}