
export const tigerTexture = new Texture("materials/1.png");
export const cherryTexture = new Texture("materials/2.png");
export const sevenTexture = new Texture("materials/3.png");
export const bananaTexture = new Texture("materials/4.png");
export const plumTexture = new Texture("materials/5.png");
export const  melonTexture = new Texture("materials/6.png");
export const diamondTexture = new Texture("materials/7.png");
export const citronTexture = new Texture("materials/8.png");
export const barTexture = new Texture("materials/9.png");

export const materialsArray: Array<Texture> = [tigerTexture, cherryTexture, sevenTexture, bananaTexture, plumTexture, melonTexture, diamondTexture, citronTexture, barTexture];

export enum SpinTexture {
    Tiger = 0,
    Cherry,
    Seven,
    Banana,
    Plum,
    Melon,
    Diamond,
    Citron,
    Bar
}

export function getMaterialInstance(material: SpinTexture): Material {
    let result  = new Material();
    result.metallic = 0.2
    result.roughness = 0.8
    result.microSurface = 0.8
    result.specularIntensity = 0.7

    switch(material) {
        case SpinTexture.Tiger: {
            result.albedoTexture = tigerTexture;
            result.alphaTexture = tigerTexture;
            break;
        }
        case SpinTexture.Cherry: {
            result.albedoTexture = cherryTexture;
            result.alphaTexture = cherryTexture;
            break;
        }
        case SpinTexture.Seven: {
            result.albedoTexture = sevenTexture;
            result.alphaTexture = sevenTexture;
            break;
        }
        case SpinTexture.Banana: {
            result.albedoTexture = bananaTexture;
            result.alphaTexture = bananaTexture;
            break;
        }
        case SpinTexture.Plum: {
            result.albedoTexture = plumTexture;
            result.alphaTexture = plumTexture;
            break;
        }
        case SpinTexture.Melon: {
            result.albedoTexture = melonTexture;
            result.alphaTexture = melonTexture;
            break;
        }
        case SpinTexture.Diamond: {
            result.albedoTexture = diamondTexture;
            result.alphaTexture = diamondTexture;
            break;
        }
        case SpinTexture.Citron: {
            result.albedoTexture = citronTexture;
            result.alphaTexture = citronTexture;
            break;
        }
        case SpinTexture.Bar: {
            result.albedoTexture = barTexture;
            result.alphaTexture = barTexture;
            break;
        }
        default: {
            result.albedoTexture = tigerTexture;
            result.alphaTexture = tigerTexture;
            break;
        }
    }

    return result;
}