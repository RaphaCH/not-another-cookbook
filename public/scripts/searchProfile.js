const searchBar = document.getElementById('search_bar')
const sugg = document.querySelector('.suggestions')

searchBar.addEventListener('keyup', (event) => {
  if (!searchBar.value == "") {
    searchProfiles(searchBar.value)
  } else {
    sugg.innerHTML = ""
  }

})


const searchProfiles = (input) => {
  fetch("profiles/search", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_input: input })
  })
    .then(response => response.json())
    .then(data => {
      sugg.innerHTML = ""
      data.data.forEach((profile) => {
        sugg.insertAdjacentHTML('beforeend', `
        <a href="/profiles/show/${profile._id}">
          <div class="suggestion">
            <div class="avatar"></div>
            <div class="name">${profile.username}</div>
          </div>
        </a>
        `)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}