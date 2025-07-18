
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float detail = 0.0025;

float sdTorus(vec3 p, vec2 t, vec3 c) {
    p -= c;
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

float opRep( vec3 p, vec3 c )
{
    vec3 q = mod(p,c)-0.5*c;
    return sdTorus( q, vec2(0.3, 0.1), vec3(0.0, 0.1, 0.0) );
}

float sdPlane(vec3 p) {
    return p.y + 0.5;
}

float map(vec3 p) {
    float dist1 = sdTorus( p, vec2(0.3, 0.1), vec3(0.0, 0.1, 0.0) );
    float dist2 = opRep(p, 3.0 * vec3(mouse.x, mouse.y, mouse.x));
    
    return dist1; // CHANGE THIS TO dist2 to see difference
}

vec3 normal(vec3 p) {
    vec2 e = vec2(0.0, detail);
    return -normalize(vec3(
        map(p-e.yxx)-map(p+e.yxx),
        map(p-e.xyx)-map(p+e.xyx),
        map(p-e.xxy)-map(p+e.xxy)
    ));
}

float light(vec3 p, vec3 dir) {
    vec3 n = normal(p);
    float diffuse = max(0.0, dot(n, vec3(0.0,1.0,0.0)));
    float ambient = 0.2;
    return ambient + diffuse;
}

float trace(vec3 ro, vec3 rd) {
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
    float bg = 0.0;
    float col;
    if (d < detail) {
        col = light(p-detail*rd, rd);
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
    
    float t = trace(ro, rd);
    gl_FragColor = vec4(t, t, t, 1.0); 
}