const publishBtn = document.getElementById('publishBtn');
const postInput = document.getElementById('postInput');
const feed = document.getElementById('feed');

publishBtn.addEventListener('click', () => {

  const text = postInput.value.trim();

  if(text === ''){
    alert('Digite algo para publicar!');
    return;
  }

  const post = document.createElement('article');

  post.classList.add('post');

  post.innerHTML = `

    <div class="post-header">

      <img src="https://i.pravatar.cc/100?img=${Math.floor(Math.random()*70)}">

      <div>
        <h4>Usuário Verde</h4>
        <span>Agora mesmo</span>
      </div>

    </div>

    <p>${text}</p>

    <img
      class="post-image"
      src="https://source.unsplash.com/1200x700/?nature,forest,eco"
      alt=""
    >

    <div class="post-actions">

      <button class="like-btn">
        ❤️ <span>0</span>
      </button>

      <button class="comment-btn">
        💬 Comentários
      </button>

    </div>

    <div class="comments">

      <input
        type="text"
        placeholder="Escreva um comentário..."
      >

      <button>
        Enviar
      </button>

      <div class="comment-list"></div>

    </div>

  `;

  feed.prepend(post);

  postInput.value = '';

  activatePost(post);

});

function activatePost(post){

  const likeBtn = post.querySelector('.like-btn');
  const likeNumber = likeBtn.querySelector('span');

  let likes = parseInt(likeNumber.innerText);

  likeBtn.addEventListener('click', () => {

    likes++;

    likeNumber.innerText = likes;

    likeBtn.style.transform = 'scale(1.1)';

    setTimeout(() => {
      likeBtn.style.transform = 'scale(1)';
    }, 200);

  });

  const commentInput = post.querySelector('.comments input');
  const commentBtn = post.querySelector('.comments button');
  const commentList = post.querySelector('.comment-list');

  commentBtn.addEventListener('click', () => {

    const text = commentInput.value.trim();

    if(text === '') return;

    const comment = document.createElement('div');

    comment.classList.add('comment-item');

    comment.innerText = text;

    commentList.appendChild(comment);

    commentInput.value = '';

  });

}

const posts = document.querySelectorAll('.post');

posts.forEach(post => activatePost(post));