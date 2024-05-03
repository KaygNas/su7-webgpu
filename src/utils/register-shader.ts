import { ShaderLib } from '@orillusion/core'

export function registerShader(shadeName: string, shaderCode: string) {
  ShaderLib.register(shadeName, shaderCode)
  return shadeName
}
