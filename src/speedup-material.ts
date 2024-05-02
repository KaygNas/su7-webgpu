import { Color, Material, RenderShaderPass, Shader, ShaderLib, Vector4 } from '@orillusion/core'
import speedupShader from './shaders/speedup.wgsl?raw'

export class SpeedupMaterial extends Material {
  constructor() {
    super()
    const shader = new SpeedupShader()
    this.shader = shader
  }
}

export class SpeedupShader extends Shader {
  constructor() {
    super()
    ShaderLib.register('speedupShader', speedupShader)
    const colorShader = new RenderShaderPass('speedupShader', 'speedupShader')
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
