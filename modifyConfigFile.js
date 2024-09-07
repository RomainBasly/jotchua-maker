const fs = require("fs");
const configFilePath = "./imagesConfig.json";

const configOutputFile = "./imagesConfigRevised.json";

function readAndUpdateConfigFile() {
  const config = {};
  const imageFiles = fs.readFileSync(configFilePath);
  const parsedData = JSON.parse(imageFiles);
  Object.entries(parsedData).forEach(([category, items]) => {
    config[category] = items.map((element) => {
      return { ...element, category: category };
    });
  });

  fs.writeFileSync(configOutputFile, JSON.stringify(config, null, 2));
}

readAndUpdateConfigFile();
