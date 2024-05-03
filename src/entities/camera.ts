import { Camera3D, Object3D, OrbitController } from '@orillusion/core'

export class CameraObj extends Object3D {
  camera: Camera3D
  constructor() {
    super()
    this.localPosition.set(0, 2, 5)

    const camera = this.addComponent(Camera3D)
    // 根据窗口大小设置摄像机视角
    camera.perspective(45, window.innerWidth / window.innerHeight, 0.1, 500.0)
    this.camera = camera

    // 设置相机控制器
    const controller = camera.object3D.addComponent(OrbitController)
    controller.minDistance = 3
    controller.maxDistance = 7
    controller.minPolarAngle = 0
    controller.maxPolarAngle = (90 - 1) * (Math.PI * 2 / 360)
  }
}
