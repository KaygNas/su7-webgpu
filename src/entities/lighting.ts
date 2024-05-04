import type { Ctor, DirectLight } from '@orillusion/core'
import { Color, LitMaterial, MeshRenderer, Object3D, PlaneGeometry, PointLight } from '@orillusion/core'

const LIGHTING_PLANE_VISIBLE = false

export interface LightingObjectOptions {
  castShadow?: boolean
  intensity?: number
  color?: Color
  type?: Ctor<PointLight | DirectLight>
}
export class LightingObject extends Object3D {
  light: PointLight | DirectLight
  constructor(options: LightingObjectOptions = {}) {
    super()
    const {
      intensity = 2,
      color = new Color(1, 1, 1, 1),
      castShadow = false,
      type = PointLight,
    } = options
    const light = this.addComponent(type)
    light.color = color
    light.intensity = intensity
    light.castShadow = castShadow
    this.light = light

    if (LIGHTING_PLANE_VISIBLE) {
      const lightPlaneObj = new Object3D()
      const lightPlaneMr = lightPlaneObj.addComponent(MeshRenderer)
      lightPlaneMr.geometry = new PlaneGeometry(2, 2)
      lightPlaneMr.object3D.rotationX = 90
      const mat = lightPlaneMr.material = new LitMaterial()
      mat.emissiveColor = new Color(1, 1, 0, 1)
      mat.emissiveIntensity = 1
      this.addChild(lightPlaneObj)
    }
  }
}
