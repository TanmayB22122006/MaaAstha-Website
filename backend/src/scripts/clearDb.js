require("dotenv").config();

const mongoose = require("mongoose");

const Person = require("../models/Person");
const Donation = require("../models/Donation");

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Missing MONGO_URI");

  await mongoose.connect(uri);

  const peopleRes = await Person.deleteMany({});
  const donationRes = await Donation.deleteMany({});

  console.log(`Cleared people: ${peopleRes.deletedCount}`);
  console.log(`Cleared donations: ${donationRes.deletedCount}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

