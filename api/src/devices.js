


const possibleGlvd = [
    "Google Inc. (AMD)",
    "Google Inc. (NVIDIA)",
]

const possibleGlrd = {
    "Google Inc. (AMD)": [
        "ANGLE (AMD, AMD Radeon RX 6500 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon RX 6600 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon RX 6700 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon RX 6800 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon RX 6900 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon(TM) RX Vega 11 Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon RX 6700 Pro Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (AMD, AMD Radeon RX 6600 Direct3D11 vs_5_0 ps_5_0, D3D11)",
    ],
    "Google Inc. (NVIDIA)": [
        "ANGLE (NVIDIA, NVIDIA GeForce RTX 3090 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Ti Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1060 6GB Direct3D11 vs_5_0 ps_5_0, D3D11-30.0.14.9613)",
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1050 Ti Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1050 Direct3D11 vs_5_0 ps_5_0, D3D11-27.21.14.5671)",
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 Super Direct3D11 vs_5_0 ps_5_0, D3D11)",
    ],
}

const possibleOrientationTypes = ["portrait-primary", "landscape-primary", "portrait-secondary", "landscape-secondary"]

const possibleHc = [4, 6, 8, 10, 12, 16, 32, 48]
const possibleDvm = [4, 8, 16, 32]
const possiblePixelRatios = [1, 2]
const possibleRs_cd = [1, 4, 8, 15, 16, 24, 32, 48]
const possibleResolutions = [
    {
        width: 2560,
        height: 1440,
    },
    {
        width: 1920,
        height: 1080,
    },
    {
        width: 1280,
        height: 720,
    },
    {
        width: 1024,
        height: 768,
    },
    {
        width: 1280,
        height: 960,
    },
    {
        width: 1280,
        height: 1024,
    },
    {
        width: 1400,
        height: 1050,
    },
    {
        width: 1600,
        height: 1200,
    },
    {
        width: 4096,
        height: 2160,
    },
    {
        width: 1366,
        height: 768,
    },
    {
        width: 3200,
        height: 1800,
    },
    {
        width: 3840,
        height: 2160,
    },
    {
        width: 1600,
        height: 900,
    },
]

// Remove the 'export default' statement
module.exports = { possibleGlvd, possibleGlrd, possibleOrientationTypes, possibleHc, possibleDvm, possiblePixelRatios, possibleRs_cd, possibleResolutions }