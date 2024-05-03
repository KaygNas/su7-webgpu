import { Color, RenderShaderPass, Shader } from '@orillusion/core'
import { SpeedupShaderName } from './shader-lib'

export class SpeedupShader extends Shader {
  constructor() {
    super()
    const colorShader = new RenderShaderPass(SpeedupShaderName, SpeedupShaderName)
    colorShader.setShaderEntry(`VertMain`, `FragMain`)
    this.addRenderPass(colorShader, 1)

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
