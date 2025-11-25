import { GamePageProviders } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GamePageProviders>{children}</GamePageProviders>;
}
