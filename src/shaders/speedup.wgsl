// 引入通用顶点着色器相关代码
#include "Common_vert"
// 引入通用片元着色器相关代码
#include "Common_frag"
// 引入全局统一变量
#include "GlobalUniform"
// 引入 snoise 函数
#include "SimplexNoise"

// must name as vert, convention defined by orrilusion
fn vert(inputData: VertexAttributes) -> VertexOutput {
    ORI_Vert(inputData) ;
    return ORI_VertexOut ;
}

// must name as frag, convention defined by orrilusion
fn frag(){
    var newUV = ORI_VertexVarying.fragUV0;
    newUV.x -= globalUniform.time * 0.005;

    var color = getColorNoise(newUV);
    color *= vec3(1.5, 1.0, 400.); // fine tune the color

    var alpha = getAlpha(newUV, ORI_VertexVarying.fragUV0);
    // alpha *= smoothstep(0., 1., uSpeedFactor) * 5.;

    ORI_FragmentOutput.color = vec4<f32>(color, alpha);
}

fn random(st: vec2<f32>) -> f32 {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

fn getColor(uv: vec2<f32>) -> vec3<f32> {
    let seed = uv + vec2(9., 0.);
    let r = random(seed + vec2(12., 2.));
    let g = random(seed + vec2(7., 5.));
    let b = random(seed);

    let col = vec3(r, g, b);

    return col;
}

fn getColorNoise(uv: vec2<f32>) -> vec3<f32> {
    // uv * vec2(10., 100.) means the UV will period in x by 10, in y by 100
    let scaledUV = uv * vec2(10., 100.);
    // use floor to have a consecutive length of color
    let newUV = floor(scaledUV);
    let size = vec2(1.);

    let v1 = getColor((newUV + vec2(0.)) / size);
    let v2 = getColor((newUV + vec2(0., 1.)) / size);
    let v3 = getColor((newUV + vec2(1., 0.)) / size);
    let v4 = getColor((newUV + vec2(1.)) / size);

    // bilinear interpolate, smooth the adjacent color
    let factor = smoothstep(vec2<f32>(0.), vec2<f32>(1.), fract(scaledUV));
    let v1Tov2 = mix(v1, v2, factor.y);
    let v3Tov4 = mix(v3, v4, factor.y);
    let mixColor = mix(v1Tov2, v3Tov4, factor.x);

    return mixColor;
}

/*
polyfill of map function in wgsl
```glsl
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}
```
*/
fn map(value: f32, min1: f32, max1: f32, min2: f32, max2: f32) -> f32 {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


fn getAlpha(uv1: vec2<f32>, uv2: vec2<f32>) -> f32 {
    var alpha = simplexNoise2(uv1 * vec2(3., 100.));
    // map => map a value between one range to another 
    alpha = map(alpha, -1., 1., 0., 1.);
    alpha = pow(clamp(alpha - .05, 0., 1.), 13.);
    alpha = smoothstep(0., .04, alpha);
    alpha *= smoothstep(.02, .5, uv2.x) * smoothstep(.02, .5, 1. - uv2.x);
    alpha *= smoothstep(.01, .1, uv2.y) * smoothstep(.01, .1, 1. - uv2.y);
    return alpha;
}