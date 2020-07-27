<svelte:head>
    <title>404!!</title>
</svelte:head>

<div class="container">
    <div>
        <h1 class="title">404</h1>
        <p class="subtitle">Page Not Found</p>
    </div>
</div>

<style>
    .container{
        height: 100vh;
        width: 100vw;
        background-color: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .title {
        border-left: 6px solid red;
        padding: 0 20px;
        font-size: 2.5rem;
    }

    p {
        letter-spacing: 3px;
    }
</style>