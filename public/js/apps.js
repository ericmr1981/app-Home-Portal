/**
 * Apps Module
 * Manages app cards and navigation
 */
const Apps = (function() {
    // App configuration
    const DEFAULT_APPS = [
        {
            id: 'minesweeper',
            name: '扫雷游戏',
            icon: '💣',
            description: '经典的扫雷游戏，三种难度选择',
            path: '/minesweeper',
            tags: ['游戏', '休闲']
        }
    ];

    // Load apps configuration
    async function loadConfig() {
        try {
            const response = await fetch('/config/apps.json');
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Failed to load apps config, using defaults:', error);
        }
        return { apps: DEFAULT_APPS };
    }

    // Create app card element
    function createCard(app) {
        const card = document.createElement('a');
        card.className = 'app-card';
        card.href = app.path;
        card.innerHTML = `
            <div class="app-card-icon">${app.icon || '📱'}</div>
            <div class="app-card-title">${app.name}</div>
            <div class="app-card-description">${app.description}</div>
            <div class="app-card-meta">
                ${app.tags ? app.tags.map(tag => `<span class="app-card-tag">${tag}</span>`).join('') : ''}
                <span class="app-card-arrow">→</span>
            </div>
        `;
        return card;
    }

    // Render apps to grid
    function renderApps(apps) {
        const container = document.getElementById('apps-container');
        if (!container) return;

        container.innerHTML = '';
        apps.forEach(app => {
            container.appendChild(createCard(app));
        });
    }

    return {
        /**
         * Load and render apps
         */
        async loadApps() {
            const config = await loadConfig();
            renderApps(config.apps || []);
        },

        /**
         * Get all apps
         */
        async getApps() {
            const config = await loadConfig();
            return config.apps || [];
        }
    };
})();