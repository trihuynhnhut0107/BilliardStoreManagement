<template>
  <DefaultLayout>
    <div class="forgotpassword-container">
      <header>
        <h1>app name</h1>
      </header>
      <form>
        <h3>Find your account</h3>
        <hr />
        <p>
          Please enter your email address or mobile number to search for your
          account
        </p>
        <input type="text" placeholder="Email address or phone number" />
        <div class="button">
          <button class="btn-cancel">
            <NuxtLink to="/login">Cancel</NuxtLink>
          </button>
          <button class="btn-search">
            <NuxtLink to="/forgotpasswordsearch">Search</NuxtLink>
          </button>
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from "~/layout/default.vue";
</script>

<style scoped>
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
  padding: 15px 50px 20px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  background-color: white;
  margin-inline: auto;
  box-shadow: 2px 2px 3px #a4a4a4;
}

h3 {
  font-size: 25px;
  font-weight: 700;
}

hr {
  width: 150%;
  border: 0.05px solid #a4a4a4;
  padding: 0;
}

form > p {
  width: 370px;
}

input[type="text"],
input[type="password"] {
  width: 370px;
  height: 40px;
  padding: 10px;
  border: 1px solid #a4a4a4;
  border-radius: 5px;
}

.button {
  display: flex;
  justify-content: space-between;
  width: 215px;
}

.btn-cancel,
.btn-search {
  border-radius: 5px;
  padding: 5px;
  border: 0.5px solid #3a6351;
  width: 100px;
  font-weight: 600;
}

.btn-cancel {
  background-color: transparent;
  color: #3a6351;
}

.btn-search {
  background-color: #3a6351;
  color: white;
}
</style>
