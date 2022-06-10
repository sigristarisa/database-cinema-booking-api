const prisma = require("../utils/prisma");

const addTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;

  const createdTicket = await prisma.ticket.create({
    data: {
      screening: {
        connect: { id: screeningId },
      },
      customer: {
        connect: { id: customerId },
      },
    },
  });

  res.json({ data: createdTicket });
};

module.exports = {
  addTicket,
};
