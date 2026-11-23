// Universal Fake Clicker for Adsterra/Ad Networks
(function() {
    let clickCount = 0;
    const maxClicks = 15; // You can increase this if needed
    const minDelay = 3000; 
    const maxDelay = 8000; 

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function simulateHumanClick(iframe) {
        if (clickCount >= maxClicks) {
            console.log("Max clicks reached.");
            return;
        }

        const rect = iframe.getBoundingClientRect();
        // Ensure the ad is actually visible and has dimensions
        if (rect.width === 0 || rect.height === 0 || rect.top < 0) {
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

    function startClicker() {
        // Find ANY iframe that looks like an ad (usually inside a container with 'ad' in class or src)
        const iframes = document.querySelectorAll('iframe');
        let found = false;
        
        for (let iframe of iframes) {
            // Check if it's an ad-related iframe (common patterns)
            if (iframe.src && (iframe.src.includes('ads') || iframe.src.includes('doubleclick') || iframe.src.includes('adsterra') || iframe.src.includes('ahuramazda'))) {
                console.log("Found ad iframe:", iframe.src);
                simulateHumanClick(iframe);
                found = true;
                break;
            }
        }
        
        if (!found) {
            // Retry after 2 seconds if no ad iframe found yet
            setTimeout(startClicker, 2000);
        }
    }

    // Initialize
    startClicker();
})();
