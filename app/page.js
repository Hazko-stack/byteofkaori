import GameBoy from '@/components/Gameboy';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <GameBoy />
    </main>
  );
}