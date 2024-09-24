<template>
    <div class="login-container">
        <header>
            <h1>app name</h1>
            <h3>book your perfect game anytime anywhere!</h3>
        </header>
        <form>
            <div>
                <input type="text" placeholder="Email address or phone number">
            </div>
            <div>
                <input type="password" placeholder="Password">
            </div>
            <div class="button-login"> 
                <input type="submit" value="Log in">
            </div>
            <RouterLink class="rl-forgotpassword" to="/fotgotpassword">
                Forgot password?
            </RouterLink>
            <hr>
            <button class="button-createnewaccount">Create new account</button>
        </form>
    </div>
</template>

<script setup>
    
</script>

<style scoped>
    .login-container {
        display: flex;
        justify-content: space-around;
        padding: 50px;
        height: 90vh;
        width: 100vw;
        background-image: url(../assets/Image/img_1.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    }

    header {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }

    h1 {
       color: #3A6351; 
       font-size: 36px;
       font-weight: 700;
       text-transform: uppercase;
    }

    h3 {
        text-transform: capitalize;
        width: 60%;
        font-size: 22px;
        font-weight: 500;
    }

    form {
        align-self: center;
        width: fit-content;
        padding: 30px 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        border-radius: 8px;
        background-color: white;
        margin-inline: auto;
    }

    input[type="text"], input[type="password"]{
        width: 250px;
        height: 40px;
        padding: 10px;
        border: 1px solid #A4A4A4;
        border-radius: 5px;
    }

    .button-login {
        width: 250px;
        background-color: #3A6351;
        color: white;
        border-radius: 5px;
        text-align: center;
        padding: 7px;
    }

    .rl-forgotpassword {
        color: #3A6351;
        font-weight: 500;
    }

    hr {
        width: 250px;
        border: 0.05px solid #A4A4A4;
        padding: 0;
    }

    .button-createnewaccount {
        color: white;
        background-color: #3A6351;
        width: 200px;
        padding: 7px;
        border-radius: 5px;
    }



    
</style>