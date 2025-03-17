let score = 0;
let cross = true;
// Ensure the scoreCont element is selected correctly
const scoreCont = document.querySelector(".scoreCont");

audio = new Audio("gameOver.mp3");
audiogo = new Audio("music.mp3");
setTimeout(() => {
    audiogo.play();
}, 1000);

document.onkeydown = function (e) {
    console.log("key code is: ", e.keyCode);
    if (e.keyCode == 38) { // Up arrow key (jump)
        const dino = document.querySelector(".dino");
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 700);
    }
    if (e.keyCode == 39) { // Right arrow key (move right)
        const dino = document.querySelector(".dino");
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) { // Left arrow key (move left)
        const dino = document.querySelector(".dino");
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX - 112) + "px";
    }
};

// Game loop
setInterval(() => {
    const dino = document.querySelector(".dino");
    const gameOver = document.querySelector(".gameOver");
    const obstacle = document.querySelector(".obstacle");

    // Get dino and obstacle positions
    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("bottom"));

    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("bottom"));

    // Calculate offsets for collision detection
    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    // Collision detection
    if (offsetX < 73 && offsetY < 52) { // Adjusted collision threshold
        // gameOver.style.visibility = 'visible'; // Show "Game Over"
        gameOver.innerHTML = "Game Over - Reload to play again!"
        obstacle.classList.remove('obstacleAni'); // Stop obstacle animation
        audio.play();
        setTimeout(() => {
            audiogo.pause();
            audio.stop();
        }, 1000);
    } 
    else if (offsetX < 115 && cross) {
        score += 1; // Increase score
        updateScore(score); // Update the score display
        cross = false; // Prevent multiple score updates for the same obstacle
        setTimeout(() => {
            cross = true; // Reset cross after 1 second
        }, 1000);

        // Increase obstacle speed over time
        setTimeout(() => {
            const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            const newDur = aniDur - 0.1; // Reduce animation duration to increase speed
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

// Function to update the score display
function updateScore(score) {
    if (scoreCont) { // Check if scoreCont exists
        scoreCont.innerHTML = "Your score : " + score;
    } 
};
