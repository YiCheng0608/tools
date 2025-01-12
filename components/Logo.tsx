import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/images/Logo.svg"
        alt="Tools Logo"
        width={180}
        height={180}
        className="text-blue-600"
      />
    </div>
  );
}
