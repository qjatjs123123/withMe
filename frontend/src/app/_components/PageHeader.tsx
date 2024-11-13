interface PageHeaderProps {
  title: string;
  content: string;
}

export default function PageHeader({ title, content }: PageHeaderProps) {
  return (
    <>
      <div
        className="responsive_vtext"
        style={{
          fontFamily: 'SamsungSharpSansRegular',
          lineHeight: '2',
        }}
      >
        {title}
      </div>
      <div
        className="responsive_vtext"
        style={{
          fontFamily: 'SamsungOneKorean-700',
          fontWeight: 'bold',
        }}
      >
        {content}
      </div>
    </>
  );
}
