import React, { useState } from 'react';
import { ethers, Contract } from 'ethers';

const CreatePool: React.FC = () => {
  const [nftAddress, setNftAddress] = useState<string>('');
  const [nftName, setNftName] = useState<string>('');
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [deployTx, setDeployTx] = useState<string | null>(null);

  const handleFetchDetails = async () => {
    if (!nftAddress || !ethers.isAddress(nftAddress)) {
      alert('Please enter a valid ERC721 contract address.');
      return;
    }
  
    setFetching(true);
    setNftImage(null); // Reset image to avoid stale data
    try {
      const provider = new ethers.JsonRpcProvider('https://apechain.drpc.org');
      const erc721Abi = [
        'function name() view returns (string)',
        'function tokenURI(uint256 tokenId) view returns (string)',
      ];
      const contract = new Contract(nftAddress, erc721Abi, provider);
  
      const name = await contract.name();
      setNftName(name);
  
      // Simulate fetching the first token's image (using tokenId = 1)
      try {
        const tokenURI = await contract.tokenURI(1);
        console.log('Fetched tokenURI:', tokenURI);
  
        // Proxy IPFS URLs if necessary
        const proxiedTokenURI = tokenURI.startsWith('ipfs://')
          ? tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
          : tokenURI;
  
        const response = await fetch(proxiedTokenURI);
        if (!response.ok) {
          console.warn('Failed to fetch metadata:', response.statusText);
          setNftImage('fallback'); // Set fallback image
          return;
        }
  
        const metadata = await response.json();
        console.log('Fetched metadata:', metadata);
  
        // Resolve the image field
        let imageUrl = metadata.image || null;
        if (imageUrl && imageUrl.startsWith('ipfs://')) {
          imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }
  
        if (imageUrl) {
          const imgResponse = await fetch(imageUrl);
          if (!imgResponse.ok) {
            console.warn('Failed to load image:', imgResponse.statusText);
            setNftImage('fallback'); // Set fallback image
          } else {
            setNftImage(imageUrl);
          }
        } else {
          setNftImage('fallback'); // Set fallback image if no image is found
        }
      } catch (imageError) {
        console.warn('Failed to fetch token image:', imageError);
        setNftImage('fallback'); // Set fallback image
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
      setDeployTx(receipt.transactionHash);
      alert(`Token deployed successfully! Transaction hash: ${receipt.transactionHash}`);
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
      <input
        type="text"
        placeholder="Enter an ERC721 Address"
        value={nftAddress}
        onChange={(e) => setNftAddress(e.target.value)}
        style={{
          padding: '5px',
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

      {nftName && (
        <div style={{ textAlign: 'center', marginTop: '-10px' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '5px' }}>
            {nftName}
          </p>
          {nftImage ? (
            <img
              src={nftImage}
              alt="NFT Preview"
              style={{
                width: '150',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          ) : (
            <p style={{ fontSize: '0.8rem', color: '#aaa' }}>No image available</p>
          )}
        </div>
      )}

      {deployTx && (
        <p style={{ color: '#6600CC' }}>
          Token Deployed! TX Hash: <a href={`https://apescan.io/tx/${deployTx}`} target="_blank" rel="noopener noreferrer">{deployTx}</a>
        </p>
      )}
    </div>
  );
};

export default CreatePool;
