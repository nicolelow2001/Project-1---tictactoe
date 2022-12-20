

const tiles = document.querySelectorAll('.tile')

for (let tile of tiles) {
    tile.addEventListener('click', function(event) {
        const newImg = document.createElement('img')
        newImg.classList.add('x-piece')
        newImg.src = 'images/x.png'
        newImg.alt = 'X piece'
        
        event.target.append(newImg)
    }) 
}
