import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    title: 'Upcoming Events',
    date: 'Date',
    location: 'Location',
    buy: 'Buy Ticket',
    welcome: 'Welcome to TicketWave',
    subtitle: 'Get your tickets now!',
    browse: 'Browse Events',
    login: 'Login',
    about: 'About Us',
  },
  nl: {
    title: 'Aankomende Evenementen',
    date: 'Datum',
    location: 'Locatie',
    buy: 'Koop Ticket',
    welcome: 'Welkom bij TicketWave',
    subtitle: 'Koop je tickets nu!',
    browse: 'Bekijk Evenementen',
    login: 'Inloggen',
    about: 'Over Ons',
  },

}

export default createI18n({
  locale: 'en', 
  fallbackLocale: 'en',
  messages,
})
