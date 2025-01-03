import React, { useState } from 'react';
import { ethers, Contract } from 'ethers';
import { initialCollections } from './collections';

const CreatePool: React.FC = () => {
  const [nftAddress, setNftAddress] = useState<string>('');
  const [nftName, setNftName] = useState<string>('');
  const [nftImage, setNftImage] = useState<string>('/placebot.png'); // Default to placeholder image
  const [fetching, setFetching] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [deployTx, setDeployTx] = useState<string | null>(null);

  const handleFetchDetails = async () => {
    if (!nftAddress || !ethers.isAddress(nftAddress)) {
      alert('Please enter a valid ERC721 contract address.');
      return;
    }

    setFetching(true);
    setNftImage('/placebot.png'); // Reset image to placeholder while fetching
    try {
      const provider = new ethers.JsonRpcProvider('https://apechain.drpc.org');
      const erc721Abi = [
        'function name() view returns (string)',
        'function tokenURI(uint256 tokenId) view returns (string)',
      ];
      const contract = new Contract(nftAddress, erc721Abi, provider);

      const name = await contract.name();
      setNftName(name);

      try {
        const tokenURI = await contract.tokenURI(1);
        console.log('Fetched tokenURI:', tokenURI);

        const proxiedTokenURI = tokenURI.startsWith('ipfs://')
          ? tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : tokenURI;

        const response = await fetch(proxiedTokenURI);
        if (!response.ok) {
          console.warn('Failed to fetch metadata:', response.statusText);
          setNftImage('/placebot.png'); // Fallback to placeholder
          return;
        }

        const metadata = await response.json();
        console.log('Fetched metadata:', metadata);

        let imageUrl = metadata.image || null;
        if (imageUrl && imageUrl.startsWith('ipfs://')) {
          imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }

        setNftImage(imageUrl || '/placebot.png'); // Use placeholder if no image found
      } catch (imageError) {
        console.warn('Failed to fetch token image:', imageError);
        setNftImage('/placebot.png'); // Fallback to placeholder
      }
    } catch (error) {
      console.error('Failed to fetch details:', error);
      alert('Unable to fetch details. Please check the address or try again.');
    } finally {
      setFetching(false);
    }
  };

  const handleCreatePool = async () => {
    if (!nftAddress || !ethers.isAddress(nftAddress)) {
      alert('Please enter a valid ERC721 contract address.');
      return;
    }

    if (!nftName) {
      alert('Please fetch the details first.');
      return;
    }

    if (!window.ethereum) {
      alert('Please connect your wallet to proceed.');
      return;
    }

    setCreating(true);
    try {
      const deployerAbi = [
        'function deployToken(address owner, string name, string symbol, uint8 decimals, address erc721Token, uint96 amountPerNFT, address admin) public returns (address)',
      ];
      const deployerAddress = '0x1cdF7976af8e8849Df86C9456f8551181a57d2Bf';

      const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
      const signer = await provider.getSigner();
      const deployerContract = new Contract(deployerAddress, deployerAbi, signer);

      const tokenName = `m${nftName}`;
      const tokenSymbol = `m${nftName.toUpperCase()}`;

      const tx = await deployerContract.deployToken(
        '0xC0DED9232FcDB20741c008C3Fb01B3BdC39fccE0',
        tokenName,
        tokenSymbol,
        18,
        nftAddress,
        ethers.parseUnits('1000', 18),
        '0xC0DED9232FcDB20741c008C3Fb01B3BdC39fccE0'
      );

      const receipt = await tx.wait();
      const mnftAddress = receipt.contractAddress; // Assuming the contract address is part of the receipt

      alert(`Token deployed successfully! Transaction hash: ${receipt.transactionHash}`);

      // Add the new collection to the list
      const newCollection = {
        id: initialCollections.length + 1, // Incremental ID
        name: nftName,
        logo: nftImage, // Use the fetched image as the logo
        nftAddress: nftAddress,
        mnftAddress: mnftAddress,
        nftBalance: '0',
        mnftBalance: '0',
        symbol: tokenSymbol.replace('m', ''), // Remove the "m" prefix for display
      };

      initialCollections.push(newCollection);

      console.log('Updated Collections:', initialCollections);
    } catch (error) {
      console.error('Failed to create pool:', error);
      alert('An error occurred during pool creation. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1c1f26',
        color: '#fff',
        border: '2px solid #6600CC',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#5200A3')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#6600CC')}
    >
      <h2
        style={{
          margin: '0 0 5px 0',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        Deploy a NFT Swap Pool
      </h2>
      {/* Image Placeholder */}
      <div
        style={{
          width: '130px',
          height: '140px',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          marginTop: '5px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        <img
          src={nftImage}
          alt="NFT Preview"
          style={{
            width: '130px',
            height: '130px',
            objectFit: 'cover',
            marginBottom: '-5px',
          }}
        />
      </div>

      {/* NFT Name */}
      {nftName && (
        <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1px' }}>
          {nftName}
        </p>
      )}

      {/* Input and Buttons */}
      <input
        type="text"
        placeholder="Enter an ERC721 Address"
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #6600CC',
          width: '200px',
          backgroundColor: '#121212',
          color: '#fff',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleFetchDetails}
          style={{
            width: '110px',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
          }}
          disabled={fetching}
        >
          {fetching ? 'Fetching...' : 'Fetch Details'}
        </button>
        <button
          onClick={handleCreatePool}
          style={{
            width: '110px',
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6600CC',
            color: '#fff',
            cursor: 'pointer',
          }}
          disabled={creating || !nftName}
        >
          {creating ? 'Creating...' : 'Create Pool'}
        </button>
      </div>

      {/* Transaction Hash */}
      {deployTx && (
        <p style={{ color: '#6600CC' }}>
          Token Deployed! TX Hash: <a href={`https://apescan.io/tx/${deployTx}`} target="_blank" rel="noopener noreferrer">{deployTx}</a>
        </p>
      )}
    </div>
  );
};

export default CreatePool;
