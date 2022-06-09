const prisma = require("../utils/prisma");

const addScreen = async (req, res) => {
  const { number } = req.body;
  const createdScreen = await prisma.screen.create({
    data: {
      number,
    },
  });

  res.json({ data: createdScreen });
};

module.exports = {
  addScreen,
};
