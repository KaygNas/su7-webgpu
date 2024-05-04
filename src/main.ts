import { Engine3D } from '@orillusion/core'
import * as TWEEN from '@tweenjs/tween.js'
import { SceneSpeed } from './scene-speed'

async function main() {
  await Engine3D.init({
    beforeRender: () => {
      TWEEN.update()
    },
  })
  const sceneSpeed = await SceneSpeed.create()
  Engine3D.startRenderView(sceneSpeed.view)
}

main()
