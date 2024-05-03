import { RenderShaderPass } from '@orillusion/core'
import { TransparentShaderName } from './shader-lib'

export class TransparentShaderPass extends RenderShaderPass {
  constructor() {
    super(TransparentShaderName, TransparentShaderName)
    this.setShaderEntry(`VertMain`, `FragMain`)
  }
}
