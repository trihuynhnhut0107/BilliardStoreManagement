<template>
  <div>
    <header class="navbar">
      <nav>
        <div class="logo-icon">
          <img src="../public/image/eye.png" alt="Logo" />
        </div>
        <ul class="nav-links">
          <li> <NuxtLink to="/">Home</NuxtLink> </li>
          <li> <NuxtLink to="/">Products</NuxtLink> </li>
          <li> <NuxtLink to="/">To Contact</NuxtLink> </li>
        </ul>
        <div class="search-bar">
          <input type="text" placeholder="Search....." />
          <img src="../public/image/search.png">
        </div>
        <div class="cart-user"> 
          <i class="icon-cart"> <img src="../public/image/seal-exclamation.png">  </i>
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
  display: inline-block;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #1bd2aa;
}

.logo-icon {
  position: absolute;
  width: 40px;
  height: 40px;
  left : 100px;
  top: 5px ;
}

.nav-links {
  list-style: none;
  display: flex;
  width: 30%;
  position: absolute;
  left: 20%;
  flex-wrap: wrap;
  gap: 20%;
}

.nav-links li {
  display: inline;
}

.nav-links li a {
  text-decoration: none;
  color: #3A6351;
  font-weight: bold;
  font-size: 20px;
}

.search-bar {
  display: flex;
  position: absolute;
  right: 25%;
  top: 15px;
  background-color: #f8f8f8;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 5px;
  align-items: center;
  top: 10px;
}

.search-bar img {
  width: 20px;
  height: 20px;
}

.cart-user {
  position: absolute;
  display: flex;
  right: 10%;
  width: auto; 
  cursor: pointer;
  width: 80px;
  gap: 20px; 
}

.cart-user img {
  display: block;
  margin-right: 0; 
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
