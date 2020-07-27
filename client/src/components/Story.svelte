<script>
    export let story;

    let {user} = story;

    let src = `images/${story.image}`;
</script>



<div class="card">
  <div class="card-image">
  
        <h1>{story.title}</h1>
    <figure class="image is-4by3">
        <img {src} alt="Storyphoto">   
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="{user.image}" alt="ProfilePhoto">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{user.displayName}</p>
        <!-- <p class="subtitle is-6">@johnsmith</p> -->
      </div>
    </div>

    <div class="content">
        {story.body}
      <br>
      <time datetime="2016-1-1">{new Date(story.createdAt).toDateString()}</time>
    </div>
  </div>
</div>

<style>
    .card{
        min-width: 50%;
    }
    h1{
        font-size: 15px;
        padding: 15px;
        text-transform: uppercase;
        letter-spacing: 4px;
    }
    time{
        font-size: 12px;
    }

    @media (max-width: 600px) {
      .content{
        font-size: 14px;  
      }
    }
</style>