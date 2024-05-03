import { ShaderLib } from '@orillusion/core'

import simplexNoise from './simplex-noise.wgsl?raw'
import speedupShader from './speedup.wgsl?raw'
import transparent from './transparent.wgsl?raw'

function registerShader(shadeName: string, shaderCode: string) {
  ShaderLib.register(shadeName, shaderCode)
  return shadeName
}

export const SimplexNoiseShaderName = registerShader('SimplexNoise', simplexNoise)
export const SpeedupShaderName = registerShader('SpeedupShader', speedupShader)
export const TransparentShaderName = registerShader('Transparent', transparent)
