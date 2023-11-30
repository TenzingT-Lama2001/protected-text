import TextTabs from '../../components/Tabs';

export default function Page({ params }: { params: { noteId: string } }) {
  console.log(params);
  return (
    <main className="w-[calc(100%-1.5rem)] mx-auto">
      <TextTabs />
    </main>
  );
}
