## su7-webpgu

使用 [Orillusion](https://www.orillusion.com/) 复刻的小米SU7 交互特效。

- 原版: https://gamemcu.com/su7/
- 复刻版: https://kaygnas.github.io/su7-webgpu/
- 参考版: https://su7-demo.vercel.app/ ([GitHub](https://github.com/KallkaGo/su7-demo))

目前与参考版有很大差距，包括：

### 光照

- 由于设置环境光时天空贴图也会变成白色，但加速的特效需要黑色背景所以通过手动设置光源
- 缺少反射，不知道怎样才能让车表面反射特效的环境颜色

### 阴影

- 地面的阴影过于重，不知道如何优化

### 动画

- 顶灯应该在触摸时消失，还不知道怎么将某个物体渐隐消失
