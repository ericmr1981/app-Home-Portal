# 🏠 个人应用门户 (Personal App Portal)

一个简约的个人主页，作为开发小程序的统一入口，支持密码认证和卡片式应用展示。

## ✨ 特性

- 🔐 **简单密码认证** - 保护你的私人应用
- 🎴 **卡片式布局** - 美观展示各个小程序
- 📅 **实时日期时间** - 首页显示当前日期和时间
- 🎨 **简约设计** - 现代化 UI，响应式布局
- 🔗 **统一入口** - 子应用需要通过门户访问
- 🔑 **Session 共享** - 通过 Cookie 实现登录状态共享

## 🚀 快速开始

### 本地开发

```bash
# 启动简单 HTTP 服务器（用于测试）
cd public
python3 -m http.server 8080

# 访问 http://localhost:8080/login.html
```

### 部署到 VPS

```bash
# 1. 确保已安装 Nginx
sudo apt update && sudo apt install nginx -y

# 2. 运行部署脚本
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 📁 项目结构

```
app-Home-Portal/
├── public/
│   ├── index.html          # 主门户页面
│   ├── login.html          # 登录页面
│   ├── css/
│   │   └── style.css       # 简约风格样式
│   └── js/
│       ├── auth.js         # 认证模块
│       ├── apps.js         # 应用卡片管理
│       └── time.js         # 日期时间显示
├── config/
│   └── apps.json           # 应用配置
├── nginx/
│   └── nginx.conf          # Nginx 配置
├── scripts/
│   └── deploy.sh           # 部署脚本
└── README.md
```

## 🔐 认证说明

### 默认密码

默认密码是 `123456`，密码存储为 SHA-256 哈希值。

### 修改密码

1. 生成新密码的 SHA-256 哈希：

```bash
echo -n "your_password" | sha256sum
```

2. 编辑 `public/js/auth.js`，更新 `DEFAULT_PASSWORD_HASH`：

```javascript
const DEFAULT_PASSWORD_HASH = 'your_new_hash_here';
```

3. 重新部署。

### 子应用认证

Nginx 会检查 `portal_auth` Cookie，未登录用户访问子应用时会重定向到登录页。

## 🎮 添加新应用

编辑 `config/apps.json` 添加新的应用卡片：

```json
{
  "apps": [
    {
      "id": "minesweeper",
      "name": "扫雷游戏",
      "icon": "💣",
      "description": "经典的扫雷游戏",
      "path": "/minesweeper",
      "tags": ["游戏", "休闲"]
    },
    {
      "id": "myapp",
      "name": "我的应用",
      "icon": "🚀",
      "description": "应用描述",
      "path": "/myapp",
      "tags": ["工具"]
    }
  ]
}
```

## 🔗 子应用接入

### Nginx 配置

在 `nginx/nginx.conf` 中添加反向代理规则：

```nginx
location ~ ^/myapp {
    error_page 418 = @login_redirect;
    if ($cookie_portal_auth = "") {
        return 418;
    }

    proxy_pass http://localhost:PORT;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    rewrite ^/myapp(.*)$ $1 break;
}
```

### 子应用验证（可选）

如果子应用需要验证登录状态，可以检查 Cookie：

```javascript
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

if (!getCookie('portal_auth')) {
    window.location.href = '/';
}
```

## 🎨 定制化

### 修改样式

编辑 `public/css/style.css` 中的 CSS 变量：

```css
:root {
    --color-primary: #3b82f6;      /* 主色调 */
    --color-bg: #f8fafc;           /* 背景色 */
    /* ... 更多变量 */
}
```

### 修改标题

编辑 `public/index.html` 和 `public/login.html` 中的 `<title>` 和 `<h1>` 标签。

## 🛠️ 技术栈

- **前端**: 纯 HTML5 + CSS3 + JavaScript (ES6+)
- **服务器**: Nginx
- **认证**: Cookie-based Session
- **风格**: 简约现代设计

## 📦 端口规划

| 应用 | 端口 | 路径 |
|------|------|------|
| Portal | 80 (Nginx) | `/` |
| 扫雷游戏 | 8081 | `/minesweeper` |
| 预留应用 | 8082+ | `/app2`, `/app3`, ... |

## 📝 注意事项

1. 默认使用 HTTP，如需 HTTPS 请配置 SSL 证书
2. Cookie 设置为 `SameSite=Lax`，防止 CSRF
3. Session 有效期为 7 天
4. 子应用必须通过门户访问才能获得登录状态

## 📄 License

MIT License

---

**享受你的个人应用门户！** 🎉