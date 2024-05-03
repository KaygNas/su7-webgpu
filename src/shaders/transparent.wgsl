// 引入通用顶点着色器相关代码
#include "Common_vert"
// 引入通用片元着色器相关代码
#include "Common_frag"

// must name as vert, convention defined by orrilusion
fn vert(inputData: VertexAttributes) -> VertexOutput {
    ORI_Vert(inputData) ;
    return ORI_VertexOut ;
}

// must name as frag, convention defined by orrilusion
fn frag(){
    // ORI_FragmentOutput.color = vec4<f32>(0.0);
}