//Import common vertex shader-related code
#include "Common_vert"
//Import common fragment shader-related code
#include "Common_frag"

fn vert(inputData:VertexAttributes) -> VertexOutput {
    //Execute the built-in vertex shader function
    ORI_Vert(inputData) ;
    //Output vertex data
    return ORI_VertexOut ;
}

fn frag_main() -> vec4f {
  return vec4f(1.0, 0.0, 0.0, 1.0)
}