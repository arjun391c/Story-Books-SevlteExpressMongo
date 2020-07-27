<script>
    import {baseUrl} from '../shared/baseUrl';
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="login-container">
    <div class="form">
        <h3>Login</h3>
        <form action="{baseUrl}auth/google" method="GET">
             <button  type="submit">login With Google</button>
        </form>
    </div>
</div>

<style>
    .login-container {
        height: 90vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .form {
        background-color: #fff;
        width: 35%;
        text-align: center;
        border-radius: 9px;
        padding: 30px 10px;
        box-shadow: 2px 2px 3px rgba(0,0,0,0.2);
    }
    .form h3 {
        font-size: 2rem;
        padding: 15px;
        margin: 0 10px;
        letter-spacing: 2px;
        border-bottom: 2px solid rgb(218, 105, 105); 
    }
    .form button {
        padding: 10px 25px;
        border: none;
        margin: 15px 10px;
        background: rgb(240, 64, 64);
        border-radius: 5px;
        color: #fff;
        letter-spacing: 2px;
        font-size: 1rem;
        font-weight: 500; 
    }
    @media (max-width: 600px) {
        .form{
            width: 100%;
        }
        .form h3 {
            font-size: 1.1rem;
        }
        .form button {
            font-size: 12px;
        }
    }
</style>