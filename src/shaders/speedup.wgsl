//引入通用顶点着色器相关代码
#include "Common_vert"
//引入通用片元着色器相关代码
#include "Common_frag"

// must name as vert, convention defined by orrilusion
fn vert(inputData: VertexAttributes) -> VertexOutput {
    ORI_Vert(inputData) ;
    return ORI_VertexOut ;
}

// must name as frag, convention defined by orrilusion
fn frag(){
    var uv = ORI_VertexVarying.fragUV0;
    ORI_FragmentOutput.color = vec4<f32>(uv, 1.0, 1.0);
}

fn random(rand_seed: vec2<f32>) -> f32 {
    let x = fract(cos(dot(rand_seed, vec2<f32>(23.14077926, 232.61690225))) * 136.8168);
    let y = fract(cos(dot(rand_seed, vec2<f32>(54.47856553, 345.84153136))) * 534.7645);
    return y;
}


fn get_color(uv: vec2<f32>) -> vec3<f32> {
  let seed = uv + vec2(9., 0.);
  let r = random(seed + vec2(12., 2.));
  let g = random(seed + vec2(7., 5.));
  let b = random(seed);

  let col = vec3(r, g, b);

  return col;
}