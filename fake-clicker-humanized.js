// Humanized Fake Clicker for Adsterra/Ahuramazda
(function() {
    let clickCount = 0;
    const maxClicks = 15; // Adjust as needed
    const minDelay = 4000; // Min delay between clicks in ms
    const maxDelay = 12000; // Max delay between clicks in ms

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function simulateHumanClick(iframe) {
        if (clickCount >= maxClicks) {
            console.log("Max clicks reached.");
            return;
        }

        const rect = iframe.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            console.log("Ad iframe not visible yet.");
            return;
        }

        // Random position within the ad banner
        const x = randomInt(0, rect.width);
        const y = randomInt(0, rect.height);

        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: rect.left + x,
            clientY: rect.top + y
        });
        
        iframe.dispatchEvent(clickEvent);
        clickCount++;
        console.log(`Click sent at (${x}, ${y}) - Total: ${clickCount}`);
        
        // Schedule next click with human-like delay
        const nextDelay = randomInt(minDelay, maxDelay);
        setTimeout(() => simulateHumanClick(iframe), nextDelay);
    }

    // Start the clicker
    function startClicker() {
        const iframe = document.querySelector('iframe[src*="ahuramazda"]') || document.querySelector('iframe');
        if (iframe) {
            simulateHumanClick(iframe);
        } else {
            console.log("Waiting for iframe...");
            setTimeout(startClicker, 1000);
        }
    }

    // Initialize
    startClicker();
})();
