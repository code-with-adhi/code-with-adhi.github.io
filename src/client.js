// src/client.js
import { createClient } from "@sanity/client"; // Changed import

export default createClient({
  // Changed usage
  projectId: "5spsctfj",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-05-03",
});
