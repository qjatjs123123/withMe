interface PageHeaderProps {
  title: string;
  content: string;
}

export default function PageHeader({ title, content }: PageHeaderProps) {
  return (
    <>
      <h1
        style={{
          fontSize: '48px', // text-[40px]
          fontFamily: 'SamsungSharpSansRegular',
        }}
      >
        {title}
      </h1>
      <h1
        style={{
          fontSize: '48px', // text-[40px]
          fontFamily: 'SamsungOneKorean-700',
          fontWeight: 'bold',
        }}
      >
        {content}
      </h1>
    </>
  );
}
