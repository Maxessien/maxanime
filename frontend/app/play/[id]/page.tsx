import Resolutions from "@/src/download-components/Resolutions";
import { Episode } from "@/src/types/ApiResponses";
import axios from "axios";

const PlayPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const pars = await params;

  const episode = await axios.get<Episode>(
    `${process.env.BACKEND_URL}/releases/${pars.id}`,
  );

  return <Resolutions episode={episode.data} />;
};

export default PlayPage;
