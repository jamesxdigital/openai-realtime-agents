import omniBase from "./omniBase";
import omniSparring from "./omniSparring";
import omniDevil from "./omniDevil";
import omniSearch from "./omniSearch";
import { injectTransferTools } from "../utils";

// Define Omni as a single entity with different modes
// Each mode is implemented as a separate agent for technical reasons
// but presented to the user as capabilities of the same entity
omniBase.name = "omni";
omniBase.publicDescription = "Omni - Your ambient innovation partner with multiple specialized modes";

omniSparring.name = "omni_sparring";
omniSparring.publicDescription = "Omni in sparring mode - critically evaluates and strengthens ideas";

omniDevil.name = "omni_devil";
omniDevil.publicDescription = "Omni in devil's advocate mode - challenges assumptions and exposes blind spots";

omniSearch.name = "omni_search";
omniSearch.publicDescription = "Omni in web search mode - provides real-time information from the web to enhance discussions";

// Connect the modes
omniBase.downstreamAgents = [omniSparring, omniDevil, omniSearch];
omniSparring.downstreamAgents = [omniBase, omniDevil, omniSearch];
omniDevil.downstreamAgents = [omniBase, omniSparring, omniSearch];
omniSearch.downstreamAgents = [omniBase, omniSparring, omniDevil];

const agents = injectTransferTools([
  omniBase,
  omniSparring,
  omniDevil,
  omniSearch,
]);

export default agents;