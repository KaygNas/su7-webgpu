import { Color, Engine3D, Material, RenderShaderPass, Shader, ShaderLib, Vector4 } from '@orillusion/core'
import speedupShader from './shaders/speedup.wgsl?raw'

export class SpeedupMaterial extends Material {
  constructor() {
    super()
    ShaderLib.register('speedupShader', speedupShader)
    // Create RenderShaderPass instance
    const renderShader = new RenderShaderPass('speedupShader', 'speedupShader')
    // 设置入口函数
    renderShader.setShaderEntry(`VertMain`, `FragMain`)

    // create Shader instance
    const shader = new Shader()
    shader.addRenderPass(renderShader)

    // ! must set or orrilusion will throw error by function getUniforms
    shader.setUniformVector4(`transformUV1`, new Vector4(0, 0, 1, 1))
    shader.setUniformVector4(`transformUV2`, new Vector4(0, 0, 1, 1))
    shader.setUniformColor(`baseColor`, new Color())
    shader.setUniformFloat(`alphaCutoff`, 0.5)
    shader.setUniformFloat(`envIntensity`, 1.0)
    shader.setUniformColor('emissiveColor', new Color())
    shader.setUniformFloat('emissiveIntensity', 1.0)
    // create RenderShaderPass instance
    this.shader = shader
  }
}
