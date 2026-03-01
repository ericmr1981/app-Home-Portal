/**
 * Authentication Module
 * Handles login, logout, and session management
 */
const Auth = (function() {
    // Configuration
    const COOKIE_NAME = 'portal_auth';
    const COOKIE_EXPIRY_DAYS = 7;
    // Default password hash (SHA-256 of "123456")
    const DEFAULT_PASSWORD_HASH = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

    // Hash password using SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Set cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + value + ';' + expires + ';path=/;SameSite=Lax';
    }

    // Get cookie value
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Delete cookie
    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }

    // Public methods
    return {
        /**
         * Login with password
         * @param {string} password - The password to verify
         * @returns {Promise<boolean>} - True if login successful
         */
        async login(password) {
            try {
                const passwordHash = await hashPassword(password);
                if (passwordHash === DEFAULT_PASSWORD_HASH) {
                    // Create session token (timestamp + random)
                    const token = Date.now().toString(36) + Math.random().toString(36).substr(2);
                    setCookie(COOKIE_NAME, token, COOKIE_EXPIRY_DAYS);
                    return true;
                }
                return false;
            } catch (error) {
                console.error('Login error:', error);
                return false;
            }
        },

        /**
         * Check if user is logged in
         * @returns {boolean}
         */
        isLoggedIn() {
            return getCookie(COOKIE_NAME) !== null;
        },

        /**
         * Logout and clear session
         */
        logout() {
            deleteCookie(COOKIE_NAME);
            window.location.href = '/login.html';
        },

        /**
         * Get session token
         * @returns {string|null}
         */
        getToken() {
            return getCookie(COOKIE_NAME);
        }
    };
})();