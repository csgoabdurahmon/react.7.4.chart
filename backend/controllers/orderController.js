"use strict";

const {
  orders,
  getNextOrderId,
  findOrderById,
} = require("../data/store");

const allowedStatuses = ["pending", "cancelled", "delivered"];

function getOrders(req, res) {
  return res.json(orders);
}

function createOrder(req, res) {
  const { customerName, items } = req.body || {};

  if (!customerName) {
    return res.status(400).json({ message: "customerName majburiy" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "items bo'sh bo'lmasligi kerak" });
  }

  const hasInvalidItem = items.some((item) => {
    return !item || !item.name || Number(item.price) < 0 || Number(item.quantity) <= 0;
  });

  if (hasInvalidItem) {
    return res.status(400).json({ message: "Order item ma'lumotlari noto'g'ri" });
  }

  const total = items.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  const now = new Date().toISOString();

  const order = {
    id: getNextOrderId(),
    customerName,
    items: items.map((item) => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    })),
    status: "pending",
    total,
    createdAt: now,
    updatedAt: now,
  };

  orders.push(order);
  return res.status(201).json(order);
}

function updateOrderStatus(req, res) {
  const id = Number(req.params.id);
  const { status } = req.body || {};
  const order = findOrderById(id);

  if (!order) {
    return res.status(404).json({ message: "Order topilmadi" });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Status noto'g'ri" });
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  return res.json(order);
}

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
};
