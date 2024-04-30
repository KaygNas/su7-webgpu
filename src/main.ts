import {
  Camera3D,
  Color,
  Engine3D,
  LitMaterial,
  MeshRenderer,
  Object3D,
  OrbitController,
  RenderShaderPass,
  Scene3D,
  Shader,
  ShaderLib,
  SkyRenderer,
  SolidColorSky,
  View3D,
} from '@orillusion/core'
import speedupShader from './shaders/speedup.wgsl?raw'
import { joinStaticBaseUrl } from '@/utils'

async function init() {
  await Engine3D.init()

  const scene3D = new Scene3D()

  // Create a solid color map
  const colorSky = new SolidColorSky(new Color(1, 1, 1, 1))
  // Add SkyRenderer component, then set map texture
  const sky = scene3D.addComponent(SkyRenderer)
  sky.map = colorSky
  sky.exposure = 60

  // Set monochrome ambient light at the same time
  scene3D.envMap = colorSky

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

  const carObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_car/sm_car.gltf'))
  // add material to car
  const aoMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_car_body_AO.raw.jpg'))
  const carMr = carObj.getComponentsInChild(MeshRenderer)[0]
  const carMat = new LitMaterial()
  const carBodyColor = new Color()
  carBodyColor.setHex('#26D6E9')
  carMat.baseColor = carBodyColor
  carMat.aoMap = aoMap
  carMr.material = carMat
  scene3D.addChild(carObj)

  const startroomObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_startroom/sm_startroom.gltf'))

  // add material to light
  const lightObj = startroomObj.getChildByName('light.001') as Object3D
  const lightMr = lightObj.getComponentsInChild(MeshRenderer)[0]
  const lightMat = new LitMaterial()
  lightMat.emissiveColor = new Color(1, 1, 1, 1)
  lightMat.emissiveIntensity = 1
  lightMat.transparent = true
  lightMat.alphaCutoff = 0.01
  lightMr.material = lightMat

  // add material to floor
  // const lightMap = await Engine3D.res.loadTexture('/textures/t_startroom_light.raw.jpg')
  const startRoomAoMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_startroom_ao.raw.jpg'))
  const floorroughnessMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_floor_roughness.webp'))
  const floornormalMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_floor_normal.webp'))
  const floorObj = startroomObj.getChildByName('ReflecFloor') as Object3D
  const floorMr = floorObj.getComponentsInChild(MeshRenderer)[0]
  const floorMat = new LitMaterial()
  floorMat.clearCoatRoughnessMap = floorroughnessMap
  floorMat.aoMap = startRoomAoMap
  floorMat.normalMap = floornormalMap
  floorMr.material = floorMat

  scene3D.addChild(startroomObj)

  const speedupObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_speedup/sm_speedup.gltf'))
  const speedupMr = speedupObj.getComponentsInChild(MeshRenderer)[0]
  const speedupMat = new LitMaterial()
  ShaderLib.register('speedupShader', speedupShader)
  // Create RenderShaderPass instance
  const renderShader = new RenderShaderPass('speedupShader', 'speedupShader')
  renderShader.setShaderEntry('vert_main', 'frag_main')
  // create Shader instance
  const shader = new Shader()
  // create RenderShaderPass instance
  shader.addRenderPass(renderShader)
  // speedupMat.shader = shader
  // speedupMat.shader.
  speedupMr.material = speedupMat
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
