import { Engine3D, MeshRenderer, Object3D } from '@orillusion/core'
import { SpeedupMaterial } from '@/materials'
import { joinStaticBaseUrl } from '@/utils'

export class SpeedupObj extends Object3D {
  private constructor(
    public material: SpeedupMaterial,
    speedup: Object3D,
  ) {
    super()
    Object.assign(this, speedup)
  }

  static async create() {
    const _speedupObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_speedup/sm_speedup.gltf'))
    const speedupMat = new SpeedupMaterial()
    const speedupObj = new SpeedupObj(speedupMat, _speedupObj)
    const speedupMr = speedupObj.getComponentsInChild(MeshRenderer)[0]
    speedupMr.material = speedupMat
    return speedupObj
  }
}
