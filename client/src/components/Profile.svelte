<script>
    import AuthStore from '../store/AuthStore';
</script>

<svelte:head>
    <title>Profile</title>
</svelte:head>

<div class="profile-container">
    <img src="{$AuthStore.image}" alt="userphoto" class="photo">
    <h1 class="username">{$AuthStore.displayName}</h1>
</div>

<style>
    .profile-container {
        height: 90vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }
    .username {
        font-size: 3rem;
        letter-spacing: 2px;
        margin: 30px;
    }
    .photo {
        width: 200px;
        height: 200px;
        border-radius: 100px;
    }
    @media (max-width: 600px) {
        .username {
            font-size: 1.2rem;
        }
    }
</style>