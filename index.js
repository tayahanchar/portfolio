'use strict';
import i18Obj from './translate.js';

// Constants
const config = {
  languages: {
    en: 'en',
    ru: 'ru',
  },
  themes: {
    light: 'light',
    dark: 'dark',
  },
  localStorageKeys: {
    lang: 'lang',
    theme: 'theme',
  },
  portfolioButtons: {
    winter: 'winter',
    spring: 'spring',
    summer: 'summer',
    autumn: 'autumn',
  }
};
const DEFAULT_LANGUAGE = config.languages.en;
const DEFAULT_THEME = config.themes.dark;
const DEFAULT_PORTFOLIO_BUTTON = config.portfolioButtons.autumn;

// Initial values;
let currentLanguage = DEFAULT_LANGUAGE;
let currentTheme = DEFAULT_THEME;
let currentActivePortfolioButton = DEFAULT_PORTFOLIO_BUTTON;

// Selectrors
const menuBurger = document.querySelector('.burger');
const burgerList = document.querySelector('#burger__list');
const lineOne = document.querySelector('#line1');
const lineTwo = document.querySelector('#line2');
const lineThree = document.querySelector('#line3');
const portfolioBtn = document.querySelectorAll('.portfolio__btn');
const portfolioDefaultActiveButton = document.querySelector('.btn-open');
const portfolioImg = document.querySelectorAll('.portfolio__img');
const portfolioBtns = document.querySelector('.portfolio__btns');
const ruLanguage = document.querySelector('.language-ru');
const enLanguage = document.querySelector('.language-en');
const buttonSvg = document.querySelector('.button__svg');
const darkThemeIcon = document.querySelector('.sun');
const lightThemeIcon = document.querySelector('.moon');
const wrapper = document.querySelector('.wrapper');
const hero = document.querySelector('.hero-container');
const header = document.querySelector('.header-container');
const logo = document.querySelector('.logo');
const inst = document.querySelector('.inst');
const fb = document.querySelector('.fb');
const tw = document.querySelector('.tw');
const pinterest = document.querySelector('.pinterest');
const goldButtons = document.querySelectorAll('.btn-gold');
const title = document.querySelectorAll('.section-title');
const videoButton = document.querySelector('.hover');
const contacts = document.querySelector('.contacts');
const contactsTitle = document.querySelector('.contacts__title');
const input = document.querySelectorAll('.input');
const textarea = document.querySelector('.textarea');
const priceButton = document.querySelectorAll('.btn-price');

// Event listeners
window.addEventListener('load', () => setAppDefaults());
menuBurger.addEventListener('click', getMenu);
menuBurger.addEventListener('mouseover', getColor);
menuBurger.addEventListener('mouseleave', returnColor);
burgerList.addEventListener('click', closeMenu);
portfolioBtns.addEventListener('click', onPortfolioBtnButtonClick);
ruLanguage.addEventListener('click', () => changeLanguage(config.languages.ru));
enLanguage.addEventListener('click', () => changeLanguage(config.languages.en));
buttonSvg.addEventListener('click', () => changeTheme());

function setAppDefaults() {
  const defaultLanguage = getStorageItem(config.localStorageKeys.lang);
  const defaultTheme = getStorageItem(config.localStorageKeys.theme);

  currentLanguage = defaultLanguage || DEFAULT_LANGUAGE;
  currentTheme = defaultTheme || DEFAULT_THEME;

  changeLanguage(currentLanguage, true);
  changeTheme(true);
}

function getStorageItem(key) {
  return localStorage.getItem(key);
}

function setStorageItem(key, value) {
  localStorage.setItem(key, value);
}

function getMenu() {
  burgerList.classList.toggle('open');
  lineOne.classList.toggle('line1');
  lineTwo.classList.toggle('line2');
  lineThree.classList.toggle('line3');
}

function getColor() {
  lineOne.classList.remove('white');
  lineTwo.classList.remove('white');
  lineThree.classList.remove('white');
  lineOne.classList.add('gold');
  lineTwo.classList.add('gold');
  lineThree.classList.add('gold');
}

function returnColor() {
  if(wrapper.classList.contains('light-theme')) {
    lineOne.classList.remove('gold');
    lineTwo.classList.remove('gold');
    lineThree.classList.remove('gold');
    lineOne.classList.add('black');
    lineTwo.classList.add('black');
    lineThree.classList.add('black');
  } else {
    lineOne.classList.remove('gold');
    lineTwo.classList.remove('gold');
    lineThree.classList.remove('gold');
    lineOne.classList.add('white');
    lineTwo.classList.add('white');
    lineThree.classList.add('white');
  }
}

function closeMenu(event) {
  if (event.target.classList.contains('burger__item')) {
    burgerList.classList.remove('open');
    lineOne.classList.toggle('line1');
    lineTwo.classList.toggle('line2');
    lineThree.classList.toggle('line3');
  }
}

function onPortfolioBtnButtonClick(event) {
  changeImg(event);
  changePortfolioActiveButtonStyles(event);
}

function changeImg(event) {
  if(event.target.classList.contains('portfolio__btn')) {
    portfolioImg.forEach((item, index) => item.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

function changePortfolioActiveButtonStyles(event) {
  if(event.target.classList.contains('portfolio__btn')) {
    currentActivePortfolioButton = event.target.getAttribute('data-season');

    portfolioBtn.forEach((item) => item.classList.remove('btn-open'));
    portfolioBtn.forEach((item) => item.classList.remove('btn-open-light'));
    if(wrapper.classList.contains('light-theme')) {
      event.target.classList.add('btn-open-light');
    } else {
      event.target.classList.add('btn-open');
    }
  }
}

function setPortfolioActiveButtonInitialStyle() {
  if (currentTheme === config.themes.dark) {
    portfolioDefaultActiveButton.classList.add('btn-open');
  } else {
    portfolioDefaultActiveButton.classList.add('btn-open-light');
  }
}

function updatePortfolioActiveButtonInitialStyle() {
  portfolioBtn.forEach((item) => {
    const buttonSeason = item.getAttribute('data-season');

    if (buttonSeason === currentActivePortfolioButton) {
      if (currentTheme === config.themes.dark) {
        item.classList.add('btn-open');
        item.classList.remove('btn-open-light');
      } else {
        item.classList.add('btn-open-light');
      }
    }
  });
}

function changeLanguage(lang = currentLanguage, initial = false) {
  if (lang === currentLanguage && !initial) {
    return;
  }

  currentLanguage = lang;
  setStorageItem(config.localStorageKeys.lang, lang);

  updateLanguageButtonStyles();

  const elements = document.querySelectorAll('[data-i18]');
  elements.forEach((item) => {
    const dataLanguageAttributeValue = item.getAttribute('data-i18');

    if (item.hasAttribute('placeholder')) {
      item.placeholder = i18Obj[lang][dataLanguageAttributeValue];
    } else {
      item.textContent = i18Obj[lang][dataLanguageAttributeValue];
    }
  });

}

function updateLanguageButtonStyles() {
  if (currentLanguage === config.languages.en) {
    if (currentTheme === config.themes.dark) {
      ruLanguage.classList.remove('lang-gold');
      enLanguage.classList.remove('lang-white');
      enLanguage.classList.add('lang-gold');
    } else {
      ruLanguage.classList.remove('lang-white');
      enLanguage.classList.remove('lang-gold');
      enLanguage.classList.add('lang-white');
    }
  } else {
    if (currentTheme === config.themes.dark) {
      ruLanguage.classList.add('lang-gold');
      ruLanguage.classList.remove('lang-white');
      enLanguage.classList.remove('lang-gold');
    } else {
      ruLanguage.classList.add('lang-white');
      ruLanguage.classList.remove('lang-gold');
      enLanguage.classList.remove('lang-white');
    }
  }
}

function changeTheme(isInitial = false) {
  if (!isInitial) {
    currentTheme = currentTheme === config.themes.dark ? config.themes.light : config.themes.dark;
    setStorageItem(config.localStorageKeys.theme, currentTheme);
  }

  updateLanguageButtonStyles();

  if (isInitial) {
    setPortfolioActiveButtonInitialStyle();
  } else {
    updatePortfolioActiveButtonInitialStyle();
  }

  if (currentTheme === config.themes.dark) {
    darkThemeIcon.classList.remove('theme__display-none');
    lightThemeIcon.classList.add('theme__display-none');
  } else {
    darkThemeIcon.classList.add('theme__display-none');
    lightThemeIcon.classList.remove('theme__display-none');
  }

  if (currentTheme === config.themes.light) {
    addLightTheme();
  } else {
    removeLightTheme();
  }

}

function addLightTheme() {
  wrapper.classList.add('light-theme');
  hero.classList.add('hero__light');
  header.classList.add('header-light');
  logo.classList.add('logo-light');
  inst.classList.add('logo-light');
  fb.classList.add('logo-light');
  tw.classList.add('logo-light');
  pinterest.classList.add('logo-light');
  videoButton.classList.add('logo-light');
  goldButtons.forEach((item) => item.classList.add('btn-light'));
  title.forEach((item) => item.classList.add('section-title-light'));
  contacts.classList.add('contacts-light');
  contactsTitle.classList.add('contacts__title-light');
  input.forEach((item) => item.classList.add('input-light'));
  textarea.classList.add('input-light');
  portfolioBtn.forEach((item) => item.classList.add('portfolio__btn-light'));
  priceButton.forEach((item) => item.classList.add('price__btn-light'));
  burgerList.classList.add('burger__list-light');
  lineOne.classList.remove('white');
  lineTwo.classList.remove('white');
  lineThree.classList.remove('white');
  lineOne.classList.add('black');
  lineTwo.classList.add('black');
  lineThree.classList.add('black');
}

function removeLightTheme() {
  wrapper.classList.remove('light-theme');
  hero.classList.remove('hero__light');
  header.classList.remove('header-light');
  logo.classList.remove('logo-light');
  inst.classList.remove('logo-light');
  fb.classList.remove('logo-light');
  tw.classList.remove('logo-light');
  pinterest.classList.remove('logo-light');
  videoButton.classList.remove('logo-light');
  goldButtons.forEach((item) => item.classList.remove('btn-light'));
  title.forEach((item) => item.classList.remove('section-title-light'));
  contacts.classList.remove('contacts-light');
  contactsTitle.classList.remove('contacts__title-light');
  input.forEach((item) => item.classList.remove('input-light'));
  textarea.classList.remove('input-light');
  portfolioBtn.forEach((item) => item.classList.remove('portfolio__btn-light'));
  priceButton.forEach((item) => item.classList.remove('price__btn-light'));
  burgerList.classList.toggle('burger__list-light');
  lineOne.classList.add('white');
  lineTwo.classList.add('white');
  lineThree.classList.add('white');
  lineOne.classList.remove('black');
  lineTwo.classList.remove('black');
  lineThree.classList.remove('black');
}


const btn1Click = document.querySelector('.btn1');
const btn2Click = document.querySelector('.btn2');
const btn3Click = document.querySelector('.btn3');
const btn4Click = document.querySelector('.btn4');
const btn5Click = document.querySelector('.btn5');
btn1Click.addEventListener('click', onClickBtn);
btn2Click.addEventListener('click', onClickBtn);
btn3Click.addEventListener('click', onClickBtn);
btn4Click.addEventListener('click', onClickBtn);
btn5Click.addEventListener('click', onClickBtn);

function onClickBtn(event) {
    if(currentTheme === config.themes.dark) {
      console.log('ff');
      event.target.classList.add('btn-click-dark');
      function deliteClickBtn() {
      event.target.classList.remove('btn-click-dark');
    }
      setTimeout(deliteClickBtn, 500);
    } else {
      event.target.classList.add('btn-click-light');
      function deliteClickBtn() {
      event.target.classList.remove('btn-click-light');
    }
      setTimeout(deliteClickBtn, 500);
    }
  }




console.log('Cамопроверка своей работы: \n Смена изображений в секции portfolio +25 \n Перевод страницы на два языка +25 \n Переключение светлой и тёмной темы +25 \n Дополнительный функционал +10');
