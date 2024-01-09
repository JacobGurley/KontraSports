import Home from '../components/HomePage.vue';
import GameSchedules from '../components/GameSchedules.vue';
import GameStandings from '../components/GameStandings.vue';
import TeamRosters from '../components/TeamRosters.vue';
import LeagueRules from '../components/LeagueRules.vue';
import ContactUs from '../components/ContactUs.vue';
import GSThursdayA from '../components/GSThursdayA.vue';
import GSThursdayB from '../components/GSThursdayB.vue';
import GSSundayA from '../components/GSSundayA.vue';
import GSSundayB from '../components/GSSundayB.vue';
import GSSundayC from '../components/GSSundayC.vue';
import GSSundayD from '../components/GSSundayD.vue';
import StandingsThurA from '../components/StandingsThurA.vue';
import StandingsThurB from '../components/StandingsThurB.vue';
import StandingsSunA from '../components/StandingsSunA.vue';
import StandingsSunB from '../components/StandingsSunB.vue';
import StandingsSunC from '../components/StandingsSunC.vue';
import StandingsSunD from '../components/StandingsSunD.vue';
import TeamRosterThurA from '../components/TeamRosterThurA.vue';
import TeamRosterThurB from '../components/TeamRosterThurB.vue';
import TeamRosterSunA from '../components/TeamRosterSunA.vue';
import TeamRosterSunB from '../components/TeamRosterSunB.vue';
import TeamRosterSunC from '../components/TeamRosterSunC.vue';
import TeamRosterSunD from '../components/TeamRosterSunD.vue';
import HallOfFame from '../components/HallOfFame.vue';
import GSWednesday from '../components/GSWednesday.vue';
import StandingsWed from '../components/StandingsWed';
import TeamRosterWed from '../components/TeamRosterWed.vue';


import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Kontra Sports - Adult Basketball League based in Orange County',
      metaTags: [
        {
          name: 'description',
          content: 'Join Kontra Sports, the top destination for adult basketball leagues in Seal Beach and Orange County. Experience fun and competitive basketball with us!'
        }
      ]
    }
  },
  {path: '/home', component: Home},
  {path: '/schedules', component: GameSchedules},
  {path: '/standings', component: GameStandings},
  {path: '/rosters', component: TeamRosters},
  {path: '/rules', component: LeagueRules},
  {path: '/contact', component: ContactUs},
  {path: '/wednesdayGameSchedule', component: GSWednesday},
  {path: '/thursdayAGameSchedule', component: GSThursdayA},
  {path: '/thursdayBGameSchedule', component: GSThursdayB},
  {path: '/sundayAGameSchedule', component: GSSundayA},
  {path: '/sundayBGameSchedule', component: GSSundayB},
  {path: '/sundayCGameSchedule', component: GSSundayC},
  {path: '/sundayDGameSchedule', component: GSSundayD},
  {path: '/standingsWed', component: StandingsWed},
  {path: '/standingsThurA', component: StandingsThurA},
  {path: '/standingsThurB', component: StandingsThurB},
  {path: '/standingsSunA', component: StandingsSunA},
  {path: '/standingsSunB', component: StandingsSunB},
  {path: '/standingsSunC', component: StandingsSunC},
  {path: '/standingsSunD', component: StandingsSunD},
  {path: '/teamRosterWed', component: TeamRosterWed},
  {path: '/teamRosterThurA', component: TeamRosterThurA},
  {path: '/teamRosterThurB', component: TeamRosterThurB},
  {path: '/teamRosterSunA', component: TeamRosterSunA},
  {path: '/teamRosterSunB', component: TeamRosterSunB},
  {path: '/teamRosterSunC', component: TeamRosterSunC},
  {path: '/teamRosterSunD', component: TeamRosterSunD},
  {path: '/hallOfFame', component: HallOfFame},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router;
