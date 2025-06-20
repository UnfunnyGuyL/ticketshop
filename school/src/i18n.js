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
    aboutTitle: 'About TicketWave',
    aboutText: 'TicketWave is your go-to platform for discovering and purchasing tickets to the best events in town. Whether you are looking for concerts, sports events, or theater shows, we have got you covered. Our mission is to provide a seamless ticketing experience for all our users.',
    tosTitle: 'Terms of Service',
    tosIntro: 'Welcome to TicketWave! By using our platform, you agree to our terms and conditions. Please read them carefully. We are committed to providing a safe and reliable ticketing experience. If you have any questions, contact our support team.',
    tosList: [
      'All sales are final unless otherwise stated.',
      'Tickets are non-transferable unless specified.',
      'Misuse of the platform may result in account suspension.',
      'We reserve the right to update these terms at any time.'
    ],
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
    aboutTitle: 'Over TicketWave',
    aboutText: 'TicketWave is jouw platform voor het ontdekken en kopen van tickets voor de beste evenementen in de stad. Of je nu op zoek bent naar concerten, sportevenementen of theaterstukken, wij hebben het allemaal. Onze missie is om een naadloze ticketervaring te bieden voor al onze gebruikers.',
    tosTitle: 'Gebruiksvoorwaarden',
    tosIntro: 'Welkom bij TicketWave! Door ons platform te gebruiken, ga je akkoord met onze voorwaarden. Lees ze zorgvuldig door. We streven naar een veilige en betrouwbare ticketervaring. Neem bij vragen contact op met onze support.',
    tosList: [
      'Alle verkopen zijn definitief tenzij anders vermeld.',
      'Tickets zijn niet overdraagbaar tenzij gespecificeerd.',
      'Misbruik van het platform kan leiden tot schorsing van het account.',
      'We behouden ons het recht voor deze voorwaarden op elk moment te wijzigen.'
    ]
  },

}

export default createI18n({
  locale: 'en', 
  fallbackLocale: 'en',
  messages,
})
