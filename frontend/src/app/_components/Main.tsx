import Image from 'next/image';

export default function Main() {
  return (
    <>
      <div className="container">
        <div className="textSection">
          <span>ReadMe 작업을</span>
          <span>손쉽게!</span>
        </div>
        <div className="imageSection">
          <Image
            className="image"
            src="/MainLogo.png"
            alt="Main logo of the image"
            width={400}
            height={400}
            sizes="100%"
          />
        </div>
      </div>
      <style>{`
        .container {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: calc(100vh - 67px);
        }
        .textSection {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          flex-direction: column;
          font-size: 1.875rem; /* Tailwind의 text-3xl 크기 */
          height: inherit;
        }
        .imageSection {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: inherit;
        }
        .image {
          cursor: pointer;
          max-width: 100%;
        }
          @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
            .imageSection{
            justify-content:center;
    
            }
        }
      `}</style>
    </>
  );
}
