
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float detail = 0.0025;

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
  { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
  }

mat4 Rot4X(float a) {
    float c = cos(a);
    float s = sin(a);
    
    return mat4( 1, 0, 0, 0,
                 0, c,-s, 0,
                 0, s, c, 0,
                 0, 0, 0, 1);
}

mat4 Rot4Z(float a) {
    float c = cos(a);
    float s = sin(a);
    
    return mat4( c,-s, 0, 0,
                 s, c, 0, 0,
                 0, 0, 1, 0,
                 0, 0, 0, 1);
}

float sdTorus(vec3 p, vec2 t, vec3 c) {
    p -= c;
    vec2 q = vec2(length(p.xz) - t.x, p.y);
    return length(q) - t.y;
}

float opDisplace( vec3 p )
{
    float d1 = sdTorus(p, vec2(0.3, 0.1), vec3(0.0, 0.1, 0.0));
    float d2 = (mouse.x ) * snoise(p* mouse.y * 4.0) * 0.1;
    return d1+d2;
}

float sdSphere(vec3 p, vec3 c, float rad) {
    return length(p-c) - rad;
}

float sdPlane(vec3 p) {
    return p.y + 0.5;
}

float map(vec3 p) {
    mat4 rotX = Rot4X(mouse.x * 6.0);
    mat4 rotZ = Rot4Z(mouse.y * 6.0);
    vec4 rotated = rotX * rotZ * vec4(p, 1.0);
    float torus = opDisplace(rotated.xyz);
    float plane = sdPlane(p);
    
    return min(torus, plane);
}

vec3 normal(vec3 p) {
    vec2 e = vec2(0.0, detail);
    return -normalize(vec3(
        map(p-e.yxx)-map(p+e.yxx),
        map(p-e.xyx)-map(p+e.xyx),
        map(p-e.xxy)-map(p+e.xxy)
    ));
}

float softShadow(in vec3 ro, in vec3 rd, float mint, float k) {
    float res = 1.0;
    float t = mint;
    for(int i = 0; i < 32; i++) {
        float h = map(ro + rd * t);
        if (h < 0.001) { return 0.0; }
        res = min(res, k*h/t);
        t += h;
    }
    return res;
}

float spotLight(vec3 p, vec3 n) {
    vec3 spotDir = normalize(vec3(0.0, -1.0, 0.0));
    vec3 spotPos = vec3(0.0, 1.0, 0.0);
    float coneAngle = 20.0;
    float coneDelta = 30.0;
    
    vec3 lray = normalize(spotPos - p);
    float falloff = (dot(lray, -spotDir) - cos(radians(coneDelta))) / (cos(radians(coneAngle)) - cos(radians(coneDelta)));
    float diffuse = max(0.0, dot(lray, n));
    float sh = softShadow(p, lray, 0.01, 32.0);
    return diffuse * falloff * sh;
}

float light(vec3 p, vec3 dir) {
    vec3 n = normal(p);
    float diffuse = spotLight(p, n);
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