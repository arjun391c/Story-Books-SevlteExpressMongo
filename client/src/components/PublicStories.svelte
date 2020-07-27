<script>
    import { onMount } from 'svelte';
    import { PublicStore } from '../store/StoriesStore';
    // import AuthStore from '../store/AuthStore';
    import Story from './Story.svelte';
    
</script>

<div>
    <h1>Public Stories</h1>
    <div class="story-container">
        <p class="subtitle">Explore what others have to say!</p>
        <div class="stories">
            {#each $PublicStore as story}
                <Story {story}/>
            {/each}
        </div>
    </div>
</div>

<style>
    h1{
        text-align: center;
        font-size: 20px;
        padding: 15px;
        text-transform: uppercase;
        letter-spacing: 4px;
    }

    .story-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px 10px;
        border-radius: 10px;
        box-shadow: 2px 2px 5px solid rgba(0,0,0,0.1)
    }

    .stories {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 25px;
        grid-row-gap: 25px;
        margin: 30px 15px;
    }
    
    .subtitle {
        padding: 10px;
        letter-spacing: 2px;
        border-bottom: 1px solid #333;
        margin: 5px 20px
    }

    @media (max-width: 600px) {
        .stories {
             grid-template-columns:  1fr;
             margin: 30px 0;
        }

        .subtitle {
            padding: 5px 0; 
            font-size: 1rem;
            margin: 5px 0;
        }

        h1{
            font-size: 1.1rem;
            padding: 8px 0; 
            margin: 0;
            text-align: left;
        }
        .story-container {
            padding: 0;
            margin: 0;
        }
    }
</style>