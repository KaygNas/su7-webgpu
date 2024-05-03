import { Color, Engine3D, LitMaterial, MeshRenderer, Object3D } from '@orillusion/core'
import { LightingObject } from './lighting'
import { joinStaticBaseUrl } from '@/utils'

export class StartroomObj extends Object3D {
  private constructor(
    public lightObj: Object3D,
    public lightMr: MeshRenderer,
    public lightMat: LitMaterial,
    public lightings: LightingObject[],
    startroom: Object3D,
  ) {
    super()
    Object.assign(this, startroom)
  }

  static async create() {
    const _startroomObj = await Engine3D.res.loadGltf(joinStaticBaseUrl('/models/sm_startroom/sm_startroom.gltf'))

    // add material to light
    const lightObj = _startroomObj.getChildByName('light.001') as Object3D
    const lightMr = lightObj.getComponentsInChild(MeshRenderer)[0]
    const lightMat = new LitMaterial()
    lightMat.emissiveColor = new Color(1, 1, 1, 0)
    lightMat.emissiveIntensity = 1
    lightMat.transparent = true
    lightMat.alphaCutoff = 0.01
    lightMr.material = lightMat

    const lightingObj1 = new LightingObject({ castShadow: true })
    lightingObj1.localRotation.x = 90
    lightingObj1.localPosition.copyFrom(lightObj.localPosition)
    lightingObj1.localPosition.y = 3

    const lightingObj2 = new LightingObject()
    lightingObj2.localRotation.x = 0
    lightingObj2.localPosition.copyFrom(lightObj.localPosition)
    lightingObj2.localPosition.y = 1
    lightingObj2.localPosition.z = -2

    const lightingObj3 = new LightingObject()
    lightingObj3.localRotation.x = 180
    lightingObj3.localPosition.copyFrom(lightObj.localPosition)
    lightingObj3.localPosition.y = 1
    lightingObj3.localPosition.z = 2

    const lightingObj4 = new LightingObject()
    lightingObj4.localRotation.y = 90
    lightingObj4.localPosition.copyFrom(lightObj.localPosition)
    lightingObj4.localPosition.y = 1
    lightingObj4.localPosition.x = -5

    const lightingObj5 = new LightingObject()
    lightingObj5.localRotation.y = -90
    lightingObj5.localPosition.copyFrom(lightObj.localPosition)
    lightingObj5.localPosition.y = 1
    lightingObj5.localPosition.x = 5

    const lightings = [lightingObj1, lightingObj2, lightingObj3, lightingObj4, lightingObj5]
    lightings.forEach((lighting) => {
      _startroomObj.addChild(lighting)
    })

    // add material to floor
    // const lightMap = await Engine3D.res.loadTexture('/textures/t_startroom_light.raw.jpg')
    const startRoomAoMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_startroom_ao.raw.jpg'))
    // const floorroughnessMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_floor_roughness.webp'))
    const floornormalMap = await Engine3D.res.loadTexture(joinStaticBaseUrl('/textures/t_floor_normal.webp'))
    const floorObj = _startroomObj.getChildByName('ReflecFloor') as Object3D
    const floorMr = floorObj.getComponentsInChild(MeshRenderer)[0]
    const floorMat = new LitMaterial()
    floorMat.aoMap = startRoomAoMap
    floorMat.normalMap = floornormalMap
    floorMr.material = floorMat

    const startroomObj = new StartroomObj(lightObj, lightMr, lightMat, lightings, _startroomObj)

    return startroomObj
  }
}
