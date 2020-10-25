const AvatarGenerator = require("avatar-generator");
const path = require("path");
const avatar = new AvatarGenerator();

const variant = "male"; // By default 'male' and 'female' supported

exports.generateAvatar = async function generateAvatar() {
  const image = await avatar.generate("email@example.com", variant);
  const point = path.join(__dirname, "../../public/images/");
  const nameAvatar = `${Date.now()}.png`;
  image.png().toFile(`${point}${nameAvatar}`);
  return nameAvatar;
};
