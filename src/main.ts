import {
  AtmosphericComponent,
  BoxGeometry,
  Camera3D,
  DirectLight,
  Engine3D,
  HoverCameraController,
  LitMaterial,
  MeshRenderer,
  Object3D,
  Scene3D,
  View3D,
} from '@orillusion/core'

async function init() {
  await Engine3D.init()
  const scene3D = new Scene3D()
  // 添加大气散射天空组件
  const sky = scene3D.addComponent(AtmosphericComponent)

  // 新建摄像机实例
  const cameraObj = new Object3D()
  const camera = cameraObj.addComponent(Camera3D)
  // 根据窗口大小设置摄像机视角
  camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0)
  // 设置相机控制器
  const controller = camera.object3D.addComponent(HoverCameraController)
  controller.setCamera(0, 0, 15)
  // 添加相机节点
  scene3D.addChild(cameraObj)

  // 新建光照
  const light = new Object3D()
  // 添加直接光组件
  const component = light.addComponent(DirectLight)
  // 调整光照参数
  light.rotationX = 45
  light.rotationY = 30
  component.intensity = 2
  // 添加光照对象
  scene3D.addChild(light)

  // 新建对象
  const obj = new Object3D()
  // 为对象添 MeshRenderer
  const mr = obj.addComponent(MeshRenderer)
  // 设置几何体
  mr.geometry = new BoxGeometry(5, 5, 5)
  // 设置材质
  mr.material = new LitMaterial()
  scene3D.addChild(obj)

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
