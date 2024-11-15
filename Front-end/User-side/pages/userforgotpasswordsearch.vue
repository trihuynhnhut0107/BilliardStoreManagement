<template>
  <DefaultLayout>
    <div class="forgotpassword-container">
      <header>
        <h1>app name</h1>
      </header>
      <form>
        <h3>Reset your password</h3>
        <hr />
        <div class="content-container">
          <div class="reset-option">
            <h5>How do you want to receive the code to reset your password?</h5>
            <div class="email-option">
              <input
                type="radio"
                id="email"
                name="method"
                value="email"
                checked />
              <!-- <div class="email-des"> -->
              <label class="font-size13px" for="email"
                >Send code via email</label
              >
              <div class="useremail font-size13px">{{ userEmail }}</div>
              <!-- </div> -->
            </div>
            <div>
              <input
                type="radio"
                id="password"
                name="method"
                value="password" />
              <label class="font-size13px" for="password"
                >Enter Password to Log in</label
              >
            </div>
          </div>
          <div class="email-preview">
            <img class="email-image" src="/Icon/circle-user.png" alt="" />
            <div>{{ userEmail }}</div>
          </div>
        </div>
        <div class="button">
          <button class="btn-not">
            <NuxtLink to="/forgotpassword">Not you</NuxtLink>
          </button>
          <button class="btn-continue">Continue</button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { NuxtLink } from "#build/components";
import DefaultLayout from "~/layout/default.vue";
const userEmail = "example@gmail.com";
</script>

<style scoped>
.font-size13px {
  font-size: 13px;
}

* {
  padding: 0;
  margin: 0;
}

.forgotpassword-container {
  width: 100vw;
  max-width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #a4a4a4;
}

h1 {
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
  color: #3a6351;
  text-align: center;
}

form {
  align-self: center;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  background-color: white;
  margin-inline: auto;
  box-shadow: 2px 2px 3px #a4a4a4;
  padding: 15px 30px 15px 30px;
}

input {
  margin: 0.4rem;
}

h3 {
  font-size: 25px;
  font-weight: 700;
}

h5 {
  width: 80%;
}

hr {
  width: 150%;
  border: 0.05px solid #a4a4a4;
  padding: 0;
}

form > p {
  width: 370px;
}

.content-container {
  display: flex;
  width: 450px;
}

.reset-option {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: max-content;
}

.reset-option > div {
  display: inline-block;
}

.email-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.email-image {
  width: 50px;
}

.button {
  display: flex;
  justify-content: space-between;
  width: 215px;
}

.btn-not,
.btn-continue {
  border-radius: 5px;
  padding: 5px;
  border: 0.5px solid #3a6351;
  width: 100px;
  font-weight: 600;
}

.btn-not {
  background-color: transparent;
  color: #3a6351;
  font-weight: 700;
}

.btn-continue {
  background-color: #3a6351;
  color: white;
}

.email-option {
  display: flex;
}

.email-des {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
