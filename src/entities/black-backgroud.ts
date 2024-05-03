import { Color, type Scene3D, SkyRenderer, SolidColorSky } from '@orillusion/core'

export class BlackBackground {
  private constructor() {}
  static create(scene: Scene3D) {
    // Add SkyRenderer component, then set map texture
    const sky = scene.addComponent(SkyRenderer)
    const colorSky = new SolidColorSky(new Color(0, 0, 0, 1))
    sky.map = colorSky
  }
}
