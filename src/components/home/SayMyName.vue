<template>
  <section class="say-my-name">
    <h2 class="say-my-name__title rustic">
      Enter to the Highscores!
    </h2>
    <form @submit.prevent="signUp" class="input-group">
      <text-view
        v-model="auth.name"
        placeholder="Name"
        class="text-view"
        required
      />
      <text-view
        v-model="auth.email"
        type="email"
        placeholder="E-mail"
        class="text-view"
        required
      />
      <text-view
        v-model="auth.password"
        type="password"
        placeholder="Password"
        class="text-view"
        required
      />
      <div class="text-left">
        <router-link :to="{ name: 'game' }">
          Nah, I just wanna play
        </router-link>
      </div>
      <btn type="submit">
        Confirm
      </btn>
    </form>
  </section>
</template>

<script>
import TextView from "../ui/TextView";
import Btn from "../ui/Btn";
import { auth } from "@/plugins/firebase.plugin";

export default {
  components: {
    TextView,
    Btn
  },
  data() {
    return {
      auth: {
        email: "",
        password: "",
        name: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    signUp() {
      const { email, password, name } = this.auth;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          return user.updateProfile({
            displayName: name
          });
        })
        .then(() => {
          this.$router.push({ name: "game" });
        })
        .catch(error => {
          this.errorMessage = error;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #3c2c17;
}
.say-my-name {
  font-family: CaptainAmerica;
  position: relative;
}
.say-my-name__title {
  font-size: 40px;
  letter-spacing: 2px;
  padding: 0;
}

.input-group > * {
  margin-top: 7px;
}

.text-view {
  font-size: 25px;
}

@media screen and (max-width: 768px) {
  .text-view {
    font-size: 25px;
  }
}
</style>
