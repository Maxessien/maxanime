import { useAnimepaheApi } from "@/app/page";
import Resolutions from "@/src/download-components/Resolutions";
import { parseHtml } from "tinysoup";

const PlayPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const pars = await params

  return <Resolutions resId={pars.id} />;
};

export default PlayPage;
