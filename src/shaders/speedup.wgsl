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
    var color = getColorNoise(uv);
    color *= vec3(1.5, 0.5, 400.); // fine tune the color
    ORI_FragmentOutput.color = vec4<f32>(getColorNoise(uv), 1.0);
}

fn random(rand_seed: vec2<f32>) -> f32 {
    let x = fract(cos(dot(rand_seed, vec2<f32>(23.14077926, 232.61690225))) * 136.8168);
    let y = fract(cos(dot(rand_seed, vec2<f32>(54.47856553, 345.84153136))) * 534.7645);
    return y;
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
    // use floor to have a consecutive length of color
    let newUV = floor(uv * vec2(10., 100.));
    let size = vec2(1.);

    let v1 = getColor((newUV + vec2(0.)) / size);
    let v2 = getColor((newUV + vec2(0., 1.)) / size);
    let v3 = getColor((newUV + vec2(1., 0.)) / size);
    let v4 = getColor((newUV + vec2(1.)) / size);

    // bilinear interpolate, smooth the adjacent color
    let factor = smoothstep(vec2<f32>(0.), vec2<f32>(1.), fract(uv));
    let v1Tov2 = mix(v1, v2, vec3<f32>(factor.y));
    let v3Tov4 = mix(v3, v4, vec3<f32>(factor.y));
    let mixColor = mix(v1Tov2, v3Tov4, vec3<f32>(factor.x));

    return mixColor;
}