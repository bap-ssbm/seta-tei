import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import about from './i18n/locales/Home/About.json'
import hero from './i18n/locales/Home/Hero.json'
import reservation from './i18n/locales/Home/Reservation.json'
import menu from './i18n/locales/Home/MenuSection.json'
import access from './i18n/locales/Home/Access.json'
import navbar from './i18n/locales/Navbar.json'
import footer from './i18n/locales/Footer.json'
import realmenu from './i18n/locales/Menu.json'
import reservationPage from './i18n/locales/ReservationPage.json'
import appeal from './i18n/locales/Home/Appeal.json'

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    homePage: {
                        about: { ...about.en },
                        hero:{...hero.en},
                        reservation:{...reservation.en},
                        menu:{...menu.en},
                        access:{...access.en},
                        appeal:{...appeal.en}
                    },
                    navbar: {
                        ...navbar.en
                    },
                    footer:{
                        ...footer.en
                    },
                    menu:{
                        ...realmenu.en
                    },
                    reservationPage:{
                        ...reservationPage.en
                    }
                }
            },
            ja: {
                translation: {
                    homePage: {
                        about: { ...about.ja },
                        hero:{...hero.ja},
                        reservation:{...reservation.ja},
                        menu:{...menu.ja},
                        access:{...access.ja},
                        appeal:{...appeal.ja}
                    },
                    navbar: {
                        ...navbar.ja
                    },
                    footer:{
                        ...footer.ja
                    },
                    menu:{
                        ...realmenu.ja
                    },
                    reservationPage:{
                        ...reservationPage.ja
                    }
                }
            }
        }
    });

export default i18n;