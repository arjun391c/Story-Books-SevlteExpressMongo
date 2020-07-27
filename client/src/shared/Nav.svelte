<script>
    let isNavOpen = false;
    import axios from 'axios';
    import {baseUrl} from './baseUrl';
    import { onMount, onDestroy } from 'svelte';
    import AuthStore from '../store/AuthStore';
    import { Link, navigate } from 'svelte-routing';

    const handleLogout = () => {
        axios.get(`${baseUrl}auth/logout`)
        .then(() =>{
            navigate("/login");
            console.log("loggedout")
            AuthStore.set(null)
            })
    }

    const toggleNav = () => {
        isNavOpen=!isNavOpen
    }
</script>

<header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <p class="navbar-item">
                    <Link to="/"><p>STORY <span class="bold-logo">BOOKS</span></p></Link>
                </p>
                <span class="navbar-burger burger" on:click={toggleNav} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </span>
            </div>

            <div id="navbarBasicExample" class="navbar-menu" class:is-active={isNavOpen}>
                <div class="navbar-start">
                    <p class="navbar-item"><Link to="/" on:click={toggleNav}>Home</Link></p>
                    <p class="navbar-item"><Link to="/dashboard" on:click={toggleNav}>Dashboard</Link></p>
                    <p class="navbar-item"><Link to="/profile" on:click={toggleNav}>Profile</Link></p>
                </div>
                <div class="navbar-end nav-mob">
                    <p class="navbar-item" on:click={toggleNav}><button on:click={handleLogout}>Logout</button></p>
                </div>
            </div>
        </div>
    </nav>
</header>

<style>
    nav {
        background: #333;
    }
    p {
        color: aliceblue;
    }
    .navbar-menu{
        background: #333;
    }
    span {
        color: #fff;
    }
    .bold-logo {
        letter-spacing: 2px;
        font-weight: bold;
        color: aquamarine
    }
    button {
        color: #fff;
        border: none;
        background-color: #333;
        font-size: 16px; 
        padding: 6px 5px;
    }
    button:hover {
        background: #444;
    }
    @media (max-width: 920px) {
        .nav-mob {
            background: rgb(235, 73, 73);
            padding: 0;
            margin: 0;
        }
        .nav-mob button{
            background: rgb(235, 73, 73);
            padding: 5px 8px;
        }
    }
</style>