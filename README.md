## MQ 自动报警助手
### 不同点
已有的 MQ 管理工具都可以提供基本 GUI 展示的功能，但不提供通知告警的功能

### 优点
- 轻量，代码量很小
- 基于配置即可完成

###  如何使用
#### node 运行

需要修改的配置在 common/config.js 下
在mqs内增加配置
```
        {
            name: 'demo mq',
            host: "10.1.1.1",
            port: 15672,
            user: "admin",
            password: "admin",
            maxConnection: 100,
            maxChannels:100,
        }
```

```
nvm use
npm run main.js
```
