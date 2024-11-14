import Link from 'next/link';
export default function ErrorModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-lg p-6 w-80 max-w-md">
        <h3 className="text-lg text-center font-semibold mb-2">⛔ 접근 권한이 없습니다. ⛔</h3>
        <p className="text-gray-600 mb-6">
          해당 워크스페이스에 접근할 수 없습니다. <br />
          권한을 다시 한번 확인해주세요.
          {/* <br />
          접근 권한이 없는 워크스페이스에는 접근할 수 없습니다.
          <br />
          권한이 필요하다면 워크스페이스 소유자에게 문의하세요. */}
        </p>
        <div className="flex justify-center ">
          <Link href={'/'}>
            <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors">
              메인으로 돌아가기
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
