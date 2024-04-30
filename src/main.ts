import {
  AtmosphericComponent,
  Camera3D,
  Color,
  DirectLight,
  Engine3D,
  LitMaterial,
  MeshRenderer,
  Object3D,
  OrbitController,
  Scene3D,
  SphereGeometry,
  UnLitMaterial,
  Vector3,
  View3D,
} from '@orillusion/core'
import CAR_MODEL_URL from '@static/models/sm_car/sm_car.gltf?url'
import SPEEDUP_MODEL_URL from '@static/models/sm_speedup/sm_speedup.gltf?url'
import STARTROOM_MODEL_URL from '@static/models/sm_startroom/sm_startroom.gltf?url'

async function init() {
  await Engine3D.init()

  const scene3D = new Scene3D()

  // scene3D.envMap

  // 新建摄像机实例
  const cameraObj = new Object3D()
  cameraObj.localPosition.set(0, 2, 5)
  const camera = cameraObj.addComponent(Camera3D)
  // 根据窗口大小设置摄像机视角
  camera.perspective(45, window.innerWidth / window.innerHeight, 0.1, 500.0)
  // 设置相机控制器
  const controller = camera.object3D.addComponent(OrbitController)
  controller.minDistance = 3
  controller.maxDistance = 7
  controller.minPolarAngle = 0
  controller.maxPolarAngle = (90 - 1) * (Math.PI * 2 / 360)
  // 添加相机节点
  scene3D.addChild(cameraObj)

  const carObj = await Engine3D.res.loadGltf(CAR_MODEL_URL)
  scene3D.addChild(carObj)

  const startroomObj = await Engine3D.res.loadGltf(STARTROOM_MODEL_URL)
  // add material to light
  const lightObj = startroomObj.getChildByName('light.001') as Object3D
  const lightMr = lightObj.getComponentsInChild(MeshRenderer)[0]
  const lightMat = new LitMaterial()
  lightMr.material = lightMat
  lightMat.emissiveColor = new Color(1, 1, 1, 1)
  lightMat.emissiveIntensity = 1
  lightMat.transparent = true
  lightMat.alphaCutoff = 0.01

  // add material to floor

  scene3D.addChild(startroomObj)

  const speedupObj = await Engine3D.res.loadGltf(SPEEDUP_MODEL_URL)
  scene3D.addChild(speedupObj)

  // 创建View3D对象
  const view = new View3D()
  // 指定渲染的场景
  view.scene = scene3D
  // 指定使用的相机
  view.camera = camera
  // 开始渲染
  Engine3D.startRenderView(view)
}

init()
