/**
 * Time Display Module
 * Displays current date and time
 */
const TimeDisplay = (function() {
    let updateInterval;

    // Format date in Chinese
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('zh-CN', options);
    }

    // Format time
    function formatTime(date) {
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    // Update display
    function update() {
        const now = new Date();
        const dateEl = document.getElementById('current-date');
        const timeEl = document.getElementById('current-time');

        if (dateEl) dateEl.textContent = formatDate(now);
        if (timeEl) timeEl.textContent = formatTime(now);
    }

    return {
        /**
         * Initialize time display
         */
        init() {
            update();
            updateInterval = setInterval(update, 1000);
        },

        /**
         * Stop time display
         */
        stop() {
            if (updateInterval) {
                clearInterval(updateInterval);
                updateInterval = null;
            }
        }
    };
})();