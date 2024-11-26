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








/* Ai bot chat functionality */
document.addEventListener("DOMContentLoaded", () => {
    let chatbotIcon = document.getElementById("mughader_chatbot_icon");
    let chatSidebar = document.getElementById("mughader_chat_sidebar");
    let closeChat = document.getElementById("mughader_close_chat");
    let sendBtn = document.getElementById("mughader_send_btn");
    let messageBar = document.getElementById("mughader_message_bar");
    let messageBox = document.querySelector(".mughader_message_box");
    let chatOverlay = document.getElementById("mughader_chat_overlay");

    let API_URL = "https://api.openai.com/v1/chat/completions";
    let API_KEY = "sk-***76cA";

    /* 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 */

    // Check if the user is on a mobile device
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    // Open Slider if ai bot icon is clicked
    chatbotIcon.addEventListener("click", () => {
        chatSidebar.classList.add("active");
        chatOverlay.classList.add("active");
    });

    // Close Sidebar if close slider button is clicked
    closeChat.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
        chatOverlay.classList.remove("active");
    });

    // Close Sidebar if Overlay is Clicked
    chatOverlay.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
        chatOverlay.classList.remove("active");
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
                        ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                    });
            }, 100);



            document.getElementById("mughader_message_bar").style.height = "40px"; // Reset to default height;
        }
    };

    // Attach Send Message Function to Enter Key (for Desktop)
    if (!isMobileDevice) {
        messageBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault(); // Prevent default behavior
                sendBtn.click();
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault(); // Allow Shift+Enter to insert a new line
                const cursorPosition = messageBar.selectionStart;
                messageBar.value =
                    messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
                messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
                messageBar.style.height = "auto"; // Reset height to auto
                messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
            }
        });
    }

    // Enable Enter for New Line Only (for Mobile)
    if (isMobileDevice) {
        messageBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent sending the message
                const cursorPosition = messageBar.selectionStart;
                messageBar.value =
                    messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
                messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
                messageBar.style.height = "auto"; // Reset height to auto
                messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
            }
        });
    }

    // Adjust Textarea Height Dynamically
    messageBar.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height to auto
        this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
    });

    // Handle Dynamic Text Direction
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
});

/* Auto resize textarea element */
document.addEventListener("DOMContentLoaded", function () {
    const messageBar = document.getElementById("mughader_message_bar");

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







/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('mughader');

    const whatsappNumber = "+966533379004";
    const message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}



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
