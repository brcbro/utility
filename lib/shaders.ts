export const liquidVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const liquidFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
                   dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
               mix(dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
                   dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x), u.y);
  }

  void main() {
    vec2 uv = vUv;

    // Distance-based ripple from mouse
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 28.0 - uTime * 4.0) * 0.012 * uHover;
    float falloff = smoothstep(0.5, 0.0, dist);

    // Organic wave noise
    float n = noise(uv * 4.0 + uTime * 0.4) * 0.008 * uHover;

    vec2 distortedUV = uv;
    distortedUV.x += (ripple + n) * falloff;
    distortedUV.y += (ripple + n) * falloff * 0.7;

    // Edge vignette
    vec2 q = uv - 0.5;
    float vignette = 1.0 - dot(q, q) * 0.6;

    vec4 color = texture2D(uTexture, distortedUV);
    color.rgb *= vignette;

    // Subtle color shift on hover
    color.r += uHover * 0.03;
    color.b -= uHover * 0.02;

    gl_FragColor = color;
  }
`
