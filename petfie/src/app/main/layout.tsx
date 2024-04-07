export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100 p-[20px_20px_94px_20px] min-h-[100dvh]">
      {children}
    </div>
  );
}
