
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float detail = 0.0025;


float fOpUnionRound(float a, float b, float r) {
    vec2 u = max(vec2(r - a,r - b), vec2(0));
    return max(r, min (a, b)) - length(u);
}

float sdTorus(vec3 p, vec2 t, vec3 c) {
    p -= c;
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

float sdSphere(vec3 p, vec3 c, float rad) {
    return length(p-c) - rad;
}

float sdPlane(vec3 p) {
    return p.y + 0.5;
}

float map(vec3 p) {
    float torus = sdTorus(p, vec2(0.7, 0.25), vec3(0.0, sin(time*0.5), 0.0));
    float plane = sdPlane(p);
    return fOpUnionRound(torus, plane, 0.3); // play with the third parameter
}

vec3 normal(vec3 p) {
    vec2 e = vec2(0.0, detail);
    return -normalize(vec3(
        map(p-e.yxx)-map(p+e.yxx),
        map(p-e.xyx)-map(p+e.xyx),
        map(p+e.xxy)-map(p-e.xxy)
    ));
}

vec3 trace(vec3 ro, vec3 rd) {
    float t = 0.0;
    float d = 1.0;
    vec3 p;
    for (int i = 0; i < 128; ++i) {
        if (d > detail && t < 50.0) {
            p = ro + rd * t;
            d = map(p);
            t += d;
        }
    }
    vec3 bg = vec3(0.0);
    vec3 col;
    if (d < detail) {
        col = normal(p-detail*rd);
    } else {
        col = bg;    
    }
    return col;
}

mat3 setCamera( in vec3 ro, in vec3 ta)
{
    vec3 cw = normalize(ta-ro);
    vec3 cp = normalize(vec3(0.0, 1.0, 0.0));
    vec3 cu = normalize( cross(cw,-cp) );
    vec3 cv = normalize( cross(cu,-cw) );
    return mat3( cu, cv, cw );
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 resolution = resolution;
    vec2 uv = fragCoord.xy / resolution.xy * 2.0 - 1.0;
    uv.y *= resolution.y / resolution.x;

    // Camera   
    vec3 ro = vec3(0.0, 1.0, -3.5);
    vec3 ta = vec3(0.0);
    mat3 ca = setCamera(ro, ta);
    vec3 rd = ca * normalize(vec3(uv.xy, 2.0));
    
    vec3 result = trace(ro, rd);
    gl_FragColor = vec4(result, 1.0); 
}