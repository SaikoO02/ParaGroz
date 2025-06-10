function main() {
    initScreenSlider()
    initSeaBattle()
    initRating()
    initSmoothScroll()
    initRatingSlider()
    initCommentSlider()
    initPopup()
    initLinks()
}

function initPopup() {
    const feedbackButton = document.getElementById("sendFeedbackBtn")
    feedbackButton.addEventListener("click", (_) => {
        document.getElementById("popupFeedback").classList.add("active")
    })

    const registrationBtn = document.getElementById("registrationBtn")
    registrationBtn.addEventListener("click", (_) => {
        document.getElementById("popupRegistration").classList.add("active")
    })

    const closePopupWinnerBtn = document.getElementById("closePopupWinnerBtn")
    const closePopupLoserBtn = document.getElementById("closePopupLoserBtn")
    const closepopupFeedbackBtn = document.getElementById("closePopupFeedbackBtn")

    closePopupWinnerBtn.addEventListener("click", (_) => {
        document.getElementById("popupWinner").classList.remove("active")
        initSeaBattle()
    })
    closePopupLoserBtn.addEventListener("click", (_) => {
        document.getElementById("popupLoser").classList.remove("active")
        initSeaBattle()
    })
    closepopupFeedbackBtn.addEventListener("click", (_) => {
        document.getElementById("popupFeedback").classList.remove("active")
    })

    const closePopupRegistrationBtn = document.getElementById("closePopupRegistrationBtn")
    closePopupRegistrationBtn.addEventListener("click", (_) => {
        document.getElementById("popupRegistration").classList.remove("active")
    })
}

function initCommentSlider() {
    document.addEventListener('DOMContentLoaded', function () {
        const sliderTrack = document.querySelector('.slider-track')
        const slides = document.querySelectorAll('.slide')
        const leftButton = document.getElementById('reviewButtonLeft')
        const rightButton = document.getElementById('reviewButtonRight')

        let currentSlide = 0
        const slideCount = slides.length

        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`
        }

        function goToNextSlide() {
            currentSlide = (currentSlide + 1) % slideCount
            updateSlider()
        }

        function goToPrevSlide() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount
            updateSlider()
        }

        leftButton.addEventListener('click', goToPrevSlide)
        rightButton.addEventListener('click', goToNextSlide)

        updateSlider()
    })
}

function initRatingSlider() {
    document.addEventListener('DOMContentLoaded', function () {
        const hearts = document.querySelectorAll('.heart');
        let currentRating = 0;

        hearts.forEach(heart => {
            heart.querySelector('img').src = 'photo/heartHollow.svg';
        });

        hearts.forEach(heart => {
            heart.addEventListener('click', function () {
                const value = parseInt(this.getAttribute('data-value'));
                currentRating = value;

                hearts.forEach(h => {
                    if (parseInt(h.getAttribute('data-value')) <= value) {
                        h.querySelector('img').src = 'photo/heartFill.svg';
                    } else {
                        h.querySelector('img').src = 'photo/heartHollow.svg';
                    }
                });
            });

            heart.addEventListener('mouseover', function () {
                const value = parseInt(this.getAttribute('data-value'));

                hearts.forEach(h => {
                    if (parseInt(h.getAttribute('data-value')) <= value) {
                        h.querySelector('img').src = 'photo/heartFill.svg';
                    } else {
                        h.querySelector('img').src = 'photo/heartHollow.svg';
                    }
                });
            });

            heart.addEventListener('mouseout', function () {
                hearts.forEach(h => {
                    if (parseInt(h.getAttribute('data-value')) <= currentRating) {
                        h.querySelector('img').src = 'photo/heartFill.svg';
                    } else {
                        h.querySelector('img').src = 'photo/heartHollow.svg';
                    }
                });
            });
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

function initRating() {
    const ratingBtn = document.getElementById("ratingBtn")
    const ratingTable = document.getElementById("ratingTable")
    ratingBtn.addEventListener("click", (_) => {
        ratingTable.classList.toggle("hidden")
        ratingBtn.textContent = ratingTable.classList.contains("hidden") ? "Развернуть рейтинг участников" : "Cвернуть рейтинг участников"
    })
}

function initSeaBattle() {
    const battleFieldInfo = { 
        cols: 10, 
        rows: 7
    }
    const fieldsCount = battleFieldInfo.cols * battleFieldInfo.rows
    const battleFieldElement = document.getElementById("battleField")
    let shipPointIdx
    let gameOver = false
    let allMoves = new Set()
    let isComputerTurn = false

    function createGame() {
        battleFieldElement.innerHTML = ''
        shipPointIdx = getRandomNumber(0, fieldsCount - 1)
        gameOver = false
        allMoves.clear()
        isComputerTurn = false

        for (let i = 0; i < fieldsCount; i++) {
            const pointElement = document.createElement("div")
            pointElement.classList.add("dot")
            if (shipPointIdx === i) {
                pointElement.id = "shipPoint"
            }

            pointElement.addEventListener("click", (e) => {
                if (gameOver || isComputerTurn) return
                
                const pointIndex = Array.from(battleFieldElement.children).indexOf(pointElement)
                if (allMoves.has(pointIndex)) return
                
                allMoves.add(pointIndex)
                
                if (e.target.id === "shipPoint") {
                    pointElement.style.backgroundColor = "#1F8DD1"
                    gameOver = true
                    document.getElementById("popupWinner").classList.add("active")
                } else {
                    pointElement.style.backgroundColor = "#FF0031"
                    isComputerTurn = true
                    setTimeout(computerTurn, 500)
                }
            })
            
            battleFieldElement.appendChild(pointElement)
        }
    }

    function computerTurn() {
        if (gameOver) return

        let computerMove
        do {
            computerMove = getRandomNumber(0, fieldsCount - 1)
        } while (allMoves.has(computerMove))
        
        allMoves.add(computerMove)
        const computerPoint = battleFieldElement.children[computerMove]
        
        if (computerPoint.id === "shipPoint") {
            computerPoint.style.backgroundColor = "#1F8DD1"
            gameOver = true
            document.getElementById("popupLoser").classList.add("active")
        } else {
            computerPoint.style.backgroundColor = "#FF0031"
        }
        
        isComputerTurn = false
    }

    createGame()
}

function initScreenSlider() {
    const images = [
        "photo/Group 252.png",
        "photo/Group 234.png",
        "photo/Group 262.png",
        "photo/Group 263.png",
    ]
    let idx = 0
    
    const joyconLeftEleement = document.getElementById("joyconLeft")
    const joyconRightElement = document.getElementById("joyconRight")
    const screenElement = document.getElementById("screen")
    screenElement.src = images[idx]
    
    joyconLeftEleement.addEventListener('click', (_) => {
        if (idx - 1 < 0) {
            idx = images.length - 1
        } else {
            idx--
        }
    
        screenElement.src = images[idx]
    })
    
    joyconRightElement.addEventListener('click', (_) => {
        if (idx + 1 > images.length - 1) {
            idx = 0
        } else {
            idx++
        }
    
        screenElement.src = images[idx]
    })
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initLinks() {
    const tgImage = document.querySelector('.tg')
    const instagramImage = document.querySelector('.instagram')
    const fbImage = document.querySelector('.fb')
    const numberImage = document.querySelector('.number')

    tgImage.addEventListener('click', () => {
        window.open('https://web.telegram.org/k/#@Saiko0O2', '_blank')
    })
    instagramImage.addEventListener('click', () => {
        window.open('https://www.instagram.com/_itzdashkaa.aaa_?igsh=bTVmcmZwOTY4dWVq&utm_source=qr', '_blank')
    })
    fbImage.addEventListener('click', () => {
        window.open('https://www.facebook.com/profile.php?id=10008888888888888', '_blank')
    })
    numberImage.addEventListener('click', () => {
        window.open('https://wa.me/79999999999', '_blank')
    })
}

main()
