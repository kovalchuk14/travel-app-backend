export const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: 200,
    message: 'Current user retrieved successfully',
    data: user,
  });
};
