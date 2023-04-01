import Home from '../components/HomePage.vue';
import GameSchedules from '../components/GameSchedules.vue';
import GameStandings from '../components/GameStandings.vue';
import TeamRosters from '../components/TeamRosters.vue';
import LeagueRules from '../components/LeagueRules.vue';
import ContactUs from '../components/ContactUs.vue';
import GSThursdayA from '../components/GSThursdayA.vue';
import GSSundayA from '../components/GSSundayA.vue';
import GSSundayB from '../components/GSSundayB.vue';
import GSSundayC from '../components/GSSundayC.vue';
import StandingsThurA from '../components/StandingsThurA.vue';
import StandingsSunA from '../components/StandingsSunA.vue';
import StandingsSunB from '../components/StandingsSunB.vue';
import StandingsSunC from '../components/StandingsSunC.vue';
import TeamRosterThurA from '../components/TeamRosterThurA.vue';
import TeamRosterSunA from '../components/TeamRosterSunA.vue';
import TeamRosterSunB from '../components/TeamRosterSunB.vue';
import TeamRosterSunC from '../components/TeamRosterSunC.vue';
import HallOfFame from '../components/HallOfFame.vue';
import GSWednesday from '../components/GSWednesday.vue';
import StandingsWed from '../components/StandingsWed';
import TeamRosterWed from '../components/TeamRosterWed.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {path: '/', component: Home},
  {path: '/home', component: Home},
  {path: '/home', component: Home},
  {path: '/schedules', component: GameSchedules},
  {path: '/standings', component: GameStandings},
  {path: '/rosters', component: TeamRosters},
  {path: '/rules', component: LeagueRules},
  {path: '/contact', component: ContactUs},
  {path: '/wednesdayGameSchedule', component: GSWednesday},
  {path: '/thursdayAGameSchedule', component: GSThursdayA},
  {path: '/sundayAGameSchedule', component: GSSundayA},
  {path: '/sundayBGameSchedule', component: GSSundayB},
  {path: '/sundayCGameSchedule', component: GSSundayC},
  {path: '/standingsWed', component: StandingsWed},
  {path: '/standingsThurA', component: StandingsThurA},
  {path: '/standingsSunA', component: StandingsSunA},
  {path: '/standingsSunB', component: StandingsSunB},
  {path: '/standingsSunC', component: StandingsSunC},
  {path: '/teamRosterWed', component: TeamRosterWed},
  {path: '/teamRosterThurA', component: TeamRosterThurA},
  {path: '/teamRosterSunA', component: TeamRosterSunA},
  {path: '/teamRosterSunB', component: TeamRosterSunB},
  {path: '/teamRosterSunC', component: TeamRosterSunC},
  {path: '/hallOfFame', component: HallOfFame},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,


})
export default router;
