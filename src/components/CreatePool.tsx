import React, { useState } from 'react';
import { ethers, Contract } from 'ethers';

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
    // Pool creation logic (unchanged)
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
      Deploy NFT Swap Pool
    </h2>
      {/* Image Placeholder */}
      <div
        style={{
          width: '130px',
          height: '130px',
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
