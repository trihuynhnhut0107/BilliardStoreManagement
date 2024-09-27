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
          <i class="icon-cart"> 
            <img src="../public/image/seal-exclamation.png">  
          </i>
          <i class="icon-user"> <img src="../public/image/circle-user.png"> </i>
        </div>
      </nav>
    </header>

    <div class="home-container">
    <!-- Hero Section -->
      <section class="header-img">
        <h1 class="header-content">Your Ultimate Billiards Table Booking Hub</h1>
        <img src="../public/image/img_1.jpg" class="image-after-content"/>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="feature">
          <i class="icon">🌐</i>
          <p>Fast</p>
        </div>
        <div class="feature">
          <i class="icon">✋</i>
          <p>Convenient</p>
        </div>
        <div class="feature">
          <i class="icon">🖱</i>
          <p>Easy</p>
        </div>
      </section>

      <!-- Popular Collections -->
      <section class="collections">
        <h2>Popular Collections</h2>
        <div class="collection-cards">
          <div class="card">
            <img src="../public/image/billard-table.jpg" alt="Billiard Table 1" />
            <h1> Imperior </h1>
            <p> Mô tả về bàn và các dịch vụ đi kèm </p>
            <div class="price-add">
              <h2> $10 </h2>
              <button> <img src="../public/image/plus-small.png" /> </button>
            </div>
          </div>
          <div class="card">
            <img src="../public/image/billard-table.jpg" alt="Billiard Table 2" />
            <h1> Imperior </h1>
            <p> Mô tả về bàn và các dịch vụ đi kèm </p>
            <div class="price-add">
              <h2> $10 </h2>
              <button> <img src="../public/image/plus-small.png" /> </button>
            </div>
          </div>
          <div class="card">
            <img src="../public/image/billard-table.jpg" alt="Billiard Table 3" />
            <h1> Imperior </h1>
            <p> Mô tả về bàn và các dịch vụ đi kèm </p>
            <div class="price-add">
              <h2> $10 </h2>
              <button> <img src="../public/image/plus-small.png" /> </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer>
      <p>&copy; End</p>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'Home',
};
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
  background-color: #16eba4;
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


/* Body */
.home-container {
  font-family: Arial, sans-serif;
  display: block;
  height: 100%;
  width: 100%;
}

.header-img {
  position: relative;
  width: 100%;
  height: auto; 
  display: block; 
  object-fit: cover;
}

.header-content {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white; /* Change the text color as needed */
  font-size: 24px; /* Adjust font size as needed */
  font-weight: bold;
}

.hero h1 {
  font-size: 36px;
  font-weight: bold;
  color: #3A6351;
}

/* Features Section */
.features {
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
  text-align: center;
}

.feature {
  font-size: 24px;
  color: #3a3a3a;
}

.feature p {
  color: #3A6351;
  font-weight: bold;
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
  font-weight: bold;
}

/* Collections Section */
.collections {
  padding: 20px;
  text-align: center;
  font-weight: bold;
  color: #3A6351;
  font-size: 40px ;
}

.collection-cards {
  display: flex;
  justify-content: center;
  margin: 10px;
  flex-wrap: wrap;
}

.card {
  width: 250px;
  height: 400px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 50px;
}

.card img {
  margin: 10px;
  width: 90%;
  height:  30%;
}

.card h1 {
  font-size: 20px;
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  color: #000;
} 

.card p {
  font-size: 16px;
  text-align: center;
  color: #000;
}

.card .price-add {
  display: block; 
}

.card .price-add h2 {
  display: inline-block;
  font-size: 28px;
  color: #3A6351;
  font-weight: bold;
  margin-top: 20px;
  margin-right: 100px;
} 

.card .price-add button img {
  position: flex;
  display: inline;
  height: 40px;
  width: 40px;
  padding: 5px 10px;
  background-color: #3A6351;
  border: solid 2px #000;
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
