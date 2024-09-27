<template>
  <div>
    <header class="navbar">
      <nav>
        <div class="logo-icon">
          <img src="../public/image/eye.png" alt="Logo" />
        </div>
        <ul class="nav-links">
          <li class="{ underline: isActive }" @click="handleClick"> <NuxtLink to="/">Home</NuxtLink> </li>
          <li class="{ underline: isActive }" @click="handleClick"> <NuxtLink to="/">Products</NuxtLink> </li>
          <li class="{ underline: isActive }" @click="handleClick"> <NuxtLink to="/">To Contact</NuxtLink> </li>
        </ul>
        <div class="search-bar">
          <input type="text" placeholder="Search....." />
          <img src="../public/image/search.png">
        </div>
        <div class="cart-user"> 
          <i class="icon-cart"> 
            <img src="../public/image/seal-exclamation.png">  
          </i>
          <i class="icon-user"> <img src="../public/image/circle-user.png"> </i>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <p>&copy; End</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style scoped>
.navbar {
  background-color: #f8f8f8;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 100px;
  position: relative;
  left: 130%;
  bottom: 0;
}

.nav-links li a {
  text-decoration: none;
  color: #3A6351;
  font-weight: bold;
  font-size: 18px;
}

.nav-links:active {
  text-decoration: underline;
}

.logo-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  left : 100px;
  top: 5px ;
}

.search-bar {
  display: flex;
  position: absolute;
  align-items: center;
  right: 30%;
  top: 15px;
  height: 20px;
  width: 20px; 
}

.cart-user {
  position: absolute;
  top: 10px;
  right: 5%;
  gap: 12px;
  display: flex;
  height: 60px;
  width: 60px; 
  cursor: pointer;
}

.search-cart input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
