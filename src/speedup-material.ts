import { BlendMode, Color, Material, RenderShaderPass, Shader, ShaderLib } from '@orillusion/core'
import speedupShader from './shaders/speedup.wgsl?raw'
import simplexNoise from './shaders/simplex-noise.wgsl?raw'

export class SpeedupMaterial extends Material {
  constructor() {
    super()
    const shader = new SpeedupShader()
    this.shader = shader
    this.transparent = true
    this.blendMode = BlendMode.ALPHA
  }
}

export class SpeedupShader extends Shader {
  constructor() {
    super()
    ShaderLib.register('SimplexNoise', simplexNoise)
    ShaderLib.register('SpeedupShader', speedupShader)
    const colorShader = new RenderShaderPass('SpeedupShader', 'SpeedupShader')
    colorShader.setShaderEntry(`VertMain`, `FragMain`)
    this.addRenderPass(colorShader)

    const shaderState = colorShader.shaderState
    shaderState.acceptShadow = false
    shaderState.castShadow = false
    shaderState.receiveEnv = false
    shaderState.acceptGI = false
    shaderState.useLight = false
    this.setDefault()
  }

  public setDefault() {
    // ! must set or orrilusion will throw error by function getUniforms
    this.setUniformColor(`baseColor`, new Color())
    this.setUniformFloat(`alphaCutoff`, 0.0)
    this.setUniformFloat(`envIntensity`, 1.0)
    this.setUniformColor('emissiveColor', new Color())
    this.setUniformFloat('emissiveIntensity', 1.0)
  }
}
