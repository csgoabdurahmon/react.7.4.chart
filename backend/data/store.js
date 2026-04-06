"use strict";

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    size: "41",
    description: "Kundalik kiyish uchun qulay va yengil Nike krossovkasi.",
    photos: ["/images/nike-air-max-270-1.jpg", "/images/nike-air-max-270-2.jpg"],
    price: 150,
    category: "running",
    createdAt: "2026-04-01T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Nike Air Force 1",
    size: "42",
    description: "Klassik oq rangdagi mashhur lifestyle model.",
    photos: ["/images/nike-air-force-1-1.jpg"],
    price: 120,
    category: "lifestyle",
    createdAt: "2026-04-01T10:10:00.000Z",
  },
  {
    id: 3,
    name: "Nike Dunk Low Panda",
    size: "43",
    description: "Qora-oq rangdagi zamonaviy va trend model.",
    photos: ["/images/nike-dunk-low-panda-1.jpg"],
    price: 135,
    category: "lifestyle",
    createdAt: "2026-04-01T10:20:00.000Z",
  },
  {
    id: 4,
    name: "Nike ZoomX Vaporfly",
    size: "40",
    description: "Yugurish uchun tezkor va professional model.",
    photos: ["/images/nike-zoomx-vaporfly-1.jpg"],
    price: 260,
    category: "running",
    createdAt: "2026-04-01T10:30:00.000Z",
  },
  {
    id: 5,
    name: "Nike Blazer Mid 77",
    size: "41",
    description: "Retro uslubdagi yuqori bo'yinli poyabzal.",
    photos: ["/images/nike-blazer-mid-77-1.jpg"],
    price: 110,
    category: "casual",
    createdAt: "2026-04-01T10:40:00.000Z",
  },
  {
    id: 6,
    name: "Nike Pegasus 40",
    size: "42",
    description: "Har kuni yugurish uchun universal model.",
    photos: ["/images/nike-pegasus-40-1.jpg"],
    price: 145,
    category: "running",
    createdAt: "2026-04-01T10:50:00.000Z",
  }
];

const orders = [
  {
    id: 1,
    customerName: "Ali Valiyev",
    items: [
      { name: "Nike Air Max 270", price: 150, quantity: 1 },
      { name: "Nike Socks", price: 15, quantity: 2 }
    ],
    status: "pending",
    total: 180,
    createdAt: "2026-04-01T12:00:00.000Z",
    updatedAt: "2026-04-01T12:00:00.000Z",
  },
  {
    id: 2,
    customerName: "Sardor Karimov",
    items: [
      { name: "Nike Dunk Low Panda", price: 135, quantity: 1 }
    ],
    status: "delivered",
    total: 135,
    createdAt: "2026-04-02T09:30:00.000Z",
    updatedAt: "2026-04-02T15:00:00.000Z",
  }
];

function getNextProductId() {
  return products.length ? Math.max(...products.map((product) => product.id)) + 1 : 1;
}

function getNextOrderId() {
  return orders.length ? Math.max(...orders.map((order) => order.id)) + 1 : 1;
}

function findProductById(id) {
  return products.find((product) => product.id === id);
}

function findOrderById(id) {
  return orders.find((order) => order.id === id);
}

module.exports = {
  products,
  orders,
  getNextProductId,
  getNextOrderId,
  findProductById,
  findOrderById,
};
