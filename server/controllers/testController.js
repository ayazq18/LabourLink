// Controller logic for /api/test route

const getTestMessage = (req, res) => {
  res.json({ message: 'Hello from testController!' });
};

module.exports = {
  getTestMessage,
};
