import ChildLayoutWrapper from "@/components/child/ChildLayoutWrapper";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <ChildLayoutWrapper>{children}</ChildLayoutWrapper>;

}
