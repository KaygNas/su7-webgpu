import { Color, DirectLight, LitMaterial, MeshRenderer, Object3D, PlaneGeometry } from '@orillusion/core'

const LIGHTING_PLANE_VISIBLE = false

export class LightingObject extends Object3D {
  constructor() {
    super()
    const dr1 = this.addComponent(DirectLight)
    dr1.color = new Color(1, 1, 1, 1)
    dr1.intensity = 5

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
