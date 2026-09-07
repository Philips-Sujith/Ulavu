// Simplified, Realistic Indian Agricultural Data for ULAVU

export const INITIAL_FARMERS = [
  {
    id: "farmer-1",
    name: "Ravi Kumar",
    phone: "98401 23456",
    location: "Walajabad, Kanchipuram"
  },
  {
    id: "farmer-2",
    name: "Murugan P.",
    phone: "94440 98765",
    location: "Madurantakam, Chengalpattu"
  },
  {
    id: "farmer-3",
    name: "Selvam K.",
    phone: "97890 54321",
    location: "Gummidipoondi, Tiruvallur"
  },
  {
    id: "farmer-4",
    name: "Arjun V.",
    phone: "98842 11223",
    location: "Tindivanam, Villupuram"
  },
  {
    id: "farmer-5",
    name: "Rajeshwari Ammal",
    phone: "94432 77889",
    location: "Katpadi, Vellore"
  }
];

export const INITIAL_PRODUCE = [
  {
    id: "prod-1",
    farmerId: "farmer-1",
    farmerName: "Ravi Kumar",
    farmerPhone: "98401 23456",
    crop: "Tomato",
    quantity: 500,
    unit: "kg",
    location: "Walajabad, Kanchipuram",
    postedAt: "Today"
  },
  {
    id: "prod-2",
    farmerId: "farmer-1",
    farmerName: "Ravi Kumar",
    farmerPhone: "98401 23456",
    crop: "Onion",
    quantity: 40,
    unit: "bag",
    location: "Walajabad, Kanchipuram",
    postedAt: "Yesterday"
  },
  {
    id: "prod-3",
    farmerId: "farmer-2",
    farmerName: "Murugan P.",
    farmerPhone: "94440 98765",
    crop: "Watermelon",
    quantity: 1200,
    unit: "kg",
    location: "Madurantakam, Chengalpattu",
    postedAt: "Today"
  },
  {
    id: "prod-4",
    farmerId: "farmer-3",
    farmerName: "Selvam K.",
    farmerPhone: "97890 54321",
    crop: "Banana",
    quantity: 80,
    unit: "bag",
    location: "Gummidipoondi, Tiruvallur",
    postedAt: "2 days ago"
  },
  {
    id: "prod-5",
    farmerId: "farmer-4",
    farmerName: "Arjun V.",
    farmerPhone: "98842 11223",
    crop: "Tomato",
    quantity: 350,
    unit: "kg",
    location: "Tindivanam, Villupuram",
    postedAt: "Today"
  },
  {
    id: "prod-6",
    farmerId: "farmer-5",
    farmerName: "Rajeshwari Ammal",
    farmerPhone: "94432 77889",
    crop: "Onion",
    quantity: 25,
    unit: "bag",
    location: "Katpadi, Vellore",
    postedAt: "3 days ago"
  }
];

export const POPULAR_CROPS = [
  "Tomato",
  "Onion",
  "Watermelon",
  "Banana",
  "Brinjal",
  "Potato",
  "Chilli",
  "Coconut"
];
