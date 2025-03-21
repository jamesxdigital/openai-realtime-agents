import omniBase from "./omniBase";
import omniSparring from "./omniSparring";
import { injectTransferTools } from "../utils";

// Define Omni as a single entity with different modes
// Each mode is implemented as a separate agent for technical reasons
// but presented to the user as capabilities of the same entity
omniBase.name = "omni";
omniBase.publicDescription = "Omni - Your ambient innovation partner with multiple specialized modes";

omniSparring.name = "omni_sparring";
omniSparring.publicDescription = "Omni in sparring mode - critically evaluates and strengthens ideas";

// Connect the modes
omniBase.downstreamAgents = [omniSparring];
omniSparring.downstreamAgents = [omniBase];

const agents = injectTransferTools([
  omniBase,
  omniSparring,
]);

export default agents;