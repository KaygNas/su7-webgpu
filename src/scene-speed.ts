import { Engine3D, PointerEvent3D, Scene3D, View3D } from '@orillusion/core'
import { Stats } from '@orillusion/stats'
import { BlackBackground, CameraObj, CarObj, SpeedupObj, StartroomObj } from './entities'

export class SceneSpeed {
  private touch = false
  private constructor(
    public view: View3D,
    public scene: Scene3D,
    public car: CarObj,
    public startroom: StartroomObj,
    public speedup: SpeedupObj,
  ) {
    this.init()
  }

  private init() {
    this.initListener()
  }

  private initListener() {
    Engine3D.inputSystem.addEventListener(PointerEvent3D.POINTER_DOWN, () => {
      this.touch = true
      this.onTouchChange()
    }, this)
    Engine3D.inputSystem.addEventListener(PointerEvent3D.POINTER_UP, () => {
      this.touch = false
      this.onTouchChange()
    }, this)
  }

  private onTouchChange() {
    if (this.touch)
      this.darkenLight()
    else
      this.lightenLight()
  }

  /*
    将灯光调暗
  */
  private darkenLight() {
    this.startroom.lightings.forEach((light, i) => {
      if (i === 0)
        light.light.intensity = 0.5
      else
        light.light.intensity = 0.1
    })
    this.startroom.lightMat.emissiveColor.a = 0
    this.startroom.lightMat.baseColor.a = 0
  }

  /**
   * 将灯光调亮
   */
  private lightenLight() {
    this.startroom.lightings.forEach((light) => {
      light.light.intensity = 1
    })
  }

  static async create() {
    const scene3D = new Scene3D()
    const [
      carObj,
      startroomObj,
      speedupObj,
    ] = await Promise.all([
      CarObj.create(),
      StartroomObj.create(),
      SpeedupObj.create(),
    ])

    scene3D.addChild(carObj)
    scene3D.addChild(startroomObj)
    scene3D.addChild(speedupObj)

    BlackBackground.create(scene3D)
    scene3D.addComponent(Stats)

    const cameraObj = new CameraObj()
    scene3D.addChild(cameraObj)

    // 创建View3D对象
    const view = new View3D()
    // 指定渲染的场景
    view.scene = scene3D
    // 指定使用的相机
    view.camera = cameraObj.camera

    const sceneSpeed = new SceneSpeed(
      view,
      scene3D,
      carObj,
      startroomObj,
      speedupObj,
    )

    return sceneSpeed
  }
}
