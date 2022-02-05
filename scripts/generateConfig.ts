import * as fs from 'fs'
import pools from "../src/config/constants/pools"
import farms from "../src/config/constants/farms"

const dataPath = "./public/data"
const configs = [{
  name: "pools",
  data: pools
}, {
  name: "farms",
  data: farms
}];

Object.values(configs).forEach((config: { name: string, data: unknown}) => {
  const jsonString = JSON.stringify(config.data, null, 2);
  fs.writeFile(`${dataPath}/${config.name}.json`, jsonString, (err) => {
    if (err) throw err;
  });
})