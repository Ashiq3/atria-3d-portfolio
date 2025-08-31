# NFT Certificate Implementation

## Overview

The ATRIA Genesis NFT serves as a certificate of authenticity for the website, providing immutable proof of ownership and creation. This document outlines the technical implementation of the ERC-721 token.

## Token Specifications

### ERC-721 Standard
- **Standard**: ERC-721 (Non-Fungible Token)
- **Name**: ATRIA GENESIS
- **Symbol**: ATRIA
- **Total Supply**: 1 (Single edition)
- **Blockchain**: Ethereum

### Metadata Structure
```json
{
  "name": "ATRIA GENESIS",
  "description": "Certificate of authenticity for the ATRIA 3D portfolio website. Light Carved in Memory.",
  "image": "https://atria.art/nft/atria-genesis.gif",
  "animation_url": "https://atria.art/nft/atria-genesis.webm",
  "external_url": "https://atria.art",
  "attributes": [
    {
      "trait_type": "Creation Date",
      "value": "2025-08-31"
    },
    {
      "trait_type": "Version",
      "value": "1.0.0"
    },
    {
      "trait_type": "Hash",
      "value": "SHA-256 hash of final site build"
    },
    {
      "trait_type": "Renderer",
      "value": "Three.js r163 + WebGPU"
    },
    {
      "trait_type": "Projects",
      "value": "6"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "https://atria.art/nft/atria-genesis.glb",
        "type": "model/gltf-binary"
      }
    ],
    "category": "digital-art"
  }
}
```

## Smart Contract Implementation

### Core Functions
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ATRIAGenesis is ERC721, Ownable {
    string private _baseTokenURI;
    string private _siteHash;
    
    constructor(string memory siteHash) ERC721("ATRIA GENESIS", "ATRIA") {
        _siteHash = siteHash;
        _mint(msg.sender, 1);
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function siteHash() public view returns (string memory) {
        return _siteHash;
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(_baseTokenURI, Strings.toString(tokenId)));
    }
}
```

### Deployment Parameters
- **Network**: Ethereum Mainnet
- **Gas Limit**: 2,000,000
- **Estimated Cost**: 0.05-0.1 ETH
- **Owner**: ATRIA Studio wallet
- **Minting**: Single edition to owner wallet

## Metadata Hosting

### IPFS Storage
- **Service**: Pinata or Filebase
- **CID**: Qm[...] (Generated at mint time)
- **Directory Structure**:
  ```
  /atria-genesis/
    metadata.json
    atria-genesis.gif
    atria-genesis.webm
    atria-genesis.glb
    atria-genesis.png
  ```

### Content Delivery
- **Primary**: IPFS Gateway (Cloudflare/IPFS.io)
- **Backup**: Custom domain (nft.atria.art)
- **Cache**: CDN with 1-year cache headers

## Visual Assets

### 3D Model
- **Format**: glTF 2.0 with Draco compression
- **Polycount**: ≤ 10,000 faces
- **Textures**: 1024×1024 compressed
- **Animations**: Liquid metal flow sequence
- **Size**: ≤ 2 MB

### Animated GIF
- **Resolution**: 800×800 pixels
- **Frames**: 60 frames (2 seconds)
- **Colors**: Limited palette for small file size
- **Size**: ≤ 1 MB

### Video Preview
- **Format**: WebM (VP9 codec)
- **Resolution**: 1920×1920 pixels
- **Duration**: 10 seconds
- **Bitrate**: 2 Mbps
- **Size**: ≤ 2.5 MB

### Static Image
- **Format**: PNG-24 with transparency
- **Resolution**: 2048×2048 pixels
- **Quality**: Lossless
- **Size**: ≤ 5 MB

## Minting Process

### Pre-Mint Checklist
1. [ ] Final website build completed
2. [ ] SHA-256 hash calculated
3. [ ] All metadata assets uploaded to IPFS
4. [ ] Smart contract deployed
5. [ ] Wallet funded with ETH for gas

### Minting Steps
1. Deploy smart contract with site hash
2. Set base URI to IPFS metadata location
3. Mint token ID #1 to owner wallet
4. Verify token on Etherscan
5. Update website with NFT certificate link

### Verification
- **Etherscan**: Contract verification
- **OpenSea**: Collection listing
- **Rarible**: Collection listing
- **Website**: Certificate verification page

## Ownership Transfer

### Transfer Process
1. **Initial Transfer**: From studio to client wallet
2. **Verification**: On-chain confirmation
3. **Documentation**: Transfer receipt
4. **Update**: Website ownership display

### Security Considerations
- **Wallet**: Hardware wallet (Ledger/Trezor)
- **Backup**: Multiple key backups
- **Recovery**: Social recovery or multi-sig
- **Monitoring**: Transaction alerts

## Certificate Display

### Website Integration
```html
<!-- NFT Certificate Badge -->
<div class="nft-certificate">
 <a href="https://opensea.io/assets/ATRIA/1" target="_blank" rel="noopener">
    <img src="/images/nft-badge.svg" alt="NFT Certificate of Authenticity">
    <span>View Certificate #001</span>
  </a>
</div>
```

### Certificate Page
- **URL**: https://atria.art/certificate
- **Content**:
  * Token information
  * Ownership history
  * Site hash verification
  * Metadata display
  * Blockchain explorer links

## Legal Considerations

### Intellectual Property
- **Ownership**: Client owns NFT, studio retains commercial rights to website
- **Usage**: NFT serves as authenticity proof only
- **Derivatives**: No derivative rights granted through NFT ownership
- **License**: MIT license for open-source components

### Terms of Service
- **No Warranty**: NFT provided "as is"
- **No Refunds**: NFT sales are final
- **Transfer Rights**: Right to transfer NFT
- **Commercial Use**: No commercial rights granted

## Marketing Integration

### Social Media
- **Twitter**: Mint announcement with OpenSea link
- **LinkedIn**: Professional announcement
- **Instagram**: Visual showcase of NFT
- **Discord**: Community notification

### Press Release
- **Distribution**: PR Newswire or similar
- **Content**: 
  * Project completion announcement
  * NFT certificate details
  * Technology innovations
  * Client testimonial (if approved)

### Community Engagement
- **Reddit**: r/digitalart, r/NFT, r/webdev
- **Discord**: Web3 and NFT communities
- **Telegram**: Relevant groups
- **Newsletter**: ATRIA studio subscribers