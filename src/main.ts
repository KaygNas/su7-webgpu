import { Engine3D } from '@orillusion/core'
import { SceneSpeed } from './scene-speed'

async function main() {
  await Engine3D.init()
  const sceneSpeed = await SceneSpeed.create()
  Engine3D.startRenderView(sceneSpeed.view)
}

main()
