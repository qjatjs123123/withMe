import Image from 'next/image';
import LoginBtn from './LoginBtn';
import SearchBar from './SearchBar';

export default function Nav() {
  return (
    <nav
      style={{
        backgroundColor: '#020623', // bg-[#020623]
        width: '100%',
        padding: '12px', // p-[12px]
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: '1 1 0%' }}>
        <Image
          className="workspace-image cursor-pointer"
          src="/Logo.png"
          alt="logo of the image"
          width={200}
          height={43.05}
          sizes="100%"
          style={{ width: '200px', height: '100%' }}
        />
      </div>
      <div style={{ flex: '2 1 0%', marginLeft: '10px' }}>
        {' '}
        {/* ml-[10px] */}
        <SearchBar />
      </div>
      <div style={{ flex: '1 1 0%' }}>
        <LoginBtn />
      </div>
    </nav>
  );
}