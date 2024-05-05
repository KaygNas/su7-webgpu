import { Engine3D, PointerEvent3D, Scene3D, View3D } from '@orillusion/core'
import { Stats } from '@orillusion/stats'
import * as TWEEN from '@tweenjs/tween.js'
import { BlackBackground, CameraObj, CarObj, SpeedupObj, StartroomObj } from './entities'

export class SceneSpeed {
  private touch = false
  private duration = 2780
  private prevTouchChange: null | (() => void) = null
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
    this.prevTouchChange?.()
    if (this.touch)
      this.prevTouchChange = this.darkenLight()
    else
      this.prevTouchChange = this.lightenLight()
  }

  /*
    将灯光调暗
  */
  private darkenLight() {
    const lightingMain = this.startroom.lightings[0]
    const lightingOthers = this.startroom.lightings.slice(1)
    const speedupShader = this.speedup.material.speedupShader
    const car = this.car
    const tweenCar = new TWEEN.Tween({}).to({})
      // eslint-disable-next-line unicorn/prefer-number-properties
      .repeat(Infinity)
      .onUpdate(() => {
        car.spinWheels()
      })
    const tween = new TWEEN.Tween({
      intensityMain: lightingMain.light.intensity,
      intnesityOthers: lightingOthers[1].light.intensity,
      speedFactor: speedupShader.speedFactor,
    })
      .to({
        intensityMain: 0.5,
        intnesityOthers: 1,
        speedFactor: 1,
      }, this.duration)
      .onUpdate(({
        intensityMain,
        intnesityOthers,
        speedFactor,
      }) => {
        lightingMain.light.intensity = intensityMain
        lightingOthers.forEach((light) => {
          light.light.intensity = intnesityOthers
        })
        speedupShader.speedFactor = speedFactor
        car.speedFactor = speedFactor
        car.spinWheels()
      })
    tween.easing(TWEEN.Easing.Quadratic.InOut)
    tween.chain(tweenCar)
    tween.start()
    return () => tween.stop()
  }

  /**
   * 将灯光调亮
   */
  private lightenLight() {
    const lightingMain = this.startroom.lightings[0]
    const lightingOthers = this.startroom.lightings.slice(1)
    const speedupShader = this.speedup.material.speedupShader
    const car = this.car
    const tween = new TWEEN.Tween({
      intensityMain: lightingMain.light.intensity,
      intnesityOthers: lightingOthers[1].light.intensity,
      speedFactor: speedupShader.speedFactor,
    })
      .to({
        intensityMain: 2.0,
        intnesityOthers: 3.0,
        speedFactor: 0,
      }, this.duration)
      .onUpdate(({
        intensityMain,
        intnesityOthers,
        speedFactor,
      }) => {
        lightingMain.light.intensity = intensityMain
        lightingOthers.forEach((light) => {
          light.light.intensity = intnesityOthers
        })
        speedupShader.speedFactor = speedFactor
        car.speedFactor = speedFactor
        car.spinWheels()
      })
    tween.easing(TWEEN.Easing.Quadratic.InOut)
    tween.start()
    return () => tween.stop()
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
