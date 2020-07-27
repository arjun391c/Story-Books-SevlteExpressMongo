<script>
    export let showModal = false;
</script>

{#if showModal}
    <div class="backdrop" on:click|self>
        <div class="modal-container">
        <span class="delete" on:click/>
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .backdrop{
        width: 100vw;
        height: 100vh;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        top: 0;
        left: 0;
        background:  rgba(0, 0, 0, 0.8)
    }
    .modal-container{
        padding: 10px;
        border-radius: 10px;
        width: 60%;
        background: white;
    }
    .delete {
        display: none;
    }
    @media (max-width: 600px) {
        .modal-container{
            width: 100%;
            margin: 10px;
            font-size: 1rem;
            position: relative;
        }
        .delete {
            position: absolute;
            top: 4px;
            right: 5px;
            display: block;
            background-color: green;
        }
    }
</style>