<template>
  <nav class="menu-selection">
    <router-link :to="{ name: 'tutorial' }">
      Tutorial
    </router-link>
    <a @click.prevent="signout" v-if="currentUser" href="#">
      Sign out
    </a>
    <router-link v-else :to="{ name: 'signin' }">
      Sign in
    </router-link>
    <router-link :to="{ name: 'game' }">
      Game
    </router-link>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "@/plugins/firebase.plugin";

export default {
  computed: {
    ...mapState("auth", ["currentUser"])
  },
  methods: {
    signout() {
      auth.signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  font-size: 33px;

  & a {
    color: #3c2c17;
    border: 5px solid #3c2c17;
    padding: 5px;
    position: relative;
    background-color: #3c2c1720;
    transition: background-color ease 0.5s, border-radius ease 0.5s;

    &:hover {
      background-color: transparent;
      border-radius: 10px;
    }

    &:not(:first-child)::before {
      content: "";
      display: block;
      position: absolute;
      width: 20px;
      height: 7px;
      background-color: #3c2c17;
      left: -25px;
      top: 21px;
    }
  }
}

@media screen and (max-width: 768px) {
  .menu-selection {
    font-size: 23px;

    & a:not(:first-child)::before {
      top: 17px;
    }
  }
}
</style>
