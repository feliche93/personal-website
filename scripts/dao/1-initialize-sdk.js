import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

//Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// Some quick checks to make sure our .env is working.
if (!process.env.PRIVATE_KEY_DEV_ACCOUNT || process.env.PRIVATE_KEY_DEV_ACCOUNT == "") {
  console.log("🛑 Private key not found.")
}

if (!process.env.RINKBEY_KEY_DEV || process.env.RINKBEY_KEY_DEV == "") {
  console.log("🛑 Alchemy API URL not found.")
}

if (!process.env.ADDRESS_DEV_ACCOUNT || process.env.ADDRESS_DEV_ACCOUNT == "") {
  console.log("🛑 Wallet Address not found.")
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
    process.env.PRIVATE_KEY_DEV_ACCOUNT,
    // RPC URL, we'll use our Alchemy API URL from our .env file.
    ethers.getDefaultProvider(process.env.RINKBEY_KEY_DEV),
  ),
);

(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("Your app address is:", apps[0].address);
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})()

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;