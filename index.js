import { Content } from "./components/Content/index.js";

const root = document.getElementById("root");
const content = new Content("content");
root.append(content.render());
