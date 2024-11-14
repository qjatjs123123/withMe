interface PageHeaderProps {
  title: string;
  content: string;
}

export default function PageHeader({ title, content }: PageHeaderProps) {
  return (
    <>
      <div
        className="responsive_vtext w-auto"
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
          fontFamily: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(content) ? 'SamsungOneKorean-700' : 'samsungsharpsans-bold',
          fontWeight: 'bold',
        }}
      >
        {content}
      </div>
    </>
  );
}
