exports.main = async (event, context) => {
  console.log("xxxx进函数");
  console.log(event);
  return event;
}