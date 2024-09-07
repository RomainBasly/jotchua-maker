const fs = require("fs");
const path = require("path");

const baseDir = "./public/images/memeGenerator";

const configFilePath = "./imagesConfig.json";

const categories = [
  { path: "backgrounds", name: "background" },
  { path: "characters/body", name: "body" },
  { path: "characters/head", name: "head" },
  {
    path: "characters/accessories/glasses",
    name: "glasses",
  },
  { path: "characters/accessories/hat", name: "hat" },
  { path: "characters/accessories/shoes", name: "shoes" },
  { path: "characters/accessories/tatoos", name: "tatoos" },
  { path: "characters/accessories/trousers", name: "trousers" },
  { path: "characters/accessories/other", name: "other" },
  { path: "characters/frenz", name: "frenz" },
];

const generateInitialConfig = () => {
  const config = {};

  categories.map((category) => {
    const categoryPath = path.join(baseDir, category.path);
    const imageFiles = fs.readdirSync(categoryPath);

    config[category.name] = imageFiles.map((file) => ({
      url: `/images/memeGenerator/${category.path}/${file}`,
      initialLeft: 50,
      initialTop: 50,
      initialScaleX: 0.25,
      initialScaleY: 0.25,
    }));
  });

  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  console.log("config file successfully created");
};

generateInitialConfig();
