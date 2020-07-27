<script>
    import { postStory, updateStory } from '../store/api/stories';
    let title = '';
    let status = 'public';
    let body = '';
    let files;

    let formState = 'add';

    export let formData;
    export let toggleModal;

    if(formData != '') {
        title = formData.title;
        status = formData.status;
        body = formData.body;

        formState = 'update';
    }

    const errors = {}

    const handleSubmit = () => {

        if( title.length < 4 ){
            return errors.title = "Title must be atleast 4 characters long.";
        } else {
            errors.title = ''
        }
        if( body.length < 10 ) {
            return errors.body = "Body can't be empty or must be more than 10 characters";
        } else {
            errors.body = ''
        }

        let data = new FormData();
        if (files) {
            data.append('imageFile', files[0])
        }
        data.append('status', status)
        data.append('body', body)
        data.append('title', title)

        if(formState === 'add'){
            postStory(data);
        } else {
            data.append('image', formData.image)
            updateStory(data, formData._id);
        }

        return toggleModal();
    }
</script>

<div class="add-container">
    <h1>Add new Story</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input class="input" type="text" bind:value={title} class:is-danger={errors.title}>
            </div>
            {#if errors.title != null}
                <p class="help is-danger">{errors.title}</p>
            {/if}
        </div>
        <div class="field">
            <label class="label">Status</label>
            <div class="is-grouped field">
                <div class="control">
                    <div class="select">
                    <select bind:value={status}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    </div>
                </div>
                <div class="file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" accept="image/*" bind:files>
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Upload Image
                        </span>
                        </span>
                        <span class="file-name">
                            {#if files}
                                {files[0].name}
                            {:else}
                                No File Choosen 
                            {/if}
                        </span>
                    </label>
                </div>
            </div>
        </div>
            
        <div class="field">
            <label class="label">Body</label>
            <div class="control">
                <textarea class="textarea" bind:value={body} class:is-danger={errors.body}/>
            </div>
            {#if errors.body != null}
                <p class="help is-danger">{errors.body}</p>
            {/if}
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-link is-light">Submit</button>
            </div>
        </div>
    </form>
</div>


<style>
    .add-container{
        background: #fff;
        z-index: auto;
    }
    h1{
        padding: 12px 0px 5px 0;
        border-bottom: 1px solid #555;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 8px;
    }
    @media (max-width: 600px) {
        .add-container{
            font-size: .6rem;
        }
        label, option, textarea, input, select, button{
            font-size: .8rem;
        }
    }
</style>