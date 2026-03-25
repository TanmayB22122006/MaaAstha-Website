const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    idProof: { 
      type: String, 
      required: true, 
      trim: true 
    }, 
    age: { 
      type: Number, 
      required: true 
    }, 
    designation: { 
      type: String, 
      trim: true 
    }, 
    address: { 
      type: String, 
      required: true 
    }, 
    email: { 
      type: String, 
      required: true, 
      trim: true 
    }, 
    phone: { 
      type: String, 
      required: true, 
      trim: true 
    },
    // Tab 2 ke fields niche hain
    helpType: { 
      type: String, 
      required: true 
    }, 
    availableDate: { 
      type: String, 
      required: true 
    }, 
    message: { 
      type: String, 
      trim: true 
    }, 
    status: { 
      type: String, 
      default: "New", 
      trim: true 
    },
  },
  { timestamps: true } // Isse CreatedAt aur UpdatedAt apne aap ban jayega
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);