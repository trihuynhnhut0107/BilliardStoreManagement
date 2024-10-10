<template>
  <div class="createaccount-container">
    <header>
      <h1>app name</h1>
    </header>
    <form>
      <h3>Create new account</h3>
      <div class="name-container">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
      </div>
      <input
        type="text"
        placeholder="Email address or phone number"
        v-model="username" />
      <input type="password" placeholder="New password" v-model="password" />
      <input type="button" value="Sign up" />
      <RouterLink class="rl-login" to="/login">
        Already have an account?
      </RouterLink>
    </form>
  </div>
</template>

<script setup></script>

<style scoped>
.createaccount-container {
  width: 100vw;
  max-width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
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
  padding: 15px 80px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-radius: 8px;
  background-color: white;
  margin-inline: auto;
  box-shadow: 2px 2px 3px #a4a4a4;
}

input[type="text"],
input[type="password"] {
  width: 250px;
  height: 40px;
  padding: 10px;
  border: 1px solid #a4a4a4;
  border-radius: 5px;
}

.name-container {
  width: 250px;
  display: flex;
  justify-content: space-between;
}

.name-container > input {
  width: 120px;
}

h3 {
  font-size: 22px;
  font-weight: 700;
}

input[type="button"] {
  width: 250px;
  background-color: #3a6351;
  color: white;
  border-radius: 5px;
  text-align: center;
  padding: 7px;
}

.rl-login {
  color: #3a6351;
  font-weight: 500;
}
</style>
