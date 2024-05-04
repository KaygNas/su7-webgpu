import { Engine3D, Object3D } from '@orillusion/core'
import { joinStaticBaseUrl } from '@/utils'

export class CarObj extends Object3D {
  wheels: Object3D[]
  speedFactor: number = 0
  private constructor(carObj: Object3D) {
    super()
    Object.assign(this, carObj)
    const wheels = this.entityChildren.slice(0, 4) as Object3D[]
    this.wheels = wheels
  }

  spinWheels(speedFactor: number = this.speedFactor) {
    this.wheels.forEach((wheel) => {
      wheel.transform.rotationX -= 10 * speedFactor
    })
  }

  static async create() {
    const carObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_car/sm_car.gltf'))
    // add material to car
    await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_car_body_AO.raw.jpg'))
    return new CarObj(carObj)
  }
}
