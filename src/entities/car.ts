import { Engine3D } from '@orillusion/core'
import { joinStaticBaseUrl } from '@/utils'

export class CarObj {
  private constructor() {}

  static async create() {
    const carObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_car/sm_car.gltf'))
    // add material to car
    await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_car_body_AO.raw.jpg'))
    return carObj
  }
}
