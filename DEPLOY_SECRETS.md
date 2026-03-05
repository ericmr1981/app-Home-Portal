# GitHub Secrets 配置说明

## 📍 在哪里配置

1. 打开 https://github.com/ericmr1981/app-Home-Portal/settings/secrets/actions
2. 点击 **New repository secret**
3. 添加以下 4 个 Secrets

---

## 🔐 需要配置的 Secrets

### 1. VPS_HOST
```
Name:  VPS_HOST
Value: 112.124.18.246
```

### 2. VPS_USERNAME
```
Name:  VPS_USERNAME
Value: root
```

### 3. VPS_PORT
```
Name:  VPS_PORT
Value: 22
```

### 4. VPS_PASSWORD
```
Name:  VPS_PASSWORD
Value: Souledge1981
```

---

## ✅ 配置完成后

1. 推送代码到 main 分支会自动触发部署
2. 查看部署状态：https://github.com/ericmr1981/app-Home-Portal/actions
3. 部署成功后访问：http://112.124.18.246/dino-adventure/

---

## 🧪 测试部署

推送任意更改到 main 分支：
```bash
cd /Users/ericmr/Documents/GitHub/app-Home-Portal
echo "# Test" >> README.md
git add README.md
git commit -m "test: trigger deployment"
git push
```

然后查看 Actions 标签页确认部署成功！
