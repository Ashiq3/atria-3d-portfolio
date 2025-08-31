import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';

export interface CustomMaterialExtensions {
  transmission?: {
    factor: number;
    texture?: THREE.Texture;
  };
  sheen?: {
    color: THREE.Color;
    roughness: number;
    texture?: THREE.Texture;
  };
  clearcoat?: {
    factor: number;
    roughness: number;
    texture?: THREE.Texture;
    roughnessTexture?: THREE.Texture;
  };
  iridescence?: {
    factor: number;
    thickness: number;
    texture?: THREE.Texture;
  };
}

export class GLTFExtensionHandler {
  private loader: GLTFLoader;

  constructor(loader: GLTFLoader) {
    this.loader = loader;
    this.setupExtensions();
  }

  private setupExtensions(): void {
    // Register custom extension handlers
    this.loader.register((parser) => {
      return new TransmissionExtension(parser);
    });

    this.loader.register((parser) => {
      return new SheenExtension(parser);
    });

    this.loader.register((parser) => {
      return new ClearcoatExtension(parser);
    });

    this.loader.register((parser) => {
      return new IridescenceExtension(parser);
    });
  }

  public async loadWithExtensions(url: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          this.processExtensions(gltf);
          resolve(gltf);
        },
        undefined,
        reject
      );
    });
  }

  private processExtensions(gltf: GLTF): void {
    // Process any additional extension logic after loading
    gltf.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        const material = object.material as THREE.MeshPhysicalMaterial;
        if (material) {
          // Ensure proper fallbacks for unsupported features
          this.ensureMaterialFallbacks(material);
        }
      }
    });
  }

  private ensureMaterialFallbacks(material: THREE.MeshPhysicalMaterial): void {
    // Ensure transmission has a fallback
    if (material.transmission && !material.transmissionMap) {
      material.transmissionMap = null;
    }

    // Ensure sheen has a fallback
    if (material.sheen && !material.sheenRoughnessMap) {
      material.sheenRoughnessMap = null;
    }

    // Ensure clearcoat has a fallback
    if (material.clearcoat && !material.clearcoatMap) {
      material.clearcoatMap = null;
    }

    // Ensure iridescence has a fallback
    if (material.iridescence && !material.iridescenceMap) {
      material.iridescenceMap = null;
    }
  }
}

// Transmission Extension
class TransmissionExtension {
  name = 'KHR_materials_transmission';
  parser: any;

  constructor(parser: any) {
    this.parser = parser;
  }

  async extendMaterialParams(materialIndex: number, materialParams: any) {
    const materialDef = this.parser.json.materials[materialIndex];
    
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return;
    }

    const transmissionDef = materialDef.extensions[this.name];
    
    if (transmissionDef.transmissionFactor !== undefined) {
      materialParams.transmission = transmissionDef.transmissionFactor;
    }
    
    if (transmissionDef.transmissionTexture !== undefined) {
      const texture = await this.parser.loadTexture(transmissionDef.transmissionTexture.index);
      materialParams.transmissionMap = texture;
    }
  }
}

// Sheen Extension
class SheenExtension {
  name = 'KHR_materials_sheen';
  parser: any;

  constructor(parser: any) {
    this.parser = parser;
  }

  async extendMaterialParams(materialIndex: number, materialParams: any) {
    const materialDef = this.parser.json.materials[materialIndex];
    
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return;
    }

    const sheenDef = materialDef.extensions[this.name];
    
    if (sheenDef.sheenColorFactor) {
      materialParams.sheenColor = new THREE.Color(
        sheenDef.sheenColorFactor[0],
        sheenDef.sheenColorFactor[1],
        sheenDef.sheenColorFactor[2]
      );
    }
    
    if (sheenDef.sheenColorTexture) {
      const texture = await this.parser.loadTexture(sheenDef.sheenColorTexture.index);
      materialParams.sheenColorMap = texture;
    }
    
    if (sheenDef.sheenRoughnessFactor !== undefined) {
      materialParams.sheenRoughness = sheenDef.sheenRoughnessFactor;
    }
    
    if (sheenDef.sheenRoughnessTexture) {
      const texture = await this.parser.loadTexture(sheenDef.sheenRoughnessTexture.index);
      materialParams.sheenRoughnessMap = texture;
    }
  }
}

// Clearcoat Extension
class ClearcoatExtension {
  name = 'KHR_materials_clearcoat';
  parser: any;

  constructor(parser: any) {
    this.parser = parser;
  }

  async extendMaterialParams(materialIndex: number, materialParams: any) {
    const materialDef = this.parser.json.materials[materialIndex];
    
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return;
    }

    const clearcoatDef = materialDef.extensions[this.name];
    
    if (clearcoatDef.clearcoatFactor !== undefined) {
      materialParams.clearcoat = clearcoatDef.clearcoatFactor;
    }
    
    if (clearcoatDef.clearcoatTexture) {
      const texture = await this.parser.loadTexture(clearcoatDef.clearcoatTexture.index);
      materialParams.clearcoatMap = texture;
    }
    
    if (clearcoatDef.clearcoatRoughnessFactor !== undefined) {
      materialParams.clearcoatRoughness = clearcoatDef.clearcoatRoughnessFactor;
    }
    
    if (clearcoatDef.clearcoatRoughnessTexture) {
      const texture = await this.parser.loadTexture(clearcoatDef.clearcoatRoughnessTexture.index);
      materialParams.clearcoatRoughnessMap = texture;
    }
    
    if (clearcoatDef.clearcoatNormalTexture) {
      const texture = await this.parser.loadTexture(clearcoatDef.clearcoatNormalTexture.index);
      materialParams.clearcoatNormalMap = texture;
    }
  }
}

// Iridescence Extension
class IridescenceExtension {
  name = 'KHR_materials_iridescence';
  parser: any;

  constructor(parser: any) {
    this.parser = parser;
  }

  async extendMaterialParams(materialIndex: number, materialParams: any) {
    const materialDef = this.parser.json.materials[materialIndex];
    
    if (!materialDef.extensions || !materialDef.extensions[this.name]) {
      return;
    }

    const iridescenceDef = materialDef.extensions[this.name];
    
    if (iridescenceDef.iridescenceFactor !== undefined) {
      materialParams.iridescence = iridescenceDef.iridescenceFactor;
    }
    
    if (iridescenceDef.iridescenceTexture) {
      const texture = await this.parser.loadTexture(iridescenceDef.iridescenceTexture.index);
      materialParams.iridescenceMap = texture;
    }
    
    if (iridescenceDef.iridescenceIor !== undefined) {
      materialParams.iridescenceIOR = iridescenceDef.iridescenceIor;
    }
    
    if (iridescenceDef.iridescenceThicknessMinimum !== undefined) {
      materialParams.iridescenceThicknessRange = [
        iridescenceDef.iridescenceThicknessMinimum,
        iridescenceDef.iridescenceThicknessMaximum || 400
      ];
    }
  }
}