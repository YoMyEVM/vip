export interface Collection { 
    id: number;
    name: string;
    logo: string;
    nftAddress: string;
    mnftAddress: string;
    nftBalance: string;
    mnftBalance: string;
    symbol: string; // Token symbol property
  }
  
  export const initialCollections: Collection[] = [
    {
      id: 1,
      name: 'DEGEN',
      logo: './degenlogo.svg',
      nftAddress: '0x0e342F41e1B96532207F1Ad6D991969f4b58e5a1',
      mnftAddress: '0xb736fd496c15c7285a0e61d0ae24b6020d0da387',
      nftBalance: '0',
      mnftBalance: '0',
      symbol: 'DEGEN', // Proper symbol
    },
    {
      id: 2,
      name: 'GLITCH ON APE',
      logo: './glitchlogo.svg',
      nftAddress: '0x7cA094eB7E2e305135A0c49835e394b0daca8C56',
      mnftAddress: '0x25fcaceB144227A341C2E621369346247EE7F902',
      nftBalance: '0',
      mnftBalance: '0',
      symbol: 'GLITCH',
    },
    {
      id: 3,
      name: 'A KID ON APE',
      logo: './akidlogo.svg',
      nftAddress: '0x2bEa2b6Bad866b5cA62117855D4b5D8A6C996Db2',
      mnftAddress: '0x1eD327c0FAD66dB2258268D9841001853cD13Ff1',
      nftBalance: '0',
      mnftBalance: '0',
      symbol: 'AKID',
    },
    {
      id: 4,
      name: 'MONKEES',
      logo: './monkeeslogo.svg',
      nftAddress: '0x2bEa2b6Bad866b5cA62117855D4b5D8A6C996Db2',
      mnftAddress: '0x1eD327c0FAD66dB2258268D9841001853cD13Ff1',
      nftBalance: '0',
      mnftBalance: '0',
      symbol: 'MONKEES',
    },
    {
      id: 5,
      name: 'DNSRS',
      logo: './dsnrslogo.svg',
      nftAddress: '0x896BE40d15d1dbFA4F4Ff25A110F3CE770e07897',
      mnftAddress: '0x01559ca8d8e16eDAdc9399bCeD9e522ac312b93D',
      nftBalance: '0',
      mnftBalance: '0',
      symbol: 'DNSRS',
    },
    {
      id: 6,
      name: 'OOGIES',
      logo: './oogieslogo.svg',
      nftAddress: '0x7cA094eB7E2e305135A0c49835e394b0daca8C56',
      mnftAddress: '0x25fcaceB144227A341C2E621369346247EE7F902',
      nftBalance: '0',
      mnftBalance: '0',
      symbol: 'OOGIES',
    },
  ];
  