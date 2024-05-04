import { Engine3D } from '@orillusion/core'
import * as TWEEN from '@tweenjs/tween.js'
import { SceneSpeed } from './scene-speed'

async function main() {
  Engine3D.setting.shadow.type = 'SOFT' // 默认 PCF

  await Engine3D.init({
    beforeRender: () => {
      TWEEN.update()
    },
  })
  const sceneSpeed = await SceneSpeed.create()
  Engine3D.startRenderView(sceneSpeed.view)
}

main()
