<script>
	import '../node_modules/bulma/css/bulma.min.css';
	import { Router, Route, navigate } from 'svelte-routing';
	import Login from './components/Login.svelte';
	import Dashboard from './components/Dashboard.svelte';
	import Profile from './components/Profile.svelte';
	import NotFoundPage from './components/NotFoundPage.svelte';
	import PublicStories from './components/PublicStories.svelte';
	import Nav from './shared/Nav.svelte';

	import { fetchLoggedUser } from './store/api/auth';
	import { fetchPublicStories, fetchStories } from './store/api/stories';
	import { onMount } from 'svelte';
	import AuthStore from './store/AuthStore';

	let loading = true;
	let auth = null;

	onMount(() => {
		fetchLoggedUser()
		.then(fetchStories())
		.then(fetchPublicStories())
		.then(() => {
			loading = false;
			if($AuthStore === null) {
				navigate('/login', {replace: true})
			}
			})
	});

	$: isAuth = $AuthStore;
</script>


{#if !loading}
<Router>
	{#if isAuth != null}
	<Nav/>
	{/if}
	<main>
		<div class="container main">
		{#if isAuth != null}
			<Route path="/" component="{PublicStories}"/>
			<Route path="/dashboard" component="{Dashboard}"/>
			<Route path="/profile" component="{Profile}"/>
		{:else}
			<Route path="/login" component="{Login}"/>
		{/if}
			<Route component="{NotFoundPage}"/>
		</div>
	</main>
</Router>
{:else}
	<div class="load-container">
		<p class="loader has-text-danger"/>
	</div>
{/if}

<style>
	.main {
		padding: 0 15px;
	}
	.load-container{
		display: flex;
		height: 100vh;
		width: 100vw;
		align-items: center;
		justify-content: center;
	}
	.loader{
		font-size: 2rem;
	}
	@media (max-width: 600px) {
        .loader{
			font-size: 12px;
		}
    }
</style>