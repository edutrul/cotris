<template>
  <section class="new-game">
    <h1>The Cotris Game</h1>
    <play-button @click="play" class="play-button" />
    <high-scores class="high-scores" />
    <footer-nav />
  </section>
</template>

<script>
import HighScores from "./HighScores";
import PlayButton from "../ui/PlayButton";
import FooterNav from "../home/FooterNav";

export default {
  components: {
    HighScores,
    PlayButton,
    FooterNav
  },
  methods: {
    play() {
      this.$store.commit("game/start");
    }
  }
};
</script>

<style lang="scss">
.new-game {
  padding: 0 10px;
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.high-scores,
.play-button {
  margin-top: 25px;
}

@media screen and(max-height: 513px) {
  .high-scores {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .new-game {
    height: 100%;
  }

  .high-scores,
  .play-button {
    margin-top: 7px;
  }
}
</style>
