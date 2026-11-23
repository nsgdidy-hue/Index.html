// fake-clicker-humanized.js
// Targets ~1000 clicks/hour but with random delays to mimic human behavior

(function() {
    const TARGET_CLICKS_PER_HOUR = 1000;
    const AVG_INTERVAL_MS = (60 * 60 * 1000) / TARGET_CLICKS_PER_HOUR; // 3.6 seconds average
    
    function getRandomClickPosition(element) {
        const rect = element.getBoundingClientRect();
        // Ensure we click within the visible area of the iframe
        const x = Math.floor(Math.random() * rect.width);
        const y = Math.floor(Math.random() * rect.height);
        return { x, y };
    }

    function simulateClick(element) {
        const pos = getRandomClickPosition(element);
        
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: pos.x,
            clientY: pos.y
        });
        
        element.dispatchEvent(event);
        console.log(`Human-like click at (${pos.x}, ${pos.y})`);
    }

    function startAutoClicker() {
        let adIframe = document.querySelector('iframe[src*="ahuramazda"]');
        if (!adIframe) {
            adIframe = document.querySelector('iframe'); 
        }

        if (adIframe) {
            console.log("Starting Human-like Auto Clicker...");
            
            function scheduleNextClick() {
                // Add randomness: Interval between 2 seconds and 5 seconds
                // This averages out to ~3.5 seconds, close to 1000/hr
                const randomDelay = Math.floor(Math.random() * 3000) + 2000; 
                
                setTimeout(() => {
                    try {
                        simulateClick(adIframe);
                    } catch (e) {
                        adIframe.click();
                    }
                    scheduleNextClick(); // Schedule next click after this one finishes
                }, randomDelay);
            }
            
            scheduleNextClick();
        } else {
            console.log("Waiting for ad iframe...");
            setTimeout(startAutoClicker, 5000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAutoClicker);
    } else {
        startAutoClicker();
    }
})();
