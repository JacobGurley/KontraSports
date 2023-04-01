<template>
    <Nav />
    <div class="rules-container">
      <h2>KONTRA IMPORTANT RULES</h2>
      <ul>
    <li>All players must have filled out a waiver either online or in person or they will not be allowed to play.</li>
    <li>Only the Captain or chosen representative from the team will be allowed to sign in players and they must do this before game time.</li>
    <li>Game fees ($45) must be paid in full before the game starts.</li>
    <li>Clock will start at the scheduled game time.</li>
    <li>For every minute a team is late, 1 point will be added for the other team.</li>
    <li>Once a game ends, there will be 2 minutes put on the clock before the next game starts.</li>
    <li>Jersey Rule: By the third week of the season every player needs to have a jersey with a number on it.</li>
    </ul>
    <p class="additional-notes">Additional Notes:</p>
    <ol>
      <li>1) If players on the same team have the same number it is a technical foul and 1 Free Throw.</li>
      <li>2) If a player does not have a jersey they will not be allowed to play.</li>
      <li>3) Jerseys will be available for purchase.</li>
    </ol>
    <p>Overtime is RUNNING CLOCK and one timeout per Overtime.</p>
    <p>Once a game ends, there will be 2 minutes put on the clock before the next game starts.</p>
    <p>When a game ends Please clear the bench so the next team can sit down for their game.</p>
    <p>Please do your best to let us know if there are any spills on your court or on the bench and throw away your bottles at the end of the game.</p>
    <p>Game clock does not stop after a made basket under 2 minutes if the game is within 8 points.</p>
    <h2>Kontra Basketball League Rules</h2>
    <ol>
      <li>1) If a player commits 5 personal fouls in a game, they will Foul Out of that game.</li>
      <li>2) Technical Fouls are counted as personal fouls, resulting in one free throw and possession to the opponent. With the player who received the technical foul will sit down for 2 minutes.</li>
      <li>3) Jump balls are always thrown up.</li>
      <li>4) Players may go for a rebound on the release of a shot during Free Throws.</li>
      <li>5) Backcourt violations occur after 10 seconds.</li>
      <li>6) Teams will have 1 and 1 bonus at 7 fouls and double bonus on 10 fouls. Double bonus will also occur after the second foul in the last two minutes of the second half. During overtime, each team will be given 1 foul to give before double bonus.</li>
      <li>7) Half time will be 1 minute 30 seconds long.</li>
      <li>8) Two 30 second timeouts per half. Timeouts DO NOT carry over. Team can Advance the ball to half court with a time out after a made basket(but must be prior to inbounding of the ball).</li>
      <li>9) Overtime rules: First Overtime 2 minutes, Second Overtime 1 minute, Third Overtime Sudden Death. Teams will have one timeout each for any Overtime. These do not carry over if a second or third overtime happens. Overtime is RUNNING CLOCK.</li>
      <li>10) Any physical conduct (non basketball play) or verbal abuse; ZERO tolerance on refs, game officials, Kontra employees and players will result in two game suspension minimum, with potential to be suspended for an entire season depending on the situation.</li>
      <li>11) One technical foul will be 1 free throw and the ball for the opposing team. Two is an automatic ejection and one game suspension from the following game. If a player refuses to leave after ejection, an automatic forfeit will be given to the player’s team. If a player is issued a technical foul, the player must sit out for 2:00 minutes of game time.</li>
      <li>12) Referees: No physical contact or verbal abuse is allowed with Kontra Referees. Any Referee abuse will be subject to technical fouls, ejections, suspensions, or league expulsions.</li>
      <li>13) PLAYING TIME: Game times are two (2) 20 minute halves running clock. Stop Clock only occurs the last 2 minutes of the second half if the game is within 8 points. If point differential is 20+ within the final 2 minutes of the game, the game will be called. If point differential is 15+ within the final minute of the game, the game will be called.</li>
      <li>14) Blood: Any player bleeding, must leave the game immediately. The player may return to the game once the bleeding has stopped and has been checked by the Referee. Clothes that contains blood must be removed or replaced before entering the game.</li>
    </ol>
    <h2>Qualifications:</h2>
    <p>Must be at least 18 or over to play.</p>
    <h2>Playoff Qualifications:</h2>
    <p>In order to be eligible for the playoff games a player must have played at least 3 of the scheduled regular season games(2 of the 5 scheduled for half seasons). </p>
    <h2>IMPORTANT ADDITIONAL RULES:</h2>
    <ol>
      <li>
        1) Any protests regarding game eligibility must be made to the League Direction PRIOR to the game starting. This will be noted on the score sheet and the league director will handle it from there. Only a team’s captain may protest. Protests regarding officials or scorekeepers WILL NOT be allowed.
      </li>
      <li>
        2) Players may not play on multiple teams unless a special commissioner’s exemption is made.
      </li>
      <li>
        3) The Maximum amount of players allowed on a team roster is 10 players.
      </li>
      <li>
        4) Uniform/Jewelry/Eye-wear: Every player must use Basketball Attire at all time while playing. The commissioner will have final authority on what is and what is not basketball attire. Absolutely no jewelry is allowed during games. Sports Goggles is the only piece of eye wear allowed.
      </li>
      <li>
        5) Forfeit / Points: It will be dash an automatic loss for teams who forfeit a game. Winning team will receive a win and +25 on point differential. Losing team will receive -25 on point differential.
      </li>
      <li>
        6) Conduct: Team Players, Coaches, and fans must always conduct themselves in a respectful manner. Bad/Hostile Conduct is not allowed in KONTRA. Teams, Coaches, and Fans who cannot conduct themselves in a respectful manner will be immediately escorted out of the gym, with their team subject to forfeiting the game.
      </li>
      <li>
        7) Refunds: Full Refunds will only be made prior to the season starting. Partial Refunds will be given to the amount of games left in the season. A Refund of 30 dollars will be given for each game.
      </li>
      <li>
        8) HOME AND VISITOR: The HOME team shall wear white or light colored uniforms and the VISITING team shall wear dark uniforms.
      </li>
    </ol>
  </div> 
</template>
  
  <script scoped>
  import Nav from "./NavBar.vue";
  export default {
    components: {
    Nav,
  },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  .rules-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;
  line-height: 1.6;
}

h2 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  font-weight: bold;
  text-align: center;
}

ul, ol {
  padding-left: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.bold {
  font-weight: bold;
}

.additional-notes {
  margin-top: 1.5rem;
}

@media (max-width: 767px) {
  h2 {
    font-size: 1.25rem;
  }
}
  </style>