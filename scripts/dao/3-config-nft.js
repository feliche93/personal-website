import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x5A74ED37E32ce11C3aC81069D5C76DEDB2415816",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Cryptoneur Membership NFT",
        description: "This NFT will give you access to CryptoneurDAO!",
        image: readFileSync("scripts/assets/cryptoneur_nft.gif"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()