const Authentication = require("../models/auth");
const Blood = require("../models/blood");
const Address = require("../models/address");

const blood = async (req, res) => {
  const address = await Address.find({
    state: req.body.state,
    city: req.body.city,
  });
  var ids = address.map((user) => user._id);
  console.log(ids);
  // const blood = await Blood.find({_id : { $in: ids },group: { $exists: true } }).sort({ sign: 1 })
  const group = req.body.blood;
  const blood = await Blood.find({ _id: { $in: ids } });
  ids = blood.map((user) => user._id);

  const auth = await Authentication.find({
    _id: { $in: ids },
  });
  console.log(auth);

  const merged = address.map((obj1) => {
    // Find an object in arr2 that has the same 'id' as obj1
    const obj2 = blood.find((obj) => obj._id === obj1._id);

    // Find an object in arr3 that has the same 'id' as obj1
    const obj3 = auth.find((obj) => obj._id === obj1._id);

    // Return a new object that merges obj1, obj2, and obj3
    return Object.assign(
      {},
      obj1._doc,
      obj2._doc,
      obj3._doc
    );
  });

  const data = merged.map((ele) => {
    return {
      email: ele._id,
      address: ele.address,
      group: group,
      blood: ele[group],
      name: ele.blood_bank_name,
      phone: ele.contact,
      state: ele.state,
      city: ele.city,
    };
  });
  res.json(data);
};

module.exports = { blood };
