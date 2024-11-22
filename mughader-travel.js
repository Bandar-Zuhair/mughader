function toggleSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    if (sidebar.style.right === "0px") {
        closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
}











/* Switching words functionality */
document.addEventListener("DOMContentLoaded", function () {
    const words = [
        "إندونيسيا",
        "تايلاند",
        "المالديف",
        "موريشيوس",
        "عروض سياحية",
        "جورجيا",
        "تركيا",
        "اذربيجان",
        "البوسنة",
        "سيريلانكا",
        "ماليزيا",
        "دبي",
        "مصر",
        "الجبل الأسود"
    ];

    let currentIndex = 1;
    const dynamicWordElement = document.getElementById("mughader_dynamic_word_switch");
    const lineTimerElement = document.getElementById("mughader_line_timer");

    // Ensure the initial word is visible
    dynamicWordElement.classList.add("visible");

    function updateTimerWidth() {
        const wordWidth = dynamicWordElement.offsetWidth; // Get the width of the current word
        const scaledWidth = wordWidth * 0.1; // Adjust width to 40% of the word's width (smaller)
        lineTimerElement.style.width = `${scaledWidth}px`; // Set timer line width
        lineTimerElement.style.margin = "0 auto"; // Center the timer under the text
    }

    function resetTimer() {
        lineTimerElement.style.transition = "none"; // Disable transition to reset instantly
        lineTimerElement.style.width = "0"; // Reset width to 0
        setTimeout(() => {
            lineTimerElement.style.transition = "width 1.8s linear"; // Reapply transition
            lineTimerElement.style.width = `${dynamicWordElement.offsetWidth * 0.1}px`; // Start animation
        }, 50); // Small delay to ensure transition is reapplied
    }

    function changeWord() {
        // Fade out by removing 'visible' class
        dynamicWordElement.classList.remove("visible");

        setTimeout(() => {
            // Change word
            dynamicWordElement.innerText = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;

            // Fade in by adding 'visible' class
            dynamicWordElement.classList.add("visible");

            // Update timer width
            updateTimerWidth();
        }, 300); // Match CSS fade duration

        // Reset and start the timer line animation
        resetTimer();
    }

    // Start the loop
    setInterval(changeWord, 1800); // Match the timer line animation duration

    // Adjust the timer width for the initial word
    updateTimerWidth();
    resetTimer(); // Start timer animation for the first word
});









// Select the element
const fadingText = document.getElementById("mughader_fading_animation");

// Function to apply the fade-in-out animation
function applyFadingAnimation() {
    let opacity = 1; // Start fully visible
    let fadingOut = true; // Indicates the current fading direction

    setInterval(() => {
        // Adjust opacity based on the current direction
        opacity = fadingOut ? opacity - 0.05 : opacity + 0.05;

        // Update the element's style
        fadingText.style.opacity = opacity;

        // Reverse direction when reaching the limits
        if (opacity <= 0) fadingOut = false; // Start fading in
        if (opacity >= 1) fadingOut = true; // Start fading out
    }, 50); // Adjust this value to change the speed of fading
}

// Initialize the animation
applyFadingAnimation();



















/* Function for all elements when scrolling */
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".mughader_animate_on_scroll");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // Check if the element is intersecting and hasn't been animated before
            if (entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.add("intro_animation", "animation_done");
                entry.target.classList.remove("outro_animation");
            } else if (!entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.remove("intro_animation");
                entry.target.classList.add("outro_animation");
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});










document.addEventListener("DOMContentLoaded", () => {
    let chatbotIcon = document.getElementById("chatbot-icon");
    let chatSidebar = document.getElementById("chat-sidebar");
    let closeChat = document.getElementById("close-chat");
    let sendBtn = document.getElementById("send-btn");
    let messageBar = document.getElementById("message-bar");
    let messageBox = document.querySelector(".message-box");

    let API_URL = "https://api.openai.com/v1/chat/completions";
    let API_KEY = "sk-***76cA";
    /* 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 */

    // Toggle Chat Sidebar
    chatbotIcon.addEventListener("click", () => {
        chatSidebar.classList.add("active");
    });

    closeChat.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
    });

    // Send Message Function
    sendBtn.onclick = function () {
        if (messageBar.value.trim() !== "") {
            let UserTypedMessage = messageBar.value.trim();
            messageBar.value = "";

            let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

            let botResponse = `
                <div class="chat response">
                    <img src="مكتب-سياحي/مكتب-سياحي-حائل.jpg">
                    <span class="new">...</span>
                </div>
            `;

            messageBox.insertAdjacentHTML("beforeend", userMessage);

            setTimeout(() => {
                messageBox.insertAdjacentHTML("beforeend", botResponse);

                let requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: UserTypedMessage }]
                    })
                };

                fetch(API_URL, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        let ChatBotResponse = document.querySelector(".response .new");
                        ChatBotResponse.innerHTML = data.choices[0].message.content;
                        ChatBotResponse.classList.remove("new");
                    })
                    .catch(() => {
                        let ChatBotResponse = document.querySelector(".response .new");
                        ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again.";
                    });
            }, 100);
        }
    };

    // Attach Send Message Function to Enter Key
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior
            sendBtn.click();
        } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // Prevent default behavior
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const messageBar = document.getElementById("message-bar");

    messageBar.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height to auto
        this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
    });
});

/* Function to trach the first inserted letter in the inputs with the class name of "mughader_dynamic_direction_input_class" to set their direction value */
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});













// Create and append script for 'Ionicons' Website Icons (Module Script)
let ioniconsModuleScript = document.createElement('script');
ioniconsModuleScript.type = 'module';
ioniconsModuleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
document.body.appendChild(ioniconsModuleScript);

// Create and append script for 'Ionicons' Website Icons (Module Script)
let ioniconsNomoduleScript = document.createElement('script');
ioniconsNomoduleScript.setAttribute('nomodule', '');
ioniconsNomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
document.body.appendChild(ioniconsNomoduleScript);
