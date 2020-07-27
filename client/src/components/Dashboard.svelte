<script>
    import Story from './Story.svelte';
    import AddStory from './AddStory.svelte';
    import axios from 'axios';
    import { onMount } from 'svelte';
    import { StoriesStore } from '../store/StoriesStore';
    import AuthStore from '../store/AuthStore';
    import { deleteStory } from '../store/api/stories';

    import Modal from '../shared/Modal.svelte'

    let showModal = false;
    let formData = '';

    const toggleModal = () => {
        showModal = !showModal;
        if (!showModal) {
            formData = '';
        }
    }

    const handleDelete = ({_id}) => {
        deleteStory(_id);
    }

    const handleUpdate = (story) => {
        formData = story;
        toggleModal();
    }
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<Modal {showModal} on:click={toggleModal}>
    <AddStory {formData} {toggleModal}/>
</Modal>

<div>
    <h1>Welcome {$AuthStore.displayName}</h1>
    <div class="story-container">
        <p>Here are your stories</p>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Edit/delete</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $StoriesStore as story }
                        <tr>
                            <td>{story.title}</td>
                            <td>{new Date(story.createdAt).toDateString()}</td>
                            <td>{story.status}</td>
                            <td>
                                <button class="button is-success" on:click={handleUpdate(story)}>Edit</button>
                                <button class="button is-danger" on:click={handleDelete(story)}>Delete</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <button class="add-btn button" on:click={toggleModal}>+</button> 
</div>

<style>
    h1{
        text-align: center;
        font-size: 20px;
        padding: 15px;
        text-transform: uppercase;
        letter-spacing: 4px;
    }
    .add-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        padding: 10px;
        font-size: 2rem;
        color: aliceblue;
        background-color: rgb(235, 48, 48);
    }
    .story-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px 10px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 2px 2px 5px solid rgba(0,0,0,0.1)
    }
    
    p {
        padding: 10px;
        letter-spacing: 2px;
        border-bottom: 1px solid #333;
        margin: 5px 20px
    }

    .table {
        margin: 10px 20px;
    }

    table {
        width: 100%;
        border-radius: 10px;
    }

    tbody {
        padding: 5px 0;
        letter-spacing: 2px;
    }

    @media (max-width: 600px) {
        h1{
            font-size: 15px;
        } 
        .table {
            margin: 10px 0px;
            font-size: 10px;
        }  
        p {
            padding: 5px 0;
            margin: 5px 0;
        }  
        button{
            font-size: 10px;
        }
        .add-btn {
            font-size: 1rem;
            height: 30px;
            width: 30px;
            bottom: 10px;
            right: 10px;
        }
    }
</style>