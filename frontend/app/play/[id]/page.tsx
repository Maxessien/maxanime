import Resolutions from "@/src/download-components/Resolutions";
import { Episode } from "@/src/types/ApiResponses";
import { noNullFn } from "@/src/utils/fecthUtil";
import axios from "axios";

const PlayPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const pars = await params;

  const episode = await noNullFn(
    async () => {
      const response = await axios.get<Episode>(
        `${process.env.BACKEND_URL}/releases/${pars.id}`,
      );
      return response.data;
    },
    {
      showId: "",
      releaseId: "",
      snapshotUrl: "",
      title: "",
      episode: 0,
      releaseDate: new Date(0),
      res: [],
    } as Episode,
  );

  return <Resolutions episode={episode} />;
};

export default PlayPage;
