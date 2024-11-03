import Link from 'next/link';

export default function LoginBtn() {
  return (
    <div className="flex  items-center h-full justify-end ">
      <button className="login-button">
        <Link href="/login">로그인</Link>
      </button>
      <style>
        {`
        .login-button {
  height: 35px;
  border: 1px solid white;
  color: white;
  background-color: transparent;
  border-radius: 30px;
  padding: 4px 16px; /* px-4, py-1 */
  transition: background-color 300ms, color 300ms;
}

.login-button:hover {
  background-color: white;
  color: black;
}

.justify-between {
  justify-content: space-between;
}
        `}
      </style>
    </div>
  );
}