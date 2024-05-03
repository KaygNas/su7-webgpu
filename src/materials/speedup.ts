import { BlendMode, Material } from '@orillusion/core'
import { SpeedupShader } from '@/shaders'

export class SpeedupMaterial extends Material {
  speedupShader: SpeedupShader
  constructor() {
    super()
    const shader = new SpeedupShader()
    this.speedupShader = shader
    this.shader = shader
    this.transparent = true
    this.blendMode = BlendMode.ALPHA
  }
}
