#include "Common_vert"
#include "Common_frag"

// must name as vert, convention defined by orrilusion
fn vert(inputData:VertexAttributes) -> VertexOutput {
    ORI_Vert(inputData) ;
    return ORI_VertexOut ;
}

// must name as frag, convention defined by orrilusion
fn frag(){
    ORI_FragmentOutput.color = vec4<f32>( 1.0,0.0,0.0,1.0) ;
}