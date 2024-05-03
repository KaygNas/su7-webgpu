import { BlendMode, Material } from '@orillusion/core'
import { SpeedupShader } from '@/shaders'

export class SpeedupMaterial extends Material {
  constructor() {
    super()
    const shader = new SpeedupShader()
    this.shader = shader
    this.transparent = true
    this.blendMode = BlendMode.ALPHA
  }
}
