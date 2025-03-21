import innovationColleague from "./innovationColleague";
import { injectTransferTools } from "../utils";

innovationColleague.downstreamAgents = [];

const agents = injectTransferTools([
  innovationColleague,
]);

export default agents;