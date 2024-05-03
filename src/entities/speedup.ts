import { Engine3D, MeshRenderer, Object3D } from '@orillusion/core'
import { SpeedupMaterial } from '@/materials'
import { joinStaticBaseUrl } from '@/utils'

export class SpeedupObj extends Object3D {
  private constructor(speedup: Object3D) {
    super()
    Object.assign(this, speedup)
  }

  static async create() {
    const _speedupObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_speedup/sm_speedup.gltf'))
    const speedupObj = new SpeedupObj(_speedupObj)
    const speedupMr = speedupObj.getComponentsInChild(MeshRenderer)[0]
    const speedupMat = new SpeedupMaterial()
    speedupMr.material = speedupMat
    return speedupObj
  }
}
